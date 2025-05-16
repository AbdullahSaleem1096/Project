import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerInbox.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function BuyerInbox() {
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
    // In a real application, this would fetch seller contacts from your backend API
    // For example: fetch('/api/buyer/messages/contacts')
    
    // Simulating API fetch with timeout
    setTimeout(() => {
      const fetchedContacts = [
        {
          id: '1',
          name: 'Tech Gadgets Store',
          avatar: 'https://i.imgur.com/nETLo7K.jpg',
          lastMessage: 'Is the gaming mouse still available?',
          timestamp: '2023-06-15T14:30:00',
          unread: 0,
          isOnline: true,
          lastSeen: null
        },
        {
          id: '2',
          name: 'Gaming Essentials',
          avatar: 'https://i.imgur.com/KIbPiZ7.jpg',
          lastMessage: 'Your order has been shipped! Tracking number: TRK123456',
          timestamp: '2023-06-14T09:45:00',
          unread: 2,
          isOnline: false,
          lastSeen: '2023-06-15T10:15:00'
        },
        {
          id: '3',
          name: 'PC Accessories Shop',
          avatar: 'https://i.imgur.com/Y2DoLRa.jpg',
          lastMessage: 'Thank you for your order!',
          timestamp: '2023-06-12T18:20:00',
          unread: 0,
          isOnline: true,
          lastSeen: null
        },
        {
          id: '4',
          name: 'Premium Gaming',
          avatar: 'https://i.imgur.com/xDJDFWf.jpg',
          lastMessage: 'We apologize for the inconvenience.',
          timestamp: '2023-06-10T11:05:00',
          unread: 0,
          isOnline: false,
          lastSeen: '2023-06-15T08:30:00'
        },
        {
          id: '5',
          name: 'Console World',
          avatar: 'https://i.imgur.com/6pLl5zV.jpg',
          lastMessage: 'Do you need any other accessories?',
          timestamp: '2023-06-08T16:40:00',
          unread: 1,
          isOnline: false,
          lastSeen: '2023-06-14T22:10:00'
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
    // For example: fetch(`/api/buyer/messages/${contactId}`)
    
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
          { id: '1', sender: 'buyer', content: 'Hi, I just placed an order for a gaming headset. Order ID: ORD-7830', timestamp: '2023-06-14T09:20:00' },
          { id: '2', sender: 'seller', content: 'Thank you for your order! We\'re processing it now.', timestamp: '2023-06-14T09:25:00' },
          { id: '3', sender: 'seller', content: 'Your order has been shipped! Tracking number: TRK123456', timestamp: '2023-06-14T09:45:00' }
        ],
        '3': [
          { id: '1', sender: 'seller', content: 'Thank you for your order!', timestamp: '2023-06-12T18:20:00' }
        ],
        '4': [
          { id: '1', sender: 'buyer', content: 'I received my gaming chair but there seems to be a part missing.', timestamp: '2023-06-10T10:30:00' },
          { id: '2', sender: 'seller', content: 'We apologize for the inconvenience. Can you please send a photo of what you received?', timestamp: '2023-06-10T10:40:00' },
          { id: '3', sender: 'buyer', content: 'Sure, I\'ll send it shortly.', timestamp: '2023-06-10T10:45:00' },
          { id: '4', sender: 'seller', content: 'We apologize for the inconvenience.', timestamp: '2023-06-10T11:05:00' }
        ],
        '5': [
          { id: '1', sender: 'seller', content: 'Thank you for your purchase of the PS5 controller!', timestamp: '2023-06-08T16:20:00' },
          { id: '2', sender: 'buyer', content: 'You\'re welcome. It\'s working great!', timestamp: '2023-06-08T16:30:00' },
          { id: '3', sender: 'seller', content: 'Do you need any other accessories?', timestamp: '2023-06-08T16:40:00' }
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
      sender: 'buyer',
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
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Sort contacts by latest message
  const sortedContacts = [...filteredContacts].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="buyer-inbox-container">
      {/* Page Header */}
      <div className="inbox-header">
        <h2>Messages</h2>
        <p>Chat with sellers about your orders and products</p>
      </div>
      
      <div className="inbox-content">
        {/* Contacts Sidebar */}
        <div className="contacts-sidebar">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input 
              type="text" 
              placeholder="Search sellers" 
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
              <p>Choose a seller from the list to view your conversation</p>
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
                  <p>{activeContact.isOnline ? 'Online' : `Last seen ${formatTimestamp(activeContact.lastSeen)}`}</p>
                </div>
                <div className="header-actions">
                  <button className="header-btn" title="View profile">
                    <i className="bi bi-shop"></i>
                  </button>
                  <button className="header-btn" title="Search in conversation">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="messages-container">
                <div className="messages-list">
                  {conversations[activeContact.id]?.map((msg, index) => (
                    <div 
                      key={msg.id} 
                      className={`message ${msg.sender === 'buyer' ? 'outgoing' : 'incoming'}`}
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
                <button className="input-action-btn" title="Attach file">
                  <i className="bi bi-paperclip"></i>
                </button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyerInbox; 