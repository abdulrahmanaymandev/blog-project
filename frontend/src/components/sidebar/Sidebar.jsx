import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import "./sidebar.css";

const Sidebar = ({ horizontal = false }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (horizontal) {
    return (
      <div className="category-strip-container">
        <span className="category-strip-title">Categories</span>
        <div className="category-strip-wrapper">
          <Link to="/posts" className="category-pill-link is-all">
            All Posts
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/posts/categories/${category.title}`}
              className="category-pill-link"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="sidebar-aside">
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Popular Topics</h3>
        <div className="sidebar-category-list">
          {categories.map((category) => (
            <Link
              className="sidebar-category-item"
              key={category._id}
              to={`/posts/categories/${category.title}`}
            >
              <span className="category-name">{category.title}</span>
              <span className="category-arrow">
                <i className="bi bi-chevron-right"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar-widget promo-widget">
        <div className="promo-content">
          <span className="promo-badge">Write on Inkline</span>
          <h4>Share your ideas with the world.</h4>
          <p>
            Create a member profile and start publishing your articles today.
          </p>
          <Link to="/posts/create-post" className="promo-btn">
            Start Writing
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
