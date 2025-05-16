// Middleware for validating product data
exports.validateProductData = (req, res, next) => {
  try {
    const { name, price, category, quantity, storeId } = req.body;
    
    const errors = [];
    
    // Validate required fields
    if (!name) errors.push('Product name is required');
    if (!price) errors.push('Product price is required');
    if (!category) errors.push('Product category is required');
    if (!storeId) errors.push('Store ID is required');
    
    // Validate data types
    if (name && typeof name !== 'string') errors.push('Product name must be a string');
    if (price && (typeof price !== 'number' || price < 0)) errors.push('Product price must be a positive number');
    if (quantity && (typeof quantity !== 'number' || quantity < 0)) errors.push('Product quantity must be a positive number');
    
    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    
    // If everything is valid, proceed
    next();
  } catch (error) {
    console.error('Error in product validation:', error);
    return res.status(500).json({ success: false, message: 'Validation error', error: error.message });
  }
};

// Middleware for validating product ID
exports.validateProductId = (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if ID is valid MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    
    next();
  } catch (error) {
    console.error('Error in product ID validation:', error);
    return res.status(500).json({ success: false, message: 'Validation error', error: error.message });
  }
}; 