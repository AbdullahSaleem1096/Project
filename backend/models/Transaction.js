const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true, enum: ['wallet', 'cod'] },
  status: { type: String, required: true, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending', index: true },
  notes: String,
  createdAt: { type: Date, default: Date.now, index: true }
});

// Compound index for finding all transactions by a user (either buyer or seller)
transactionSchema.index({ buyerId: 1, createdAt: -1 });
transactionSchema.index({ sellerId: 1, createdAt: -1 });

// Index for status-based queries
transactionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);