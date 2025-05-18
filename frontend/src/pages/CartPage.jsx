import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Spinner } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getSubtotal, loading } = useCart();
  const { prepareCheckout } = useOrder();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle quantity change
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const result = await updateQuantity(itemId, newQuantity);
    if (!result.success) {
      setError(result.message);
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle checkout process
  const handleProceedToCheckout = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login?redirect=payment');
      return;
    }
    
    // Prepare order details for checkout
    prepareCheckout();
    navigate('/payment');
  };

  // Calculate shipping cost (free over Rs. 1000)
  const subtotal = getSubtotal();
  const shippingCost = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shippingCost;

  return (
    <Container className="py-4 cart-page">
      <Row className="mb-4">
        <Col>
          <Button 
            variant="link" 
            className="p-0 text-decoration-none" 
            onClick={handleGoBack}
          >
            <FaArrowLeft className="me-2" />
            <span>Continue Shopping</span>
          </Button>
          <h2 className="mt-3">Your Cart</h2>
        </Col>
      </Row>
      
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {cartItems.length === 0 ? (
        <Row>
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h3 className="mb-4">Your cart is empty</h3>
                <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
                <Button onClick={() => navigate('/online-store')} variant="primary" size="lg">
                  Browse Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Body>
                  <Table responsive className="cart-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="cart-item-image me-3">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} />
                                ) : (
                                  <div className="no-image-small">No Image</div>
                                )}
                              </div>
                              <div>
                                <h6 className="mb-0 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                                  {item.name}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>Rs. {item.price.toFixed(2)}</td>
                          <td>
                            <div className="quantity-controls">
                              <button 
                                className="quantity-btn"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={loading || item.quantity <= 1}
                              >
                                <FaMinus />
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button 
                                className="quantity-btn"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={loading}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </td>
                          <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <Button 
                              variant="link" 
                              className="text-danger p-0"
                              onClick={() => removeFromCart(item.id)}
                              disabled={loading}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              
              <div className="d-flex justify-content-between">
                <Button 
                  variant="outline-secondary" 
                  onClick={clearCart}
                  disabled={loading}
                >
                  Clear Cart
                </Button>
                <Button 
                  variant="outline-primary"
                  onClick={handleGoBack}
                >
                  Continue Shopping
                </Button>
              </div>
            </Col>
            
            <Col lg={4}>
              <Card>
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  <div className="summary-item d-flex justify-content-between mb-3">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-item d-flex justify-content-between mb-3">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <hr />
                  <div className="summary-item d-flex justify-content-between mb-4">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold">Rs. {total.toFixed(2)}</span>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      className="w-100" 
                      disabled={loading}
                      onClick={handleProceedToCheckout}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          <span className="ms-2">Processing...</span>
                        </>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline-primary" 
                      className="w-100"
                      onClick={() => navigate('/online-store')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage; 