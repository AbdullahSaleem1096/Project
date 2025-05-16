import React from 'react';
import { Container, Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap';
import { FaHeart, FaTrashAlt, FaShoppingCart, FaStar, FaStarHalfAlt, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Wishlist.css';

const wishlistItems = [
  {
    id: 1,
    name: 'Gucci duffle bag',
    price: 960,
    rating: 4.5,
    reviews: 65,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Premium leather duffle bag, perfect for weekend getaways and travel.'
  },
  {
    id: 2,
    name: 'Gaming Controller',
    price: 1200,
    rating: 5.0,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'High-performance gaming controller with customizable buttons and extended battery life.'
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: 2450,
    rating: 4.0,
    reviews: 39,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Classic leather jacket with modern styling, suitable for all seasons.'
  }
];

const Wishlist = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="star-icon" />
        ))}
        {halfStar && <FaStarHalfAlt className="star-icon" />}
      </>
    );
  };

  return (
    <div className="wishlist-page">
      <Container>
        <div className="page-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
            </Breadcrumb>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="page-title">
                <FaHeart className="page-icon" /> My Wishlist
              </h2>
              <Link to="/shop" className="back-to-shop">
                <FaChevronLeft /> Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>

        {wishlistItems.length > 0 ? (
          <Row>
            {wishlistItems.map((item, index) => (
              <Col lg={4} md={6} className="mb-4" key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="wishlist-card h-100">
                    <div className="wishlist-card-image">
                      <Card.Img variant="top" src={item.image} />
                      <Button 
                        variant="danger" 
                        size="sm" 
                        className="remove-btn"
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <div className="product-rating">
                        {renderStars(item.rating)}
                        <span className="review-count">({item.reviews})</span>
                      </div>
                      <Card.Text className="product-description">
                        {item.description}
                      </Card.Text>
                      <div className="product-price">Rs. {item.price}</div>
                      <Button variant="primary" className="cart-btn w-100">
                        <FaShoppingCart className="me-2" /> Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="empty-wishlist">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <FaHeart className="empty-icon" />
              <h3>Your wishlist is empty</h3>
              <p>Save items you like to your wishlist and they'll appear here.</p>
              <Button variant="primary" as={Link} to="/shop">
                Start Shopping
              </Button>
            </motion.div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
