import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaArrowLeft, FaStar, FaShoppingCart, FaHeart, FaShare, FaCheck } from 'react-icons/fa';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import WishlistButton from '../components/WishlistButton';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product and related products
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch product details
        const productResponse = await productAPI.getProductById(id);
        setProduct(productResponse.product);
        
        // Fetch related products
        const relatedResponse = await productAPI.getRelatedProducts(id);
        setRelatedProducts(relatedResponse.relatedProducts || []);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      console.log('Adding product to cart with ID:', product._id);
      const cartItem = {
        id: product._id,  // This should be the MongoDB _id
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : null
      };
      
      addToCart(cartItem, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || "Product not found"}
        </Alert>
        <Button as={Link} to="/home" variant="primary">
          <FaArrowLeft className="me-2" /> Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="product-detail-container py-5">
      <Button 
        as={Link} 
        to="/home" 
        variant="outline-secondary" 
        className="mb-4"
      >
        <FaArrowLeft className="me-2" /> Back
      </Button>
      
      <Row>
        {/* Product Images Column */}
        <Col lg={6} className="mb-4">
          <div className="product-images">
            <div className="main-image-container">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="main-product-image img-fluid rounded shadow"
                />
              ) : (
                <div className="no-image-placeholder rounded">
                  No Image Available
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="image-thumbnails d-flex mt-3">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail-container ${index === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="img-thumbnail"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
        
        {/* Product Details Column */}
        <Col lg={6}>
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="d-flex align-items-center mb-3">
              <Badge 
                bg={product.quantity > 0 ? "success" : "danger"}
                className="me-2"
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
              <span className="views-count text-muted">
                {product.views || 0} views
              </span>
            </div>
            
            <h2 className="product-price mb-4">Rs. {product.price}</h2>
            
            <div className="product-description mb-4">
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
            
            {product.quantity > 0 && (
              <div className="quantity-selector d-flex align-items-center mb-4">
                <h5 className="me-3 mb-0">Quantity:</h5>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-3">{quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantity}
                  >
                    +
                  </Button>
                </div>
                <span className="ms-3 text-muted">
                  {product.quantity} available
                </span>
              </div>
            )}
            
            <div className="action-buttons d-flex flex-wrap gap-2 mb-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="d-flex align-items-center justify-content-center"
                onClick={handleAddToCart}
                disabled={product.quantity <= 0}
              >
                {addedToCart ? (
                  <>
                    <FaCheck className="me-2" /> Added to Cart
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </>
                )}
              </Button>
              
              <WishlistButton 
                productId={product._id} 
                size="lg" 
                variant="outline-danger"
                className="d-flex align-items-center justify-content-center"
              />
              
              <Button 
                variant="outline-primary" 
                size="lg"
              >
                <FaShare className="me-2" /> Share
              </Button>
            </div>
            
            <div className="product-meta">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>ID:</strong> {product._id}</p>
            </div>
          </div>
        </Col>
      </Row>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="related-products mt-5">
          <h3 className="section-title mb-4">Related Products</h3>
          <Row>
            {relatedProducts.map(item => (
              <Col key={item._id} sm={6} md={4} lg={3} className="mb-4">
                <div 
                  className="related-product-card" 
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <div className="related-product-image">
                    {item.images && item.images.length > 0 ? (
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="img-fluid rounded"
                      />
                    ) : (
                      <div className="no-image-small rounded">No Image</div>
                    )}
                  </div>
                  <h5 className="mt-2">{item.name}</h5>
                  <p className="price">Rs. {item.price}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductDetail; 