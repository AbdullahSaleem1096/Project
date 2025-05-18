const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderDetails
} = require('../controllers/OrderController');
const { authenticateToken } = require('../middleware/auth');

// All order routes require authentication
router.use(authenticateToken);

// Create a new order
router.post('/', createOrder);

// Get all orders for the authenticated user
router.get('/', getUserOrders);

// Get details of a specific order
router.get('/:orderId', getOrderDetails);

module.exports = router; 