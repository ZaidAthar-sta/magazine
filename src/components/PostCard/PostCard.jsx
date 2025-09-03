import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ post, isAuthor, small, commentCount = 0, onDelete }) => {
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="feature-image-thumb">
      {/* Image */}
      <img
        src={post.imageUrl}
        alt={post.title}
        className="img-fluid"
        style={{
          width: "100%",
          height: small ? "369px" : "253px",
          objectFit: "cover",
          borderRadius: "0.25rem",
        }}
      />

      {/* Text below the image */}
      <div className="post-details p-3">
        {post.category && (
          <span
            className="badge bg-secondary text-white mb-3"
            style={{
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          >
            {post.category.toUpperCase()}
          </span>
        )}
        <Link className="single-post-link" to={`/post/${post._id}`}>
          <h5 className="text-truncate post-title">{post.title}</h5>
        </Link>

        {/* Post date */}
        {formattedDate && (
          <small
            style={{ fontSize: "13px" }}
            className="text-muted d-block mb-2"
          >
            Posted on {formattedDate}
          </small>
        )}

        {/* Author */}
        <div className="d-flex align-items-center gap-2 mb-2">
          {post.author?.imageURL && (
            <img
              src={post.author.imageURL}
              alt={post.author.name}
              className="rounded-circle img-fluid my-2 "
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
            />
          )}
          <small className="author-name">
            {" "}
            {post.author?.name || "Unknown"}
          </small>
        </div>
        <div className="post-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          modi blanditiis quia? Doloribus dolorem alias ex corporis quis animi!
          Delectus accusamus maiores similique eveniet ea animi, asperiores
          alias. Corporis, ipsum! Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </div>

        {/* Comments */}
        <p className="small my-4">
          💬 {commentCount} {commentCount === 1 ? "comment" : "comments"}
        </p>

        {/* Buttons */}
        <div className="d-flex gap-2">
          {isAuthor && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete?.(post._id)}
            >
              Delete
            </button>
          )}
          <Link
            to={`/post/${post._id}`}
            className="btn btn-sm btn-outline-primary"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
