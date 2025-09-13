import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css";
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
    <div className="container create-post-container py-5 ">
      <div className="create-post-wrapper mx-auto p-5 rounded">
        <h2 className="mb-4">📝 Create New Post</h2>
        <form onSubmit={handleCreate} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body" className="form-label">Content</label>
            <textarea
              className="form-control form-control-lg"
              id="body"
              rows="6"
              placeholder="Write your blog content here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select form-select-lg"
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
            <label htmlFor="image" className="form-label">Upload Cover Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-gradient w-50 py-2">
              🚀 Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
