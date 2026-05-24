import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import "./posts-page.css";

const POST_PER_PAGE = 3; // Must match the backend limit for pagination to work correctly

const PostsPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  return (
    <main className="posts-page-wrapper">
      {/* Editorial Page Header */}
      <header className="posts-page-header">
        <div className="posts-page-header-content">
          <span className="library-kicker">The Library</span>
          <h1 className="library-title">Thoughtful ideas and essays.</h1>
          <p className="library-subtitle">
            Explore our complete archive of articles, guides, and stories across
            technology, design, culture, and more.
          </p>
        </div>
      </header>

      {/* Horizontal Category Pill Strip */}
      <Sidebar horizontal={true} />

      {/* Main Grid Content */}
      <section className="posts-grid-section">
        <PostList posts={posts} />
      </section>

      {/* Pagination Controls */}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

export default PostsPage;
