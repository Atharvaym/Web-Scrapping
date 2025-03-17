const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    headline: String,
    author: String,
    published_date: String,
    summary: String,
    content: String,
    image_url: String,
    source_link: String,
    category: String
});

const Article = mongoose.model("Article", articleSchema, "articles"); // Explicit collection name

module.exports = Article;
