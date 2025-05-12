// src/components/Navbar.jsx
import React from 'react';
import { FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <nav
      className="navbar d-flex justify-content-between align-items-center px-4 py-3"
      style={{
        backgroundColor: '#0d014f',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }}
    >
      {/* Logo Text */}
      <span className="navbar-brand fw-bold mb-0" style={{ color: '#a855f7', fontSize: '1.5rem' }}>
        NUSTIFY
      </span>

      {/* Search + Icons */}
      <form className="d-flex align-items-center gap-3 m-0">
        <div
          className="d-flex align-items-center px-3 py-1 rounded-pill"
          style={{
            backgroundColor: '#000',
            color: '#ccc',
            width: '220px',
          }}
        >
          <FaSearch className="me-2" />
          <input
            className="form-control form-control-sm bg-transparent text-white border-0 p-0"
            type="search"
            placeholder="Search products"
            style={{ fontSize: '0.9rem' }}
          />
        </div>

        <FaHeart className="text-white fs-5 cursor-pointer" />
        <FaShoppingCart className="text-white fs-5 cursor-pointer" />
      </form>
    </nav>
  );
}
