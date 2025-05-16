import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaUser, FaShoppingCart, FaHeart, FaInbox, FaHistory, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = ({ userRole, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { getTotalItems } = useCart();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const quickNavLinks = [
    { to: '/home', label: 'Home', icon: <span className="nav-icon">🏠</span> },
    { to: '/online-store', label: 'Store', icon: <span className="nav-icon">🛍️</span> },
    { 
      to: '/wishlist', 
      label: 'Wishlist', 
      icon: <FaHeart />, 
      showWhenLoggedIn: true 
    },
    { 
      to: '/cart', 
      label: 'Cart', 
      icon: <FaShoppingCart />, 
      badge: getTotalItems() 
    },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/home" className="logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">Nustify</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav desktop-nav">
          {quickNavLinks.map(link => (
            (!link.showWhenLoggedIn || (link.showWhenLoggedIn && isAuthenticated)) && (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.icon}
                <span className="nav-label">{link.label}</span>
                {link.badge > 0 && <span className="nav-badge">{link.badge}</span>}
              </Link>
            )
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right Side - User Menu */}
        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-menu" ref={dropdownRef}>
              <button 
                className="user-profile-btn"
                onClick={toggleUserDropdown}
              >
                <FaUserCircle size={24} />
                <span className="user-name">{userRole === 'seller' ? 'Seller' : 'Buyer'}</span>
              </button>
              
              {isUserDropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <FaUserCircle size={40} />
                    <div>
                      <h6>User Name</h6>
                      <p className="text-muted">{userRole}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  
                  {userRole !== 'seller' && (
                    <>
                      <Link to="/buyer/profile" className="dropdown-item">
                        <FaUser /> <span>Profile</span>
                      </Link>
                      <Link to="/cart" className="dropdown-item">
                        <FaShoppingCart /> 
                        <span>Cart</span>
                        {getTotalItems() > 0 && (
                          <span className="item-badge">{getTotalItems()}</span>
                        )}
                      </Link>
                      <Link to="/wishlist" className="dropdown-item">
                        <FaHeart /> <span>Wishlist</span>
                      </Link>
                      <Link to="/buyer/orders" className="dropdown-item">
                        <FaHistory /> <span>My Orders</span>
                      </Link>
                      <Link to="/buyer/inbox" className="dropdown-item">
                        <FaInbox /> <span>Inbox</span>
                      </Link>
                    </>
                  )}
                  
                  {userRole === 'seller' && (
                    <>
                      <Link to="/seller/profile" className="dropdown-item">
                        <FaUser /> <span>Profile</span>
                      </Link>
                      <Link to="/seller/dashboard" className="dropdown-item">
                        <span className="nav-icon">📊</span> <span>Dashboard</span>
                      </Link>
                      <Link to="/seller/orders" className="dropdown-item">
                        <FaHistory /> <span>Orders</span>
                      </Link>
                      <Link to="/seller/inbox" className="dropdown-item">
                        <FaInbox /> <span>Inbox</span>
                      </Link>
                    </>
                  )}
                  
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <FaSignOutAlt /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                <span className="login-icon">🔑</span>
                <span>Login</span>
              </Link>
              <Link to="/signup" className="signup-btn">
                <span className="signup-icon">✨</span>
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/home" className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Nustify</span>
          </Link>
          <button className="close-sidebar" onClick={toggleMobileMenu}>
            <FaTimes />
          </button>
        </div>
        
        <div className="sidebar-content">
          {isAuthenticated && (
            <div className="sidebar-user-info">
              <FaUserCircle size={50} />
              <h5>User Name</h5>
              <p>{userRole}</p>
            </div>
          )}
          
          <nav className="sidebar-nav">
            <Link to="/home" className="sidebar-link">
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>
            <Link to="/online-store" className="sidebar-link">
              <span className="nav-icon">🛍️</span>
              <span>Store</span>
            </Link>
            
            {isAuthenticated && userRole !== 'seller' && (
              <>
                <Link to="/cart" className="sidebar-link">
                  <FaShoppingCart />
                  <span>Cart</span>
                  {getTotalItems() > 0 && <span className="sidebar-badge">{getTotalItems()}</span>}
                </Link>
                <Link to="/wishlist" className="sidebar-link">
                  <FaHeart />
                  <span>Wishlist</span>
                </Link>
                <Link to="/buyer/profile" className="sidebar-link">
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <Link to="/buyer/orders" className="sidebar-link">
                  <FaHistory />
                  <span>My Orders</span>
                </Link>
                <Link to="/buyer/inbox" className="sidebar-link">
                  <FaInbox />
                  <span>Inbox</span>
                </Link>
              </>
            )}
            
            {isAuthenticated && userRole === 'seller' && (
              <>
                <Link to="/seller/dashboard" className="sidebar-link">
                  <span className="nav-icon">📊</span>
                  <span>Dashboard</span>
                </Link>
                <Link to="/seller/profile" className="sidebar-link">
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <Link to="/seller/product" className="sidebar-link">
                  <span className="nav-icon">📦</span>
                  <span>Products</span>
                </Link>
                <Link to="/seller/orders" className="sidebar-link">
                  <FaHistory />
                  <span>Orders</span>
                </Link>
                <Link to="/seller/inbox" className="sidebar-link">
                  <FaInbox />
                  <span>Inbox</span>
                </Link>
              </>
            )}
            
            <Link to="/about-us" className="sidebar-link">
              <span className="nav-icon">ℹ️</span>
              <span>About</span>
            </Link>
            <Link to="/contact-support" className="sidebar-link">
              <span className="nav-icon">🆘</span>
              <span>Support</span>
            </Link>
            
            {isAuthenticated ? (
              <button onClick={handleLogout} className="sidebar-link logout-link">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <div className="sidebar-auth">
                <Link to="/login" className="sidebar-auth-btn login">
                  <span className="login-icon">🔑</span>
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="sidebar-auth-btn signup">
                  <span className="signup-icon">✨</span>
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>
      )}
    </header>
  );
};

export default Header; 