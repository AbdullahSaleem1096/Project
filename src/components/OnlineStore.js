import React, { useState, useEffect } from 'react';
import './OnlineStore.css';
import Cartbar from './Cartbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


function OnlineStore() {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate(); // ✅ correctly placed here

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  const openChat = () => {
    navigate("/chat"); // ✅ navigate to MessagingUI page
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page-container">
      <div className="product-box position-relative">
        {/* Header */}
        <header className="header-bar d-flex justify-content-between align-items-center px-3 py-2">
          <span className="brand">NUSTIFY</span>
          <input type="text" className="search-input" placeholder="Search products" />
          <div className="icons">
            <i className="bi bi-cart2 me-3" onClick={toggleCart} style={{ cursor: 'pointer' }}></i>
            <i className="bi bi-heart"></i>
          </div>
        </header>

        {/* Main content */}
        <div className="product-card">
          <div className="product-image-wrapper">
            <img src="https://i.imgur.com/5R0uJqb.png" alt="Gamepad" className="product-img" />
            <i className="bi bi-heart-fill heart-icon"></i>
          </div>

          <div className="text-start px-3">
            <h5 className="product-title">Havic HV G-92 Gamepad</h5>
            <p className="rating">
              ⭐⭐⭐⭐☆ <span className="review-count">(150 Reviews)</span>{' '}
              <span className="in-stock">In&nbsp;stock</span>
            </p>
            <p className="location">Razi hostel, 318</p>
            <h5 className="price">Rs. 1920</h5>
            <button className="btn btn-buy mt-2">Buy&nbsp;Now</button>

            {/* Description */}
            <div className="section">
              <div className="section-header">
                Description <span className="view-all">VIEW ALL</span>
              </div>
              <div className="section-box">
                PlayStation 5 Controller Skin: high-quality vinyl with adhesive
                for easy bubble-free install &amp; mess-free …
              </div>
            </div>

            {/* Reviews */}
            <div className="section">
              <div className="section-header">
                Customer Reviews <span className="view-all">VIEW ALL</span>
              </div>
              <div className="section-box review-box">
                <div className="reviewer">
                  <i className="bi bi-key"></i> JOHN DOE
                  <span className="time-ago"> • 2 days ago</span>
                </div>
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <div>
                  PlayStation 5 Controller Skin – high-quality vinyl with easy
                  bubble-free install &amp; mess-free …
                </div>
              </div>
              <button className="btn btn-write-review">Write a Review</button>
            </div>

            {/* More from store */}
            <div className="section mt-4">
              <div className="section-header">More from this store</div>
              <div className="product-grid">
                {['Gucci duffle bag', 'Laptop', 'Jacket', 'Another Bag'].map((item, idx) => (
                  <div key={idx} className="product-small-card">
                    <img
                      src="https://via.placeholder.com/100"
                      alt={item}
                      className="small-img"
                    />
                    <p className="item-title">{item}</p>
                    <p className="item-price">₨960</p>
                    <p className="rating-small">⭐⭐⭐⭐☆ (65)</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show More */}
          <div className="text-center mt-3 mb-2">
            <button className="btn btn-show-more">Show More</button>
          </div>
        </div>
      </div>

      {/* CartBar (only if showCart is true) */}
      <AnimatePresence>
      {showCart && <Cartbar onClose={toggleCart} mode="overlay"  />}
      </AnimatePresence>

            <div
        className="chat-float-button"
        onClick={openChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
          backgroundColor: "#4b00e0",
          color: "white",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <i className="bi bi-chat-dots-fill" style={{ fontSize: "1.4rem" }}></i>
      </div>
    </div>



  );
}

export default OnlineStore;
