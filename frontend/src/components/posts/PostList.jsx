import PostItem from "./PostItem";
import "./posts.css";

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="posts-empty-state">
        <i className="bi bi-journal-x"></i>
        <h3>No posts found</h3>
        <p>There are no articles matching this criteria right now.</p>
      </div>
    );
  }

  return (
    <div className="posts-grid-container">
      {posts.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
};

export default PostList;