import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerInbox.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SellerInbox() {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState({});
  const [loading, setLoading] = useState(true);
  
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  // Fetch contacts data - in a real app, this would be an API call
  useEffect(() => {
    // In a real application, this would fetch buyer contacts from your backend API
    // For example: fetch('/api/seller/messages/contacts')
    
    // Simulating API fetch with timeout
    setTimeout(() => {
      const fetchedContacts = [
        {
          id: '1',
          name: 'Ali Khan',
          avatar: 'https://i.imgur.com/vPTPVVv.jpg',
          lastMessage: 'Is the gaming mouse still available?',
          timestamp: '2023-06-15T14:30:00',
          unread: 0,
          isOnline: true,
          lastSeen: null,
          orderId: 'ORD-7829'
        },
        {
          id: '2',
          name: 'Sara Ahmed',
          avatar: 'https://i.imgur.com/OZYd2Ih.jpg',
          lastMessage: 'Thanks for the quick response!',
          timestamp: '2023-06-14T10:15:00',
          unread: 1,
          isOnline: false,
          lastSeen: '2023-06-15T09:20:00',
          orderId: 'ORD-7830'
        },
        {
          id: '3',
          name: 'Usman Ali',
          avatar: 'https://i.imgur.com/V0AHoJt.jpg',
          lastMessage: 'Do you offer extended warranty?',
          timestamp: '2023-06-13T16:45:00',
          unread: 2,
          isOnline: true,
          lastSeen: null,
          orderId: 'ORD-7831'
        },
        {
          id: '4',
          name: 'Fatima Shah',
          avatar: 'https://i.imgur.com/DNVYQpX.jpg',
          lastMessage: 'When will my order be delivered?',
          timestamp: '2023-06-11T09:30:00',
          unread: 0,
          isOnline: false,
          lastSeen: '2023-06-15T12:10:00',
          orderId: 'ORD-7832'
        },
        {
          id: '5',
          name: 'Hamza Khan',
          avatar: 'https://i.imgur.com/vYc3FLh.jpg',
          lastMessage: 'I understand, thank you.',
          timestamp: '2023-06-10T14:20:00',
          unread: 0,
          isOnline: false,
          lastSeen: '2023-06-12T18:30:00',
          orderId: 'ORD-7833'
        }
      ];
      
      setContacts(fetchedContacts);
      setLoading(false);
      
      // Set first contact as active by default if none is selected
      if (!activeContact && fetchedContacts.length > 0) {
        setActiveContact(fetchedContacts[0]);
        fetchConversation(fetchedContacts[0].id);
      }
    }, 1000);
  }, [activeContact]);

  // Fetch conversation for a contact
  const fetchConversation = (contactId) => {
    // In a real application, this would fetch messages from your backend API
    // For example: fetch(`/api/seller/messages/${contactId}`)
    
    // Simulating API fetch
    setTimeout(() => {
      // Sample conversations
      const sampleConversations = {
        '1': [
          { id: '1', sender: 'buyer', content: 'Hello, I am interested in your gaming mouse.', timestamp: '2023-06-15T13:20:00' },
          { id: '2', sender: 'seller', content: 'Hi there! Yes, we have several models available.', timestamp: '2023-06-15T13:25:00' },
          { id: '3', sender: 'buyer', content: 'Do you have the RGB model with 8 programmable buttons?', timestamp: '2023-06-15T13:30:00' },
          { id: '4', sender: 'seller', content: 'Yes, we do! It\'s currently in stock.', timestamp: '2023-06-15T13:35:00' },
          { id: '5', sender: 'buyer', content: 'Great! What\'s the price?', timestamp: '2023-06-15T13:40:00' },
          { id: '6', sender: 'seller', content: 'It\'s Rs. 3,500. We also offer a 6-month warranty.', timestamp: '2023-06-15T13:45:00' },
          { id: '7', sender: 'buyer', content: 'Is the gaming mouse still available?', timestamp: '2023-06-15T14:30:00' }
        ],
        '2': [
          { id: '1', sender: 'buyer', content: 'Hi, I just placed an order for a gaming headset. When can I expect it to be shipped?', timestamp: '2023-06-14T09:30:00' },
          { id: '2', sender: 'seller', content: 'Hello! Thank you for your order. We\'ll ship it today and it should arrive within 2-3 business days.', timestamp: '2023-06-14T09:45:00' },
          { id: '3', sender: 'buyer', content: 'That\'s great! Do you provide a tracking number?', timestamp: '2023-06-14T10:00:00' },
          { id: '4', sender: 'seller', content: 'Yes, you\'ll receive a tracking number via email once the package is shipped.', timestamp: '2023-06-14T10:05:00' },
          { id: '5', sender: 'buyer', content: 'Thanks for the quick response!', timestamp: '2023-06-14T10:15:00' }
        ],
        '3': [
          { id: '1', sender: 'buyer', content: 'Hello, I purchased a mechanical keyboard from your store last week.', timestamp: '2023-06-13T16:15:00' },
          { id: '2', sender: 'seller', content: 'Hi there! How are you liking it?', timestamp: '2023-06-13T16:20:00' },
          { id: '3', sender: 'buyer', content: 'It\'s amazing! I was wondering if you sell wrist rests that would fit this model?', timestamp: '2023-06-13T16:25:00' },
          { id: '4', sender: 'seller', content: 'We do! We have memory foam and wooden wrist rests available that are compatible with your keyboard.', timestamp: '2023-06-13T16:30:00' },
          { id: '5', sender: 'buyer', content: 'Perfect! And one more question.', timestamp: '2023-06-13T16:35:00' },
          { id: '6', sender: 'seller', content: 'Sure, what would you like to know?', timestamp: '2023-06-13T16:40:00' },
          { id: '7', sender: 'buyer', content: 'Do you offer extended warranty?', timestamp: '2023-06-13T16:45:00' }
        ],
        '4': [
          { id: '1', sender: 'buyer', content: 'Hi, I ordered a controller stand (Order ID: ORD-7832) two days ago.', timestamp: '2023-06-11T09:10:00' },
          { id: '2', sender: 'seller', content: 'Hello! Thanks for your order. Is there anything we can help you with?', timestamp: '2023-06-11T09:15:00' },
          { id: '3', sender: 'buyer', content: 'Yes, I was wondering about the delivery timeline.', timestamp: '2023-06-11T09:20:00' },
          { id: '4', sender: 'seller', content: 'Your order is being processed and should be shipped by tomorrow. Delivery typically takes 2-3 days after shipping.', timestamp: '2023-06-11T09:25:00' },
          { id: '5', sender: 'buyer', content: 'When will my order be delivered?', timestamp: '2023-06-11T09:30:00' }
        ],
        '5': [
          { id: '1', sender: 'buyer', content: 'Hello, I want to cancel my order for the gaming chair (ORD-7833).', timestamp: '2023-06-10T13:50:00' },
          { id: '2', sender: 'seller', content: 'Hi Hamza, I\'m sorry to hear that. May I ask why you want to cancel?', timestamp: '2023-06-10T14:00:00' },
          { id: '3', sender: 'buyer', content: 'There\'s been a delay in my apartment renovation, so I won\'t be able to receive it right now.', timestamp: '2023-06-10T14:10:00' },
          { id: '4', sender: 'seller', content: 'I understand. We\'ll process your cancellation and issue a refund to your original payment method within 3-5 business days.', timestamp: '2023-06-10T14:15:00' },
          { id: '5', sender: 'buyer', content: 'I understand, thank you.', timestamp: '2023-06-10T14:20:00' }
        ]
      };
      
      setConversations(prev => ({
        ...prev,
        [contactId]: sampleConversations[contactId] || []
      }));
      
      // Mark as read when opening conversation
      if (activeContact && activeContact.id === contactId && activeContact.unread > 0) {
        setContacts(contacts.map(contact => 
          contact.id === contactId ? {...contact, unread: 0} : contact
        ));
      }
      
      // Scroll to bottom of messages
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    }, 500);
  };

  // Handle contact selection
  const handleContactSelect = (contact) => {
    setActiveContact(contact);
    fetchConversation(contact.id);
  };

  // Send a message
  const sendMessage = () => {
    if (message.trim() === '' || !activeContact) return;
    
    // In a real app, this would send the message to your backend API
    // For example: fetch('/api/messages', { method: 'POST', body: JSON.stringify({ recipientId: activeContact.id, content: message }) })
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'seller',
      content: message,
      timestamp: new Date().toISOString()
    };
    
    // Update conversations state
    setConversations(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));
    
    // Update last message in contacts
    setContacts(contacts.map(contact => 
      contact.id === activeContact.id 
        ? {
            ...contact, 
            lastMessage: message,
            timestamp: new Date().toISOString()
          } 
        : contact
    ));
    
    // Clear message input
    setMessage('');
    
    // Scroll to bottom of messages
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // View order details
  const viewOrderDetails = (orderId) => {
    // In a real app, this would navigate to the order details page
    navigate(`/seller/orders/${orderId}`);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today: Show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffDays < 7) {
      // Within a week: Show day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // Older: Show date
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
  };

  // Filter contacts based on search term
  const filteredContacts = searchTerm.trim() === '' 
    ? contacts
    : contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Sort contacts by latest message
  const sortedContacts = [...filteredContacts].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="seller-inbox-container">
      {/* Page Header */}
      <div className="inbox-header">
        <div className="header-left">
          <h2>Customer Messages</h2>
          <p>Respond to inquiries and manage customer communications</p>
        </div>
      </div>
      
      <div className="inbox-content">
        {/* Contacts Sidebar */}
        <div className="contacts-sidebar">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input 
              type="text" 
              placeholder="Search by customer name or order ID" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading contacts...</p>
            </div>
          ) : sortedContacts.length === 0 ? (
            <div className="no-contacts">
              <i className="bi bi-chat-dots"></i>
              <p>No conversations found</p>
            </div>
          ) : (
            <div className="contacts-list">
              {sortedContacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`contact-item ${activeContact?.id === contact.id ? 'active' : ''}`}
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className="contact-avatar">
                    <img src={contact.avatar} alt={contact.name} />
                    {contact.isOnline && <span className="online-indicator"></span>}
                  </div>
                  <div className="contact-info">
                    <div className="contact-header">
                      <h3 className="contact-name">{contact.name}</h3>
                      <span className="contact-time">{formatTimestamp(contact.timestamp)}</span>
                    </div>
                    <div className="contact-order">
                      <span className="order-id">{contact.orderId}</span>
                    </div>
                    <div className="contact-message">
                      <p>{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <span className="unread-badge">{contact.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Conversation */}
        <div className="conversation-container">
          {!activeContact ? (
            <div className="no-conversation">
              <i className="bi bi-chat-square-text"></i>
              <h3>Select a conversation</h3>
              <p>Choose a customer from the list to view your conversation</p>
            </div>
          ) : (
            <>
              {/* Conversation Header */}
              <div className="conversation-header">
                <div className="contact-avatar">
                  <img src={activeContact.avatar} alt={activeContact.name} />
                </div>
                <div className="contact-details">
                  <h3>{activeContact.name}</h3>
                  <div className="contact-meta">
                    <span className="online-status">
                      {activeContact.isOnline ? 'Online' : `Last seen ${formatTimestamp(activeContact.lastSeen)}`}
                    </span>
                    <span className="separator">•</span>
                    <span 
                      className="order-link" 
                      onClick={() => viewOrderDetails(activeContact.orderId)}
                    >
                      Order {activeContact.orderId}
                    </span>
                  </div>
                </div>
                <div className="header-actions">
                  <button 
                    className="header-btn" 
                    title="View order details"
                    onClick={() => viewOrderDetails(activeContact.orderId)}
                  >
                    <i className="bi bi-box-seam"></i>
                  </button>
                  <button className="header-btn" title="Call customer">
                    <i className="bi bi-telephone"></i>
                  </button>
                  <button className="header-btn" title="More options">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="messages-container">
                <div className="messages-list">
                  {conversations[activeContact.id]?.map((msg, index) => (
                    <div 
                      key={msg.id} 
                      className={`message ${msg.sender === 'seller' ? 'outgoing' : 'incoming'}`}
                    >
                      <div className="message-content">
                        <p>{msg.content}</p>
                        <span className="message-time">{formatTimestamp(msg.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
              
              {/* Message Input */}
              <div className="message-input-container">
                <div className="input-actions">
                  <button className="input-action-btn" title="Attach file">
                    <i className="bi bi-paperclip"></i>
                  </button>
                  <button className="input-action-btn" title="Send template response">
                    <i className="bi bi-reply"></i>
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="Type a message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                  className="send-btn" 
                  onClick={sendMessage}
                  disabled={message.trim() === ''}
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
              
              {/* Quick Response Templates */}
              <div className="quick-responses">
                <button className="quick-response-btn" onClick={() => setMessage("Thank you for your inquiry. How can I help you today?")}>
                  Thank you for your inquiry
                </button>
                <button className="quick-response-btn" onClick={() => setMessage("Your order has been shipped! You'll receive a tracking number shortly.")}>
                  Order shipped
                </button>
                <button className="quick-response-btn" onClick={() => setMessage("I apologize for the inconvenience. Let me help resolve this issue.")}>
                  Apologize
                </button>
                <button className="quick-response-btn" onClick={() => setMessage("Is there anything else I can help you with?")}>
                  Anything else?
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerInbox; 