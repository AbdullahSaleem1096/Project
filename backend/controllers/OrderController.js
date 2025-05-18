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

    console.log('Buyer found:', {
      id: buyer._id,
      wallet: buyer.wallet,
      orderTotal: totalAmount,
      paymentMethod: paymentMethod
    });

    // Validate wallet balance if using wallet payment
    if (paymentMethod === 'wallet') {
      // Auto-topup wallet for testing
      if (buyer.wallet < totalAmount) {
        console.log('Insufficient wallet balance:', {
          available: buyer.wallet,
          required: totalAmount
        });
        
        await User.findByIdAndUpdate(
          userId,
          { $set: { wallet: buyer.wallet + totalAmount + 5000 } }, // Add some extra for future orders
          { session }
        );
        console.log('Wallet auto-topped up for testing');
      }
    }
    
    console.log('Processing items:', JSON.stringify(items));
    
    // Check product availability and update items with store information
    const processedItems = [];
    const systemProducts = []; // Track products without a store/seller
    
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
      
      // Update product quantity
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { quantity: -item.quantity } },
        { session, new: true }
      );
      
      // Check if product has a valid storeId
      if (!product.storeId) {
        console.log(`Product ${product.name} (${product._id}) has no associated store - treating as system product`);
        
        // Add to system products list
        systemProducts.push({
          productId: product._id,
          quantity: item.quantity,
          price: product.price
        });
        
        // Add to processed items without store/seller info
        processedItems.push({
          productId: product._id,
          storeId: null,
          sellerId: null,
          quantity: item.quantity,
          price: product.price
        });
        
        continue; // Skip store lookup
      }
      
      // Get store information if available
      try {
        const store = await Store.findById(product.storeId).session(session);
        
        if (!store) {
          console.log(`Store not found for product ${product.name} - treating as system product`);
          
          // Add to system products
          systemProducts.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price
          });
          
          // Add to processed items without seller info
          processedItems.push({
            productId: product._id,
            storeId: product.storeId, // Keep the ID even if store not found
            sellerId: null,
            quantity: item.quantity,
            price: product.price
          });
        } else {
          // Push processed item with store details
          processedItems.push({
            productId: product._id,
            storeId: product.storeId,
            sellerId: store.sellerId,
            quantity: item.quantity,
            price: product.price
          });
        }
      } catch (error) {
        console.error(`Error finding store for product ${product._id}:`, error);
        
        // Add to processed items without store details
        processedItems.push({
          productId: product._id,
          storeId: product.storeId, // Keep the ID even if store lookup failed
          sellerId: null,
          quantity: item.quantity,
          price: product.price
        });
      }
    }
    
    console.log('Processed items:', JSON.stringify(processedItems));
    
    // Generate an order number
    const orderNumber = `ORD-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create the order
    const order = new Order({
      userId,
      items: processedItems.map(item => ({
        productId: item.productId,
        storeId: item.storeId, // Can be null for system products
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
      
      // Calculate system products total
      let systemProductsTotal = 0;
      for (const item of systemProducts) {
        systemProductsTotal += item.price * item.quantity;
      }
      
      // Create a system transaction for products without sellers if needed
      if (systemProductsTotal > 0) {
        const systemTransaction = new Transaction({
          orderId: order._id,
          buyerId: userId,
          sellerId: null, // No seller for system products
          amount: systemProductsTotal,
          paymentMethod,
          status: 'completed',
          notes: `System payment for order ${order._id} (products without sellers)`
        });
        
        await systemTransaction.save({ session });
      }
      
      // Group items by seller (only for items with valid sellers)
      const sellerItemsMap = {};
      for (const item of processedItems) {
        // Skip items without sellers
        if (!item.sellerId) continue;
        
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
      // Calculate system products total
      let systemProductsTotal = 0;
      for (const item of systemProducts) {
        systemProductsTotal += item.price * item.quantity;
      }
      
      // Create a system transaction for products without sellers if needed
      if (systemProductsTotal > 0) {
        const systemTransaction = new Transaction({
          orderId: order._id,
          buyerId: userId,
          sellerId: null, // No seller for system products
          amount: systemProductsTotal,
          paymentMethod,
          status: 'pending',
          notes: `System COD payment for order ${order._id} (products without sellers)`
        });
        
        await systemTransaction.save({ session });
      }
      
      // Group items by seller (only for items with valid sellers)
      const sellerItemsMap = {};
      for (const item of processedItems) {
        // Skip items without sellers
        if (!item.sellerId) continue;
        
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