import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer pt-4 pb-2 bg-dark text-white">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-6 mb-4">
            <h3 className="mb-3" >About Us</h3>
            <p>
              Welcome to MyBlog — your go-to platform for inspiring travel
              stories, tech insights, wellness tips, and much more. Join our
              community of passionate writers and readers. Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Iure sapiente reiciendis id
              optio voluptates fugiat, aperiam assumenda nobis? Saepe harum
              facilis aspernatur
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5>Quick Links</h5>
            <ul className="footer-list list-unstyled">
              <li>
                <a href="/magazine/about">About Us</a>
              </li>
              <li>
                <a href="/magazine/contact">Contact</a>
              </li>
              <li>
                <a href="/magazine/category/travel">Travel</a>
              </li>
              <li>
                <a href="/magazine/category/technology">Technology</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h5>Follow Us</h5>
            <div className="social-icons text-center d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon linkedin"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="icon github"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
     
        </div>
        <hr className="bg-light" />
        <p className="text-center m-0">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
