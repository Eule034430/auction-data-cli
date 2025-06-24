const mongoose = require("mongoose");

//Schema
const auctionSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  start_price: { type: Number },
  reserve_price: { type: Number },
});

// Create a model
module.exports = mongoose.model("Auction", auctionSchema);
