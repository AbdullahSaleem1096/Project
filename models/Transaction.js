const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  PaymentMode: {type: String, enum: ['easypaisa', 'JazzCash', 'Bank Transfer', 'Cash on Delivery']},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);