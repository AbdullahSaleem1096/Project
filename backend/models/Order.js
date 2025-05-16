const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
      quantity: Number,
      price: Number
    }
  ],
  orderStatus: { type: String, enum: ['pending', 'accepted', 'delivered', 'cancelled'], index: true },
  orderMessage: String,
  totalAmount: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for finding user's orders by status
orderSchema.index({ userId: 1, orderStatus: 1 });

// Compound index for finding user's orders by date
orderSchema.index({ userId: 1, createdAt: -1 });

// Compound index for finding store's orders (search through items.storeId)
orderSchema.index({ 'items.storeId': 1, createdAt: -1 });

// Pre-save middleware to ensure updatedAt is set
orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-findOneAndUpdate middleware to set updatedAt
orderSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Order', orderSchema);