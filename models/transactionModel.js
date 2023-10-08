const mongoose = require("mongoose");

// Define the user schema
const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  amount: {
    type: Number,
  },
 
  type: {
    type: Number,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a User model from the schema
const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
