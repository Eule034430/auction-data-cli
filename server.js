const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Auction = require("./models/auction");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/search", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const results = await Auction.find({
      // find matching documents in Auction model
      $or: [
        // matches if any condition in array is true
        { title: { $regex: query, $options: "i" } }, // $regex: query performs partial match  $options: "i" makes it case-insensitive
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    console.error("Error searching auctions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
