import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaArrowLeft, FaClipboardCheck, FaBoxOpen, FaTruck, FaHeadset, FaBan, FaCheckCircle, FaStar, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const SellerGuidelines = () => {
  return (
    <div className="legal-page">
      <Container>
        <div className="legal-container">
          <div className="legal-header">
            <FaClipboardCheck size={40} color="#9F7AEA" />
            <h1>Seller Guidelines</h1>
            <p>Last Updated: May 15, 2023</p>
          </div>
          
          <div className="legal-intro">
            Welcome to the Nustify Seller Guidelines. As a Nustify seller, you become part of our campus marketplace community. These guidelines will help you succeed on our platform while ensuring a positive experience for all users. Please read and follow these rules and best practices carefully.
          </div>
          
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Card className="h-100" style={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '1rem' }}>
                <Card.Body>
                  <h5 className="d-flex align-items-center" style={{ color: '#9F7AEA' }}>
                    <FaStar className="me-2" /> Seller Benefits
                  </h5>
                  <ul className="mt-3">
                    <li>Connect with the NUST student community</li>
                    <li>Zero listing fees for students</li>
                    <li>Simple and quick product uploads</li>
                    <li>Secure payment processing</li>
                    <li>Campus-based delivery options</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-3">
              <Card className="h-100" style={{ background: 'rgba(255, 255, 255, 0.05)', border: 'none', borderRadius: '1rem' }}>
                <Card.Body>
                  <h5 className="d-flex align-items-center" style={{ color: '#9F7AEA' }}>
                    <FaInfoCircle className="me-2" /> Important Requirements
                  </h5>
                  <ul className="mt-3">
                    <li>Valid NUST student ID required</li>
                    <li>Complete seller profile information</li>
                    <li>Respond to inquiries within 24 hours</li>
                    <li>Maintain a rating of 3.5+ stars</li>
                    <li>Honest and accurate product listings</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <div className="legal-section">
            <h2><FaBoxOpen className="me-2" /> 1. Product Listings</h2>
            <p>Creating clear, honest, and detailed product listings is essential for successful sales and building trust with buyers.</p>
            <ul>
              <li><strong>Accuracy:</strong> Provide accurate and detailed descriptions for all products, including condition, dimensions, and any defects or issues.</li>
              <li><strong>Photos:</strong> Upload at least 3 high-quality images from different angles. Use natural lighting and clean backgrounds.</li>
              <li><strong>Pricing:</strong> Set competitive prices in line with product value and market rates. Consider offering student discounts.</li>
              <li><strong>Categories:</strong> List your product in the most appropriate category to help buyers find your items.</li>
              <li><strong>Availability:</strong> Keep your inventory updated. Remove listings when items are no longer available.</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2><FaTruck className="me-2" /> 2. Order Fulfillment</h2>
            <p>Timely and professional order fulfillment leads to positive reviews and repeat customers.</p>
            <ul>
              <li><strong>Processing Time:</strong> Process orders within 24 hours of receipt. If you need more time, communicate this to the buyer immediately.</li>
              <li><strong>Packaging:</strong> Package items securely to prevent damage during delivery.</li>
              <li><strong>Delivery Options:</strong> Offer campus delivery or convenient pickup locations. Clearly communicate delivery timeframes.</li>
              <li><strong>Updates:</strong> Provide order status updates, especially if there are any delays or changes.</li>
              <li><strong>Proof of Delivery:</strong> Maintain records of all transactions and deliveries.</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2><FaHeadset className="me-2" /> 3. Customer Service</h2>
            <p>Excellent customer service is key to your success as a Nustify seller.</p>
            <ul>
              <li><strong>Responsiveness:</strong> Respond to buyer inquiries and messages within 24 hours.</li>
              <li><strong>Professionalism:</strong> Be courteous and professional in all communications.</li>
              <li><strong>Problem Resolution:</strong> Address issues promptly and work toward fair solutions.</li>
              <li><strong>Returns & Refunds:</strong> Have a clear return and refund policy and honor it consistently.</li>
              <li><strong>Feedback:</strong> Use feedback and reviews to improve your service.</li>
            </ul>
          </div>
          
          <div className="legal-section">
            <h2><FaBan className="me-2" /> 4. Prohibited Items</h2>
            <p>For the safety and well-being of our community, certain items are not allowed on our platform:</p>
            <ul>
              <li>Illegal or counterfeit products</li>
              <li>Dangerous or hazardous materials</li>
              <li>Weapons or explosives</li>
              <li>Adult content or services</li>
              <li>Alcohol, tobacco, or drugs</li>
              <li>Items that infringe on intellectual property rights</li>
              <li>Academic cheating services or completed assignments</li>
              <li>Expired food items or cosmetics</li>
              <li>Stolen goods or property</li>
            </ul>
            <p>Selling prohibited items will result in immediate removal of listings and possible account suspension.</p>
          </div>
          
          <div className="legal-section">
            <h2><FaCheckCircle className="me-2" /> 5. Policy Compliance</h2>
            <p>Adherence to platform policies and local regulations is mandatory for all sellers.</p>
            <ul>
              <li><strong>Marketplace Policies:</strong> Follow all Nustify policies, terms, and guidelines.</li>
              <li><strong>Legal Compliance:</strong> Ensure your products and practices comply with all applicable laws and regulations.</li>
              <li><strong>Tax Obligations:</strong> You are responsible for understanding and fulfilling any tax obligations related to your sales.</li>
              <li><strong>Account Security:</strong> Protect your account information and never share login credentials.</li>
              <li><strong>Violations:</strong> Policy violations may result in warnings, listing removal, or account suspension depending on severity and frequency.</li>
            </ul>
          </div>
          
          <div className="legal-footer">
            <p>These guidelines are designed to create a safe, fair, and positive marketplace for the NUST community. If you have questions about these guidelines, please contact our <Link to="/contact" style={{ color: '#9F7AEA', textDecoration: 'none' }}>support team</Link>.</p>
            
            <Link to="/" className="legal-back-button">
              <FaArrowLeft /> Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SellerGuidelines; 