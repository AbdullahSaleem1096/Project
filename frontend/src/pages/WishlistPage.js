import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { wishlistAPI, productAPI } from '../services/api';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { WISHLIST_UPDATED_EVENT } from '../components/WishlistButton';
import './WishlistPage.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch wishlist on component mount and listen for wishlist update events
  useEffect(() => {
    fetchWishlist();
    
    // Add event listener for wishlist updates
    window.addEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
    
    // Clean up event listener
    return () => {
      window.removeEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
    };
  }, []);
  
  // Handle wishlist update events
  const handleWishlistUpdate = () => {
    console.log('Wishlist update detected, refreshing wishlist...');
    fetchWishlist();
  };
  
  // Function to fetch user's wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();
      
      if (response.success) {
        // Fetch detailed product information for each wishlist item
        const productDetails = await Promise.all(
          response.wishlist.map(async (productId) => {
            try {
              const productData = await productAPI.getProductById(productId);
              return productData.product;
            } catch (error) {
              console.error(`Error fetching product ${productId}:`, error);
              return null;
            }
          })
        );
        
        // Filter out null values (products that couldn't be fetched)
        const validProducts = productDetails.filter(product => product !== null);
        setWishlistItems(validProducts);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Failed to load your wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Remove product from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await wishlistAPI.removeFromWishlist(productId);
      
      if (response.success) {
        // Update local state to reflect removal
        setWishlistItems(prevItems => prevItems.filter(item => item._id !== productId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setError('Failed to remove item from wishlist. Please try again.');
    }
  };
  
  // Clear entire wishlist
  const handleClearWishlist = async () => {
    try {
      if (window.confirm('Are you sure you want to clear your wishlist?')) {
        const response = await wishlistAPI.clearWishlist();
        
        if (response.success) {
          setWishlistItems([]);
        }
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      setError('Failed to clear wishlist. Please try again.');
    }
  };
  
  return (
    <Container className="py-5">
      <div className="wishlist-header">
        <h1 className="mb-0">
          <FaHeart className="me-2 text-danger" />
          My Wishlist
        </h1>
        
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={handleClearWishlist}
          >
            <FaTrash className="me-1" /> Clear Wishlist
          </Button>
        )}
      </div>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-icon">
            <FaHeart />
          </div>
          <h3>Your wishlist is empty</h3>
          <p className="text-muted">Start adding products to your wishlist</p>
          <Button as={Link} to="/online-store" variant="primary" className="mt-3">
            Browse Products
          </Button>
        </div>
      ) : (
        <Row>
          {wishlistItems.map((product) => (
            <Col key={product._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 product-card shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300x200'} 
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {product.description?.substring(0, 100)}...
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-primary mb-0">₨ {product.price}</h5>
                      <Button 
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                      >
                        <FaShoppingCart className="me-1" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage; 