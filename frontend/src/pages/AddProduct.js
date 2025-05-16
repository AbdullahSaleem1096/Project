import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaBox, FaDollarSign, FaTag, FaListUl, FaFileUpload, FaAlignLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: '',
    images: []
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Preview the first image
      setPreviewImage(URL.createObjectURL(files[0]));
      
      // Process image files for upload
      const imagesPromises = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(imagesPromises).then(images => {
        setFormData(prevState => ({
          ...prevState,
          images: images
        }));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Get store ID from localStorage or context
      const storeId = localStorage.getItem('storeId');
      
      // Prepare data for API
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        storeId: storeId || '000000000000000000000000', // Default ID if none is set
        isAvailable: parseInt(formData.quantity) > 0
      };
      
      // Call API to create product
      const response = await productAPI.createProduct(productData);
      
      // Handle success - redirect to products list
      navigate('/seller/all-products');
      
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <Container fluid>
        <Row className="min-vh-100">
          {/* Left Column - Preview (visible only on desktop) */}
          <Col lg={6} className="d-none d-lg-flex product-preview">
            <div className="preview-content">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="preview-card"
              >
                <div className="preview-header">
                  <h3>Product Preview</h3>
                </div>
                <div className="preview-body">
                  {previewImage ? (
                    <img src={previewImage} alt="Product Preview" className="preview-image"/>
                  ) : (
                    <div className="placeholder-image">
                      <FaBox size={60} />
                      <p>Upload an image to see preview</p>
                    </div>
                  )}
                  
                  <div className="preview-details">
                    <h4>{formData.name || 'Product Name'}</h4>
                    <h5 className="preview-price">{formData.price ? `Rs. ${formData.price}` : 'Rs. 0'}</h5>
                    {formData.category && <div className="preview-category">{formData.category}</div>}
                    <p className="preview-description">{formData.description || 'Product description will appear here...'}</p>
                    <div className="preview-stock">
                      {formData.quantity ? `${formData.quantity} in stock` : 'Stock: 0'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Col>

          {/* Right Column - Form */}
          <Col lg={6} className="product-form-container d-flex align-items-center justify-content-center">
            <motion.div 
              className="product-form-wrapper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="product-form-card">
                <Card.Header className="d-flex align-items-center">
                  <Link to="/seller/all-products" className="back-link">
                    <FaArrowLeft size={18} className="me-2" />
                  </Link>
                  <h3 className="mb-0">Add Product</h3>
                </Card.Header>
                
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaBox />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Enter product name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Price (Rs.)</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaDollarSign />
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Enter price"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              required
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaTag />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              placeholder="Enter category"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              required
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Stock Availability</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaListUl />
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          placeholder="Number of items in stock"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Product Description</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaAlignLeft />
                        </InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Enter product description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Upload Product Image</Form.Label>
                      <div className="upload-container">
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <FaFileUpload />
                          </InputGroup.Text>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            required
                          />
                        </InputGroup>
                        
                        {/* Mobile preview (shown only on mobile) */}
                        {previewImage && (
                          <div className="mobile-preview d-lg-none mt-3">
                            <img src={previewImage} alt="Product Preview" className="img-fluid rounded" />
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    <div className="d-grid">
                      <Button 
                        type="submit" 
                        className="btn-gradient" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Adding Product...' : 'Add Product'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProduct;
