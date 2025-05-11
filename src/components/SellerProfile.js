import React from 'react';
import './SellerProfile.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SellerProfile() {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-header">
          <i className="bi bi-arrow-left"></i>
          <h2 className="ms-3 mb-0">Seller Profile</h2>
        </div>

        <div className="profile-avatar text-center">
          <div className="avatar-circle">
            <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: 'white' }}></i>
          </div>
          <h4 className="mt-3">Abdullah Fakiha</h4>
          <p className="text-light">Fatima hostel, 418</p>
        </div>

        <div className="business-details text-start">
          <h5>Business Details</h5>
          <p>
            We are a dynamic sports business specializing in the production and distribution of high-quality sports equipment and apparel. Our mission is to promote active lifestyles by providing reliable, performance-driven products for athletes of all levels. With a focus on innovation, customer satisfaction, and global reach, we aim to be a trusted name in the sports industry. Our offerings include gear for football, basketball, fitness, and more, catering to both retail and wholesale markets.
          </p>
        </div>

        <div className="contact">
        <div className="contact-info text-start">
          <h5>Contact Information</h5>
          <div className="icon-row">
            <div className="icon-box"><i className="bi bi-telephone-fill"></i><span>Call</span></div>
            <div className="icon-box"><i className="bi bi-chat-dots-fill"></i><span>Message</span></div>
            <div className="icon-box"><i className="bi bi-envelope-fill"></i><span>Email</span></div>
          </div>
        </div>

        <div className="social-media text-start">
          <h5>Social Media</h5>
          <div className="icon-row">
            <div className="icon-box"><i className="bi bi-facebook"></i><span>facebook</span></div>
            <div className="icon-box"><i className="bi bi-instagram"></i><span>Instagram</span></div>
            <div className="icon-box"><i className="bi bi-twitter"></i><span>Twitter</span></div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
