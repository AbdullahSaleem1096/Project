import React, { useState } from 'react';
import './LoginPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on user role
        if (response.data.user.role === 'seller') {
          navigate('/seller-profile');
        } else {
          navigate('/online-store');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="remember&forget d-flex justify-content-between">
              <div className="remember-me">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <div className="forget-password-text-light">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-gradient w-100"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="divider">Or Sign Up with</div>

            <div className="social-buttons d-flex justify-content-between">
              <button type="button" className="btn btn-outline-light">
                <i className="bi bi-instagram"></i> Instagram
              </button>
              <button type="button" className="btn btn-outline-light">
                <i className="bi bi-facebook"></i> Facebook
              </button>
            </div>

            <div className="Signup-text">
              Don't have an account? <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
