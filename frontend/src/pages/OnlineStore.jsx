import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form, Badge, Nav, Tab } from 'react-bootstrap';
import { FaSearch, FaHeart, FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaShare, FaChevronRight } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './OnlineStore.css';

function OnlineStore() {
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();
  const { openCart, getTotalItems } = useCart();

  const openChat = () => {
    navigate("/messaging");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      if (starValue <= rating) {
        return <FaStar key={index} className="text-warning" />;
      } else if (starValue - 0.5 <= rating) {
        return <FaStarHalfAlt key={index} className="text-warning" />;
      }
      return <FaRegStar key={index} className="text-warning" />;
    });
  };

  const relatedProducts = [
    {
      id: 1,
      name: 'Gucci Duffle Bag',
      price: 960,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.5,
      reviews: 65
    },
    {
      id: 2,
      name: 'Premium Laptop',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      reviews: 128
    },
    {
      id: 3,
      name: 'Designer Jacket',
      price: 799,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.2,
      reviews: 89
    },
    {
      id: 4,
      name: 'Leather Bag',
      price: 599,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6,
      reviews: 42
    }
  ];

  return (
    <div className="online-store">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <Container>
          <span className="navbar-brand fw-bold">NUSTIFY</span>
          <div className="d-flex align-items-center flex-grow-1 mx-4">
            <InputGroup className="search-bar">
              <InputGroup.Text className="bg-white border-end-0">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search products..."
                className="border-start-0"
              />
            </InputGroup>
          </div>
          <div className="d-flex align-items-center">
            <Button variant="link" className="text-dark position-relative me-3" onClick={openCart}>
              <FaShoppingCart size={20} />
              <Badge bg="primary" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                {getTotalItems()}
              </Badge>
            </Button>
            <Button variant="link" className="text-dark">
              <FaHeart size={20} />
            </Button>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <Container className="py-4">
        <Row>
          {/* Product Images */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src="https://i.imgur.com/5R0uJqb.png" 
                  alt="Gamepad"
                  className="product-main-image"
                />
                <Button 
                  variant="light" 
                  className="position-absolute top-0 end-0 m-3 rounded-circle shadow-sm"
                >
                  <FaHeart className="text-danger" />
                </Button>
              </div>
              <Card.Body className="p-0">
                <Row className="g-2 p-3">
                  {[1, 2, 3, 4].map((num) => (
                    <Col key={num} xs={3}>
                      <Card.Img 
                        src={`https://i.imgur.com/5R0uJqb.png`} 
                        alt={`Product ${num}`}
                        className="product-thumbnail"
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Product Details */}
          <Col lg={6}>
            <div className="product-details">
              <h1 className="product-title mb-3">Havic HV G-92 Gamepad</h1>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  {renderStars(4.5)}
                </div>
                <span className="text-muted">(150 Reviews)</span>
                <Badge bg="success" className="ms-3">In Stock</Badge>
              </div>
              <p className="text-muted mb-3">
                <i className="bi bi-geo-alt me-2"></i>
                Razi hostel, 318
              </p>
              <h2 className="product-price mb-4">Rs. 1,920</h2>

              <div className="d-flex gap-3 mb-4">
                <Button variant="primary" size="lg" className="flex-grow-1">
                  Buy Now
                </Button>
                <Button variant="outline-primary" size="lg">
                  <FaShare />
                </Button>
              </div>

              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'description'} 
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'reviews'} 
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane active={activeTab === 'description'}>
                  <p className="text-muted">
                    PlayStation 5 Controller Skin: high-quality vinyl with adhesive
                    for easy bubble-free install & mess-free application. Perfect fit
                    for your PS5 controller with precise cutouts for all buttons and
                    ports.
                  </p>
                </Tab.Pane>
                <Tab.Pane active={activeTab === 'reviews'}>
                  <div className="review-item mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">2 days ago</small>
                    </div>
                    <div className="mb-2">{renderStars(5)}</div>
                    <p className="text-muted mb-0">
                      PlayStation 5 Controller Skin – high-quality vinyl with easy
                      bubble-free install & mess-free application.
                    </p>
                  </div>
                  <Button variant="outline-primary">Write a Review</Button>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Col>
        </Row>

        {/* Related Products */}
        <div className="related-products mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">More from this store</h3>
            <Button variant="link" className="text-primary p-0">
              View All <FaChevronRight />
            </Button>
          </div>
          <Row>
            {relatedProducts.map((product) => (
              <Col key={product.id} xs={6} md={3} className="mb-4">
                <Card className="h-100 product-card">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <Card.Body>
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">{renderStars(product.rating)}</div>
                      <small className="text-muted">({product.reviews})</small>
                    </div>
                    <Card.Text className="product-price mb-0">
                      Rs. {product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Chat Button */}
      <Button
        variant="primary"
        className="chat-button rounded-circle"
        onClick={openChat}
      >
        <i className="bi bi-chat-dots-fill"></i>
      </Button>
    </div>
  );
}

export default OnlineStore;
