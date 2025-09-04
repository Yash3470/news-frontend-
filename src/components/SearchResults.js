import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Use backend instead of direct API call
  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/search?q=${query}`);
        const data = await res.json();

        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query, API_BASE]);

  return (
    <div className="container my-4">
      <h2>
        Search Results for: <strong>{query}</strong>
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No results found...</p>
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img
                  src={
                    article.urlToImage ||
                    "https://cdn-icons-png.flaticon.com/512/21/21601.png"
                  }
                  className="card-img-top"
                  alt="news"
                  onError={(e) => {
                    e.target.src =
                      "https://cdn-icons-png.flaticon.com/512/21/21601.png";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
