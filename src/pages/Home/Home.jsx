import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AllPosts from "../AllPosts/AllPosts";
import "./Home.css";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-banner d-flex align-items-center justify-content-center text-center text-white">
        <div className="hero-overlay mt-5 p-5 rounded shadow-sm">
          <h1 className="display-4 fw-bold text-black animate-fade-in">
            <i>
              <h1 style={{fontSize:"40px",fontWeight:"700",wordSpacing:"10px" }} > WELCOME TO</h1>
              <span style={{ color: "#fb8c00" }}> Morning's </span>
              <span style={{ color: "red" }}>Magazine</span>
            </i>
          </h1>
          <p className="lead animate-slide-in">
            Discover insightful posts, share your stories, and connect with a
            vibrant community.
          </p>
          {/* <a href="/all" className="btn explore-btn btn-primary btn-lg mt-3 animate-button">
            Explore
          </a> */}
        </div>
      </div>

      <div className="all-posts mt-5">
        <AllPosts />
      </div>
      <div className="newsletter">
      <NewsLetter />
      </div>
    </div>
  );
};

export default Home;
