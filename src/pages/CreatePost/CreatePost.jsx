import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css"; // 🆕 Import custom CSS
import blogContext from "../../context/blogContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const categories = [
  "technology",
  "travel",
  "health",
  "finance",
  "lifestyle",
  "education",
  "sports",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const { backendURL } = useContext(blogContext);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("category", category);
      formData.append("isPublished", true);
      if (image) formData.append("image", image);

      const res = await axios.post(`${backendURL}/api/post/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Post created successfully!");
        setTitle("");
        setBody("");
        setCategory("");
        setImage(null);
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="container my-5">
      <div className="create-post-card shadow p-4 rounded bg-white">
        <h2 className="text-center mb-4 text-primary">✍️ Create a New Blog Post</h2>
        <form onSubmit={handleCreate} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control border-0 border-bottom"
              id="title"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="body" className="form-label fw-semibold">Body</label>
            <textarea
              className="form-control "
              id="body"
              rows="6"
              placeholder="Start writing your story..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-semibold">Category</label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select a category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              className="form-control form-image"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">
              🚀 Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
