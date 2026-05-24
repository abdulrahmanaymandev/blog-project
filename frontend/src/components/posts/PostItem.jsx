import { Link } from "react-router-dom";
import "./posts.css";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`;
  const authorName = username || post?.user?.username || "Writer";

  // Calculate a reading time estimate based on description length
  const wordCount = post?.description?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="post-card">
      <div className="post-card-image-wrapper">
        <img
          src={post?.image?.url}
          alt={post?.title || "Post cover"}
          className="post-card-image"
          loading="lazy"
        />
        <Link to={`/posts/categories/${post?.category}`} className="post-card-category">
          {post?.category}
        </Link>
      </div>

      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-card-date">
            {new Date(post?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="post-card-separator">&bull;</span>
          <span className="post-card-read-time">{readingTime} min read</span>
        </div>

        <h3 className="post-card-title">
          <Link to={`/posts/details/${post?._id}`} className="post-card-title-link">
            {post?.title}
          </Link>
        </h3>

        <p className="post-card-excerpt">{post?.description}</p>

        <div className="post-card-footer">
          <Link to={profileLink} className="post-card-author">
            {/* Generate a clean visual avatar matching the name */}
            <div className="post-card-avatar">
              {authorName.charAt(0).toUpperCase()}
            </div>
            <span className="post-card-author-name">{authorName}</span>
          </Link>

          <Link to={`/posts/details/${post?._id}`} className="post-card-read-btn">
            Read <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
