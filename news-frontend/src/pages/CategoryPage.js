import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/articles");
        const filtered = response.data.articles.filter(
          (article) => article.category?.toLowerCase() === category.toLowerCase()
        );
        setFilteredArticles(filtered);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">{category.toUpperCase()} News</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filteredArticles.length === 0 ? (
        <p className="text-gray-400">No articles found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article._id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={article.image_url || "https://via.placeholder.com/300"} alt={article.headline} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-100">{article.headline}</h3>
              <p className="text-sm text-gray-400">{article.summary}</p>
              <a href={article.source_link} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
