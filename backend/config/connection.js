const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://abdullahsaleem1096:cmuKbpK8WW75vrtU@cluster0.87pwukp.mongodb.net/NustifyDatabase');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
