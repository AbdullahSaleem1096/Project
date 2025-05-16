const express = require('express');
const router = express.Router();
const { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist,
  checkInWishlist,
  clearWishlist
} = require('../controllers/WishlistController');
const { authenticateToken } = require('../middleware/auth');

// All wishlist routes require authentication
router.use(authenticateToken);

// Get user's wishlist
router.get('/', getWishlist);

// Add product to wishlist
router.post('/add', addToWishlist);

// Remove product from wishlist
router.delete('/remove/:productId', removeFromWishlist);

// Check if product is in wishlist
router.get('/check/:productId', checkInWishlist);

// Clear wishlist
router.delete('/clear', clearWishlist);

module.exports = router; 