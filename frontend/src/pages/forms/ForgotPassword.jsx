import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const FrogotPassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email is required");

        dispatch(forgotPassword(email));
    }

    return ( 
        <div className="auth-compact-container">
            <div className="auth-compact-card">
                <Link to="/login" className="auth-compact-back">
                    <i className="bi bi-arrow-left"></i>
                    <span>Back to login</span>
                </Link>

                <div className="auth-header">
                    <h1 className="auth-title">Forgot Password</h1>
                    <p className="auth-subtitle">Enter your email address and we'll send you a recovery link.</p>
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

                    <button className="auth-btn" type="submit">
                        <span>Send Reset Link</span>
                        <i className="bi bi-envelope"></i>
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default FrogotPassword;