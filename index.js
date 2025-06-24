const mongoose = require("mongoose");
const inquirer = require("inquirer");
const auctionData = require("./auctionData")
 

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/auctionData")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// import model
const Auction = require("./models/auction");

// Import function
const importData = async (data) => {
  try {
    await Auction.insertMany(data);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

// Delete function
const deleteData = async () => {
  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirmDelete",
      message: "Are you sure you want to delete all data?",
    },
  ]);
  if (!answer.confirmDelete) {
    console.log("Cancelled data deletion");
    return process.exit();
  }
  try {
    await Auction.deleteMany();
    console.log("Data deleted successfully");
    process.exit();
  } catch (error) {
    console.log("Error deleting data:", error);
    process.exit(1);
  }
};

// CLI argument to run function
const command = process.argv[2];

if (command === 'import') {
  importData(auctionData)
} else if (command === 'delete') {
  deleteData();
} else {
  console.log("Invalid command. Use 'import' or 'delete'.");
  process.exit();
}