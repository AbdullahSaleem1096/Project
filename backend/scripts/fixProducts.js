const mongoose = require('mongoose');
const Product = require('../models/Product');
const Store = require('../models/Store');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nustify')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function fixProducts() {
  try {
    console.log('Starting product fix script...');
    
    // Find all products without a storeId
    const productsWithoutStore = await Product.find({ $or: [{ storeId: null }, { storeId: { $exists: false } }] });
    console.log(`Found ${productsWithoutStore.length} products without a store ID`);
    
    if (productsWithoutStore.length === 0) {
      console.log('No products to fix');
      return;
    }
    
    // Find a store to assign to these products
    // Use the first active store we can find
    const defaultStore = await Store.findOne({ storeStatus: 'active' });
    
    if (!defaultStore) {
      console.log('No active store found to assign products to');
      
      // Create a fake store for testing if none exists
      const sellerUser = await User.findOne({ role: 'seller' });
      
      if (!sellerUser) {
        console.log('No seller user found to create a store for');
        return;
      }
      
      const newStore = new Store({
        name: 'Default Store',
        description: 'Default store for products without a store reference',
        sellerId: sellerUser._id,
        logo: 'https://via.placeholder.com/150',
        contactEmail: 'default@store.com',
        contactPhone: '0000000000',
        storeStatus: 'active',
        isSetupComplete: true,
        address: {
          hostel: 'Default',
          roomNumber: '000'
        }
      });
      
      await newStore.save();
      console.log(`Created default store with ID: ${newStore._id}`);
      
      // Update all products without a store
      for (const product of productsWithoutStore) {
        await Product.findByIdAndUpdate(product._id, { storeId: newStore._id });
        console.log(`Updated product ${product.name} (${product._id}) with default store ID`);
      }
    } else {
      console.log(`Found default store: ${defaultStore.name} (${defaultStore._id})`);
      
      // Update all products without a store
      for (const product of productsWithoutStore) {
        await Product.findByIdAndUpdate(product._id, { storeId: defaultStore._id });
        console.log(`Updated product ${product.name} (${product._id}) with store ID: ${defaultStore._id}`);
      }
    }
    
    console.log('Product fix script completed successfully');
  } catch (error) {
    console.error('Error fixing products:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the fix script
fixProducts(); 