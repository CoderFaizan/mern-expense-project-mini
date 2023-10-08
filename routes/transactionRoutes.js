const express = require("express");
const { addTransaction, getTransactionsByUserId, deleteTransactionById } = require("../controllers/transactionController");
const router = express.Router();

// Define routes for user registration
router.post("/add", addTransaction);
router.post("/get/:userId", getTransactionsByUserId);
router.delete("/delete/:transactionId", deleteTransactionById);

module.exports = router;
