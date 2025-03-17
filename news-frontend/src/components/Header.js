import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const categories = [
    "Home", "News", "Sport", "Business", "Innovation", "Culture", "Arts", "Travel", "Earth"
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-gray-900 text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">📰 BBC News</h1>
        <div className="space-x-6 hidden md:flex">
          {categories.map((cat) => (
            <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="hover:text-red-400 transition duration-200">
              {cat}
            </Link>
          ))}
        </div>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 text-black rounded-l-md w-48 focus:outline-none"
          />
          <button type="submit" className="bg-red-500 px-4 py-2 rounded-r-md hover:bg-red-600 transition duration-200">
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
