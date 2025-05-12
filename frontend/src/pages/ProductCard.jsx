import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import './ProductCard.css'; // For custom dark theme card

const ProductCard = ({ product }) => {
  return (
    <div className="col-6 mb-4">
      <div className="card product-card text-light bg-dark border-0 rounded-4 h-100 text-center">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="card-img-top p-3"
          style={{ height: '160px', objectFit: 'contain' }} 
        />
        <div className="card-body">
          <h6 className="card-title">{product.title}</h6>
          <p className="text-danger fw-bold">{product.price}</p>
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-warning me-2">
              ★★★★☆<span className="ms-1">½</span>
            </div>
            <span className="text-muted small">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
