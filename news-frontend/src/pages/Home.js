import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/articles`)
      .then((response) => setArticles(response.data.articles))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;