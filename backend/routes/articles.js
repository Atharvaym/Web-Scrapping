const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// ✅ Fetch all articles (Limited to 100 for speed)
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find({}).limit(100);
        console.log("✅ Debug: Articles from MongoDB:", articles);
        if (articles.length === 0) {
            console.log("⚠️ No articles found in MongoDB.");
        }
        res.json({ articles });
    } catch (err) {
        console.error("❌ Error fetching news:", err);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

// ✅ Fetch articles by category
router.get("/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const articles = await Article.find({ category }).limit(100);
        res.json({ articles });
    } catch (err) {
        console.error("❌ Error fetching category articles:", err);
        res.status(500).json({ error: "Failed to fetch category news" });
    }
});

module.exports = router;
