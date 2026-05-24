import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-left">
          <NavLink
            to="/"
            className="header-logo"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* <span className="logo-dot"></span> */}
            <img src="/favicon0.ico" alt="Inkline" width={50} height={50} />
            <span className="logo-text">Inkline</span>
          </NavLink>
        </div>

        {/* Central Navigation Links */}
        <nav className={`header-nav ${mobileMenuOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Library
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/posts/create-post"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Write
                </NavLink>
              </li>
            )}
            {user?.isAdmin && (
              <li>
                <NavLink
                  to="/admin-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          {/* Search Placeholder inside mobile nav */}
          <div className="nav-search-mobile">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search Inkline..." disabled />
          </div>
        </nav>

        {/* Auth / Profile & Menu Trigger */}
        <div className="header-right">
          {/* Search Icon (Desktop) */}
          <div className="header-search-trigger" title="Search (Coming soon)">
            <i className="bi bi-search"></i>
          </div>

          {user ? (
            <div className="header-user-menu">
              <button
                className="header-avatar-btn"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-label="User dropdown menu"
              >
                <img
                  src={user?.profilePhoto?.url}
                  alt={user?.username || "User"}
                  className="header-user-photo"
                />
                <span className="header-username">{user?.username}</span>
                <i
                  className={`bi bi-chevron-down dropdown-arrow ${dropdownOpen ? "is-active" : ""}`}
                ></i>
              </button>

              {dropdownOpen && (
                <div className="header-dropdown-menu">
                  <div className="dropdown-user-details">
                    <p className="dropdown-user-name">{user?.username}</p>
                    <p className="dropdown-user-email">
                      {user ? user.email : "Loading..."}
                    </p>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link
                    to={`/profile/${user?._id}`}
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="dropdown-item logout-btn"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="header-auth-buttons">
              <Link to="/login" className="btn-auth btn-auth-secondary">
                Sign In
              </Link>
              <Link to="/register" className="btn-auth btn-auth-primary">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            className={`header-hamburger ${mobileMenuOpen ? "is-active" : ""}`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
