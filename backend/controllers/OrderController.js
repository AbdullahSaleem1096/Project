const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Store = require('../models/Store');
const Transaction = require('../models/Transaction');

// Create a new order with transaction handling
exports.createOrder = async (req, res) => {
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;
    
    console.log('Received order request:', { 
      userId, 
      itemsCount: items?.length, 
      totalAmount, 
      paymentMethod,
      items: JSON.stringify(items)
    });
    
    // Validate inputs
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Order validation failed: items array is empty or invalid');
      return res.status(400).json({ 
        success: false, 
        message: 'Order must contain at least one item' 
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid total amount'
      });
    }

    if (!paymentMethod || !['wallet', 'cod'].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method'
      });
    }
    
    // Find the buyer
    const buyer = await User.findById(userId).session(session);
    if (!buyer) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Buyer not found'
      });
    }

    // Validate wallet balance if using wallet payment
    if (paymentMethod === 'wallet' && buyer.wallet < totalAmount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Insufficient wallet balance'
      });
    }
    
    console.log('Processing items:', JSON.stringify(items));
    
    // Check product availability and update items with store information
    const processedItems = [];
    for (const item of items) {
      console.log('Processing item:', JSON.stringify(item));
      
      if (!item.productId) {
        console.error('Invalid item: missing productId');
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: 'Each item must have a productId'
        });
      }
      
      const product = await Product.findById(item.productId).session(session);
      
      if (!product) {
        console.error(`Product not found: ${item.productId}`);
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`
        });
      }
      
      if (!product.isAvailable || product.quantity < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is out of stock or has insufficient quantity`
        });
      }
      
      // Check if product has a valid storeId
      if (!product.storeId) {
        console.error(`Product ${product.name} (${product._id}) has no associated store`);
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: `Product ${product.name} has no associated store`
        });
      }
      
      // Get store information
      const store = await Store.findById(product.storeId).session(session);
      if (!store) {
        console.error(`Store not found for product ${product.name} (${product._id}), storeId: ${product.storeId}`);
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          success: false,
          message: `Store for product ${product.name} not found`
        });
      }
      
      // Update product quantity
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { quantity: -item.quantity } },
        { session, new: true }
      );
      
      // Push processed item with store details
      processedItems.push({
        productId: product._id,
        storeId: product.storeId,
        sellerId: store.sellerId,
        quantity: item.quantity,
        price: product.price
      });
    }
    
    console.log('Processed items:', JSON.stringify(processedItems));
    
    // Generate an order number
    const orderNumber = `ORD-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create the order
    const order = new Order({
      userId,
      items: processedItems.map(item => ({
        productId: item.productId,
        storeId: item.storeId,
        quantity: item.quantity,
        price: item.price
      })),
      orderStatus: 'pending',
      orderNumber,
      totalAmount,
      paymentMethod
    });
    
    await order.save({ session });
    console.log('Order created:', order._id);
    
    // Process payment based on method
    if (paymentMethod === 'wallet') {
      // Deduct from buyer's wallet
      await User.findByIdAndUpdate(
        userId,
        { $inc: { wallet: -totalAmount } },
        { session, new: true }
      );
      
      // Create transactions for each seller
      // Group items by seller to create one transaction per seller
      const sellerItemsMap = {};
      for (const item of processedItems) {
        const sellerKey = item.sellerId.toString();
        if (!sellerItemsMap[sellerKey]) {
          sellerItemsMap[sellerKey] = {
            sellerId: item.sellerId,
            items: [],
            totalAmount: 0
          };
        }
        
        sellerItemsMap[sellerKey].items.push(item);
        sellerItemsMap[sellerKey].totalAmount += item.price * item.quantity;
      }
      
      // Create a transaction for each seller
      for (const sellerKey in sellerItemsMap) {
        const sellerData = sellerItemsMap[sellerKey];
        
        // Create transaction
        const transaction = new Transaction({
          orderId: order._id,
          buyerId: userId,
          sellerId: sellerData.sellerId,
          amount: sellerData.totalAmount,
          paymentMethod,
          status: 'completed',
          notes: `Payment for order ${order._id}`
        });
        
        await transaction.save({ session });
        
        // Add funds to seller's wallet
        await User.findByIdAndUpdate(
          sellerData.sellerId,
          { $inc: { wallet: sellerData.totalAmount } },
          { session, new: true }
        );
      }
    } else if (paymentMethod === 'cod') {
      // For COD, create pending transactions
      // Group items by seller
      const sellerItemsMap = {};
      for (const item of processedItems) {
        const sellerKey = item.sellerId.toString();
        if (!sellerItemsMap[sellerKey]) {
          sellerItemsMap[sellerKey] = {
            sellerId: item.sellerId,
            items: [],
            totalAmount: 0
          };
        }
        
        sellerItemsMap[sellerKey].items.push(item);
        sellerItemsMap[sellerKey].totalAmount += item.price * item.quantity;
      }
      
      // Create a pending transaction for each seller
      for (const sellerKey in sellerItemsMap) {
        const sellerData = sellerItemsMap[sellerKey];
        
        const transaction = new Transaction({
          orderId: order._id,
          buyerId: userId,
          sellerId: sellerData.sellerId,
          amount: sellerData.totalAmount,
          paymentMethod,
          status: 'pending',
          notes: `COD payment for order ${order._id}`
        });
        
        await transaction.save({ session });
      }
    }
    
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        _id: order._id,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt
      }
    });
    
  } catch (error) {
    // If an error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'items.productId',
        select: 'name images price'
      });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
    
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;
    
    // Find the order and populate required fields
    const order = await Order.findById(orderId)
      .populate({
        path: 'items.productId',
        select: 'name images price description'
      })
      .populate({
        path: 'items.storeId',
        select: 'name logo contactEmail'
      });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if the user is authorized to view this order
    if (order.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this order'
      });
    }
    
    // Get transaction details
    const transactions = await Transaction.find({ orderId });
    
    res.status(200).json({
      success: true,
      order,
      transactions
    });
    
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
}; 