const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to authenticate token
exports.authenticateToken = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
    
    console.log('Auth Header:', authHeader);
    console.log('Token:', token ? token.substring(0, 20) + '...' : 'No token');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    
    // Verify token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log('Token verification error:', err.message);
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }
      
      // Add user info to request
      console.log('Decoded token:', JSON.stringify(decoded));
      
      // Verify user exists in database
      try {
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Use database user role instead of token role
        decoded.role = user.role;
        req.user = decoded;
        next();
      } catch (error) {
        console.error('Database verification error:', error);
        return res.status(500).json({ success: false, message: 'User verification error' });
      }
    });
  } catch (error) {
    console.error('Error authenticating token:', error);
    return res.status(500).json({ success: false, message: 'Authentication error', error: error.message });
  }
};

// Middleware to check if user is a seller
exports.isSeller = async (req, res, next) => {
  try {
    console.log('Checking seller privileges for user:', req.user.id, 'Role:', req.user.role);
    if (req.user.role !== 'seller') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Seller privileges required.',
        userRole: req.user.role
      });
    }
    next();
  } catch (error) {
    console.error('Error checking seller role:', error);
    return res.status(500).json({ success: false, message: 'Authorization error', error: error.message });
  }
};

// Middleware to check if user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
    }
    next();
  } catch (error) {
    console.error('Error checking admin role:', error);
    return res.status(500).json({ success: false, message: 'Authorization error', error: error.message });
  }
};

// Middleware to check if user is a seller or admin
exports.isSellerOrAdmin = async (req, res, next) => {
  try {
    console.log('Checking seller/admin privileges');
    console.log('User role from token:', req.user ? req.user.role : 'User not in request');
    
    if (!req.user || (req.user.role !== 'seller' && req.user.role !== 'admin')) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Seller or admin privileges required.',
        userRole: req.user ? req.user.role : 'undefined'
      });
    }
    next();
  } catch (error) {
    console.error('Error checking seller/admin role:', error);
    return res.status(500).json({ success: false, message: 'Authorization error', error: error.message });
  }
};

// Middleware to check if user owns the resource or is an admin
exports.isOwnerOrAdmin = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const userId = req.user.id;
    
    // If admin, allow access
    if (req.user.role === 'admin') {
      return next();
    }
    
    // The logic to check ownership depends on the resource type
    // This is a simplified example - adapt to your needs
    const resource = await YourModel.findById(resourceId);
    
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    
    if (resource.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied. You do not own this resource.' });
    }
    
    next();
  } catch (error) {
    console.error('Error checking ownership:', error);
    return res.status(500).json({ success: false, message: 'Authorization error', error: error.message });
  }
}; 