import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import NewsDetail from "./pages/NewsDetail";
import SearchResults from "./pages/SearchResults";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
