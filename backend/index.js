const express = require('express');
const app = express();
const router = express.Router();
const connectDB = require('./config/connection');
const {registerUser, loginUser, verifyOTP} = require('./controllers/UserControllers');
const cors = require('cors');

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);

// Mount router
app.use('/api/user', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});


