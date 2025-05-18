const express = require('express');
const router = express.Router();
const {
  createStore,
  getStoreById,
  getStoreBySellerId,
  updateStore,
  checkStoreSetup,
  getAllStores,
  setupStore
} = require('../controllers/StoreController');
const { validateStoreData, validateStoreId } = require('../middleware/storeValidation');
const { authenticateToken, isSeller, isAdmin, isSellerOrAdmin } = require('../middleware/auth');

// Public routes - no authentication required
router.get('/all', getAllStores); // Get all active stores
router.get('/:id', validateStoreId, getStoreById); // Get store by ID

// Protected routes - authentication required
router.get('/seller/:sellerId', authenticateToken, getStoreBySellerId); // Get store by seller ID
router.get('/check/:sellerId', authenticateToken, checkStoreSetup); // Check if seller has completed store setup

// Routes requiring seller or admin privileges
router.post('/', authenticateToken, isSellerOrAdmin, validateStoreData, createStore); // Create a new store
router.post('/setup/:sellerId', authenticateToken, validateStoreData, setupStore); // Setup store (create or update)
router.put('/:id', authenticateToken, isSellerOrAdmin, validateStoreId, updateStore); // Update store

module.exports = router; 