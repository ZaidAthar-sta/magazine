import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import top_post from "../../assets/top-post1.jpg.webp";
import AllPosts from "../AllPosts/AllPosts";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-banner d-flex align-items-center justify-content-center text-center text-white">
        <div className="hero-overlay p-5 rounded shadow-sm">
          <h1 className="display-4 fw-bold animate-fade-in">
            Welcome to Our Blog
          </h1>
          <p className="lead animate-slide-in">
            Discover insightful posts, share your stories, and connect with a
            vibrant community.
          </p>
          <a href="/all" className="btn btn-primary btn-lg mt-3 animate-button">
            Explore
          </a>
        </div>
      </div>

      <div className="all-posts mt-5">
        <AllPosts />
      </div>
    </div>
  );
};

export default Home;
