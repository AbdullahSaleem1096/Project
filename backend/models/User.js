const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength:6 },
  isVerified: { type: Boolean, default: false},
  otp: {code:String, expiresAt: Date},
  role:     { type: String, enum: ['buyer', 'seller'], required: true },
  phoneNumber: String,
  address: {
    department: { type: String, required: true },
    hostel: { type: String, required: true },
    roomNumber: { type: String, required: true }
  },
  wallet: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);