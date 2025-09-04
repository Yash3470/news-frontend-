import React, { useEffect, useState } from "react";
import "./News.css";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // ✅ Use backend proxy instead of calling NewsAPI directly
  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const currentCategory = category || "general";
        const res = await fetch(
          `${API_BASE}/news?category=${currentCategory}&page=${page}`
        );

        if (!res.ok) {
          throw new Error(`Backend error: ${res.status}`);
        }

        const data = await res.json();

        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);

      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, page, API_BASE]);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(totalResults / 9)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="news-container">
      <h2 className="news-heading">
        {(category || "general").charAt(0).toUpperCase() +
          (category || "general").slice(1)}{" "}
        News
      </h2>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-image" />
              <div className="skeleton-text short" />
              <div className="skeleton-text long" />
              <div className="skeleton-button" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p>No news found...</p>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div className="news-card" key={index}>
              <img
                src={
                  article.urlToImage ||
                  "https://cdn-icons-png.flaticon.com/512/21/21601.png"
                }
                className="news-img"
                alt="news"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/21/21601.png";
                }}
              />
              <div className="news-content">
                <h5 className="news-title">{article.title}</h5>
                <p className="news-description">{article.description}</p>
                <p className="news-author">
                  Author: {article.author || "Unknown"} –{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}{" "}
                  {new Date(article.publishedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="news-button"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={handlePrev}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={page >= Math.ceil(totalResults / 9)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
