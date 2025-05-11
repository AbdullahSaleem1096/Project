import React from 'react';
import './ContactSupport.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function ContactSupport() {
  return (
    <div className="signup-container">
      <div className="signup-box">

        {/* Properly placed top header */}
        <div className="support-header">
          <i className="bi bi-arrow-left-short"></i>
          Contact Support
        </div>

        {/* Contact Form */}
        <div className="form-card">
          <h4>Contact Form</h4>

          <form>
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter your full name" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="your Email@gmail.com" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Other Number (Optional)</label>
              <input type="tel" className="form-control" placeholder="Enter another number" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" placeholder="Subject of your query" />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="3" placeholder="Type your message here..."></textarea>
            </div>

            <button type="submit" className="btn btn-gradient w-100">Submit</button>
          </form>
        </div>

        {/* Additional Support Section */}
        <div className="form-card mt-4 text-center">
          <h5>Additional Support Options</h5>
          <div className="d-flex justify-content-around mt-3">
            <div>
              <i className="bi bi-telephone-fill" style={{ fontSize: '1.8rem' }}></i>
              <p className="mb-0">Call Us</p>
              <small>9am - 6pm</small>
            </div>
            <div>
              <i className="bi bi-envelope-fill" style={{ fontSize: '1.8rem' }}></i>
              <p className="mb-0">Email Support</p>
              <small>24/7 service</small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactSupport;
