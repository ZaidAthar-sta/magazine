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
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { backendURL } = useContext(blogContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPost(res.data.post);

        // Get other posts from same category
        const relatedRes = await axios.get(
          `${backendURL}/api/post/category/${res.data.post.category}/other/${res.data.post._id}`
        );
        setRelatedPosts(relatedRes.data.posts);
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
    <>
      <div className="container">
        <div className="row">
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
            <h2 className="text-center"> {post.title}</h2>
            <p className="blog-text text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
              repudiandae ea eveniet incidunt harum, consequuntur deserunt
              praesentium atque quisquam quia quis porro aperiam earum ipsa, et
              explicabo provident, officia nulla? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quibusdam rerum ducimus, deleniti
              incidunt, libero repellendus aliquid repudiandae ipsam ipsum
              deserunt odio beatae sed iste quia non voluptatibus cumque
              cupiditate autem! <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              tempore nemo consequuntur maiores? Omnis, molestiae veritatis.
              Voluptate porro adipisci veritatis molestias repellat ipsam cumque
              consectetur, id magnam animi nobis alias.
            </p>
            <hr />
            <div className="comment-section p-3">
              <h5>Comments</h5>
              {Array.isArray(post.comments) && post.comments.length > 0 ? (
                post.comments.map((comment, idx) => (
                  <div
                    key={comment._id || idx}
                    className="mb-2 border-bottom pb-2"
                  >
                    <small className="text-muted">
                      <h6 className="comment-author">
                        {" "}
                        {comment.author?.name || "Anonymous"}{" "}
                      </h6>
                      <p className="comment-date">
                        {" "}
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </small>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No comments yet.</p>
              )}
            </div>
          </div>
          <div className="col-lg-4 ps-5 mt-4 side-banner">
            <div className="author-info">
              <img
                className="img-fluid user-img"
                src={post.author?.imageURL || defaultUserImg}
                alt={post.author?.name || "User"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultUserImg;
                }}
              />
              <h3 className="text-center my-3" style={{fontSize:"23px"}} >{post.author?.name || "Unknown"}</h3>
              <p className="text-center " style={{color:"gray" , fontSize:"16px" }} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorum illum voluptas quod quasi, vel in sapiente aperiam vero,
                modi dolor mollitia! At, asperiores nobis a itaque provident
                natus dolorem nulla!
              </p>
              <button className="btn-primary text-white p-2 mt-2">
                Read my bio
              </button>
            </div>
            <div className="other-posts-div mt-5">
              <h5 className=" text-center">
                Other posts regarding this category
              </h5>
              <hr className="mx-3" />
              <div
                className="other-posts"
              >
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((otherPost) => (
                    <Link to={`/post/${otherPost._id}`} className="post-div my-4 mx-3 " key={otherPost._id}>
                      <img
                        src={otherPost.imageUrl || defaultUserImg}
                        alt="post-img"
                        className="me-2"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="title">
                        <h6 style={{ fontSize: "14px",color:"#000000" }}>
                          <b>{otherPost.title}</b>
                        </h6>
                        <p style={{ fontSize: "14px",color:"silver" }}>
                          {new Date(otherPost.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-muted text-center">
                    No other posts found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
