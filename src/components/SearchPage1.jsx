import React from 'react';
import './SearchPage.css';
import { FaArrowLeft, FaSearch, FaAppleAlt, FaBasketballBall } from 'react-icons/fa';
import { BsGridFill, BsPhoneFill, BsPenFill } from 'react-icons/bs';

const categoryData = [
  { label: 'ALL', icon: <BsGridFill /> },
  { label: 'Electronics', icon: <BsPhoneFill /> },
  { label: 'Stationary', icon: <BsPenFill /> },
  { label: 'Sports', icon: <FaBasketballBall /> },
  { label: 'Fruits', icon: <FaAppleAlt /> },
];

const SearchPage1 = () => {
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
        {categoryData.map(({ label, icon }) => (
          <div className="category-item" key={label}>
            <div className="circle">
              {icon}
            </div>
            <span>{label}</span>
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
    </div>
  );
};

export default SearchPage1;
