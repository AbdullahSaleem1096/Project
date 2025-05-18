const Store = require('../models/Store');
const User = require('../models/User');

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const { sellerId } = req.body;

    // Check if user exists and is a seller
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }
    
    if (seller.role !== 'seller') {
      return res.status(403).json({ success: false, message: 'Only sellers can create stores' });
    }

    // Check if seller already has a store
    const existingStore = await Store.findOne({ sellerId });
    if (existingStore) {
      return res.status(400).json({ 
        success: false, 
        message: 'Seller already has a store', 
        storeId: existingStore._id 
      });
    }

    // Create new store
    const storeData = req.body;
    storeData.isSetupComplete = true; // Since all required data is being provided
    const newStore = new Store(storeData);
    await newStore.save();

    res.status(201).json({ success: true, store: newStore });
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ success: false, message: 'Failed to create store', error: error.message });
  }
};

// Get store by ID
exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    
    // Increment view count
    store.views = (store.views || 0) + 1;
    await store.save();
    
    res.status(200).json({ success: true, store });
  } catch (error) {
    console.error('Error getting store:', error);
    res.status(500).json({ success: false, message: 'Failed to get store', error: error.message });
  }
};

// Get store by seller ID
exports.getStoreBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const store = await Store.findOne({ sellerId });
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found for this seller' });
    }
    
    res.status(200).json({ success: true, store });
  } catch (error) {
    console.error('Error getting seller store:', error);
    res.status(500).json({ success: false, message: 'Failed to get seller store', error: error.message });
  }
};

// Update store
exports.updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Set updated time
    updateData.updatedAt = Date.now();
    
    // Find and update the store
    const store = await Store.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    
    res.status(200).json({ success: true, store });
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ success: false, message: 'Failed to update store', error: error.message });
  }
};

// Check if seller has completed store setup
exports.checkStoreSetup = async (req, res) => {
  try {
    const { sellerId } = req.params;
    
    const store = await Store.findOne({ sellerId });
    
    if (!store) {
      return res.status(200).json({ 
        success: true, 
        hasStore: false,
        message: 'Seller does not have a store yet' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      hasStore: true,
      isSetupComplete: store.isSetupComplete,
      storeId: store._id,
      storeStatus: store.storeStatus
    });
  } catch (error) {
    console.error('Error checking store setup:', error);
    res.status(500).json({ success: false, message: 'Failed to check store setup', error: error.message });
  }
};

// Get all active stores
exports.getAllStores = async (req, res) => {
  try {
    const { category, sort = 'rating', order = 'desc', limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build filter object - only return active stores
    const filter = { storeStatus: 'active' };
    if (category) {
      filter.category = { $in: [category] };
    }
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    // Get stores with pagination
    const stores = await Store.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
    
    // Get total count for pagination
    const totalCount = await Store.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      stores,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error getting stores:', error);
    res.status(500).json({ success: false, message: 'Failed to get stores', error: error.message });
  }
};

// Initial store setup
exports.setupStore = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const storeData = req.body;
    
    console.log('Store setup requested by user:', req.user.id, 'Role:', req.user.role);
    console.log('Setting up store for seller ID:', sellerId);
    
    // Check if the requesting user is a seller trying to set up their own store
    // or an admin (who can set up stores for any seller)
    if (req.user.role === 'seller' && req.user.id !== sellerId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Sellers can only setup their own store',
        requestedSeller: sellerId,
        currentUser: req.user.id
      });
    }
    
    // Check if user exists and is a seller
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }
    
    if (seller.role !== 'seller') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only sellers can have stores',
        userRole: seller.role
      });
    }
    
    // Check if seller already has a store
    let store = await Store.findOne({ sellerId });
    
    if (store) {
      // Update existing store
      store = await Store.findByIdAndUpdate(
        store._id,
        { 
          $set: {
            ...storeData,
            isSetupComplete: true,
            storeStatus: 'pending', // Admin must approve before store is active
            updatedAt: Date.now()
          }
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new store
      store = new Store({
        ...storeData,
        sellerId,
        isSetupComplete: true,
        storeStatus: 'pending',
        views: 0
      });
      await store.save();
    }
    
    res.status(200).json({ success: true, store });
  } catch (error) {
    console.error('Error setting up store:', error);
    res.status(500).json({ success: false, message: 'Failed to set up store', error: error.message });
  }
}; 