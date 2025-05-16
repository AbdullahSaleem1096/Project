import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaFacebook, FaInstagram, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginPage.css';
import axios from 'axios';
import { storeAPI } from '../services/api';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        
        console.log('Login successful:', {
          userId: response.data.user._id,
          role: response.data.user.role,
          token: response.data.token ? "Token received" : "No token in response"
        });
        
        // Check user role for redirection
        if (response.data.user.role === 'seller') {
          // For sellers, check if they have set up their store
          try {
            const storeCheck = await storeAPI.checkStoreSetup(response.data.user._id);
            
            if (storeCheck.hasStore && storeCheck.isSetupComplete) {
              // Store is already set up, redirect to seller dashboard
              navigate('/seller/dashboard');
            } else {
              // Store not set up, redirect to store setup page
              navigate('/seller/setup-store');
            }
          } catch (err) {
            console.error('Error checking store setup:', err);
            // Default to store setup if there's an error
            navigate('/seller/setup-store');
          }
        } else {
          // For buyers, redirect to home
          navigate('/home');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container fluid>
        <Row className="min-vh-100">
          {/* Left Column - Image/Banner (visible only on desktop) */}
          <Col lg={6} className="d-none d-lg-flex login-banner">
            <div className="banner-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="banner-title">Welcome to Nustify</h2>
                <p className="banner-subtitle">The premier marketplace for NUST students</p>
                <div className="banner-features">
                  <div className="feature-item">
                    <div className="feature-icon">🛒</div>
                    <div className="feature-text">Buy & sell within campus</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🔒</div>
                    <div className="feature-text">Secure & trusted platform</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📦</div>
                    <div className="feature-text">Fast campus delivery</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Col>

          {/* Right Column - Login Form */}
          <Col lg={6} className="login-form-container d-flex align-items-center justify-content-center">
            <motion.div 
              className="login-form-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-4">
                <h1 className="brand-title">NUSTIFY</h1>
                <p className="brand-subtitle">NUST Market Place</p>
              </div>

              <Card className="login-card">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="profile-icon">
                      <FaUser size={28} />
                    </div>
                    <h4 className="mt-3 mb-4">Welcome Back!</h4>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaEnvelope />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-light">
                          <FaLock />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        id="rememberMe"
                        label="Remember Me"
                        className="remember-me"
                      />
                      <Link to="/forgot-password" className="forgot-password">
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="btn-gradient w-100 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Signing in...
                        </>
                      ) : 'Sign in'}
                    </Button>

                    <div className="divider my-4">
                      <span>Or Sign In with</span>
                    </div>

                    <div className="social-login">
                      <Button variant="outline-primary" className="social-btn">
                        <FaFacebook /> Facebook
                      </Button>
                      <Button variant="outline-danger" className="social-btn">
                        <FaInstagram /> Instagram
                      </Button>
                    </div>

                    <div className="text-center mt-4">
                      Don't have an account?{' '}
                      <Link to="/signup" className="signup-link">
                        Sign up
                      </Link>
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

export default LoginPage;
