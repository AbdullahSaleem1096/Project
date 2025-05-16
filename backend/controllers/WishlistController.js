const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find wishlist and populate product details
    let wishlist = await Wishlist.findOne({ userId }).populate('products');
    
    if (!wishlist) {
      // If no wishlist exists, create an empty one
      wishlist = new Wishlist({
        userId,
        products: []
      });
      await wishlist.save();
    }
    
    res.status(200).json({
      success: true,
      wishlist: wishlist.products
    });
  } catch (error) {
    console.error('Error getting wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get wishlist',
      error: error.message
    });
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [productId]
      });
    } else {
      // Check if product already in wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({
          success: false,
          message: 'Product already in wishlist'
        });
      }
      
      // Add product to wishlist
      wishlist.products.push(productId);
    }
    
    await wishlist.save();
    
    // Increment isWishlisted counter for the product
    await Product.findByIdAndUpdate(
      productId,
      { $inc: { isWishlisted: 1 } }
    );
    
    res.status(200).json({
      success: true,
      message: 'Product added to wishlist',
      wishlist: wishlist.products
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add to wishlist',
      error: error.message
    });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    
    // Find wishlist
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }
    
    // Check if product in wishlist
    if (!wishlist.products.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Product not in wishlist'
      });
    }
    
    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );
    
    await wishlist.save();
    
    // Decrement isWishlisted counter for the product, ensuring it doesn't go below 0
    await Product.findByIdAndUpdate(
      productId,
      { $inc: { isWishlisted: -1 } },
      { new: true }
    ).then(product => {
      if (product && product.isWishlisted < 0) {
        return Product.findByIdAndUpdate(
          productId,
          { isWishlisted: 0 }
        );
      }
    });
    
    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
      wishlist: wishlist.products
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove from wishlist',
      error: error.message
    });
  }
};

// Check if product is in wishlist
exports.checkInWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    
    // Find wishlist
    const wishlist = await Wishlist.findOne({ userId });
    
    // If no wishlist, product not in wishlist
    if (!wishlist) {
      return res.status(200).json({
        success: true,
        inWishlist: false
      });
    }
    
    // Check if product in wishlist
    const inWishlist = wishlist.products.includes(productId);
    
    res.status(200).json({
      success: true,
      inWishlist
    });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to check wishlist',
      error: error.message
    });
  }
};

// Clear wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find wishlist
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }
    
    // Keep a copy of products to update their wishlist counts
    const productsToUpdate = [...wishlist.products];
    
    // Clear products array
    wishlist.products = [];
    await wishlist.save();
    
    // Decrement isWishlisted counter for each product
    if (productsToUpdate.length > 0) {
      await Promise.all(
        productsToUpdate.map(productId => 
          Product.findByIdAndUpdate(
            productId,
            { $inc: { isWishlisted: -1 } },
            { new: true }
          ).then(product => {
            if (product && product.isWishlisted < 0) {
              return Product.findByIdAndUpdate(
                productId,
                { isWishlisted: 0 }
              );
            }
          })
        )
      );
    }
    
    res.status(200).json({
      success: true,
      message: 'Wishlist cleared',
      wishlist: wishlist.products
    });
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to clear wishlist',
      error: error.message
    });
  }
}; 