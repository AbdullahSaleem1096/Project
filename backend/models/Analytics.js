const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  views: Number,
  rent: Number,
  order_count: Number,
  date: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);