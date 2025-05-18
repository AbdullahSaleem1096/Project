import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found, adding to request headers');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      
      // Handle 401 (Unauthorized) - Token expired or invalid
      if (error.response.status === 401) {
        console.warn('Authentication error - redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Product API calls
export const productAPI = {
  // Get all products
  getAllProducts: async (params) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (params) => {
    try {
      const response = await api.get('/products/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get related products
  getRelatedProducts: async (id) => {
    try {
      const response = await api.get(`/products/${id}/related`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching related products for ${id}:`, error);
      throw error;
    }
  },

  // Get products by store
  getProductsByStore: async (storeId) => {
    try {
      const response = await api.get(`/products/store/${storeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for store ${storeId}:`, error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
};

// Store API calls
export const storeAPI = {
  // Get all stores
  getAllStores: async (params) => {
    try {
      const response = await api.get('/stores/all', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  // Get store by ID
  getStoreById: async (id) => {
    try {
      const response = await api.get(`/stores/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching store ${id}:`, error);
      throw error;
    }
  },

  // Get store by seller ID
  getStoreBySellerId: async (sellerId) => {
    try {
      const response = await api.get(`/stores/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching store for seller ${sellerId}:`, error);
      throw error;
    }
  },

  // Check store setup status
  checkStoreSetup: async (sellerId) => {
    try {
      console.log('Checking store setup for seller:', sellerId);

      // Validate sellerId before making the request
      if (!sellerId) {
        console.error('Store setup check failed: Seller ID is undefined or null');
        throw new Error('Seller ID is required to check store setup');
      }

      console.log('Auth token:', localStorage.getItem('token') ? 'Token exists' : 'No token');
      const response = await api.get(`/stores/check/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error checking store setup for seller ${sellerId}:`, error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      throw error;
    }
  },

  // Create new store
  createStore: async (storeData) => {
    try {
      const response = await api.post('/stores', storeData);
      return response.data;
    } catch (error) {
      console.error('Error creating store:', error);
      throw error;
    }
  },

  // Setup store (create or update)
  setupStore: async (sellerId, storeData) => {
    try {
      const response = await api.post(`/stores/setup/${sellerId}`, storeData);
      return response.data;
    } catch (error) {
      console.error(`Error setting up store for seller ${sellerId}:`, error);
      throw error;
    }
  },

  // Update store
  updateStore: async (id, storeData) => {
    try {
      const response = await api.put(`/stores/${id}`, storeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating store ${id}:`, error);
      throw error;
    }
  }
};

// User API calls
export const userAPI = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/user/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/user/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (data) => {
    try {
      const response = await api.post('/user/verify-otp', data);
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }
};

// Order API calls
export const orderAPI = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required to create an order');
      }

      console.log('Creating order with token and data:', { 
        hasToken: !!token, 
        items: orderData.items?.length 
      });

      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user's orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }
};

// Wishlist API calls
export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: async () => {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },

  // Add product to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await api.post('/wishlist/add', { productId });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(`/wishlist/remove/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // Check if product is in wishlist
  checkInWishlist: async (productId) => {
    try {
      const response = await api.get(`/wishlist/check/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      throw error;
    }
  },

  // Clear wishlist
  clearWishlist: async () => {
    try {
      const response = await api.delete('/wishlist/clear');
      return response.data;
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  }
};

export default api; 