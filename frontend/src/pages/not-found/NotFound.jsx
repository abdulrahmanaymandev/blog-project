import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  return (
    <section className="not-found-section">
      <div className="not-found-code">404</div>
      <h1 className="not-found-header">Lost in Translation</h1>
      <p className="not-found-description">
        The story you are seeking might have been moved, deleted, or never existed in our archives. Let's get you back on track.
      </p>
      <Link className="not-found-btn" to="/">
        <i className="bi bi-house-door"></i>
        <span>Go to home page</span>
      </Link>
    </section>
  );
};

export default NotFound;
