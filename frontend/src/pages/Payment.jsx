import React from 'react';
import { Button, Card, Col, Row, Container, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaArrowLeft, FaWallet, FaCreditCard, FaMoneyBillWave, FaCcMastercard, FaCcVisa, FaCcPaypal, FaCheckCircle } from 'react-icons/fa';
import './Payment.css';

const PaymentPage = () => {
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
                      <div className="payment-method-item active">
                        <Form.Check 
                          type="radio" 
                          id="wallet" 
                          name="paymentMethod" 
                          defaultChecked
                        />
                        <div className="payment-method-content">
                          <div className="payment-method-icon wallet">
                            <FaWallet />
                          </div>
                          <div className="payment-method-details">
                            <h4>Wallet Balance</h4>
                            <p>Available: Rs. 12,450</p>
                          </div>
                        </div>
                      </div>

                      {/* Credit Card Option */}
                      <div className="payment-method-item">
                        <Form.Check 
                          type="radio" 
                          id="card" 
                          name="paymentMethod" 
                        />
                        <div className="payment-method-content">
                          <div className="payment-method-icon card">
                            <FaCreditCard />
                          </div>
                          <div className="payment-method-details">
                            <h4>Credit/Debit Card</h4>
                            <p>Pay securely with your card</p>
                            <div className="card-icons">
                              <FaCcVisa size={24} />
                              <FaCcMastercard size={24} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cash on Delivery Option */}
                      <div className="payment-method-item">
                        <Form.Check 
                          type="radio" 
                          id="cod" 
                          name="paymentMethod" 
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

                      {/* PayPal Option */}
                      <div className="payment-method-item">
                        <Form.Check 
                          type="radio" 
                          id="paypal" 
                          name="paymentMethod" 
                        />
                        <div className="payment-method-content">
                          <div className="payment-method-icon paypal">
                            <FaCcPaypal />
                          </div>
                          <div className="payment-method-details">
                            <h4>PayPal</h4>
                            <p>Pay securely with your PayPal account</p>
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
                    <Button variant="link" className="edit-btn">Edit</Button>
                  </div>
                  
                  <div className="address-box selected">
                    <div className="address-check">
                      <FaCheckCircle />
                    </div>
                    <div className="address-content">
                      <h4>Campus Delivery</h4>
                      <p>Abdullah Fakiha</p>
                      <p>Fatima Hostel, Room 418</p>
                      <p>NUST H-12 Campus, Islamabad</p>
                      <p>Contact: 0300-1234567</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              {/* Order Summary */}
              <Card className="payment-card order-summary">
                <Card.Body>
                  <h3 className="section-title">Order Summary</h3>
                  
                  <div className="summary-items">
                    <div className="product-thumb">
                      <div className="thumb-image"></div>
                      <div className="thumb-details">
                        <h5>Gaming Controller</h5>
                        <p>Color: Black | Qty: 1</p>
                      </div>
                    </div>
                    
                    <div className="product-thumb">
                      <div className="thumb-image"></div>
                      <div className="thumb-details">
                        <h5>Wireless Headphones</h5>
                        <p>Color: White | Qty: 1</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="price-details">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>Rs. 5,650</span>
                    </div>
                    <div className="price-row">
                      <span>Shipping Fee</span>
                      <span>Rs. 150</span>
                    </div>
                    <div className="price-row">
                      <span>Tax</span>
                      <span>Rs. 200</span>
                    </div>
                    <div className="price-row">
                      <span>Discount</span>
                      <span>- Rs. 500</span>
                    </div>
                    <div className="price-row total">
                      <span>Total Amount</span>
                      <span>Rs. 5,500</span>
                    </div>
                  </div>
                  
                  <Link to="/payment-confirmation">
                    <Button className="confirm-btn">
                      Confirm Payment
                    </Button>
                  </Link>
                  
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
