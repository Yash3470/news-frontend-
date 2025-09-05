import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} <strong>NewsApp</strong> | Built with ❤️
          by <span className="author">Yash</span>
        </p>
        <small>
          <a
            href="https://newsapi.org"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            Powered by NewsAPI.org
          </a>
        </small>
      </div>
    </footer>
  );
}
