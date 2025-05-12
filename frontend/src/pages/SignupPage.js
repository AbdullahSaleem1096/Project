import React, { useState } from 'react';
import './SignupPage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    hostel: '',
    roomNumber: '',
    department: '',
    role: 'buyer' // default role
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        hostel: formData.hostel,
        department: formData.department, 
        roomNumber: formData.roomNumber 
      });

      if (response.data) {
        // Store user ID and email for OTP verification
        localStorage.setItem('tempUserId', response.data.userId);
        localStorage.setItem('userEmail', formData.email);
        // Navigate to OTP verification page
        navigate('/verify-email');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
          <h4>Create Your Account</h4>

          <div className="profile-pic-placeholder">
            <i className="bi bi-person-circle" style={{ fontSize: '2rem', color: 'white' }}></i>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your full name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Email ID</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="your Email@gmail.com"
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
                  placeholder="Create a strong password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Hostel Name</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-building"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your hostel name like Razi"
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Room Number</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-building"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your hostel name like Razi"  
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Department</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-building"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Your hostel name like Razi"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Role</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                <select 
                  className="form-control"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            </div>

            <div className="form-check text-start mb-3">
              <input type="checkbox" className="form-check-input" id="termsCheck" required />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the <a href="TermsOfService">Terms of Service</a> and <a href="PrivacyPolicy">Privacy Policy</a>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-gradient w-100"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="divider">Or Sign Up with</div>

            <div className="social-buttons d-flex justify-content-between">
              <button type="button" className="btn btn-outline-light"><i className="bi bi-instagram"></i> Instagram</button>
              <button type="button" className="btn btn-outline-light"><i className="bi bi-facebook"></i> Facebook</button>
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
