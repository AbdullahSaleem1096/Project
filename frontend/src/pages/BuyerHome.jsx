import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHome, FaThLarge, FaHeart, FaUser, FaStar } from 'react-icons/fa';
import { MdLaptop, MdPhoneIphone, MdSportsSoccer, MdMoreHoriz, MdLocalShipping, MdSecurity } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';
import { Container, Row, Col, Card, Button, InputGroup, Form, Spinner, Alert } from 'react-bootstrap';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import WishlistButton from '../components/WishlistButton';
import './BuyerHome.css';

const categories = [
  { icon: <FaThLarge />, label: 'All', color: '#6B46C1' },
  { icon: <MdLaptop />, label: 'Electronics', color: '#805AD5' },
  { icon: <MdPhoneIphone />, label: 'Mobiles', color: '#9F7AEA' },
  { icon: <MdSportsSoccer />, label: 'Sports', color: '#B794F4' },
  { icon: <MdMoreHoriz />, label: 'More', color: '#E9D8FD' },
];

const features = [
  { icon: <MdLocalShipping />, title: 'Free Shipping', description: 'On orders over Rs. 1000' },
  { icon: <MdSecurity />, title: 'Secure Payment', description: '100% secure payment' },
  { icon: <FaStar />, title: 'Quality Products', description: 'Best quality products' },
];

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : null,
      quantity: 1
    }).then(() => {
      setTimeout(() => setIsAdding(false), 500);
    });
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    navigate(`/product/${product._id}`);
  };

  // Calculate discount (for demonstration - in real app, this would come from the database)
  const discount = product.discount || 0;
  const originalPrice = discount > 0 ? (product.price * (1 + discount / 100)).toFixed(0) : null;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card className="h-100 product-card" onClick={handleCardClick}>
        <div className="product-image-container position-relative">
          {product.images && product.images.length > 0 ? (
            <Card.Img variant="top" src={product.images[0]} className="product-image" alt={product.name} />
          ) : (
            <div className="no-image-placeholder">No Image</div>
          )}
          {discount > 0 && (
            <div className="discount-badge">-{discount}%</div>
          )}
          
          {/* Wishlist button */}
          <div 
            className="position-absolute top-0 end-0 m-2 wishlist-button-container"
            onClick={(e) => e.stopPropagation()}
          >
            <WishlistButton 
              productId={product._id} 
              variant="light" 
              className="shadow-sm"
              size="sm"
            />
          </div>
        </div>
        <Card.Body>
          <Card.Title className="product-name">{product.name}</Card.Title>
          <div className="d-flex align-items-center mb-2">
            <span className="product-price">Rs. {product.price}</span>
            {discount > 0 && (
              <span className="original-price ms-2">
                Rs. {originalPrice}
              </span>
            )}
          </div>
          <div className="d-flex align-items-center mt-auto">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < (product.rating || 4) ? 'star-filled' : 'star-empty'} 
                />
              ))}
            </div>
            <span className="reviews ms-2">({product.views || 0})</span>
          </div>
          <div className="product-actions mt-2">
            <Button 
              variant="primary" 
              size="sm" 
              className="w-100" 
              onClick={handleAddToCart}
              disabled={isAdding || !product.isAvailable || product.quantity <= 0}
            >
              {isAdding ? (
                <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Adding...</span>
                </Spinner>
              ) : (
                <>
                  <FaShoppingCart className="me-2" /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const BuyerHome = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [bestSellers, setBestSellers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch all products
        const response = await productAPI.getAllProducts();
        const products = response.products || [];
        
        setAllProducts(products);
        
        // Set best sellers (products with most views)
        const sorted = [...products].sort((a, b) => (b.views || 0) - (a.views || 0));
        setBestSellers(sorted.slice(0, 3)); // Top 3 products by views
        
        // Set initial filtered products to all products
        setFilteredProducts(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter products when category or search term changes
  useEffect(() => {
    if (allProducts.length === 0) return;
    
    let filtered = [...allProducts];
    
    // Apply category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, allProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to store page with search term as query parameter
    navigate(`/online-store?search=${searchTerm}`);
  };

  return (
    <div className="buyer-home">
      {/* Hero Section */}
      <div className="hero-section py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">Discover Amazing Products</h1>
              <p className="lead mb-4">Shop the latest trends with unbeatable prices</p>
              <Form onSubmit={handleSearch}>
                <InputGroup className="search-bar mx-auto">
                  <InputGroup.Text className="bg-white border-0">
                    <FaSearch className="text-primary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    className="border-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="primary" className="search-btn" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="features-section py-5">
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 feature-card text-center">
                <Card.Body>
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Category Bar */}
      <Container fluid className="category-section py-4">
        <Container>
          <div className="category-bar d-flex justify-content-center flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <Button
                key={idx}
                variant={activeCategory === cat.label ? 'primary' : 'light'}
                className={`category-item ${activeCategory === cat.label ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.label)}
                style={{ '--category-color': cat.color }}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-label">{cat.label}</span>
              </Button>
            ))}
          </div>
        </Container>
      </Container>

      {isLoading ? (
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : error ? (
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
        </Container>
      ) : (
        <>
          {/* Best Sellers */}
          {bestSellers.length > 0 && (
            <Container className="py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">Best Sellers</h2>
                <Link to="/online-store" className="view-all">
                  View All <BsArrowRight />
                </Link>
              </div>
              <Row>
                {bestSellers.map(product => <ProductCard key={product._id} product={product} />)}
              </Row>
            </Container>
          )}

          {/* All Products */}
          {filteredProducts.length > 0 ? (
            <Container className="py-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">
                  {activeCategory === 'All' ? 'All Products' : activeCategory}
                </h2>
                <Link to="/online-store" className="view-all">
                  View All <BsArrowRight />
                </Link>
              </div>
              <Row>
                {filteredProducts.slice(0, 8).map(product => 
                  <ProductCard key={product._id} product={product} />
                )}
              </Row>
              {filteredProducts.length > 8 && (
                <div className="text-center mt-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="load-more-btn"
                    onClick={() => navigate('/online-store')}
                  >
                    View More Products
                  </Button>
                </div>
              )}
            </Container>
          ) : (
            <Container className="py-5 text-center">
              <h3>No products found</h3>
              <p>Try a different category or search term</p>
            </Container>
          )}
        </>
      )}

      {/* Bottom Nav (mobile only) */}
      <nav className="bottom-nav d-md-none">
        <Link to="/home" className="nav-btn active">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/online-store" className="nav-btn">
          <FaThLarge />
          <span>Store</span>
        </Link>
        <Link to="/cart" className="nav-btn">
          <FaShoppingCart />
          <span>Cart</span>
        </Link>
        <Link to="/wishlist" className="nav-btn">
          <FaHeart />
          <span>Wishlist</span>
        </Link>
        <Link to="/buyer/profile" className="nav-btn">
          <FaUser />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default BuyerHome; 