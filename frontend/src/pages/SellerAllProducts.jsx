import React, { useState, useEffect } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row, Form, InputGroup, Badge, Dropdown, Alert, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaEllipsisV, FaPen, FaStar, FaPlus, FaSearch, FaFilter, FaTrashAlt } from 'react-icons/fa';
//import './Pages/customscrollbar.css';
import './SellerAllProducts.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';

const SellerAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Filter and sort products when search term or products change
  useEffect(() => {
    if (products.length > 0) {
      let filtered = products;
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply sorting
      const sorted = sortProducts(filtered, sortOption);
      
      setFilteredProducts(sorted);
    }
  }, [searchTerm, products, sortOption]);
  
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get store ID from localStorage or context
      const storeId = localStorage.getItem('storeId');
      
      let response;
      if (storeId) {
        response = await productAPI.getProductsByStore(storeId);
      } else {
        // Fallback to getting all products if storeId not available
        response = await productAPI.getAllProducts();
      }
      
      setProducts(response.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    setDeleteLoading(true);
    try {
      await productAPI.deleteProduct(productToDelete._id);
      setProducts(products.filter(p => p._id !== productToDelete._id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };
  
  const sortProducts = (productsList, option) => {
    const sorted = [...productsList];
    
    switch (option) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priceAsc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'mostViewed':
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      case 'bestRated':
        // This would need actual rating data from your API
        return sorted;
      default:
        return sorted;
    }
  };
  
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="seller-products-page">
      <Container fluid="lg">
        <Row className="mb-4">
          <Col>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="d-sm-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center mb-3 mb-sm-0">
                  <Link to="/seller/dashboard" className="back-link me-3">
                    <FaArrowLeft />
                  </Link>
                  <h2 className="page-title mb-0">My Products</h2>
                </div>
                
                <div className="d-flex align-items-center gap-2">
                  <Button variant="primary" as={Link} to="/seller/add-product" className="add-product-btn">
                    <FaPlus className="me-2" /> Add New Product
                  </Button>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Row className="mb-4">
          <Col md={6} lg={8} className="mb-3 mb-md-0">
            <InputGroup>
              <InputGroup.Text className="search-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </InputGroup>
          </Col>
          <Col md={6} lg={4} className="d-flex justify-content-md-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" className="filter-btn">
                <FaFilter className="me-2" /> Sort By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('newest')}>Newest First</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('priceAsc')}>Price: Low to High</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('priceDesc')}>Price: High to Low</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('mostViewed')}>Most Viewed</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('bestRated')}>Best Rated</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <Row>
            {filteredProducts.map((product, index) => (
              <Col lg={6} className="mb-4" key={product._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="product-card">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={4} md={3} className="mb-3 mb-md-0">
                          <div className="product-image-container">
                            {product.images && product.images.length > 0 ? (
                              <img src={product.images[0]} alt={product.name} className="product-image" />
                            ) : (
                              <div className="no-image">No Image</div>
                            )}
                            <Badge bg={product.quantity > 10 ? 'success' : product.quantity > 0 ? 'warning' : 'danger'} className="stock-badge">
                              {product.quantity} in stock
                            </Badge>
                          </div>
                        </Col>
                        <Col xs={8} md={6}>
                          <Card.Title className="product-title">{product.name}</Card.Title>
                          <div className="product-price">Rs. {product.price}</div>
                          <div className="product-stats">
                            <span className="product-views">{product.views || 0} views</span>
                            <div className="product-category">{product.category}</div>
                          </div>
                        </Col>
                        <Col xs={12} md={3} className="mt-3 mt-md-0">
                          <div className="product-actions">
                            <Button variant="outline-primary" as={Link} to={`/seller/edit-product/${product._id}`} className="action-btn">
                              <FaPen /> Edit
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              className="action-btn"
                              onClick={() => handleDeleteClick(product)}
                            >
                              <FaTrashAlt /> Remove
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-products">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-5"
            >
              <div className="no-products-icon">
                <FaFilter />
              </div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter to find what you're looking for.</p>
              <Button variant="primary" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </motion.div>
          </div>
        )}
      </Container>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{productToDelete?.name}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Product'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SellerAllProducts;
