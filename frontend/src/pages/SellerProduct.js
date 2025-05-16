import React, { useState, useEffect } from 'react';
import './SellerProduct.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function SellerProduct() {
  // State
  const [showCart, setShowCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState({
    title: 'Havic HV G-92 Gamepad',
    price: '1,920',
    stock: 24,
    description: 'PlayStation 5 Controller Skin: high-quality vinyl with adhesive for easy bubble-free installation and mess-free removal. Precision cut to perfectly fit your controller while providing access to all buttons and ports.\n\nFeatures vibrant, fade-resistant colors and premium durability to protect your controller from scratches and wear.',
    status: 'active'
  });
  
  const navigate = useNavigate();
  
  // Sample product images
  const productImages = [
    "https://i.imgur.com/5R0uJqb.png",
    "https://i.imgur.com/qIr5e9S.jpg",
    "https://i.imgur.com/KnQZlFy.jpg",
    "https://i.imgur.com/HKGncfc.jpg"
  ];


  // Handlers
  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  const openChat = () => {
    navigate("/chat");
  };

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // In a real app, you would save changes to the backend here
    console.log('Saving product changes:', productData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleStatusChange = (status) => {
    setProductData({
      ...productData,
      status: status
    });
  };

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product-page-container">
      <div className="product-box">
        {/* Header Bar */}
        <header className="header-bar">
          <div className="brand">NUSTIFY</div>
          <input type="text" className="search-input" placeholder="Search your products..." />
          <div className="icons">
            <i className="bi bi-grid me-3" title="Dashboard" onClick={() => navigate('/seller-dashboard')}></i>
            <i className="bi bi-box-seam me-3" title="My Products" onClick={() => navigate('/seller-products')}></i>
            <i className="bi bi-person-circle" title="My Profile"></i>
          </div>
        </header>

        {/* Seller Actions Bar */}
        <div className="seller-actions-bar">
          <div className="product-status">
            <span className="status-label">Status:</span>
            <div className="status-dropdown">
              <div className={`status-indicator ${productData.status}`}>
                {productData.status === 'active' ? 'Active' : 
                 productData.status === 'draft' ? 'Draft' : 
                 productData.status === 'sold' ? 'Sold Out' : 'Inactive'}
              </div>
              <div className="status-options">
                <div className={`status-option ${productData.status === 'active' ? 'selected' : ''}`} 
                     onClick={() => handleStatusChange('active')}>
                  <span className="status-dot active"></span> Active
                </div>
                <div className={`status-option ${productData.status === 'draft' ? 'selected' : ''}`}
                     onClick={() => handleStatusChange('draft')}>
                  <span className="status-dot draft"></span> Draft
                </div>
                <div className={`status-option ${productData.status === 'inactive' ? 'selected' : ''}`}
                     onClick={() => handleStatusChange('inactive')}>
                  <span className="status-dot inactive"></span> Inactive
                </div>
                <div className={`status-option ${productData.status === 'sold' ? 'selected' : ''}`}
                     onClick={() => handleStatusChange('sold')}>
                  <span className="status-dot sold"></span> Sold Out
                </div>
              </div>
            </div>
          </div>
          <div className="seller-actions">
            {isEditing ? (
              <>
                <button className="action-btn cancel" onClick={handleEditToggle}>
                  <i className="bi bi-x-circle"></i> Cancel
                </button>
                <button className="action-btn save" onClick={handleSaveChanges}>
                  <i className="bi bi-check-circle"></i> Save Changes
                </button>
              </>
            ) : (
              <>
                <button className="action-btn edit" onClick={handleEditToggle}>
                  <i className="bi bi-pencil"></i> Edit Product
                </button>
                <button className="action-btn duplicate">
                  <i className="bi bi-copy"></i> Duplicate
                </button>
                <button className="action-btn delete">
                  <i className="bi bi-trash"></i> Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Metrics & Analytics */}
        <div className="seller-info-bar">
          <div className="product-metrics">
            <div className="metric">
              <i className="bi bi-eye"></i>
              <div className="metric-data">
                <div className="metric-value">354</div>
                <div className="metric-label">Views</div>
              </div>
            </div>
            <div className="metric">
              <i className="bi bi-heart"></i>
              <div className="metric-data">
                <div className="metric-value">48</div>
                <div className="metric-label">Favorites</div>
              </div>
            </div>
            <div className="metric">
              <i className="bi bi-cart"></i>
              <div className="metric-data">
                <div className="metric-value">12</div>
                <div className="metric-label">Orders</div>
              </div>
            </div>
            <div className="metric">
              <i className="bi bi-star"></i>
              <div className="metric-data">
                <div className="metric-value">4.5</div>
                <div className="metric-label">Rating</div>
              </div>
            </div>
          </div>
          <div className="listing-date">
            <span>Listed on: May 15, 2023</span>
            <span>Last updated: June 22, 2023</span>
          </div>
        </div>

        {/* Main Product Content */}
        <div className="product-content">
          {/* Left column - Product image */}
          <div className="product-image-column">
            <div className="product-image-wrapper">
              <img 
                src={productImages[currentImageIndex]} 
                alt="Gamepad" 
                className="product-img" 
              />
              {isEditing && (
                <div className="image-controls">
                  <button className="img-control-btn">
                    <i className="bi bi-upload"></i> Upload Image
                  </button>
                  <button className="img-control-btn">
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </div>
              )}
            </div>
            <div className="thumbnail-row">
              {productImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => changeImage(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                  {isEditing && (
                    <div className="thumbnail-remove">
                      <i className="bi bi-x-circle"></i>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="thumbnail add-thumbnail">
                  <i className="bi bi-plus-lg"></i>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Product details */}
          <div className="product-details-column">
            {/* Product Title */}
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                className="edit-title-input"
                placeholder="Product Title"
              />
            ) : (
              <h1 className="product-title">{productData.title}</h1>
            )}

            {/* Ratings & Stock Info */}
            <div className="rating">
              <div className="stars">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
              </div>
              <span className="review-count">150 Reviews</span>
              <span className="in-stock">
                {isEditing ? (
                  <input 
                    type="number" 
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    className="stock-input"
                    min="0"
                  />
                ) : (
                  `${productData.stock} in stock`
                )}
              </span>
            </div>

            {/* Seller Location */}
            <div className="seller-location-info">
              <i className="bi bi-geo-alt"></i> Your Location: Razi Hostel, Room 318
            </div>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-wrapper">
                <span className="currency">Rs.</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="price-input"
                    placeholder="Price"
                  />
                ) : (
                  <div className="price">{productData.price}</div>
                )}
              </div>
              <div className="promotion-label">Promotion available</div>
              <div className="promotion-settings">
                <button className="promotion-btn">
                  <i className="bi bi-tag"></i> Set Promotion
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div className="section">
              <div className="section-header">
                Product Description
                {!isEditing && <span className="view-all">View all</span>}
              </div>
              <div className="section-box">
                {isEditing ? (
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="description-input"
                    rows="5"
                    placeholder="Product Description"
                  ></textarea>
                ) : (
                  productData.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="section" style={{ padding: '0 2rem 1rem' }}>
          <div className="section-header">
            Customer Reviews <span className="view-all">View all</span>
          </div>
          
          {/* Individual Reviews */}
          <div className="section-box review-box">
            <div className="reviewer">
              <div className="reviewer-avatar">AK</div>
              <div>
                <div className="reviewer-name">Ahmad Khan</div>
                <div className="time-ago">2 days ago</div>
              </div>
              <div className="review-actions">
                <button className="review-action-btn" title="Reply to review">
                  <i className="bi bi-reply"></i>
                </button>
                <button className="review-action-btn" title="Report review">
                  <i className="bi bi-flag"></i>
                </button>
              </div>
            </div>
            <div className="stars mb-2">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <p>PlayStation 5 Controller Skin – high-quality vinyl with easy bubble-free install & mess-free removal. Colors are vibrant and it fits perfectly on my controller!</p>
          </div>
          
          <div className="section-box review-box">
            <div className="reviewer">
              <div className="reviewer-avatar">MJ</div>
              <div>
                <div className="reviewer-name">Maria Jameel</div>
                <div className="time-ago">1 week ago</div>
              </div>
              <div className="review-actions">
                <button className="review-action-btn" title="Reply to review">
                  <i className="bi bi-reply"></i>
                </button>
                <button className="review-action-btn" title="Report review">
                  <i className="bi bi-flag"></i>
                </button>
              </div>
            </div>
            <div className="stars mb-2">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i>
            </div>
            <p>Great controller, very responsive and comfortable to hold. Battery life is good but not as long as advertised. Overall very satisfied with my purchase.</p>
          </div>
          
          {/* Review Analytics */}
          <div className="review-analytics">
            <div className="analytics-card">
              <h3>Review Summary</h3>
              <div className="analytics-content">
                <div className="analytics-item">
                  <div className="analytics-label">Average Rating</div>
                  <div className="analytics-value">4.5 <i className="bi bi-star-fill"></i></div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-label">Total Reviews</div>
                  <div className="analytics-value">150</div>
                </div>
                <div className="analytics-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-star">5 <i className="bi bi-star-fill"></i></span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{width: '70%'}}></div>
                    </div>
                    <span className="breakdown-percent">70%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-star">4 <i className="bi bi-star-fill"></i></span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{width: '20%'}}></div>
                    </div>
                    <span className="breakdown-percent">20%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-star">3 <i className="bi bi-star-fill"></i></span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{width: '8%'}}></div>
                    </div>
                    <span className="breakdown-percent">8%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-star">2 <i className="bi bi-star-fill"></i></span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{width: '2%'}}></div>
                    </div>
                    <span className="breakdown-percent">2%</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-star">1 <i className="bi bi-star-fill"></i></span>
                    <div className="breakdown-bar">
                      <div className="breakdown-fill" style={{width: '0%'}}></div>
                    </div>
                    <span className="breakdown-percent">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Support Float Button */}
      <div className="chat-float-button" onClick={openChat}>
        <i className="bi bi-headset"></i>
        <span className="float-button-label">Support</span>
      </div>
    </div>
  );
}

export default SellerProduct;
