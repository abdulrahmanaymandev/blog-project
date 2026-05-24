import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        dispatch(loginUser({ email, password }));
    }

    return ( 
        <div className="auth-wrapper">
            {/* Left Decorative Column */}
            <div className="auth-brand-panel">
                <div className="auth-brand-logo">
                    <i className="bi bi-feather"></i>
                    <span>Inkline.</span>
                </div>
                
                <div className="auth-brand-main">
                    <h2 className="auth-brand-tagline">
                        The Canvas for Your Thoughts
                    </h2>
                    <p className="auth-brand-description">
                        Join a community of writers and readers sharing deep insights, unique perspectives, and professional thoughts on everything that matters.
                    </p>
                </div>
                
                <div className="auth-brand-footer">
                    © {new Date().getFullYear()} Inkline Publishing Group
                </div>
            </div>

            {/* Right Form Column */}
            <div className="auth-form-panel">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Login to your account to continue writing and reading.</p>
                </div>

                <form onSubmit={formSubmitHandler} className="auth-form">
                    <div className="auth-group">
                        <label htmlFor="email" className="auth-label">
                            Email Address
                        </label>
                        <input 
                         type="email" 
                         className="auth-input"
                         id="email"
                         placeholder="name@example.com"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="auth-group">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <label htmlFor="password" className="auth-label">
                                Password
                            </label>
                            <Link to="/forgot-password" style={{ fontSize: "12px", color: "var(--green-sea-color)", fontWeight: "500" }}>
                                Forgot?
                            </Link>
                        </div>
                        <input 
                         type="password" 
                         className="auth-input"
                         id="password"
                         placeholder="Enter your password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="auth-btn" type="submit">
                        <span>Login to Inkline</span>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </form>

                <div className="auth-footer">
                    New to Inkline? <Link to="/register">Create an account</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Login;