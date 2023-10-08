const path = require("path");
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./config/db");
const app = express();
require("dotenv").config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3000;
connectToMongoDB()
app.use(express.json());
// Use CORS middleware to allow cross-origin requests
app.use(cors());
// Define a GET route
app.get("/api/hello", (req, res) => {
  res.send("Hello, World!");
});

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(req, resp){
  resp.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/transaction", require("./routes/transactionRoutes"));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Use colors for console output
});
