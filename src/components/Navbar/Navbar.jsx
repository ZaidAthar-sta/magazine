import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const categories = [
  "technology",
  "travel",
  "health",
  "finance",
  "lifestyle",
  "education",
  "sports",
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = `navbar p-3 navbar-expand-lg ${
    isHome
      ? scrolled
        ? "navbar-scrolled with-shadow fixed-top"
        : "navbar-transparent fixed-top"
      : "navbar-default with-shadow fixed-top"
  }`;

  return (
    <nav className={navbarClass}>
      <div className="container-fluid">
        <Link className="navbar-brand text-dark fw-bold" to="/">
          <i>
            <span /*style={{ color: "#fb8c00" }} */ >Morning's </span>
            <span /* style={{ color: "red" }} */ >Magazine</span>
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
          <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/post/create">
                Create Post
              </Link>
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
                    <Link
                      className="dropdown-item text-capitalize"
                      to={`/category/${cat}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
