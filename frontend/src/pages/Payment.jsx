import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaWallet, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import './Payment.css';

const PaymentPage = () => {
  const { orderDetails, createOrder, getUserAddress, loading } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [walletBalance, setWalletBalance] = useState(10000); // Mock wallet balance
  const [userAddress, setUserAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const navigate = useNavigate();
  
  // Redirect to cart if no order details
  useEffect(() => {
    if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
      navigate('/cart');
    }
  }, [orderDetails, navigate]);

  // Fetch address data
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setAddressLoading(true);
        const address = await getUserAddress();
        setUserAddress(address);
      } catch (error) {
        console.error('Error fetching address:', error);
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
  }, [getUserAddress]);

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.id);
  };

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    try {
      console.log('Confirming payment with method:', paymentMethod);
      const result = await createOrder(paymentMethod);
      
      if (!result.success) {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      alert(`Payment failed: ${error.message || 'An unexpected error occurred'}`);
    }
  };

  // If no order details, show loading or redirect
  if (!orderDetails) {
    return (
      <div className="payment-page">
        <Container>
          <div className="text-center py-5">
            <p className="text-white">Preparing checkout...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <Container>
        <div className="payment-container">
          {/* Header */}
          <div className="payment-header">
            <Link to="/cart" className="back-button">
              <FaArrowLeft />
            </Link>
            <h2>Payment</h2>
          </div>

          <Row>
            <Col lg={8}>
              {/* Payment Methods */}
              <Card className="payment-card mb-4">
                <Card.Body>
                  <h3 className="section-title">Payment Method</h3>
                  
                  <div className="payment-methods">
                    <Form>
                      {/* Wallet Option */}
                      <div className={`payment-method-item ${paymentMethod === 'wallet' ? 'active' : ''}`}>
                        <Form.Check 
                          type="radio" 
                          id="wallet" 
                          name="paymentMethod" 
                          defaultChecked
                          onChange={handlePaymentMethodChange}
                        />
                        <div className="payment-method-content">
                          <div className="payment-method-icon wallet">
                            <FaWallet />
                          </div>
                          <div className="payment-method-details">
                            <h4>Wallet Balance</h4>
                            <p>Available: Rs. {walletBalance.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cash on Delivery Option */}
                      <div className={`payment-method-item ${paymentMethod === 'cod' ? 'active' : ''}`}>
                        <Form.Check 
                          type="radio" 
                          id="cod" 
                          name="paymentMethod" 
                          onChange={handlePaymentMethodChange}
                        />
                        <div className="payment-method-content">
                          <div className="payment-method-icon cod">
                            <FaMoneyBillWave />
                          </div>
                          <div className="payment-method-details">
                            <h4>Cash on Delivery</h4>
                            <p>Pay when you receive the order</p>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Card.Body>
              </Card>

              {/* Delivery Address */}
              <Card className="payment-card mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="section-title mb-0">Delivery Address</h3>
                    <Button variant="link" className="edit-btn" onClick={() => navigate('/buyer/profile')}>Edit</Button>
                  </div>
                  
                  {addressLoading ? (
                    <div className="text-center py-3">
                      <Spinner animation="border" size="sm" />
                      <span className="ms-2">Loading address...</span>
                    </div>
                  ) : (
                    <div className="address-box selected">
                      <div className="address-check">
                        <FaCheckCircle />
                      </div>
                      <div className="address-content">
                        <h4>Campus Delivery</h4>
                        <p>{userAddress?.name || 'User'}</p>
                        <p>{userAddress?.department || 'Department'}</p>
                        <p>{userAddress?.hostel || 'Hostel'}, Room {userAddress?.roomNumber || 'N/A'}</p>
                        <p>NUST H-12 Campus, Islamabad</p>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              {/* Order Summary */}
              <Card className="payment-card order-summary">
                <Card.Header className="bg-dark text-white">
                  <h3 className="section-title mb-0">Order Summary</h3>
                </Card.Header>
                <Card.Body>
                  <div className="summary-items">
                    {orderDetails.items.map((item, index) => (
                      <div className="product-thumb" key={index}>
                        <div className="thumb-image">
                          {item.image && <img src={item.image} alt={item.name} className="img-fluid" />}
                        </div>
                        <div className="thumb-details">
                          <h5>{item.name}</h5>
                          <p>Qty: {item.quantity} × Rs. {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="price-details">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>Rs. {orderDetails.totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="price-row">
                      <span>Shipping</span>
                      <span>
                        {orderDetails.totals.shippingCost === 0 
                          ? 'Free' 
                          : `Rs. ${orderDetails.totals.shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>Rs. {orderDetails.totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="confirm-btn"
                    disabled={loading}
                    onClick={handleConfirmPayment}
                  >
                    {loading ? 'Processing...' : 'Confirm Payment'}
                  </Button>
                  
                  <div className="secure-note">
                    <p>Your payment information is securely processed</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PaymentPage;
