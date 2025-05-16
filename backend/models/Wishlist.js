const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

// Compound index for faster lookup of user's wishlist items
wishlistSchema.index({ userId: 1, products: 1 });

module.exports = mongoose.model('Wishlist', wishlistSchema);