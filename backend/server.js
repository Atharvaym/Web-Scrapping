// Backend (Express.js)
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Article = require("./models/Article"); // Assuming your article model
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find().limit(200); // Limit articles to max 20 per section
    res.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).send("Server error");
  }
});

// ✅ Basic Route
app.get("/", (req, res) => {
  res.send("Server is running. Use /api/articles to get news articles.");
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
