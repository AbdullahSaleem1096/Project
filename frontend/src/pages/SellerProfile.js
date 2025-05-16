import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { 
  FaArrowLeft, 
  FaUser, 
  FaMapMarkerAlt, 
  FaStar, 
  FaStarHalfAlt, 
  FaPhone, 
  FaEnvelope, 
  FaComment, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter,
  FaBox,
  FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SellerProfile.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SellerProfile() {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-header">
          <Link to="/home" className="back-button">
            <FaArrowLeft />
          </Link>
          <h2 className="mb-0">Seller Profile</h2>
        </div>

        <div className="profile-content">
          <div className="profile-top">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <FaUser size={50} />
              </div>
              <h3 className="profile-name">Abdullah Fakiha</h3>
              <div className="profile-location">
                <FaMapMarkerAlt /> 
                <span>Fatima Hostel, Room 418</span>
              </div>
              <div className="profile-rating">
                <div className="rating-stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <span className="rating-count">(42 reviews)</span>
              </div>
              <div className="avatar-stats">
                <div className="stat-item">
                  <span className="stat-value">58</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">127</span>
                  <span className="stat-label">Sales</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">4.5</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
            
            <div className="profile-info">
              <Badge bg="success" className="mb-3">Verified Seller</Badge>
              <h4>Business Bio</h4>
              <p>
                We are a dynamic sports business specializing in the production and distribution of high-quality sports equipment and apparel. Our mission is to promote active lifestyles by providing reliable, performance-driven products for athletes of all levels.
              </p>
              <p>
                With a focus on innovation, customer satisfaction, and global reach, we aim to be a trusted name in the sports industry. Our offerings include gear for football, basketball, fitness, and more, catering to both retail and wholesale markets.
              </p>
              <h4>Specialties</h4>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Badge bg="primary" style={{ background: 'rgba(107, 70, 193, 0.2)', color: '#9F7AEA', border: '1px solid #9F7AEA', padding: '0.5rem 0.75rem' }}>Sports Equipment</Badge>
                <Badge bg="primary" style={{ background: 'rgba(107, 70, 193, 0.2)', color: '#9F7AEA', border: '1px solid #9F7AEA', padding: '0.5rem 0.75rem' }}>Athletic Wear</Badge>
                <Badge bg="primary" style={{ background: 'rgba(107, 70, 193, 0.2)', color: '#9F7AEA', border: '1px solid #9F7AEA', padding: '0.5rem 0.75rem' }}>Fitness Accessories</Badge>
                <Badge bg="primary" style={{ background: 'rgba(107, 70, 193, 0.2)', color: '#9F7AEA', border: '1px solid #9F7AEA', padding: '0.5rem 0.75rem' }}>Team Gear</Badge>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="icon-row">
                <div className="icon-box">
                  <FaPhone />
                  <span>Call</span>
                </div>
                <div className="icon-box">
                  <FaComment />
                  <span>Message</span>
                </div>
                <div className="icon-box">
                  <FaEnvelope />
                  <span>Email</span>
                </div>
              </div>
            </div>

            <div className="social-media">
              <h2>Social Media</h2>
              <div className="icon-row">
                <div className="icon-box">
                  <FaFacebook />
                  <span>Facebook</span>
                </div>
                <div className="icon-box">
                  <FaInstagram />
                  <span>Instagram</span>
                </div>
                <div className="icon-box">
                  <FaTwitter />
                  <span>Twitter</span>
                </div>
              </div>
            </div>
          </div>

          <div className="products-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Recent Products</h2>
              <Link to="/seller/products" className="view-all-btn">
                View All <FaArrowRight />
              </Link>
            </div>
            
            <Row>
              <Col md={4} className="mb-3">
                <div className="p-3" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem' }}>
                  <div style={{ height: '150px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaBox size={40} color="#9F7AEA" />
                  </div>
                  <h5 className="mt-3 mb-1">Sports Watch</h5>
                  <div style={{ color: '#9F7AEA', fontWeight: 'bold' }}>Rs. 2,450</div>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="p-3" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem' }}>
                  <div style={{ height: '150px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaBox size={40} color="#9F7AEA" />
                  </div>
                  <h5 className="mt-3 mb-1">Running Shoes</h5>
                  <div style={{ color: '#9F7AEA', fontWeight: 'bold' }}>Rs. 3,800</div>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="p-3" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem' }}>
                  <div style={{ height: '150px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaBox size={40} color="#9F7AEA" />
                  </div>
                  <h5 className="mt-3 mb-1">Fitness Band</h5>
                  <div style={{ color: '#9F7AEA', fontWeight: 'bold' }}>Rs. 1,200</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
