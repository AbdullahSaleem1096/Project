const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
    // Removed unique constraint to allow system store
  },
  logo: { type: String, required: true },
  banner: { type: String },
  category: [{ type: String }],
  rating: { type: Number, default: 0, index: true },
  reviewCount: { type: Number, default: 0 },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String
  },
  storeStatus: { type: String, enum: ['active', 'inactive', 'pending', 'suspended'], default: 'pending', index: true },
  rental_status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  isSetupComplete: { type: Boolean, default: false },
  views: { type: Number, default: 0, index: true },
  isDeliveryEnabled: { type: Boolean, default: true },
  isSystemStore: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  businessHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  address: {
    hostel: { type: String },
    roomNumber: { type: String }
  },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Text index for store search
storeSchema.index({ name: 'text', description: 'text' });

// Compound index for filtering active stores by category
storeSchema.index({ storeStatus: 1, 'category': 1 });

// Compound index for sorting by popularity (views)
storeSchema.index({ storeStatus: 1, views: -1 });

// Compound index for sorting by rating
storeSchema.index({ storeStatus: 1, rating: -1 });

// Index for system stores
storeSchema.index({ isSystemStore: 1 });

// Pre-save middleware to ensure updatedAt is set
storeSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Pre-findOneAndUpdate middleware to set updatedAt
storeSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Make contactPhone field optional for system stores
storeSchema.pre('validate', function(next) {
  if (this.isSystemStore && !this.contactPhone) {
    this.contactPhone = '000-000-0000';
  }
  
  // Make address fields optional for system stores
  if (this.isSystemStore) {
    if (!this.address || !this.address.hostel) {
      this.address = this.address || {};
      this.address.hostel = 'System';
    }
    if (!this.address || !this.address.roomNumber) {
      this.address = this.address || {};
      this.address.roomNumber = '000';
    }
  }
  
  next();
});

module.exports = mongoose.model('Store', storeSchema);