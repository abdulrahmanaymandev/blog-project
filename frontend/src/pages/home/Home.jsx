import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import Sidebar from "../../components/sidebar/Sidebar";
import PostItem from "../../components/posts/PostItem";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch first page of posts
    dispatch(fetchPosts(1));
    window.scrollTo(0, 0);
  }, [dispatch]);

  // Extract featured, bento, and recent posts dynamically
  const hasPosts = posts && posts.length > 0;
  const featuredPost = hasPosts ? posts[0] : null;
  const bentoPosts = hasPosts ? posts.slice(1, 4) : [];
  const recentPosts = hasPosts ? posts.slice(4) : [];

  return (
    <section className="home-page-container">
      {/* 1. Hero Section: Two-Column Editorial Layout */}
      <div className="home-hero">
        <div className="home-hero-content">
          <div className="hero-text-area">
            <span className="hero-kicker">Thoughtful Writing & Ideas</span>
            <h1 className="hero-headline">
              Stories, insights, and perspectives with room to breathe.
            </h1>
            <p className="hero-subheading">
              Welcome to Inkline - an independent publishing platform designed
              for writers who value craft and readers who seek depth. Explore
              essays, design notes, and creative thoughts.
            </p>
            <div className="hero-actions">
              <Link to="/posts" className="btn-hero-primary">
                Browse Library
              </Link>
              {user ? (
                <Link to="/posts/create-post" className="btn-hero-secondary">
                  Write a Story
                </Link>
              ) : (
                <Link to="/register" className="btn-hero-secondary">
                  Become a Writer
                </Link>
              )}
            </div>
          </div>

          <div className="hero-featured-area">
            {featuredPost ? (
              <div className="featured-card-wrapper">
                <span className="featured-badge">Featured Article</span>
                <PostItem post={featuredPost} />
              </div>
            ) : (
              <div className="hero-editorial-art">
                <div className="art-circle"></div>
                <div className="art-square"></div>
                <span className="art-text">Inkline</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Category Strip pill filters (Visible on mobile only) */}
      <div className="mobile-category-strip">
        <Sidebar horizontal={true} />
      </div>

      <div className="home-main-layout">
        <div className="home-content-section">
          {/* 3. Bento Grid: Asymmetric layout for posts 1-3 */}
          {bentoPosts.length > 0 && (
            <div className="bento-section">
              <h2 className="section-title">Trending Stories</h2>
              <div className="bento-grid">
                {bentoPosts.map((post, idx) => (
                  <div
                    key={post._id}
                    className={`bento-item bento-item-${idx + 1}`}
                  >
                    <PostItem post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Recent Feed: Remaining posts in a clean grid/list layout */}
          {(recentPosts.length > 0 || !featuredPost) && (
            <div className="recent-feed-section">
              <h2 className="section-title">More from Inkline</h2>
              {recentPosts.length > 0 ? (
                <div className="recent-posts-grid">
                  {recentPosts.map((post) => (
                    <PostItem post={post} key={post._id} />
                  ))}
                </div>
              ) : (
                <div className="home-no-posts-fallback">
                  <i className="bi bi-journal-text"></i>
                  <h3>No posts published yet</h3>
                  <p>Check back soon or start writing the very first post!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Vertical Sidebar on desktop next to secondary content */}
        <div className="home-sidebar-section">
          <Sidebar />
        </div>
      </div>

      {/* 5. CTA Banner: Full-width invitation to write */}
      <div className="write-cta-banner">
        <div className="cta-banner-content">
          <span className="cta-kicker">Share Your Perspective</span>
          <h2 className="cta-title">Publish your ideas on Inkline.</h2>
          <p className="cta-desc">
            We provide a beautiful, distraction-free environment to write, share
            thoughts, and build a dedicated base of curious readers. Start your
            newsletter, journal, or portfolio today.
          </p>
          <Link
            to={user ? "/posts/create-post" : "/register"}
            className="cta-btn"
          >
            {user ? "Start Writing Now" : "Create Your Writer Profile"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
