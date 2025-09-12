import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const categories = [
  "technology", "travel", "health", "finance",
  "lifestyle", "education", "sports",
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navClass = isHome
    ? scrolled
      ? "scrolled-nav bg-white navbar-light shadow-sm fixed-top"
      : "transparent-nav fixed-top"
    : "navbar-light bg-white";

  return (
    <nav className={`navbar navbar-expand-lg p-3 ${navClass}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <i>
            <span style={{ color: "#fb8c00" }}>Morning's </span>
            <span style={{ color: "red" }}>Magazine</span>
          </i>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/all">All Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post/create">Create Post</Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="categoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </span>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link className="dropdown-item text-capitalize" to={`/category/${cat}`}>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <button
            onClick={handleLogOut}
            className={`btn ${isHome && !scrolled ? "btn-outline-light" : "btn-dark"}`}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
