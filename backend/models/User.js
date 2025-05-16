const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email:    { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, minlength:6 },
  isVerified: { type: Boolean, default: false, index: true },
  otp: {code:String, expiresAt: Date},
  role:     { type: String, enum: ['buyer', 'seller'], required: true, index: true },
  phoneNumber: String,
  address: {
    department: { type: String, required: true },
    hostel: { type: String, required: true },
    roomNumber: { type: String, required: true }
  },
  wallet: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for user role and verification status (for admin filtering)
userSchema.index({ role: 1, isVerified: 1 });

// Compound index for user creation date (for newest users)
userSchema.index({ role: 1, createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
  }
  
  // Update the updatedAt field
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  
  next();
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);