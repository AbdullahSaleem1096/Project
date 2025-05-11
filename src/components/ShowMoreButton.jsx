import React from 'react';

const ShowMoreButton = () => {
  return (
    <button
      style={{
        background: 'linear-gradient(45deg, #ff69b4, #8a2be2)', // pink to purple
        color: 'white',
        padding: '10px 24px',
        border: 'none',
        borderRadius: '30px',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s ease',
      }}
      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      Show More
    </button>
  );
};

export default ShowMoreButton;
