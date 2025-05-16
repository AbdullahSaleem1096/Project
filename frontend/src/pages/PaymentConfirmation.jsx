import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag, FaClock, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => (
  <div className="payment-confirmation-page">
    <div className="confirmation-container">
      <div className="confirmation-icon">
        <FaCheckCircle size={80} color="#27ae60" />
      </div>
      
      <h1>Payment Successful!</h1>
      
      <p className="confirmation-message">
        Your payment has been processed successfully. Thank you for your purchase! 
        Your order confirmation and details have been sent to your email.
      </p>
      
      <div className="order-info">
        <div className="info-item">
          <div className="info-label">Order Number</div>
          <div className="info-value">#NUS26784</div>
        </div>
        
        <div className="info-item">
          <div className="info-label">Order Date</div>
          <div className="info-value">May 20, 2023</div>
        </div>
        
        <div className="info-item">
          <div className="info-label">Delivery Time</div>
          <div className="info-value">24-48 hours</div>
        </div>
      </div>
      
      <div className="order-summary">
        <h2>Order Summary</h2>
        
        <div className="summary-detail">
          <span className="summary-label">Gaming Controller</span>
          <span className="summary-value">Rs. 3,200</span>
        </div>
        
        <div className="summary-detail">
          <span className="summary-label">Wireless Headphones</span>
          <span className="summary-value">Rs. 2,450</span>
        </div>
        
        <div className="summary-detail">
          <span className="summary-label">Shipping Fee</span>
          <span className="summary-value">Rs. 150</span>
        </div>
        
        <div className="summary-detail">
          <span className="summary-label">Tax</span>
          <span className="summary-value">Rs. 200</span>
        </div>
        
        <div className="summary-detail">
          <span className="summary-label">Discount</span>
          <span className="summary-value">- Rs. 500</span>
        </div>
        
        <div className="summary-total">
          <span>Total</span>
          <span>Rs. 5,500</span>
        </div>
      </div>
      
      <div className="confirmation-actions">
        <Link to="/home" className="btn-primary">
          <FaHome className="me-2" /> Return to Home
        </Link>
        <Link to="/orders" className="btn-secondary">
          <FaShoppingBag className="me-2" /> View Orders
        </Link>
      </div>
    </div>
  </div>
);

export default PaymentConfirmation; 