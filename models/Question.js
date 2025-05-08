const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questionText: String,
  responseText: String,
  status: { type: String, enum: ['unanswered', 'answered'], default: 'unanswered' },
  createdAt: { type: Date, default: Date.now },
  answeredAt: Date
});

module.exports = mongoose.model('Question', questionSchema);