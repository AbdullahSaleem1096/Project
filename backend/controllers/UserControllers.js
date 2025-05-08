const User = require('../models/User');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const {
      email,
      username,
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      address // contains hostel and roomNumber
    } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        email,
        username,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        phoneNumber,
        address
      });
  
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };