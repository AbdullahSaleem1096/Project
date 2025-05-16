import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { storeAPI } from '../services/api';

// Higher-order component to protect seller routes
const SellerRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasSetupStore, setHasSetupStore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        
        // If no user or not a seller, redirect to login
        if (!user || user.role !== 'seller') {
          setLoading(false);
          return;
        }
        
        // Check if seller has completed store setup
        const response = await storeAPI.checkStoreSetup(user._id);
        
        if (response.hasStore && response.isSetupComplete) {
          setHasSetupStore(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking seller store setup:', error);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is a seller
  if (user.role !== 'seller') {
    // Redirect to home page if not a seller
    return <Navigate to="/home" replace />;
  }

  // If seller has not set up a store, redirect to store setup page
  if (!hasSetupStore) {
    // Skip redirection if already on the setup page
    if (location.pathname !== '/seller/setup-store') {
      return <Navigate to="/seller/setup-store" replace />;
    }
  }

  return children;
};

export default SellerRoute; 