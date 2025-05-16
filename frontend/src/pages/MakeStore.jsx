import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { storeAPI } from '../services/api';
import { FaStore, FaUpload } from 'react-icons/fa';
import './MakeStore.css';

const MakeStore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Store form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/1200x300',
    contactEmail: '',
    contactPhone: '',
    category: ['General'],
    isDeliveryEnabled: true,
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    address: {
      hostel: '',
      roomNumber: ''
    },
    businessHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '09:00', close: '17:00' },
      sunday: { open: '09:00', close: '17:00' }
    }
  });

  // Get user data from local storage on component mount
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    console.log('User data from localStorage:', userStr ? 'Found' : 'Not found');
    
    if (!userStr) {
      console.error('No user data found in localStorage');
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      console.log('Parsed user data:', { 
        id: user._id, 
        role: user.role, 
        hasValidId: !!user._id 
      });
      
      // If user is not a seller, redirect to home
      if (user.role !== 'seller') {
        console.log('User is not a seller, redirecting to home');
        navigate('/home');
        return;
      }

      // Check if user ID exists
      if (!user._id) {
        console.error('User ID is missing in the user data');
        navigate('/login');
        return;
      }

      setUserData(user);

      // Check if seller already has a store
      const checkStoreSetup = async () => {
        try {
          console.log('Checking store setup for user ID:', user._id);
          const response = await storeAPI.checkStoreSetup(user._id);
          console.log('Store setup response:', response);
          
          if (response.hasStore && response.isSetupComplete) {
            // If store already exists and setup is complete, redirect to seller dashboard
            navigate('/seller/dashboard');
          }
        } catch (error) {
          console.error('Error checking store setup:', error);
        }
      };

      checkStoreSetup();
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields (address, social media)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        category: [...formData.category, value]
      });
    } else {
      setFormData({
        ...formData,
        category: formData.category.filter(cat => cat !== value)
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Add seller ID to form data
      const storeData = {
        ...formData,
        sellerId: userData._id
      };
      
      // Call API to set up store
      const response = await storeAPI.setupStore(userData._id, storeData);
      
      if (response.success) {
        setSuccess(true);
        // Redirect to seller dashboard after 2 seconds
        setTimeout(() => {
          navigate('/seller/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Error setting up store:', error);
      setError(error.response?.data?.message || 'Failed to set up store. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5 make-store-container">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex align-items-center">
                <FaStore size={24} className="me-2" />
                <h3 className="mb-0">Set Up Your Store</h3>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert variant="success">
                  Store created successfully! Redirecting to your dashboard...
                </Alert>
              )}

              <div className="text-center mb-4">
                <p className="lead">
                  Before you can start selling on our platform, you need to set up your store.
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Store Basic Information */}
                <h5 className="border-bottom pb-2 mb-4">Basic Information</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Store Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your store name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Store Categories</Form.Label>
                      <div className="d-flex flex-wrap gap-3">
                        {['Electronics', 'Clothing', 'Books', 'Sports', 'Food', 'General'].map(category => (
                          <Form.Check
                            key={category}
                            type="checkbox"
                            id={`category-${category}`}
                            label={category}
                            value={category}
                            checked={formData.category.includes(category)}
                            onChange={handleCategoryChange}
                            className="me-3"
                          />
                        ))}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>Description*</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell customers about your store and what you sell"
                    required
                  />
                </Form.Group>

                {/* Store Contact Information */}
                <h5 className="border-bottom pb-2 mb-4">Contact Information</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Email*</Form.Label>
                      <Form.Control
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="Enter contact email"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Phone*</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="Format: +923123456789"
                        required
                      />
                      <Form.Text className="text-muted">
                        Enter a Pakistani phone number (+92xxxxxxxxxx)
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Store Address */}
                <h5 className="border-bottom pb-2 mb-4">Store Location</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hostel*</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.hostel"
                        value={formData.address.hostel}
                        onChange={handleInputChange}
                        placeholder="Enter hostel name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Room Number*</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.roomNumber"
                        value={formData.address.roomNumber}
                        onChange={handleInputChange}
                        placeholder="Enter room number"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Store Images */}
                <h5 className="border-bottom pb-2 mb-4">Store Images</h5>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Store Logo*</Form.Label>
                      <div className="image-upload-container">
                        <div className="preview-container">
                          <img 
                            src={formData.logo} 
                            alt="Logo Preview" 
                            className="img-thumbnail" 
                          />
                        </div>
                        <Button variant="outline-primary" className="upload-btn">
                          <FaUpload className="me-2" /> Upload Logo
                        </Button>
                        <Form.Control
                          type="text"
                          name="logo"
                          value={formData.logo}
                          onChange={handleInputChange}
                          placeholder="Enter logo URL or upload"
                          className="mt-2"
                          required
                        />
                      </div>
                      <Form.Text className="text-muted">
                        For demo, you can use the URL or change it to another image URL
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Banner Image</Form.Label>
                      <div className="image-upload-container">
                        <div className="preview-container banner-preview">
                          <img 
                            src={formData.banner} 
                            alt="Banner Preview" 
                            className="img-thumbnail" 
                          />
                        </div>
                        <Button variant="outline-primary" className="upload-btn">
                          <FaUpload className="me-2" /> Upload Banner
                        </Button>
                        <Form.Control
                          type="text"
                          name="banner"
                          value={formData.banner}
                          onChange={handleInputChange}
                          placeholder="Enter banner URL or upload"
                          className="mt-2"
                        />
                      </div>
                      <Form.Text className="text-muted">
                        For demo, you can use the URL or change it to another image URL
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Social Media Links */}
                <h5 className="border-bottom pb-2 mb-4">Social Media (Optional)</h5>
                <Row className="mb-4">
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        type="text"
                        name="socialMedia.facebook"
                        value={formData.socialMedia.facebook}
                        onChange={handleInputChange}
                        placeholder="Facebook profile URL"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control
                        type="text"
                        name="socialMedia.instagram"
                        value={formData.socialMedia.instagram}
                        onChange={handleInputChange}
                        placeholder="Instagram profile URL"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control
                        type="text"
                        name="socialMedia.twitter"
                        value={formData.socialMedia.twitter}
                        onChange={handleInputChange}
                        placeholder="Twitter profile URL"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Delivery Option */}
                <h5 className="border-bottom pb-2 mb-4">Delivery Options</h5>
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="isDeliveryEnabled"
                    label="Enable delivery to other hostels"
                    checked={formData.isDeliveryEnabled}
                    onChange={(e) => setFormData({
                      ...formData,
                      isDeliveryEnabled: e.target.checked
                    })}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => navigate('/home')}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <Spinner 
                          as="span" 
                          animation="border" 
                          size="sm" 
                          role="status"
                          aria-hidden="true" 
                        />
                        <span className="ms-2">Creating Store...</span>
                      </>
                    ) : success ? (
                      "Store Created!"
                    ) : (
                      "Create Store"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeStore; 