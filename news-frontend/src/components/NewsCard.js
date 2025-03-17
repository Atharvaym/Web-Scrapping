import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  return (
    <div className="bg-gray-800 text-gray-200 shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
      <img src={article.image_url} alt={article.headline} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-3">{article.headline}</h2>
      <p className="text-gray-400 text-sm mt-2">{article.summary}</p>
      <Link to={`/news/${article._id}`} className="text-red-400 mt-3 inline-block hover:underline">
        Read more →
      </Link>
    </div>
  );
};

export default NewsCard;
