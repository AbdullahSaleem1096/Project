const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  name: String,
  description: String,
  price: Number,
  category: String,
  views: Number,
  isWishlisted: Number,
  images: [String],
  quantity: Number,
  isAvailable: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);