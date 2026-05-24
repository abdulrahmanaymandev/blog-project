import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <li>
          {/* active-link */}
          <Link
            to="/"
            onClick={() => setToggle(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : "nav-link"
            }
          >
            <i className="bi bi-house"></i> Home
          </Link>
        </li>
        <li>
          <Link
            to="/posts"
            onClick={() => setToggle(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : "nav-link"
            }
          >
            <i className="bi bi-stickies"></i> Library
          </Link>
        </li>
        {user && (
          <li>
            <Link
              to="/posts/create-post"
              onClick={() => setToggle(false)}
              className={({ isActive }) =>
                isActive ? "active-link" : "nav-link"
              }
            >
              <i className="bi bi-journal-plus"></i> Write
            </Link>
          </li>
        )}
        {user?.isAdmin && (
          <li>
            <Link
              to="/admin-dashboard"
              onClick={() => setToggle(false)}
              className={({ isActive }) =>
                isActive ? "active-link" : "nav-link"
              }
            >
              <i className="bi bi-person-check"></i> Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
