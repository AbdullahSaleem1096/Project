const User = require('../models/User');
const { sendOTPEmail } = require('./mailControllers');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const registerUser = async (req, res) => {
    try {
        console.log('Registration request body:', req.body); // Debug log

        const { 
            username, 
            email, 
            password, 
            role, 
            phoneNumber,
            department,
            hostel,
            roomNumber 
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create new user
        const user = new User({
            username,
            email,
            password,
            role,
            phoneNumber,
            address: {
                department,
                hostel,
                roomNumber
            },
            otp: {
                code: otp,
                expiresAt: otpExpiry
            }
        });

        console.log('Attempting to save user:', { username, email, role }); // Debug log

        await user.save();
        console.log('User saved successfully'); // Debug log

        // Send OTP email
        const emailSent = await sendOTPEmail(email, otp);
        if (!emailSent) {
            console.error('Failed to send OTP email to:', email); // Debug log
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }

        console.log('OTP email sent successfully to:', email); // Debug log

        res.status(201).json({ 
            message: 'Registration successful. Please verify your email with OTP.',
            userId: user._id 
        });

    } catch (error) {
        console.error('Registration error details:', error); // Debug log
        res.status(500).json({ 
            message: 'Registration failed',
            error: error.message 
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
            return res.status(400).json({ message: 'No OTP found' });
        }

        if (user.otp.code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otp.expiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id,
                role: user.role,
                email: user.email 
            }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({ 
            message: 'Email verified successfully',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Resend OTP
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update user's OTP
        user.otp = {
            code: otp,
            expiresAt: otpExpiry
        };
        await user.save();

        // Send OTP email
        const emailSent = await sendOTPEmail(email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }

        res.json({ message: 'OTP resent successfully' });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User found:', {
            id: user._id,
            username: user.username,
            role: user.role,
            isVerified: user.isVerified
        });

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email first' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Login failed: Invalid password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id,
                role: user.role,
                email: user.email 
            }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        console.log('Login successful:', {
            id: user._id,
            role: user.role,
            tokenGenerated: !!token
        });

        res.json({ 
            message: 'Login successful',
            token,
            user: {
                _id: user._id, // Use _id to be consistent with MongoDB
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get user profile details
const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        
        console.log('User profile request:', {
            requestedUserId: userId,
            requestingUserId: req.user.id,
            userRole: req.user.role
        });
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid user ID format' 
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Allow users to access their own profile or any profile if placing an order
        // This is needed for the checkout process
        
        /* Removing this authorization check to allow retrieving any user profile
        if (req.user.id !== userId) {
            return res.status(403).json({ 
                success: false, 
                message: 'Unauthorized to access this profile' 
            });
        }
        */

        // Return user profile with complete information
        res.json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address,
                wallet: user.wallet,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to get user profile',
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    verifyOTP,
    resendOTP,
    loginUser,
    getUserProfile
};

