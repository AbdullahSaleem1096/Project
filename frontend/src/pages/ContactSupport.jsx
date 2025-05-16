import React, { useState } from 'react';
import './ContactSupport.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

function ContactSupport() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // In a real app, you would send this data to your backend
  };
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="contact-support-container">
      <div className="contact-support-box">
        {/* Header */}
        <div className="support-header">
          <div className="back-button" onClick={goBack}>
            <i className="bi bi-arrow-left-short"></i>
          </div>
          <h1>Contact Support</h1>
          <div className="header-accent"></div>
        </div>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h2>Thank You!</h2>
            <p>Your message has been submitted successfully. Our team will get back to you within 24 hours.</p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="support-content">
            <div className="support-column">
              {/* Contact Form */}
              <div className="support-card form-card">
                <h2>Send Us a Message</h2>
                <p className="support-description">Fill out the form below and our support team will respond as soon as possible.</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <div className="input-with-icon">
                      <i className="bi bi-person"></i>
                      <input 
                        type="text" 
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name" 
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-with-icon">
                      <i className="bi bi-envelope"></i>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="your.email@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <div className="input-with-icon">
                      <i className="bi bi-telephone"></i>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number" 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <div className="input-with-icon">
                      <i className="bi bi-tag"></i>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        placeholder="What is your inquiry about?" 
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      placeholder="Please describe your issue in detail..." 
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit">
                    <i className="bi bi-send me-2"></i> Submit Request
                  </button>
                </form>
              </div>
            </div>
            
            <div className="support-column sidebar">
              {/* FAQ Section */}
              <div className="support-card">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                  <h4><i className="bi bi-question-circle"></i> How do I track my order?</h4>
                  <p>You can track your order by visiting the 'My Orders' section in your account dashboard.</p>
                </div>
                <div className="faq-item">
                  <h4><i className="bi bi-question-circle"></i> What is your return policy?</h4>
                  <p>We offer a 14-day return policy for most items. Please check the product page for specific details.</p>
                </div>
                <div className="faq-item">
                  <h4><i className="bi bi-question-circle"></i> How do I cancel my order?</h4>
                  <p>You can cancel unshipped orders from your account. For shipped orders, please contact support.</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="support-card">
                <h3>Contact Information</h3>
                <div className="contact-info-item">
                  <i className="bi bi-telephone-fill"></i>
                  <div>
                    <h4>Call Us</h4>
                    <p>+92 (51) 123-4567</p>
                    <span className="support-hours">9 AM - 6 PM, Monday to Friday</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="bi bi-envelope-fill"></i>
                  <div>
                    <h4>Email Support</h4>
                    <p>support@nustify.com</p>
                    <span className="support-hours">24/7 Support</span>
                  </div>
                </div>
                <div className="contact-info-item">
                  <i className="bi bi-geo-alt-fill"></i>
                  <div>
                    <h4>Office Address</h4>
                    <p>NUST Campus, H-12, Islamabad</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="support-card social-card">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactSupport;
