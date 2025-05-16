import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import './CartBar.css';

const CartBar = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, clearCart }) => {
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'show' : ''}`} 
        onClick={onClose}
      ></div>
      
      {/* Cart Sidebar */}
      <div className={`cart-bar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({cartItems.length})</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Button variant="primary" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">${item.price}</p>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <Button variant="outline-secondary" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button variant="primary">
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartBar; 