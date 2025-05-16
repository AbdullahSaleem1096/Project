import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaShieldAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <Container>
        <div className="legal-container">
          <div className="legal-header">
            <FaShieldAlt size={40} color="#9F7AEA" />
            <h1>Privacy Policy</h1>
            <p>Last Updated: May 15, 2023</p>
          </div>
          
          <div className="legal-intro">
            Your privacy is important to us. This privacy policy explains how we collect, use, protect, and share your personal information when you use Nustify, the premier marketplace for NUST students.
          </div>
          
          <div className="legal-section">
            <h2><FaLock className="me-2" /> 1. Information Collection</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This may include:</p>
            <ul>
              <li>Account information (name, email, password, etc.)</li>
              <li>Profile information (hostel, department, room number, etc.)</li>
              <li>Transaction information (purchases, payments, etc.)</li>
              <li>Communications (messages, support tickets, etc.)</li>
              <li>Device information (IP address, browser type, operating system, etc.)</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2>2. Use of Information</h2>
            <p>We use your information to provide, maintain, and improve our services, and to communicate with you. Specifically, we use your data to:</p>
            <ul>
              <li>Process transactions and deliver products</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send notifications, updates, and promotional messages</li>
              <li>Improve our services and develop new features</li>
              <li>Prevent fraudulent activities and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2>3. Sharing of Information</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul>
              <li>Other users as needed to facilitate transactions (e.g., sharing a buyer's delivery information with a seller)</li>
              <li>Service providers who help us operate our platform (payment processors, hosting providers, etc.)</li>
              <li>Law enforcement when required by law</li>
              <li>Third parties in connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2>4. Data Security</h2>
            <p>We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls for our employees and contractors</li>
              <li>Physical security measures for our servers and offices</li>
            </ul>
            <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.</p>
          </div>
          
          <div className="legal-section">
            <h2>5. Your Rights</h2>
            <p>You have certain rights regarding your personal information:</p>
            <ul>
              <li>Access and update your information through your account settings</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p>To exercise these rights, please contact our support team.</p>
          </div>
          
          <div className="legal-section">
            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can manage cookie preferences through your browser settings.</p>
          </div>
          
          <div className="legal-section">
            <h2>7. Changes to Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date. Continued use of the site after changes means you accept those changes.</p>
          </div>
          
          <div className="legal-footer">
            <p>If you have questions about this Privacy Policy, please contact our <Link to="/contact" style={{ color: '#9F7AEA', textDecoration: 'none' }}>support team</Link>.</p>
            
            <Link to="/" className="legal-back-button">
              <FaArrowLeft /> Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy; 