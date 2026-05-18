import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateProfile.css"; // Import the CSS file
import { useContext } from "react";
import blogContext from "../../context/blogContext";
// import 

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const { backendURL,token } = useContext(blogContext);

  // Simulate fetching current user data (optional)
  useEffect(() => {
    // Fetch current user data and prefill (optional)
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData((prev) => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
        setPreview(res.data.imageURL);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // show preview
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (formData.image) form.append("image", formData.image);

      const res = await axios.post(`${backendURL}/api/user/update`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="update-profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          New Password:
          <input
            type="password"
            name="password"
            placeholder="Leave blank to keep existing"
            onChange={handleChange}
          />
        </label>

        <label>
          Profile Picture:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Profile preview" />
          </div>
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
