import { Link } from "react-router-dom";

const HeaderLeft = ({ toggle, setToggle }) => {
  return (
    <div className="header-left">
      <Link to="/" className="header-logo" onClick={() => setToggle(false)}>
        <span>Inkline</span>
      </Link>
      <button
        type="button"
        aria-label={toggle ? "Close navigation" : "Open navigation"}
        aria-expanded={toggle}
        onClick={() => setToggle((prev) => !prev)}
        className="header-menu"
      >
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </button>
    </div>
  );
};

export default HeaderLeft;
