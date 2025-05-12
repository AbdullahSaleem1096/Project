import React from 'react';
import { FaThLarge, FaDesktop, FaCheckSquare, FaTrophy, FaAppleAlt, FaCheese } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  { name: 'ALL', icon: <FaThLarge /> },
  { name: 'Electronics', icon: <FaDesktop /> },
  { name: 'Stationary', icon: <FaCheckSquare /> },
  { name: 'Sports', icon: <FaTrophy /> },
  { name: 'Fruits', icon: <FaAppleAlt /> },
  { name: 'Dairy', icon: <FaCheese /> },
];

export default function Categories() {
  return (
    <div
      className="d-flex gap-3 px-4 py-3"
      style={{ backgroundColor: '#111', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}
    >
      {categories.map((category, index) => (
        <div
          key={index}
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: '#2e2578',
            color: '#ccc',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            textAlign: 'center',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: '0.2s',
          }}
        >
          <div style={{ fontSize: '1.2rem' }}>{category.icon}</div>
          <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>{category.name}</div>
        </div>
      ))}
    </div>
  );
}
