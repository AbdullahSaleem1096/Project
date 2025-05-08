const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  logo: String,
  rating: Number,
  contactEmail: String,
  contactPhone: String,
  rental_status: { type: String, enum: ['paid', 'pending'] },
  views: Number,
  isDeliveryEnabled: Boolean,
  address: {
    hostel: String,
    roomNumber: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', storeSchema);