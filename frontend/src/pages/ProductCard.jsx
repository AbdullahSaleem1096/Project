import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import WishlistButton from '../components/WishlistButton';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product._id,
      name: product.name || product.title,
      price: typeof product.price === 'string' 
        ? parseFloat(product.price.replace('Rs. ', '')) 
        : product.price,
      image: product.image || product.imageUrl,
      quantity: 1
    });
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div 
        className="card product-card text-light bg-dark border-0 rounded-4 h-100 text-center cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="product-card-image-container">
          <img 
            src={product.image || product.imageUrl} 
            alt={product.name || product.title} 
            className="card-img-top p-3"
            style={{ height: '160px', objectFit: 'contain' }} 
          />
          {product.bestSeller && (
            <span className="bestseller-badge">Best Seller</span>
          )}
          <div className="product-card-actions">
            <div 
              onClick={(e) => e.stopPropagation()}
              className="btn-icon wishlist-btn"
            >
              <WishlistButton 
                productId={product._id} 
                variant="link" 
                className="text-white"
              />
            </div>
            <button 
              className="btn btn-icon cart-btn"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
        <div className="card-body">
          <h6 className="card-title text-truncate">{product.name || product.title}</h6>
          <p className="text-danger fw-bold">
            Rs. {typeof product.price === 'string' 
              ? product.price.replace('Rs. ', '') 
              : product.price}
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-warning me-2">
              ★★★★☆<span className="ms-1">½</span>
            </div>
            <span className="text-muted small">({product.reviews || 0})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
