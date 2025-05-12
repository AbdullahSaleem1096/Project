import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css'; // We can reuse the same styles

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    // Get email from localStorage or state management
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      navigate('/signup');
      return;
    }
    setEmail(storedEmail);

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
        // Clear temporary data
        localStorage.removeItem('userEmail');
        localStorage.removeItem('tempUserId');
        
        // Show success message and redirect to login
        alert('Email verified successfully! Please login.');
        navigate('/login');
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
              {loading ? 'Verifying...' : 'Verify Email'}
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