import React from 'react';
import './OrderConfirmation.css';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  return (
    <div className="order-page">
      <h2 className="app-title">NUSTIFY</h2>

      <div className="order-card">
        <FaCheckCircle className="check-icon" />

        <h3>Order Confirmed</h3>
        <p className="order-number">Order Number #12345</p>

        <div className="summary-section">
          <h4>Summary</h4>
          <div className="item-row">
            <div className="circle-indicator" />
            <div className="item-info">
              <p className="item-name">Adam’s Youghurt</p>
              <p className="item-price">Price: $1,284.50</p>
            </div>
          </div>
          <p className="total">Total: <strong>$1,284.50</strong></p>
        </div>
      </div>

      <button className="continue-btn">Continue Shopping</button>
    </div>
  );
};

export default OrderConfirmation;
