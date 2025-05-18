/**
 * Utility script to assign stores to products that don't have one
 * This script can be run manually to fix products without a store
 */

const mongoose = require('mongoose');
const Product = require('../models/Product');
const Store = require('../models/Store');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected for product-store assignment'))
.catch(err => console.error('MongoDB connection error:', err));

/**
 * Function to create a system store if one doesn't exist
 * @returns {Promise<Object>} The system store document
 */
const getOrCreateSystemStore = async () => {
  try {
    // Check if system store already exists
    let systemStore = await Store.findOne({ isSystemStore: true });
    
    if (systemStore) {
      console.log('System store already exists:', systemStore._id);
      return systemStore;
    }
    
    // Check if admin user exists
    let adminUser = await User.findOne({ role: 'admin' });
    
    // If no admin exists, create one
    if (!adminUser) {
      console.log('No admin user found, creating one...');
      adminUser = new User({
        username: 'SystemAdmin',
        email: 'system@nustify.com',
        password: 'SystemAdmin123!',
        role: 'admin',
        isVerified: true
      });
      await adminUser.save();
      console.log('Created system admin user:', adminUser._id);
    }
    
    // Create system store
    systemStore = new Store({
      name: 'Nustify System Store',
      sellerId: adminUser._id,
      description: 'Default system store for products without a store assignment',
      contactEmail: 'system@nustify.com',
      logo: 'https://via.placeholder.com/150',
      isApproved: true,
      isSystemStore: true
    });
    
    await systemStore.save();
    console.log('Created system store:', systemStore._id);
    return systemStore;
  } catch (error) {
    console.error('Error creating system store:', error);
    throw error;
  }
};

/**
 * Function to assign a store to products without one
 */
const assignStoreToProducts = async () => {
  try {
    // Get system store
    const systemStore = await getOrCreateSystemStore();
    
    // Find products without a storeId
    const productsWithoutStore = await Product.find({ 
      $or: [
        { storeId: { $exists: false } },
        { storeId: null }
      ]
    });
    
    console.log(`Found ${productsWithoutStore.length} products without a store`);
    
    if (productsWithoutStore.length === 0) {
      console.log('No products need store assignment. Exiting.');
      return;
    }
    
    // Update products with the system store ID
    const updatePromises = productsWithoutStore.map(product => 
      Product.findByIdAndUpdate(
        product._id,
        { storeId: systemStore._id },
        { new: true }
      )
    );
    
    const updatedProducts = await Promise.all(updatePromises);
    
    console.log(`Successfully assigned system store (${systemStore._id}) to ${updatedProducts.length} products`);
    console.log('Products updated:', updatedProducts.map(p => p.name).join(', '));
    
  } catch (error) {
    console.error('Error assigning store to products:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Execute the function if this script is run directly
if (require.main === module) {
  assignStoreToProducts()
    .then(() => console.log('Store assignment process completed'))
    .catch(err => console.error('Store assignment process failed:', err));
}

// Export for use in other scripts
module.exports = { assignStoreToProducts, getOrCreateSystemStore }; 