// IMPORTS
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SinglePost.css";
import defaultUserImg from "../../assets/user.png";
import blogContext from "../../context/blogContext";
import "@fontsource/poppins";
import "@fontsource/mulish";

const SinglePost = () => {
  const { id } = useParams();

  const { backendURL } = useContext(blogContext);

  const token = localStorage.getItem("token");

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH POST
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPost(res.data.post);

      const relatedRes = await axios.get(
        `${backendURL}/api/post/category/${res.data.post.category}/other/${res.data.post._id}`
      );

      setRelatedPosts(relatedRes.data.posts);
    } catch (err) {
      console.error(err);
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  // FETCH COMMENTS
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/comments/${id}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  // SUBMIT COMMENT
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `${backendURL}/api/comments/${id}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([res.data.comment, ...comments]);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <div className="row">

        {/* MAIN POST */}
        <div className="col-lg-8 pe-5">

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="img-fluid mb-3"
              style={{
                maxHeight: "400px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          )}

          <h2 className="text-center">{post.title}</h2>

          <p className="blog-text text-center">
            {post.content || "Post content goes here"}
          </p>

          <hr />

          {/* COMMENT FORM */}
          <div className="comment-form mb-4">
            <h5>Add Comment</h5>

            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="form-control mb-2"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />

              <button className="btn btn-primary">
                Post Comment
              </button>
            </form>
          </div>

          {/* COMMENTS */}
          <div className="comment-section p-3">
            <h5>Comments</h5>

            {comments.length > 0 ? (
              comments.map((c) => (
                <div
                  key={c._id}
                  className="mb-3 border-bottom pb-2"
                >
                  <h6 className="comment-author">
                    {c.author?.name || "Anonymous"}
                  </h6>

                  <small className="text-muted">
                    {new Date(c.createdAt).toLocaleString()}
                  </small>

                  <p className="comment-content">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="col-lg-4 ps-5 mt-4 side-banner">

          <div className="author-info">

            <img
              className="img-fluid user-img"
              src={post.author?.imageURL || defaultUserImg}
              alt="user"
            />

            <h3 className="text-center my-3" style={{ fontSize: "23px" }}>
              {post.author?.name || "Unknown"}
            </h3>

            <p className="text-center" style={{ color: "gray" }}>
              Blog author profile section
            </p>

            <button className="btn btn-primary">
              Read my bio
            </button>

          </div>

          {/* RELATED POSTS */}
          <div className="other-posts-div mt-5">

            <h5 className="text-center">
              Other posts in this category
            </h5>

            <hr />

            {relatedPosts.length > 0 ? (
              relatedPosts.map((p) => (
                <Link
                  to={`/post/${p._id}`}
                  key={p._id}
                  className="post-div my-3 d-flex"
                >

                  <img
                    src={p.imageUrl || defaultUserImg}
                    alt="post"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="ms-2">
                    <h6 style={{ fontSize: "14px", color: "#000" }}>
                      <b>{p.title}</b>
                    </h6>

                    <p style={{ fontSize: "13px", color: "silver" }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </Link>
              ))
            ) : (
              <p className="text-center text-muted">
                No related posts
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
