import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Verify product availability when adding to cart
  const verifyProductAvailability = async (productId, requestedQuantity) => {
    try {
      setLoading(true);
      const { product } = await productAPI.getProductById(productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      if (!product.isAvailable) {
        throw new Error('Product is not available');
      }
      
      if (product.quantity < requestedQuantity) {
        throw new Error(`Only ${product.quantity} items available`);
      }
      
      return product;
    } catch (error) {
      console.error('Error verifying product availability:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    try {
      setCartItems(prevItems => {
        // Check if item already exists in cart
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Item exists, increase quantity
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          // Item doesn't exist, add new item with specified quantity
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to add item to cart' 
      };
    }
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Update item quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return { success: false, message: 'Quantity must be at least 1' };
    
    try {
      // Verify product is available in requested quantity
      await verifyProductAvailability(productId, newQuantity);
      
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error updating quantity:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to update quantity' 
      };
    }
  };
  
  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Navigate to cart page
  const navigateToCart = () => {
    window.location.href = '/cart';
  };
  
  // Get total items count (including quantities)
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Calculate cart subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Context value to be provided
  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    navigateToCart,
    getTotalItems,
    getSubtotal
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 