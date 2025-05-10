const User = require('../models/User');
const { sendOTPEmail } = require('./mailControllers');
//const jwt = require('jsonwebtoken');



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

        res.json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email first' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Login successful',
            user: {
                id: user._id,
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

module.exports = {
    registerUser,
    verifyOTP,
    loginUser
};

