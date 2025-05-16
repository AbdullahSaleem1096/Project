import React, { useState, useEffect } from 'react';
import { Button, Spinner, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import { FaHeart, FaCheck } from 'react-icons/fa';
import { wishlistAPI } from '../services/api';
import './WishlistButton.css';

// Custom event for wishlist updates
export const WISHLIST_UPDATED_EVENT = 'wishlist-updated';

const WishlistButton = ({ productId, size = 'sm', variant = 'outline-danger', className = '' }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Check if product is in wishlist on component mount
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        if (!productId) return;
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return; // Only check if user is logged in
        
        const response = await wishlistAPI.checkInWishlist(productId);
        setInWishlist(response.inWishlist);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
        setError('Failed to check wishlist status');
      }
    };
    
    checkWishlistStatus();
  }, [productId]);
  
  // Toggle wishlist status
  const toggleWishlist = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        // If not logged in, redirect to login
        window.location.href = '/login?redirect=wishlist';
        return;
      }
      
      if (inWishlist) {
        // Remove from wishlist
        const response = await wishlistAPI.removeFromWishlist(productId);
        if (response.success) {
          setInWishlist(false);
          setToastMessage('Removed from wishlist');
          setShowToast(true);
          
          // Dispatch custom event for wishlist update
          window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, {
            detail: { action: 'remove', productId }
          }));
        }
      } else {
        // Add to wishlist
        const response = await wishlistAPI.addToWishlist(productId);
        if (response.success) {
          setInWishlist(true);
          setToastMessage('Added to wishlist');
          setShowToast(true);
          
          // Dispatch custom event for wishlist update
          window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, {
            detail: { action: 'add', productId }
          }));
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      setError('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };
  
  // Button style based on wishlist status
  const buttonVariant = inWishlist ? 'danger' : variant;
  
  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}</Tooltip>}
      >
        <Button
          variant={buttonVariant}
          size={size}
          className={`wishlist-button ${className} ${inWishlist ? 'in-wishlist' : ''}`}
          onClick={toggleWishlist}
          disabled={loading}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <FaHeart className={inWishlist ? 'filled' : ''} />
          )}
        </Button>
      </OverlayTrigger>
      
      <Toast 
        className="position-fixed bottom-0 end-0 m-3 wishlist-toast"
        onClose={() => setShowToast(false)} 
        show={showToast} 
        delay={3000} 
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {inWishlist ? (
              <><FaHeart className="text-danger me-2" /> Added to Wishlist</>
            ) : (
              <><FaCheck className="text-success me-2" /> Removed from Wishlist</>
            )}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default WishlistButton; 