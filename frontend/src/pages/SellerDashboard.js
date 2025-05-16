import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SellerDashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SellerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentProducts: [],
    recentOrders: [],
    storeViews: 0,
    monthlyRevenue: [],
    storeRating: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const navigate = useNavigate();
  
  // Simulated data - would come from API in real app
  useEffect(() => {
    // This would be an API call in a real application
    setDashboardData({
      totalProducts: 24,
      totalOrders: 145,
      totalRevenue: 64850,
      pendingOrders: 3,
      storeViews: 2547,
      storeRating: 4.8,
      recentProducts: [
        { id: 1, name: 'Gaming Headset', price: 1800, image: 'https://i.imgur.com/nSRdGGy.jpg', created: '2023-06-02' },
        { id: 2, name: 'Mechanical Keyboard', price: 2200, image: 'https://i.imgur.com/uDqFYp9.jpg', created: '2023-05-28' },
        { id: 3, name: 'Havic HV G-92 Gamepad', price: 1920, image: 'https://i.imgur.com/5R0uJqb.png', created: '2023-05-15' }
      ],
      recentOrders: [
        { id: 'ORD-7829', product: 'Gaming Mouse RGB', customer: 'Ali Khan', date: '2023-06-10', status: 'Delivered', amount: 960 },
        { id: 'ORD-7830', product: 'Gaming Headset', customer: 'Sara Ahmed', date: '2023-06-09', status: 'Processing', amount: 1800 },
        { id: 'ORD-7831', product: 'Mechanical Keyboard', customer: 'Usman Ali', date: '2023-06-08', status: 'Delivered', amount: 2200 },
        { id: 'ORD-7832', product: 'Controller Stand', customer: 'Fatima Shah', date: '2023-06-07', status: 'Pending', amount: 450 }
      ],
      monthlyRevenue: [
        { month: 'Jan', revenue: 8400 },
        { month: 'Feb', revenue: 9200 },
        { month: 'Mar', revenue: 7800 },
        { month: 'Apr', revenue: 10500 },
        { month: 'May', revenue: 12800 },
        { month: 'Jun', revenue: 16150 }
      ]
    });

    // Simulated contacts data - would be fetched from API
    setContacts([
      { id: 1, name: 'Ali Khan', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Is the gaming mouse still available?', time: '10:30 AM', unread: 2 },
      { id: 2, name: 'Sara Ahmed', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Thanks for the quick delivery!', time: 'Yesterday', unread: 0 },
      { id: 3, name: 'Usman Ali', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Do you have this in black color?', time: 'Jun 10', unread: 1 },
      { id: 4, name: 'Fatima Shah', avatar: 'https://i.pravatar.cc/150?img=10', lastMessage: 'When will my order be shipped?', time: 'Jun 9', unread: 0 }
    ]);
  }, []);

  // Load messages when a contact is selected
  useEffect(() => {
    if (selectedContact) {
      // This would be an API call in a real application
      const sampleMessages = [
        { id: 1, sender: 'buyer', content: 'Hello, I\'m interested in your gaming mouse.', time: '10:20 AM' },
        { id: 2, sender: 'seller', content: 'Hi there! Yes, it\'s available. Which color are you looking for?', time: '10:22 AM' },
        { id: 3, sender: 'buyer', content: 'Is the RGB one still in stock?', time: '10:25 AM' },
        { id: 4, sender: 'seller', content: 'Yes, we have the RGB version available and ready to ship.', time: '10:28 AM' },
        { id: 5, sender: 'buyer', content: 'Great! Is the gaming mouse still available?', time: '10:30 AM' }
      ];
      setMessages(sampleMessages);
    }
  }, [selectedContact]);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const navigateToPage = (page) => {
    setActiveTab(page);
    // For orders, navigate to the orders page
    if (page === 'orders') {
      navigate('/seller/orders');
    }
    // For other tabs, we're just showing the active state in this example
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, this would send the message to an API
    const newMsg = {
      id: messages.length + 1,
      sender: 'seller',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Update the last message in contacts
    const updatedContacts = contacts.map(c => 
      c.id === selectedContact.id 
        ? {...c, lastMessage: newMessage, time: 'Just now'} 
        : c
    );
    setContacts(updatedContacts);
  };

  const renderContent = () => {
    if (activeTab === 'messages') {
      return (
        <div className="messages-container">
          <div className="contacts-list">
            <div className="contacts-header">
              <h3>Messages</h3>
              <div className="search-contacts">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search contacts..." />
              </div>
            </div>
            
            <div className="contacts-items">
              {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`contact-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
                  onClick={() => selectContact(contact)}
                >
                  <div className="contact-avatar">
                    <img src={contact.avatar} alt={contact.name} />
                    {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                  </div>
                  <div className="contact-info">
                    <div className="contact-name-time">
                      <h4>{contact.name}</h4>
                      <span className="message-time">{contact.time}</span>
                    </div>
                    <p className="last-message">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chat-area">
            {selectedContact ? (
              <>
                <div className="chat-header">
                  <div className="chat-contact-info">
                    <img src={selectedContact.avatar} alt={selectedContact.name} />
                    <div>
                      <h4>{selectedContact.name}</h4>
                      <span className="status online">Online</span>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button><i className="bi bi-telephone"></i></button>
                    <button><i className="bi bi-three-dots-vertical"></i></button>
                  </div>
                </div>
                
                <div className="chat-messages">
                  {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender}`}>
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <form className="message-input" onSubmit={sendMessage}>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="button"><i className="bi bi-emoji-smile"></i></button>
                  <button type="button"><i className="bi bi-paperclip"></i></button>
                  <button type="submit" className="send-btn"><i className="bi bi-send"></i></button>
                </form>
              </>
            ) : (
              <div className="no-chat-selected">
                <i className="bi bi-chat-dots"></i>
                <h3>Select a conversation</h3>
                <p>Choose a contact from the list to start messaging</p>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <>
          {/* Stats Cards */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon products">
                <i className="bi bi-box-seam"></i>
              </div>
              <div className="stat-details">
                <h3>Total Products</h3>
                <p className="stat-value">{dashboardData.totalProducts}</p>
                <p className="stat-change positive">+4 this week</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon orders">
                <i className="bi bi-bag"></i>
              </div>
              <div className="stat-details">
                <h3>Total Orders</h3>
                <p className="stat-value">{dashboardData.totalOrders}</p>
                <p className="stat-change positive">+12 this week</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon revenue">
                <i className="bi bi-cash-stack"></i>
              </div>
              <div className="stat-details">
                <h3>Total Revenue</h3>
                <p className="stat-value">Rs. {dashboardData.totalRevenue.toLocaleString()}</p>
                <p className="stat-change positive">+Rs. 8,400 this month</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon views">
                <i className="bi bi-eye"></i>
              </div>
              <div className="stat-details">
                <h3>Store Views</h3>
                <p className="stat-value">{dashboardData.storeViews}</p>
                <p className="stat-change positive">+142 this week</p>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">
                <i className="bi bi-plus-circle"></i>
                <span>Add Product</span>
              </button>
              
              <button className="action-button">
                <i className="bi bi-bag-check"></i>
                <span>Process Orders</span>
              </button>
              
              <button className="action-button">
                <i className="bi bi-stars"></i>
                <span>View Reviews</span>
              </button>
              
              <button className="action-button">
                <i className="bi bi-graph-up"></i>
                <span>Sales Report</span>
              </button>
            </div>
          </div>
          
          {/* Recent Content */}
          <div className="recent-content">
            {/* Recent Products */}
            <div className="recent-products">
              <div className="section-header">
                <h3>Recent Products</h3>
                <button className="view-all">View All</button>
              </div>
              
              <div className="product-list">
                {dashboardData.recentProducts.map(product => (
                  <div className="product-item" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p className="product-price">Rs. {product.price}</p>
                      <p className="product-date">Added on {product.created}</p>
                    </div>
                    <div className="product-actions">
                      <button className="edit-btn">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="view-btn">
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="recent-orders">
              <div className="section-header">
                <h3>Recent Orders</h3>
                <button className="view-all">View All</button>
              </div>
              
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.product}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>Rs. {order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="seller-dashboard-container">
      {/* Sidebar */}
      <div className={`seller-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">
            <i className="bi bi-box-seam"></i>
            {!sidebarCollapsed && <span>NUSTIFY Seller</span>}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <i className={`bi ${sidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        
        <div className="sidebar-menu">
          <div 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigateToPage('dashboard')}
          >
            <i className="bi bi-grid-1x2"></i>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => navigate('/seller/all-products')}
          >
            <i className="bi bi-box-seam"></i>
            {!sidebarCollapsed && <span>Products</span>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'add-product' ? 'active' : ''}`}
            onClick={() => navigate('/seller/add-product')}
          >
            <i className="bi bi-plus-square"></i>
            {!sidebarCollapsed && <span>Add Product</span>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => navigateToPage('orders')}
          >
            <i className="bi bi-bag"></i>
            {!sidebarCollapsed && <span>Orders</span>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => navigateToPage('messages')}
          >
            <i className="bi bi-chat-dots"></i>
            {!sidebarCollapsed && <span>Messages</span>}
            {!sidebarCollapsed && <span className="message-badge">3</span>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => navigate('/seller/analytics')}
          >
            <i className="bi bi-bar-chart"></i>
            {!sidebarCollapsed && <span>Analytics</span>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => navigate('/seller/profile')}
          >
            <i className="bi bi-person"></i>
            {!sidebarCollapsed && <span>Profile</span>}
          </div>
          
          <div className="menu-item">
            <i className="bi bi-box-arrow-left"></i>
            {!sidebarCollapsed && <span>Logout</span>}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`dashboard-main ${sidebarCollapsed ? 'expanded' : ''}`}>
        {/* Top Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h2>Seller Dashboard</h2>
            <p>Welcome back, Ahmed Khan</p>
          </div>
          
          <div className="header-right">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input type="text" placeholder="Search..." />
            </div>
            
            <div className="notification-icon">
              <i className="bi bi-bell"></i>
              <span className="notification-badge">3</span>
            </div>
            
            <div className="user-profile">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" />
              <span className="user-name">Ahmed</span>
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard; 