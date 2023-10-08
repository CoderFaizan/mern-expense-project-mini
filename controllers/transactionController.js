const Transaction = require("../models/transactionModel");

// Add a new transaction controller
const addTransaction = async (req, res) => {
  try {
    // Get transaction data from the request body
    const { userId, amount,  type, description } = req.body;

    // Create a new transaction instance
    const newTransaction = new Transaction({
      userId,
      amount,
      type,
      description,
    });

    // Save the new transaction to the database
    await newTransaction.save();

    res
      .status(200)
      .json({ success: true, message: "Transaction added successfully." });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(200).json({ success: false, message: "Internal Server Error" });
  }
};

// Get transactions by user ID controller
const getTransactionsByUserId = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const userId = req.params.userId;

    // Use the find method to query transactions by userId
    const transactions = await Transaction.find({ userId });

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(200).json({ success: false, message: "Internal Server Error" });
  }
};
const deleteTransactionById = async (req, res) => {
  try {
    // Get the transaction ID from the request parameters
    const transactionId = req.params.transactionId;

    // Use findByIdAndRemove to delete the transaction by its ID
    const deletedTransaction = await Transaction.findByIdAndRemove(
      transactionId
    );

    if (!deletedTransaction) {
      // If the transaction was not found, return an error response
      return res
        .status(200)
        .json({ success: false, message: "Transaction not found." });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Transaction deleted successfully.",
        deletedTransaction,
      });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(200).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  addTransaction,
  getTransactionsByUserId,deleteTransactionById
};
