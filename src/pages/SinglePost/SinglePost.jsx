import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = ({ backendURL }) => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.post);

        setPost(res.data.post);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      }
    };

    fetchPost();
  }, [backendURL, id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="container">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="img-fluid mb-3"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      )}
      <div className="post-text p-4">
        <h2 className="text-center"> {post.title}</h2>
        <p className="text-muted text-center ">
          By {post.author?.name || "Unknown"}
        </p>
        {/* <p>{post.body}</p> */}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit eaque
          suscipit, nemo necessitatibus quas eligendi ad minus, dolorum
          dignissimos odit cupiditate fugit? Perferendis omnis eaque ab
          laboriosam officia, nostrum voluptates. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Explicabo quos delectus nam harum
          distinctio excepturi aliquid, odit accusantium laboriosam minima
          voluptate recusandae quam? Pariatur animi sapiente qui dolorum, quia
          laudantium?
        </p>

        <hr />
        <div className="comment-section p-3">
          <h5>Comments</h5>
          {Array.isArray(post.comments) && post.comments.length > 0 ? (
            post.comments.map((comment, idx) => (
              <div key={comment._id || idx} className="mb-2 border-bottom pb-2">
                <p>{comment.content}</p>
                <small className="text-muted">
                  {comment.author?.name || "Anonymous"} |{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-muted">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
