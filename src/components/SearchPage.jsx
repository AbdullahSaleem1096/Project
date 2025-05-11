import React from 'react';
import './SearchPage.css';
import { FaArrowLeft, FaSearch, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsLaptop, BsPencil, BsBasket, BsApple } from 'react-icons/bs'; // Corrected icon

const SearchPage = () => {
  return (
    <div className="search-page">
      {/* Top Bar */}
      <div className="top-bar">
        <FaArrowLeft className="icon" />
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search products" />
        </div>
      </div>

      {/* Browse by Category */}
      <h3>Browse by Category</h3>
      <div className="category-scroll">
        {[
          { name: 'ALL', icon: <FaSearch /> },
          { name: 'Electronics', icon: <BsLaptop /> },
          { name: 'Stationary', icon: <BsPencil /> },
          { name: 'Sports', icon: <BsBasket /> },
          { name: 'Fruits', icon: <BsApple /> }
        ].map(({ name, icon }) => (
          <div className="category-item" key={name}>
            <div className="circle">
              {icon}
            </div>
            <span>{name}</span>
          </div>
        ))}
      </div>

      {/* Search History */}
      <h4>Search History</h4>
      <div className="search-history">
        {['Strawberries Fresh', 'Pens', 'Air Conditioner', 'Strawberries Fresh'].map((term, idx) => (
          <span key={idx} className="history-pill">{term}</span>
        ))}
      </div>

      {/* Best Sellers */}
      <h4>Best Sellers</h4>
      <div className="product-list">
        {[1, 2, 3].map((i) => (
          <div className="product-card" key={i}>
            <img
              src="https://i.imgur.com/6M5130R.png"
              alt="Gucci duffle bag"
              className="product-image"
            />
            <p className="product-name">Gucci duffle bag</p>
            <p className="price">$960</p>
            <div className="stars">
              <FaStar /><FaStar /><FaStar />< FaStarHalfAlt />< FaStarHalfAlt />
              <span>(65)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
