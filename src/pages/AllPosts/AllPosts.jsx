import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import blogContext from "../../context/blogContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PostCard from "../../components/PostCard/PostCard";
import "./AllPosts.css";

const AllPosts = () => {
  const { backendURL } = useContext(blogContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentsCount, setCommentsCount] = useState({});
  const [visibleComments, setVisibleComments] = useState({}); // ⬅️ New
  const [comments, setComments] = useState({}); // ⬅️ New
  const [newComment, setNewComment] = useState({});

  const token = localStorage.getItem("token");

  let currentUserId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.userId || decoded.id || decoded._id;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/post/all`);
        const postsData = response.data.posts || [];
        setPosts(postsData);

        const countsPromises = postsData.map((post) =>
          axios
            .get(`${backendURL}/api/comments/count/${post._id}`)
            .then((res) => ({ postId: post._id, count: res.data.count }))
            .catch(() => ({ postId: post._id, count: 0 }))
        );

        const countsResults = await Promise.all(countsPromises);
        const countsObj = {};
        countsResults.forEach(({ postId, count }) => {
          countsObj[postId] = count;
        });
        setCommentsCount(countsObj);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [backendURL]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.post(
        `${backendURL}/api/post/delete/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setCommentsCount((prevCounts) => {
        const newCounts = { ...prevCounts };
        delete newCounts[postId];
        return newCounts;
      });
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post");
    }
  };

  const toggleComments = async (postId) => {
    const isVisible = visibleComments[postId];

    if (isVisible) {
      // Hide comments
      setVisibleComments((prev) => ({ ...prev, [postId]: false }));
    } else {
      // Show comments
      if (!comments[postId]) {
        try {
          const res = await axios.get(`${backendURL}/api/comments/${postId}`);
          setComments((prev) => ({
            ...prev,
            [postId]: res.data.comments || [],
          }));
        } catch (err) {
          console.error("Failed to fetch comments:", err);
          alert("Error fetching comments");
        }
      }
      setVisibleComments((prev) => ({ ...prev, [postId]: true }));
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment[postId]?.trim()) return;

    try {
      const res = await axios.post(
        `${backendURL}/api/comments/${postId}`,
        { content: newComment[postId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdComment = res.data.comment;

      setComments((prev) => ({
        ...prev,
        [postId]: [createdComment, ...(prev[postId] || [])],
      }));

      setCommentsCount((prev) => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1,
      }));

      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to add comment");
    }
  };

  return (
    <>
      <div className="container">
        <div className="posts-heading">
          
            <h2 className="p-3 mb-5">
              <span> <b>POPULAR</b> </span>{" "}
              <span > <b>POSTS</b> </span>
            </h2>
     
        </div>

        <div className="row ">
          {posts.map((post) => (
            <div key={post._id} className="col-lg-4 mb-4">
              <PostCard
                post={post}
                isAuthor={post.author?._id === currentUserId}
                commentCount={commentsCount[post._id] || 0}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPosts;
