// Middleware for validating store data
exports.validateStoreData = (req, res, next) => {
  try {
    const { name, description, sellerId, logo, contactEmail, contactPhone, address } = req.body;
    
    const errors = [];
    
    // Validate required fields
    if (!name) errors.push('Store name is required');
    if (!description) errors.push('Store description is required');
    if (!sellerId) errors.push('Seller ID is required');
    if (!logo) errors.push('Store logo is required');
    if (!contactEmail) errors.push('Contact email is required');
    if (!contactPhone) errors.push('Contact phone is required');
    
    // Validate address
    if (!address) {
      errors.push('Address is required');
    } else {
      if (!address.hostel) errors.push('Hostel is required');
      if (!address.roomNumber) errors.push('Room number is required');
    }
    
    // Validate data types and format
    if (contactEmail && !isValidEmail(contactEmail)) {
      errors.push('Invalid email format');
    }
    
    if (contactPhone && !isValidPhone(contactPhone)) {
      errors.push('Invalid phone number format');
    }
    
    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    
    // If everything is valid, proceed
    next();
  } catch (error) {
    console.error('Error in store validation:', error);
    return res.status(500).json({ success: false, message: 'Validation error', error: error.message });
  }
};

// Middleware for validating store ID
exports.validateStoreId = (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if ID is valid MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid store ID format' 
      });
    }
    
    next();
  } catch (error) {
    console.error('Error in store ID validation:', error);
    return res.status(500).json({ success: false, message: 'Validation error', error: error.message });
  }
};

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone number format
function isValidPhone(phone) {
  // Simple validation for Pakistan phone numbers
  // Can be adjusted based on specific requirements
  const phoneRegex = /^((\+92)|(0092)|(0))(3)([0-9]{9})$/;
  return phoneRegex.test(phone);
} 