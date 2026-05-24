import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";
import "./post-details.css";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const navigate = useNavigate();

  // Fetch Post Details
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  // Scroll reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setScrollPercent(scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
    setFile(null); // Clear selected file after dispatch
  };

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  if (!post) {
    return (
      <div className="post-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading reading experience...</p>
      </div>
    );
  }

  // Calculate reading time
  const wordCount = post?.description?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="post-details-container">
      {/* Scroll Progress Bar */}
      <div className="reading-progress" style={{ width: `${scrollPercent}%` }} aria-hidden="true" />

      {/* 1. Article Header */}
      <header className="article-header">
        <Link to={`/posts/categories/${post?.category}`} className="article-category-badge">
          {post?.category}
        </Link>
        <h1 className="article-title">{post?.title}</h1>

        <div className="article-meta-row">
          <Link to={`/profile/${post?.user?._id}`} className="author-info-link">
            <img
              src={post?.user?.profilePhoto?.url}
              alt={post?.user?.username}
              className="meta-author-photo"
            />
            <span className="meta-author-name">{post?.user?.username}</span>
          </Link>
          <span className="meta-separator">&bull;</span>
          <span className="meta-date">
            {new Date(post?.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="meta-separator">&bull;</span>
          <span className="meta-read-time">{readingTime} min read</span>
        </div>
      </header>

      {/* 2. Cover Image & Dynamic Uploader */}
      <div className="article-cover-container">
        <div className="cover-img-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : post?.image?.url}
            alt={post?.title || "Post cover"}
            className="article-cover-image"
          />
        </div>

        {user?._id === post?.user?._id && (
          <form onSubmit={updateImageSubmitHandler} className="cover-update-form">
            {!file ? (
              <>
                <label htmlFor="cover-file-input" className="btn-cover-change">
                  <i className="bi bi-camera"></i>
                  <span>Change Cover</span>
                </label>
                <input
                  type="file"
                  name="file"
                  id="cover-file-input"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </>
            ) : (
              <div className="cover-update-actions">
                <button type="submit" className="btn-cover-save">
                  Save Image
                </button>
                <button type="button" className="btn-cover-cancel" onClick={() => setFile(null)}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        )}
      </div>

      {/* 3. Article Core Body */}
      <div className="article-body-wrapper">
        <div className="article-content">
          <p className="article-paragraph">{post?.description}</p>
        </div>

        {/* 4. Action Bar (Likes, Edit/Delete) */}
        <div className="article-action-bar">
          <div className="action-left">
            {user ? (
              <button
                onClick={() => dispatch(toggleLikePost(post?._id))}
                className={`btn-action btn-like ${post?.likes?.includes(user?._id) ? "is-liked" : ""}`}
                aria-label={post?.likes?.includes(user?._id) ? "Unlike post" : "Like post"}
              >
                <i className={`bi ${post?.likes?.includes(user?._id) ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`}></i>
                <span>{post?.likes?.length} Likes</span>
              </button>
            ) : (
              <div className="likes-display-only">
                <i className="bi bi-hand-thumbs-up"></i>
                <span>{post?.likes?.length} Likes</span>
              </div>
            )}
          </div>

          {user?._id === post?.user?._id && (
            <div className="action-right">
              <button onClick={() => setUpdatePost(true)} className="btn-action btn-edit" title="Edit Post">
                <i className="bi bi-pencil-square"></i>
                <span>Edit</span>
              </button>
              <button onClick={deletePostHandler} className="btn-action btn-delete" title="Delete Post">
                <i className="bi bi-trash"></i>
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        <hr className="article-divider" />

        {/* 5. Author Card */}
        <div className="article-author-card">
          <img
            src={post?.user?.profilePhoto?.url}
            alt={post?.user?.username}
            className="author-card-avatar"
          />
          <div className="author-card-info">
            <span className="author-card-kicker">Written By</span>
            <h4 className="author-card-name">
              <Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
            </h4>
            <p className="author-card-bio">
              Inkline contributor sharing stories, essays, and observations on technology, design, and culture.
            </p>
          </div>
          <Link to={`/profile/${post?.user?._id}`} className="author-card-link">
            View Profile
          </Link>
        </div>

        {/* 6. Comments Section */}
        <section className="article-comments-section">
          <h3 className="comments-heading">
            Responses <span className="comments-count">({post?.comments?.length || 0})</span>
          </h3>

          {user ? (
            <AddComment postId={post?._id} />
          ) : (
            <div className="comments-login-prompt">
              <p>Log in or sign up to join the conversation.</p>
              <Link to="/login" className="btn-comments-login">
                Log In
              </Link>
            </div>
          )}

          <CommentList comments={post?.comments} />
        </section>
      </div>

      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </article>
  );
};

export default PostDetails;
