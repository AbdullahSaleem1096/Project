import React from 'react';
import './LoginPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="brand-title">NUSTIFY</h1>
        <p className="brand-subtitle">NUST Market Place</p>

        <div className="form-card">
          <h4>Welcome Back!</h4>

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
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input type="password" className="form-control" placeholder="Create a strong password" />
              </div>
            </div>


            <div className="remember&forget d-flex justify-content-between">
                <div className="remember-me">
              <input type="checkbox" className="form-check-input" id="termsCheck" />
              <label className="form-check-label" htmlFor="termsCheck">
                Remember Me
              </label>
              </div>
              <div className="forget-password-text-light">
              <a href="SignupPage.js">Forgot Pasword?</a>
            </div>
            </div>

            <button type="submit" className="btn btn-gradient w-100">Sign in</button>

            <div className="divider">Or Sign Up with</div>

            <div className="social-buttons d-flex justify-content-between">
              <button className="btn btn-outline-light"><i className="bi bi-instagram"></i> Instagram</button>
              <button className="btn btn-outline-light"><i className="bi bi-facebook"></i> Facebook</button>
            </div>

          <div className="Signup-text">
             Don't have an account? <Link to="/">Signup</Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
