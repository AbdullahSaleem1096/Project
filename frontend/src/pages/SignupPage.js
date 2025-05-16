import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser, FaBuilding, FaIdCard, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SignupPage.css';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    hostel: '',
    roomNumber: '',
    department: '',
    role: 'buyer', // default role
    termsAccepted: false // add terms acceptance tracking
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate terms acceptance
    if (!formData.termsAccepted) {
      setError('You must accept the Terms of Service and Privacy Policy');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        hostel: formData.hostel,
        department: formData.department, 
        roomNumber: formData.roomNumber 
      });

      if (response.data) {
        // Store user ID and email for OTP verification
        localStorage.setItem('tempUserId', response.data.userId);
        localStorage.setItem('userEmail', formData.email);
        // Store role info to use after verification
        localStorage.setItem('userRole', formData.role);
        // Navigate to OTP verification page
        navigate('/verify-email');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Container fluid>
        <Row className="min-vh-100">
          {/* Left Column - Image/Banner (visible only on desktop) */}
          <Col lg={6} className="d-none d-lg-flex signup-banner">
            <div className="banner-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="banner-title">Join Nustify Today</h2>
                <p className="banner-subtitle">Connect with the NUST community and start buying or selling</p>
                <div className="banner-features">
                  <div className="feature-item">
                    <div className="feature-icon">🔒</div>
                    <div className="feature-text">Secure account verification</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">💰</div>
                    <div className="feature-text">Buy and sell with ease</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎓</div>
                    <div className="feature-text">Made for NUST students</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Col>

          {/* Right Column - Signup Form */}
          <Col lg={6} className="signup-form-container d-flex align-items-center justify-content-center">
            <motion.div 
              className="signup-form-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-4">
                <h1 className="brand-title">NUSTIFY</h1>
                <p className="brand-subtitle">NUST Market Place</p>
              </div>

              <Card className="signup-card">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="profile-icon">
                      <FaUser size={28} />
                    </div>
                    <h4 className="mt-3 mb-4">Create Your Account</h4>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <Form onSubmit={handleSubmit} className="signup-form">
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaUser />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              placeholder="Enter your full name"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              required
                              style={{ color: 'black', background: '#fff' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email ID</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaEnvelope />
                            </InputGroup.Text>
                            <Form.Control
                              type="email"
                              placeholder="your Email@gmail.com"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              style={{ color: 'black', background: 'rgba(255, 255, 255, 0.15)' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaLock />
                            </InputGroup.Text>
                            <Form.Control
                              type="password"
                              placeholder="Create a strong password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              style={{ color: 'black', background: 'rgba(255, 255, 255, 0.15)' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaLock />
                            </InputGroup.Text>
                            <Form.Control
                              type="password"
                              placeholder="Confirm your password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              style={{ color: 'black', background: 'rgba(255, 255, 255, 0.15)' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Hostel Name</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaBuilding />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              placeholder="Your hostel name"
                              name="hostel"
                              value={formData.hostel}
                              onChange={handleChange}
                              style={{ color: 'black', background: 'rgba(255, 255, 255, 0.15)' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Room Number</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaBuilding />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              placeholder="Your room number"
                              name="roomNumber"
                              value={formData.roomNumber}
                              onChange={handleChange}
                              style={{ color: 'black', background: 'rgba(255, 255, 255, 0.15)' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaIdCard />
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              placeholder="Your department"
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                              required
                              style={{ color: 'red', background: 'rgba(255, 255, 255, 0.15)' }}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Role</Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light">
                              <FaUser />
                            </InputGroup.Text>
                            <Form.Select
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              required
                            >
                              <option value="buyer">Buyer</option>
                              <option value="seller">Seller</option>
                            </Form.Select>
                          </InputGroup>
                          {formData.role === 'seller' && (
                            <Form.Text className="text-danger">
                              As a seller, you'll need to set up your store after registration.
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-4">
                          <Form.Check
                            type="checkbox"
                            id="termsCheck"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            label={
                              <span>
                                I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                              </span>
                            }
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
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
                              Creating Account...
                            </>
                          ) : 'Create Account'}
                        </Button>
                      </Col>
                    </Row>

                    <div className="divider my-4">
                      <span>Or Sign Up with</span>
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
                      Already have an account?{' '}
                      <Link to="/login" className="login-link">
                        Login
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

export default SignupPage;
