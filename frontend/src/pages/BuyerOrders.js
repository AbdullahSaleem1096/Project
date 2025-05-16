import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerOrders.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function BuyerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  // Fetch orders data - in a real app, this would be an API call
  useEffect(() => {
    // In a real application, this would fetch orders from your backend API
    // For example: fetch('/api/buyer/orders')
    
    // Simulating API fetch with timeout
    setTimeout(() => {
      const fetchedOrders = [
        {
          id: 'ORD-7829',
          seller: {
            id: '1',
            name: 'Tech Gadgets Store',
            email: 'techgadgets@example.com',
            phone: '+92 300 1234567'
          },
          products: [
            { id: '1', name: 'Gaming Mouse RGB', price: 960, quantity: 1, image: 'https://i.imgur.com/nJFXnsQ.jpg' }
          ],
          totalAmount: 960,
          status: 'Delivered',
          paymentMethod: 'Cash on Delivery',
          paymentStatus: 'Paid',
          date: '2023-06-10',
          deliveryDate: '2023-06-15',
          trackingInfo: {
            number: 'TRK123456789',
            url: '#'
          }
        },
        {
          id: 'ORD-7830',
          seller: {
            id: '2',
            name: 'Gaming Essentials',
            email: 'gaming@example.com',
            phone: '+92 300 7654321'
          },
          products: [
            { id: '2', name: 'Gaming Headset', price: 1800, quantity: 1, image: 'https://i.imgur.com/nSRdGGy.jpg' }
          ],
          totalAmount: 1800,
          status: 'Accepted',
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          date: '2023-06-09',
          deliveryDate: null,
          trackingInfo: null
        },
        {
          id: 'ORD-7832',
          seller: {
            id: '3',
            name: 'PC Accessories Shop',
            email: 'accessories@example.com',
            phone: '+92 300 9876543'
          },
          products: [
            { id: '4', name: 'Controller Stand', price: 450, quantity: 1, image: 'https://i.imgur.com/K5TZlLh.jpg' }
          ],
          totalAmount: 450,
          status: 'Pending',
          paymentMethod: 'Cash on Delivery',
          paymentStatus: 'Pending',
          date: '2023-06-07',
          deliveryDate: null,
          trackingInfo: null
        },
        {
          id: 'ORD-7833',
          seller: {
            id: '4',
            name: 'Premium Gaming',
            email: 'premium@example.com',
            phone: '+92 300 5566778'
          },
          products: [
            { id: '5', name: 'Gaming Chair', price: 12500, quantity: 1, image: 'https://i.imgur.com/QfZVQ7z.jpg' }
          ],
          totalAmount: 12500,
          status: 'Cancelled',
          paymentMethod: 'Credit Card',
          paymentStatus: 'Refunded',
          date: '2023-06-05',
          deliveryDate: null,
          trackingInfo: null,
          cancellationReason: 'Out of stock'
        }
      ];
      
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters when filter states change
  useEffect(() => {
    let results = orders;

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(order => order.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      
      switch (dateFilter) {
        case 'today':
          results = results.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          results = results.filter(order => {
            const orderDate = new Date(order.date);
            const diffDays = Math.round(Math.abs((today - orderDate) / oneDay));
            return diffDays <= 7;
          });
          break;
        case 'month':
          results = results.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate.getMonth() === today.getMonth() && 
                   orderDate.getFullYear() === today.getFullYear();
          });
          break;
        default:
          break;
      }
    }

    setFilteredOrders(results);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Contact seller
  const contactSeller = (sellerId) => {
    // In a real app, this would navigate to the messaging page with the seller
    navigate(`/messaging?seller=${sellerId}`);
  };

  // Track order
  const trackOrder = (trackingInfo) => {
    // In a real app, this would open the tracking URL or navigate to a tracking page
    if (trackingInfo && trackingInfo.url) {
      window.open(trackingInfo.url, '_blank');
    }
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    // In a real app, this would make an API call to cancel the order
    // For example: fetch(`/api/orders/${orderId}/cancel`, { method: 'PUT' })
    
    // For now, just confirm with the user
    if (window.confirm('Are you sure you want to cancel this order?')) {
      alert('Order cancellation request sent!');
    }
  };

  return (
    <div className="buyer-orders-container">
      {/* Page Header */}
      <div className="orders-header">
        <div className="header-left">
          <h2>My Orders</h2>
          <p>View and track your orders</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input 
            type="text" 
            placeholder="Search by order ID, seller, or product" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-selects">
          <div className="filter-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Date:</label>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Orders List */}
      <div className="orders-list-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <i className="bi bi-bag-x"></i>
            <h3>No orders found</h3>
            <p>Try adjusting your filters or search criteria</p>
            <button className="shop-now-btn" onClick={() => navigate('/home')}>
              Shop Now
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-id-date">
                      <h3>{order.id}</h3>
                      <span>Order Date: {formatDate(order.date)}</span>
                    </div>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="order-content">
                  <div className="order-products">
                    {order.products.map((product, index) => (
                      <div key={index} className="product-item">
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                          <h4>{product.name}</h4>
                          <div className="product-meta">
                            <span>Qty: {product.quantity}</span>
                            <span>Rs. {product.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-details">
                    <div className="order-summary">
                      <div className="summary-item">
                        <span>Sold by:</span>
                        <span className="seller-name">{order.seller.name}</span>
                      </div>
                      <div className="summary-item">
                        <span>Total Amount:</span>
                        <span className="order-total">Rs. {order.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="summary-item">
                        <span>Payment:</span>
                        <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-actions">
                      <button 
                        className="action-button view-details" 
                        onClick={() => viewOrderDetails(order)}
                      >
                        <i className="bi bi-eye"></i> View Details
                      </button>
                      
                      {order.status === 'Delivered' && (
                        <button className="action-button review">
                          <i className="bi bi-star"></i> Write Review
                        </button>
                      )}
                      
                      {order.status === 'Pending' && (
                        <button 
                          className="action-button cancel" 
                          onClick={() => cancelOrder(order.id)}
                        >
                          <i className="bi bi-x-circle"></i> Cancel Order
                        </button>
                      )}
                      
                      {order.trackingInfo && (
                        <button 
                          className="action-button track" 
                          onClick={() => trackOrder(order.trackingInfo)}
                        >
                          <i className="bi bi-geo-alt"></i> Track Package
                        </button>
                      )}
                      
                      <button 
                        className="action-button contact" 
                        onClick={() => contactSeller(order.seller.id)}
                      >
                        <i className="bi bi-chat-dots"></i> Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="order-status-tracker">
                <h4>Order Status</h4>
                <div className="status-steps">
                  <div className={`status-step ${selectedOrder.status !== 'Cancelled' ? 'completed' : 'cancelled'}`}>
                    <div className="step-icon">
                      <i className="bi bi-bag-check"></i>
                    </div>
                    <div className="step-info">
                      <h5>Order Placed</h5>
                      <p>{formatDate(selectedOrder.date)}</p>
                    </div>
                  </div>
                  
                  <div className={`status-step ${selectedOrder.status === 'Accepted' || selectedOrder.status === 'Delivered' ? 'completed' : selectedOrder.status === 'Cancelled' ? 'cancelled' : ''}`}>
                    <div className="step-icon">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="step-info">
                      <h5>Order Accepted</h5>
                      <p>{selectedOrder.status === 'Accepted' || selectedOrder.status === 'Delivered' ? 'Seller has confirmed your order' : '-'}</p>
                    </div>
                  </div>
                  
                  <div className={`status-step ${selectedOrder.status === 'Delivered' ? 'completed' : selectedOrder.status === 'Cancelled' ? 'cancelled' : ''}`}>
                    <div className="step-icon">
                      <i className="bi bi-truck"></i>
                    </div>
                    <div className="step-info">
                      <h5>Order Delivered</h5>
                      <p>{selectedOrder.deliveryDate ? formatDate(selectedOrder.deliveryDate) : '-'}</p>
                    </div>
                  </div>
                  
                  {selectedOrder.status === 'Cancelled' && (
                    <div className="status-step cancelled">
                      <div className="step-icon">
                        <i className="bi bi-x-circle"></i>
                      </div>
                      <div className="step-info">
                        <h5>Order Cancelled</h5>
                        <p>{selectedOrder.cancellationReason || 'Order was cancelled'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="order-detail-sections">
                <div className="detail-section">
                  <h4>Shipping Information</h4>
                  <div className="detail-content">
                    <div className="detail-row">
                      <span className="detail-label">Delivery Address:</span>
                      <span className="detail-value">Your default shipping address</span>
                    </div>
                    
                    {selectedOrder.trackingInfo && (
                      <div className="detail-row">
                        <span className="detail-label">Tracking Number:</span>
                        <span className="detail-value">{selectedOrder.trackingInfo.number}</span>
                      </div>
                    )}
                    
                    <div className="detail-row">
                      <span className="detail-label">Estimated Delivery:</span>
                      <span className="detail-value">
                        {selectedOrder.status === 'Delivered' 
                          ? `Delivered on ${formatDate(selectedOrder.deliveryDate)}`
                          : selectedOrder.status === 'Cancelled'
                          ? 'N/A'
                          : '3-5 business days'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Seller Information</h4>
                  <div className="detail-content">
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{selectedOrder.seller.name}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{selectedOrder.seller.email}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{selectedOrder.seller.phone}</span>
                    </div>
                    
                    <button 
                      className="contact-seller-btn" 
                      onClick={() => contactSeller(selectedOrder.seller.id)}
                    >
                      <i className="bi bi-chat-dots"></i> Contact Seller
                    </button>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Payment Information</h4>
                  <div className="detail-content">
                    <div className="detail-row">
                      <span className="detail-label">Method:</span>
                      <span className="detail-value">{selectedOrder.paymentMethod}</span>
                    </div>
                    
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className={`detail-value payment-status ${selectedOrder.paymentStatus.toLowerCase()}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-products-section">
                <h4>Ordered Products</h4>
                <div className="ordered-products">
                  {selectedOrder.products.map((product, index) => (
                    <div className="product-card" key={index}>
                      <img src={product.image} alt={product.name} />
                      <div className="product-details">
                        <h5>{product.name}</h5>
                        <div className="product-meta">
                          <span>Quantity: {product.quantity}</span>
                          <span>Price: Rs. {product.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-summary-table">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>Rs. {selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Rs. 0</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>Rs. {selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              {selectedOrder.status === 'Delivered' && (
                <button className="review-btn">
                  <i className="bi bi-star"></i> Write a Review
                </button>
              )}
              
              {selectedOrder.status === 'Pending' && (
                <button 
                  className="cancel-btn" 
                  onClick={() => cancelOrder(selectedOrder.id)}
                >
                  <i className="bi bi-x-circle"></i> Cancel Order
                </button>
              )}
              
              <button className="print-btn" onClick={() => window.print()}>
                <i className="bi bi-printer"></i> Print Order
              </button>
              
              <button className="close-modal-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerOrders; 