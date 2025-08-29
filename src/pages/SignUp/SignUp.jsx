import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import blogContext from "../../context/blogContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import signupImage from "../../assets/wordsPower.jpeg"; // Make sure to add an image here

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendURL } = useContext(blogContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/user/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-card row shadow-lg rounded overflow-hidden">
        {/* Image section */}
        <div className="col-md-6 p-0 d-none d-md-block">
          <img
            src={signupImage}
            alt="Sign Up"
            className="img-fluid h-100 w-100 signup-img"
          />
        </div>

        {/* Form section */}
        <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
          <h2 className="text-center mb-4 text-success fw-bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mt-2">
              Create Account
            </button>

            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none text-success fw-semibold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
