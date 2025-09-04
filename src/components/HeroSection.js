import React, { useEffect, useState } from "react";
import "./Herosection.css"; // Import custom styles for the hero section

const HeroSection = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Use dynamic backend URL (local in dev, deployed in prod)
  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/news`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_BASE]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, [articles]);

  if (loading) {
    return (
      <div className="hero-loading">
        <h2>Loading Hero News...</h2>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="hero-loading">
        <h2>No news available.</h2>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="container my-5">
      <h1 className="hero-title">Stay Informed with the Latest Headlines</h1>
      <p className="hero-subtitle">
        Breaking news from around the world — updated in real-time
      </p>

      <div className="card bg-dark text-white hero-card">
        <img
          src={
            currentArticle.urlToImage ||
            "https://cdn-icons-png.flaticon.com/512/21/21601.png"
          }
          className="card-img"
          alt="Top headline"
          onError={(e) => {
            e.target.src = "https://cdn-icons-png.flaticon.com/512/21/21601.png";
          }}
        />
        <div className="card-img-overlay d-flex flex-column justify-content-end hero-overlay">
          <h2 className="card-title">{currentArticle.title}</h2>
          <p className="card-text d-none d-md-block">
            {currentArticle.description}
          </p>
          <a
            href={currentArticle.url}
            className="btn btn-primary w-25 mt-2"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
