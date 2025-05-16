const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', index: true },
  name: { type: String, required: true, index: true },
  description: String,
  price: { type: Number, required: true, index: true },
  category: { type: String, index: true },
  views: { type: Number, default: 0 },
  isWishlisted: { type: Number, default: 0 },
  images: [String],
  quantity: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true, index: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Add compound index for price and category (common filter combination)
productSchema.index({ price: 1, category: 1 });

// Add compound index for storeId and category (for store category filtering)
productSchema.index({ storeId: 1, category: 1 });

// Add compound index for filtering by availability and price (common search pattern)
productSchema.index({ isAvailable: 1, price: 1 });

// Add index for sorting by popularity (views)
productSchema.index({ views: -1 });

// Add compound index for newest products (recent createdAt)
productSchema.index({ isAvailable: 1, createdAt: -1 });

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text' });

// Pre-save middleware to ensure updatedAt is set
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-findOneAndUpdate middleware to set updatedAt
productSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Product', productSchema);