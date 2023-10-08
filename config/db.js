const mongoose = require("mongoose");

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    // Connect to the MongoDB server using the connection string
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { connectToMongoDB };
