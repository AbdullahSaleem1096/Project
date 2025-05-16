const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, storeId, sort = 'createdAt', order = 'desc', limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (storeId) filter.storeId = storeId;
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    // Get products with pagination
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
    
    // Get total count for pagination
    const totalCount = await Product.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      products,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, message: 'Failed to get products', error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build search filter
    const searchFilter = {};
    
    // Add text search if query is provided
    if (q) {
      searchFilter.$text = { $search: q };
    }
    
    // Add category filter if provided
    if (category) {
      searchFilter.category = category;
    }
    
    // Add price range if provided
    if (minPrice !== undefined || maxPrice !== undefined) {
      searchFilter.price = {};
      if (minPrice !== undefined) searchFilter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) searchFilter.price.$lte = Number(maxPrice);
    }
    
    // Execute search query with pagination
    const products = await Product.find(searchFilter)
      .sort(q ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .exec();
      
    // Get total count for pagination
    const totalCount = await Product.countDocuments(searchFilter);
    
    res.status(200).json({
      success: true,
      products,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ success: false, message: 'Failed to search products', error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    // Increment views counter
    product.views = (product.views || 0) + 1;
    await product.save();
    
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ success: false, message: 'Failed to get product', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Set updated time
    updateData.updatedAt = new Date();
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

// Get products by store
exports.getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const products = await Product.find({ storeId });
    
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error getting store products:', error);
    res.status(500).json({ success: false, message: 'Failed to get store products', error: error.message });
  }
};

// Get related products
exports.getRelatedProducts = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the current product to get its category
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    // Find related products with the same category but exclude the current product
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id }
    })
    .limit(5)
    .exec();
    
    res.status(200).json({ success: true, relatedProducts });
  } catch (error) {
    console.error('Error getting related products:', error);
    res.status(500).json({ success: false, message: 'Failed to get related products', error: error.message });
  }
}; 