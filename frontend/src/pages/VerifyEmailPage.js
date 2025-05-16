import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import './SignupPage.css'; // We can reuse the same styles

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Get email and role from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedRole = localStorage.getItem('userRole');
    
    if (!storedEmail) {
      navigate('/signup');
      return;
    }
    
    setEmail(storedEmail);
    if (storedRole) {
      setUserRole(storedRole);
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/user/verify-otp', {
        email,
        otp
      });

      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Clear temporary data
        localStorage.removeItem('userEmail');
        localStorage.removeItem('tempUserId');
        localStorage.removeItem('userRole');
        
        // Show success message
        alert('Email verified successfully!');
        
        // Redirect based on user role
        if (response.data.user.role === 'seller' || userRole === 'seller') {
          // Redirect seller to store setup page
          navigate('/seller/setup-store');
        } else {
          // Redirect buyer to home page
          navigate('/home');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/user/resend-otp', {
        email
      });

      if (response.data) {
        setCountdown(600); // Reset countdown to 10 minutes
        alert('New OTP has been sent to your email!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="brand-title">NUSTIFY</h1>
        <p className="brand-subtitle">Email Verification</p>

        <div className="form-card">
          <h4>Verify Your Email</h4>
          <p className="text-center mb-4">
            We've sent a verification code to:<br />
            <strong>{email}</strong>
          </p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Enter Verification Code</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-shield-lock"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  required
                />
              </div>
            </div>

            <div className="text-center mb-3">
              <small className="text-muted">
                Time remaining: {formatTime(countdown)}
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 mb-3"
              disabled={loading || countdown === 0}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Verifying...
                </>
              ) : 'Verify Email'}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={handleResendOTP}
                disabled={loading || countdown > 0}
              >
                Resend Verification Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage; 