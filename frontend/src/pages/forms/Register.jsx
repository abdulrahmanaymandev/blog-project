import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

import { authActions } from "../../redux/slices/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const { registerMessage } = useSelector(state => state.auth);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(username.trim() === "") return toast.error("Username is required");
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        dispatch(registerUser({ username, email, password }))
    }

    const navigate = useNavigate();

    if(registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if(isOk) {
               dispatch(authActions.register(null));
               navigate("/login");
            }
        })
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
                        Write. Read. Connect.
                    </h2>
                    <p className="auth-brand-description">
                        Begin your journey on Inkline. Share your unique voice, gain followers, and read high-quality stories from creators around the globe.
                    </p>
                </div>
                
                <div className="auth-brand-footer">
                    © {new Date().getFullYear()} Inkline Publishing Group
                </div>
            </div>

            {/* Right Form Column */}
            <div className="auth-form-panel">
                <div className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join the community and start publishing today.</p>
                </div>

                <form onSubmit={formSubmitHandler} className="auth-form">
                    <div className="auth-group">
                        <label htmlFor="username" className="auth-label">
                            Username
                        </label>
                        <input 
                         type="text" 
                         className="auth-input"
                         id="username"
                         placeholder="Choose a pen name"
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

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
                        <label htmlFor="password" className="auth-label">
                            Password
                        </label>
                        <input 
                         type="password" 
                         className="auth-input"
                         id="password"
                         placeholder="Choose a strong password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="auth-btn" type="submit">
                        <span>Get Started</span>
                        <i className="bi bi-person-plus"></i>
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Register;