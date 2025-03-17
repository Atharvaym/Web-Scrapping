import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/articles/${id}`)
      .then((response) => setArticle(response.data))
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  if (!article) return <p className="text-white">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white">{article.headline}</h1>
      <p className="text-gray-400">{article.published_date} - {article.author}</p>
      <img src={article.image_url} alt={article.headline} className="w-full h-64 object-cover my-4 rounded" />
      <p className="text-lg text-gray-300">{article.content}</p>
    </div>
  );
};

export default NewsDetail;
