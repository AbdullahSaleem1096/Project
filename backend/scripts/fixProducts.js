/**
 * Script to fix products without store IDs
 * 
 * This script will:
 * 1. Find products without a storeId
 * 2. Create a system store if needed
 * 3. Assign the system store to those products
 * 
 * Run with: node scripts/fixProducts.js
 */

const { assignStoreToProducts } = require('../utils/assignStoreToProducts');

console.log('Starting product fix script...');
console.log('This will assign system store to products that are missing store references');

// Run the newly created utility
assignStoreToProducts()
  .then(() => {
    console.log('✅ Product fix script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Product fix script failed:', error);
    process.exit(1);
  }); 