import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);

  const [password, setPassword] = useState("");

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token, dispatch]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <div className="auth-compact-container">
      <div className="auth-compact-card">
        {isError ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <i className="bi bi-exclamation-triangle" style={{ fontSize: "48px", color: "var(--red-color)", marginBottom: "16px", display: "block" }}></i>
            <h1 className="auth-title" style={{ marginBottom: "12px" }}>Link Expired</h1>
            <p className="auth-subtitle" style={{ marginBottom: "24px" }}>This password reset link is invalid or has already expired. Please request a new one.</p>
            <Link to="/forgot-password" className="auth-btn" style={{ textDecoration: "none" }}>
              Request New Link
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-compact-back">
              <i className="bi bi-arrow-left"></i>
              <span>Back to login</span>
            </Link>

            <div className="auth-header">
              <h1 className="auth-title">Reset Password</h1>
              <p className="auth-subtitle">Set a secure new password for your Inkline account.</p>
            </div>

            <form onSubmit={formSubmitHandler} className="auth-form">
              <div className="auth-group">
                <label htmlFor="password" className="auth-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="auth-input"
                  id="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button className="auth-btn" type="submit">
                <span>Update Password</span>
                <i className="bi bi-shield-check"></i>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
