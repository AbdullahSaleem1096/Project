import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import api, { orderAPI } from '../services/api';

// Create the order context
const OrderContext = createContext();

// Custom hook to use the order context
export const useOrder = () => {
  return useContext(OrderContext);
};

// Order provider component
export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cartItems, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate order totals
  const calculateOrderTotals = () => {
    const subtotal = getSubtotal();
    const shippingCost = subtotal > 1000 ? 0 : 100;
    const total = subtotal + shippingCost;

    return {
      subtotal,
      shippingCost,
      total
    };
  };

  // Prepare order for checkout
  const prepareCheckout = () => {
    const { subtotal, shippingCost, total } = calculateOrderTotals();
    
    // Create order details object
    const order = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || null
      })),
      totals: {
        subtotal,
        shippingCost,
        total
      }
    };

    setOrderDetails(order);
    return order;
  };

  // Process checkout and create order
  const createOrder = async (paymentMethod) => {
    try {
      setLoading(true);
      setError(null);

      if (!orderDetails || orderDetails.items.length === 0) {
        throw new Error('No items in order');
      }

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login?redirect=payment');
        throw new Error('Please log in to continue');
      }

      // Format the order data for the API with proper item structure
      const orderData = {
        items: orderDetails.items.map(item => ({
          productId: item.id, // Make sure this ID is in the correct format
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: orderDetails.totals.total,
        paymentMethod: paymentMethod // Use the exact value ('wallet' or 'cod')
      };

      console.log('Sending order data to backend:', JSON.stringify(orderData, null, 2));

      // Make API call to create order
      const response = await api.post('/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Order API response:', response.data);

      if (response.data && response.data.success) {
        // Clear the cart after successful order
        clearCart();

        // Navigate to order confirmation
        navigate('/payment-confirmation', { 
          state: { 
            orderDetails: orderDetails,
            orderResponse: {
              orderId: response.data.order._id,
              orderDate: response.data.order.createdAt
            }
          } 
        });

        return { success: true, orderId: response.data.order._id };
      } else {
        throw new Error(response.data?.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message || 'Failed to create order');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Get the user's address from localStorage or API
  const getUserAddress = async () => {
    try {
      // First try to get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return null;

      // Create a basic address structure with default values
      let addressInfo = {
        name: user.username || 'User',
        department: 'N/A',
        hostel: 'N/A',
        roomNumber: 'N/A'
      };

      // Try to get complete user info from API
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Get user profile data from the API
          const response = await api.get(`/user/profile/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data && response.data.success && response.data.user && response.data.user.address) {
            // Update address with data from API
            addressInfo = {
              name: response.data.user.username || addressInfo.name,
              department: response.data.user.address.department || addressInfo.department,
              hostel: response.data.user.address.hostel || addressInfo.hostel,
              roomNumber: response.data.user.address.roomNumber || addressInfo.roomNumber
            };
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Continue with default address if API call fails
        }
      }

      return addressInfo;
    } catch (error) {
      console.error('Error getting user address:', error);
      return null;
    }
  };

  // Context value to be provided
  const value = {
    orderDetails,
    loading,
    error,
    prepareCheckout,
    createOrder,
    getUserAddress
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext; 