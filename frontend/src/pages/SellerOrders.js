import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerOrders.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const navigate = useNavigate();

  // Fetch orders data - in a real app, this would be an API call
  useEffect(() => {
    // In a real application, this would fetch orders from your backend API
    // For example: fetch('/api/seller/orders')
    
    // Simulating API fetch with timeout
    setTimeout(() => {
      const fetchedOrders = [
        {
          id: 'ORD-7829',
          customer: {
            id: '1',
            name: 'Ali Khan',
            email: 'ali@example.com',
            phone: '+92 300 1234567',
            address: 'House 123, Street 4, Islamabad'
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
          notes: ''
        },
        {
          id: 'ORD-7830',
          customer: {
            id: '2',
            name: 'Sara Ahmed',
            email: 'sara@example.com',
            phone: '+92 300 7654321',
            address: 'Flat 45, Block B, Gulberg, Lahore'
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
          notes: 'Please deliver after 6 PM'
        },
        {
          id: 'ORD-7831',
          customer: {
            id: '3',
            name: 'Usman Ali',
            email: 'usman@example.com',
            phone: '+92 300 1122334',
            address: 'House 7, Street 12, DHA Phase 5, Karachi'
          },
          products: [
            { id: '3', name: 'Mechanical Keyboard', price: 2200, quantity: 1, image: 'https://i.imgur.com/uDqFYp9.jpg' }
          ],
          totalAmount: 2200,
          status: 'Delivered',
          paymentMethod: 'Cash on Delivery',
          paymentStatus: 'Paid',
          date: '2023-06-08',
          deliveryDate: '2023-06-12',
          notes: ''
        },
        {
          id: 'ORD-7832',
          customer: {
            id: '4',
            name: 'Fatima Shah',
            email: 'fatima@example.com',
            phone: '+92 300 9876543',
            address: 'Flat 12, Sector G-9, Islamabad'
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
          notes: 'Call before delivery'
        },
        {
          id: 'ORD-7833',
          customer: {
            id: '5',
            name: 'Hamza Khan',
            email: 'hamza@example.com',
            phone: '+92 300 5566778',
            address: 'House 89, Block F, Johar Town, Lahore'
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
          notes: 'Customer canceled due to delivery delay'
        },
        {
          id: 'ORD-7834',
          customer: {
            id: '6',
            name: 'Zainab Malik',
            email: 'zainab@example.com',
            phone: '+92 300 2233445',
            address: 'House 45, Street 8, F-7, Islamabad'
          },
          products: [
            { id: '6', name: 'Gaming Monitor 24"', price: 32000, quantity: 1, image: 'https://i.imgur.com/65JD63s.jpg' }
          ],
          totalAmount: 32000,
          status: 'Delivered',
          paymentMethod: 'EasyPaisa',
          paymentStatus: 'Paid',
          date: '2023-06-03',
          deliveryDate: '2023-06-08',
          notes: ''
        },
        {
          id: 'ORD-7835',
          customer: {
            id: '7',
            name: 'Hassan Ahmed',
            email: 'hassan@example.com',
            phone: '+92 300 7788990',
            address: 'Flat 32, Gulistan-e-Johar, Karachi'
          },
          products: [
            { id: '7', name: 'Wireless Mouse', price: 1400, quantity: 1, image: 'https://i.imgur.com/qIK8mhT.jpg' },
            { id: '8', name: 'Mouse Pad XL', price: 550, quantity: 1, image: 'https://i.imgur.com/nF2D7cB.jpg' }
          ],
          totalAmount: 1950,
          status: 'Accepted',
          paymentMethod: 'JazzCash',
          paymentStatus: 'Paid',
          date: '2023-06-01',
          deliveryDate: null,
          notes: ''
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
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    setCurrentPage(1); // Reset to first page after filter
  }, [searchTerm, statusFilter, dateFilter, orders]);

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    // In a real application, this would be an API call
    // For example: fetch(`/api/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) })
    
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    // Log for testing purposes
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

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

  return (
    <div className="seller-orders-container">
      {/* Page Header */}
      <div className="orders-header">
        <div className="header-left">
          <h2>Orders Management</h2>
          <p>Manage and track your customer orders</p>
        </div>
        
        <div className="header-right">
          <button className="export-btn">
            <i className="bi bi-download"></i> Export Data
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input 
            type="text" 
            placeholder="Search by order ID, customer, or product" 
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
      
      {/* Stats Cards */}
      <div className="order-stats">
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="bi bi-hourglass-split"></i>
          </div>
          <div className="stat-details">
            <h3>Pending</h3>
            <p className="stat-value">{orders.filter(order => order.status === 'Pending').length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon accepted">
            <i className="bi bi-check2-circle"></i>
          </div>
          <div className="stat-details">
            <h3>Accepted</h3>
            <p className="stat-value">{orders.filter(order => order.status === 'Accepted').length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon delivered">
            <i className="bi bi-truck"></i>
          </div>
          <div className="stat-details">
            <h3>Delivered</h3>
            <p className="stat-value">{orders.filter(order => order.status === 'Delivered').length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon cancelled">
            <i className="bi bi-x-circle"></i>
          </div>
          <div className="stat-details">
            <h3>Cancelled</h3>
            <p className="stat-value">{orders.filter(order => order.status === 'Cancelled').length}</p>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="orders-table-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <i className="bi bi-inbox"></i>
            <h3>No orders found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map(order => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td className="customer-info">
                      <div className="customer-name">{order.customer.name}</div>
                      <div className="customer-email">{order.customer.email}</div>
                    </td>
                    <td className="product-info">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-row">
                          <img src={product.image} alt={product.name} />
                          <div>
                            <div className="product-name">{product.name}</div>
                            <div className="product-quantity">Qty: {product.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="order-date">{formatDate(order.date)}</td>
                    <td className="order-amount">Rs. {order.totalAmount.toLocaleString()}</td>
                    <td className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="order-actions">
                      <button 
                        className="action-btn view-btn" 
                        onClick={() => viewOrderDetails(order)}
                        title="View Details"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      
                      <div className="status-dropdown">
                        <button className="action-btn status-btn" title="Update Status">
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <div className="dropdown-content">
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Pending')}
                            className={order.status === 'Pending' ? 'active' : ''}
                          >
                            Pending
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Accepted')}
                            className={order.status === 'Accepted' ? 'active' : ''}
                          >
                            Accepted
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            className={order.status === 'Delivered' ? 'active' : ''}
                          >
                            Delivered
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                            className={order.status === 'Cancelled' ? 'active' : ''}
                          >
                            Cancelled
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            {filteredOrders.length > ordersPerPage && (
              <div className="pagination">
                <button 
                  className="pagination-btn" 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                
                {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => i + 1)
                  .map(number => (
                    <button 
                      key={number}
                      className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  ))}
                
                <button 
                  className="pagination-btn" 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </>
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
              <div className="order-detail-grid">
                <div className="order-status-section">
                  <h4>Order Status</h4>
                  <div className="status-timeline">
                    <div className={`timeline-item ${['Pending', 'Accepted', 'Delivered'].includes(selectedOrder.status) ? 'active' : selectedOrder.status === 'Cancelled' ? 'cancelled' : ''}`}>
                      <div className="timeline-icon">
                        <i className="bi bi-receipt"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Order Placed</h5>
                        <p>{formatDate(selectedOrder.date)}</p>
                      </div>
                    </div>
                    
                    <div className={`timeline-item ${['Accepted', 'Delivered'].includes(selectedOrder.status) ? 'active' : selectedOrder.status === 'Cancelled' ? 'cancelled' : ''}`}>
                      <div className="timeline-icon">
                        <i className="bi bi-check2-circle"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Accepted</h5>
                        <p>{selectedOrder.status === 'Accepted' || selectedOrder.status === 'Delivered' ? 'Order confirmed by seller' : '-'}</p>
                      </div>
                    </div>
                    
                    <div className={`timeline-item ${selectedOrder.status === 'Delivered' ? 'active' : selectedOrder.status === 'Cancelled' ? 'cancelled' : ''}`}>
                      <div className="timeline-icon">
                        <i className="bi bi-truck"></i>
                      </div>
                      <div className="timeline-content">
                        <h5>Delivered</h5>
                        <p>{selectedOrder.deliveryDate ? formatDate(selectedOrder.deliveryDate) : '-'}</p>
                      </div>
                    </div>
                    
                    {selectedOrder.status === 'Cancelled' && (
                      <div className="timeline-item active cancelled">
                        <div className="timeline-icon">
                          <i className="bi bi-x-circle"></i>
                        </div>
                        <div className="timeline-content">
                          <h5>Cancelled</h5>
                          <p>Order was cancelled</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="update-status-section">
                    <h4>Update Status</h4>
                    <div className="status-buttons">
                      <button 
                        className={`status-update-btn ${selectedOrder.status === 'Pending' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(selectedOrder.id, 'Pending')}
                      >
                        Pending
                      </button>
                      <button 
                        className={`status-update-btn ${selectedOrder.status === 'Accepted' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(selectedOrder.id, 'Accepted')}
                      >
                        Accepted
                      </button>
                      <button 
                        className={`status-update-btn ${selectedOrder.status === 'Delivered' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
                      >
                        Delivered
                      </button>
                      <button 
                        className={`status-update-btn ${selectedOrder.status === 'Cancelled' ? 'active' : ''}`}
                        onClick={() => updateOrderStatus(selectedOrder.id, 'Cancelled')}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="customer-detail-section">
                  <h4>Customer Information</h4>
                  <div className="customer-details">
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{selectedOrder.customer.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{selectedOrder.customer.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{selectedOrder.customer.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Address:</span>
                      <span className="detail-value">{selectedOrder.customer.address}</span>
                    </div>
                  </div>
                  
                  <h4>Payment Information</h4>
                  <div className="payment-details">
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
                  
                  {selectedOrder.notes && (
                    <>
                      <h4>Order Notes</h4>
                      <div className="order-notes">
                        {selectedOrder.notes}
                      </div>
                    </>
                  )}
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
                
                <div className="order-summary">
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
              <button className="print-btn" onClick={() => window.print()}>
                <i className="bi bi-printer"></i> Print Order
              </button>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerOrders; 