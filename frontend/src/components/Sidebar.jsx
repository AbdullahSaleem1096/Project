import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  FaHome, 
  FaStore, 
  FaShoppingCart, 
  FaHeart, 
  FaUser, 
  FaHistory, 
  FaInbox, 
  FaChartLine, 
  FaBox, 
  FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ userRole, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="buyer-sidebar">
      <div className="sidebar-section">
        <h6 className="sidebar-heading">MAIN MENU</h6>
        <nav className="sidebar-nav">
          <Link to="/home" className={`sidebar-link ${isActive('/home') ? 'active' : ''}`}>
            <FaHome className="sidebar-icon" />
            <span>Home</span>
          </Link>
          <Link to="/online-store" className={`sidebar-link ${isActive('/online-store') ? 'active' : ''}`}>
            <FaStore className="sidebar-icon" />
            <span>Store</span>
          </Link>
          
          {isAuthenticated && userRole !== 'seller' && (
            <>
              <Link to="/cart" className={`sidebar-link ${isActive('/cart') ? 'active' : ''}`}>
                <FaShoppingCart className="sidebar-icon" />
                <span>Cart</span>
                {getTotalItems() > 0 && <span className="sidebar-badge">{getTotalItems()}</span>}
              </Link>
              <Link to="/wishlist" className={`sidebar-link ${isActive('/wishlist') ? 'active' : ''}`}>
                <FaHeart className="sidebar-icon" />
                <span>Wishlist</span>
              </Link>
            </>
          )}
        </nav>
      </div>

      {isAuthenticated && (
        <div className="sidebar-section">
          <h6 className="sidebar-heading">ACCOUNT</h6>
          <nav className="sidebar-nav">
            {userRole !== 'seller' ? (
              <>
                <Link to="/buyer/profile" className={`sidebar-link ${isActive('/buyer/profile') ? 'active' : ''}`}>
                  <FaUser className="sidebar-icon" />
                  <span>My Profile</span>
                </Link>
                <Link to="/buyer/orders" className={`sidebar-link ${isActive('/buyer/orders') ? 'active' : ''}`}>
                  <FaHistory className="sidebar-icon" />
                  <span>Order History</span>
                </Link>
                <Link to="/buyer/inbox" className={`sidebar-link ${isActive('/buyer/inbox') ? 'active' : ''}`}>
                  <FaInbox className="sidebar-icon" />
                  <span>Messages</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/seller/dashboard" className={`sidebar-link ${isActive('/seller/dashboard') ? 'active' : ''}`}>
                  <FaChartLine className="sidebar-icon" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/seller/profile" className={`sidebar-link ${isActive('/seller/profile') ? 'active' : ''}`}>
                  <FaUser className="sidebar-icon" />
                  <span>Profile</span>
                </Link>
                <Link to="/seller/product" className={`sidebar-link ${isActive('/seller/product') ? 'active' : ''}`}>
                  <FaBox className="sidebar-icon" />
                  <span>Products</span>
                </Link>
                <Link to="/seller/orders" className={`sidebar-link ${isActive('/seller/orders') ? 'active' : ''}`}>
                  <FaHistory className="sidebar-icon" />
                  <span>Orders</span>
                </Link>
                <Link to="/seller/inbox" className={`sidebar-link ${isActive('/seller/inbox') ? 'active' : ''}`}>
                  <FaInbox className="sidebar-icon" />
                  <span>Messages</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      {isAuthenticated && (
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            <FaSignOutAlt className="sidebar-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 