import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// Fetch all news articles
export const fetchAllNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// Fetch news by category
export const fetchNewsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/news/category/${category}`);
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
};

// Fetch single news article by ID
export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};
