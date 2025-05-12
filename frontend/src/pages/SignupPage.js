import React from 'react';
import './SignupPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';


function SignupPage() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="brand-title">NUSTIFY</h1>
        <p className="brand-subtitle">NUST Market Place</p>

        <div className="form-card">
          <h4>Create Your Account</h4>

          <div className="profile-pic-placeholder">
            <i className="bi bi-person-circle" style={{ fontSize: '2rem', color: 'white' }}></i>
          </div>

          <form>
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                <input type="text" className="form-control" placeholder="Enter your full name" />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Email ID</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                <input type="email" className="form-control" placeholder="your Email@gmail.com" />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input type="password" className="form-control" placeholder="Create a strong password" />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input type="password" className="form-control" placeholder="Confirm your password" />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Hostel Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-building"></i></span>
                <input type="text" className="form-control" placeholder="Your hostel name like Razi" />
              </div>
            </div>

            <div className="form-check text-start mb-3">
              <input type="checkbox" className="form-check-input" id="termsCheck" />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the <a href="TermsOfService">Terms of Service</a> and <a href="PrivacyPolicy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-gradient w-100">Create Account</button>

            <div className="divider">Or Sign Up with</div>

            <div className="social-buttons d-flex justify-content-between">
              <button className="btn btn-outline-light"><i className="bi bi-instagram"></i> Instagram</button>
              <button className="btn btn-outline-light"><i className="bi bi-facebook"></i> Facebook</button>
            </div>

          <div className="login-text">
             Already have an account? <Link to="/login">Login</Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
