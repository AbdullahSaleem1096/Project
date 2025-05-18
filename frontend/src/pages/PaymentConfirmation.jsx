import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || null;
  const orderResponse = location.state?.orderResponse || null;
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // If no order details, show generic confirmation
  if (!orderDetails || !orderResponse) {
    return (
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
          
          <div className="confirmation-actions">
            <Link to="/home" className="btn-primary">
              <FaHome className="me-2" /> Return to Home
            </Link>
            <Link to="/buyer/orders" className="btn-secondary">
              <FaShoppingBag className="me-2" /> View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
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
            <div className="info-value">{orderResponse.orderId}</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Order Date</div>
            <div className="info-value">{formatDate(orderResponse.orderDate)}</div>
          </div>
          
          <div className="info-item">
            <div className="info-label">Delivery Time</div>
            <div className="info-value">24-48 hours</div>
          </div>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          {orderDetails.items.map((item, index) => (
            <div className="summary-detail" key={index}>
              <span className="summary-label">{item.name} (x{item.quantity})</span>
              <span className="summary-value">Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="summary-detail">
            <span className="summary-label">Shipping Fee</span>
            <span className="summary-value">
              {orderDetails.totals.shippingCost === 0 
                ? 'Free' 
                : `Rs. ${orderDetails.totals.shippingCost.toFixed(2)}`}
            </span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>Rs. {orderDetails.totals.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/home" className="btn-primary">
            <FaHome className="me-2" /> Return to Home
          </Link>
          <Link to="/buyer/orders" className="btn-secondary">
            <FaShoppingBag className="me-2" /> View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation; 