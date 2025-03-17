import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles`);
        const filteredArticles = response.data.articles.filter(article =>
          article.headline.toLowerCase().includes(query.toLowerCase())
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Search Results for: "{query}"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
              <img src={article.image_url || 'https://via.placeholder.com/300'} alt={article.headline} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold">{article.headline}</h3>
              <p className="text-sm text-gray-400">{article.summary}</p>
              <a href={article.source_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
