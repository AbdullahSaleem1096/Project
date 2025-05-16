import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaFileAlt, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <Container>
        <div className="legal-container">
          <div className="legal-header">
            <FaFileAlt size={40} color="#9F7AEA" />
            <h1>Terms and Conditions</h1>
            <p>Last Updated: May 15, 2023</p>
          </div>
          
          <div className="legal-intro">
            Welcome to Nustify, the premier marketplace for NUST students. By using our platform, you agree to comply with and be bound by the following terms and conditions. Please review them carefully. If you do not agree to these terms, you should not use this site or service.
          </div>
          
          <div className="legal-section">
            <h2><FaBook className="me-2" /> 1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Your continued use of this platform confirms your acceptance of these terms and any updated or modified versions.</p>
          </div>
          
          <div className="legal-section">
            <h2>2. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately if you suspect unauthorized access to your account.</p>
          </div>
          
          <div className="legal-section">
            <h2>3. Prohibited Activities</h2>
            <p>Users may not use the site for any unlawful or prohibited purpose. You agree not to use the platform to:</p>
            <ul>
              <li>Post or transmit content that is illegal, harmful, threatening, abusive, or otherwise objectionable</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in any conduct that restricts or inhibits another user from using or enjoying the site</li>
              <li>Attempt to gain unauthorized access to secured portions of the site</li>
              <li>Harvest or collect user information without permission</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2>4. Product Listings and Transactions</h2>
            <p>All items listed for sale must be accurately described and priced. Sellers are responsible for ensuring the quality, legality, and safety of their products. Buyers are responsible for verifying the condition of items before completing transactions. Nustify is not responsible for the quality, safety, or legality of items sold on our platform.</p>
          </div>
          
          <div className="legal-section">
            <h2>5. Payments and Fees</h2>
            <p>All payments must be processed through our approved payment methods. Sellers are responsible for any fees associated with transactions. Nustify may charge service fees for listing or selling items, which will be clearly communicated before any charges are incurred.</p>
          </div>
          
          <div className="legal-section">
            <h2>6. Intellectual Property</h2>
            <p>The content, organization, graphics, design, and other matters related to this site are protected under applicable copyrights and trademarks. Copying, redistribution, use, or publication of any such content or any part of this site is prohibited without express permission.</p>
          </div>
          
          <div className="legal-section">
            <h2>7. Changes to Terms</h2>
            <p>We reserve the right to change these terms at any time. Continued use of the site after changes means you accept those changes. We will provide notice of significant changes through our website or via email.</p>
          </div>
          
          <div className="legal-section">
            <h2>8. Termination of Service</h2>
            <p>We reserve the right to terminate or suspend your account and access to our services at any time, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.</p>
          </div>
          
          <div className="legal-footer">
            <p>This Terms and Conditions page is provided for informational purposes only and does not constitute legal advice. If you have any questions about these terms, please contact our <Link to="/contact" style={{ color: '#9F7AEA', textDecoration: 'none' }}>support team</Link>.</p>
            
            <Link to="/" className="legal-back-button">
              <FaArrowLeft /> Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditions; 