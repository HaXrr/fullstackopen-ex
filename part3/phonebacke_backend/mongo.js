const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    mongoose.set("strictQuery", false)

    await mongoose.connect(uri)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    process.exit(1) // exit if can't connect
  }
}

module.exports = connectDB
