import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import blogContext from "../../context/blogContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import loginImage from "../../assets/login.jpeg"; // ✅ Add your image here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendURL } = useContext(blogContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card row shadow-lg rounded overflow-hidden">
        {/* Left Image */}
        <div className="col-md-6 p-0 d-none d-md-block">
          <img
            src={loginImage}
            alt="Login visual"
            className="img-fluid h-100 w-100 login-img"
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          <h2 className="text-center mb-4 fw-bold text-primary">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Login
            </button>

            <p className="text-center mt-4 mb-0">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary fw-semibold">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
