import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";
import "./update-profile.css";

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio || "");
  const [password, setPassword] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile-overlay">
      <div className="update-profile-modal">
        <button
          onClick={() => setUpdateProfile(false)}
          className="update-profile-close-btn"
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <h2 className="update-modal-title">Edit Profile</h2>
        <p className="update-modal-desc">Update your personal brand and bio on Inkline.</p>

        <form onSubmit={formSubmitHandler} className="update-profile-form">
          <div className="form-group">
            <label htmlFor="update-username" className="form-label">
              Username
            </label>
            <input
              id="update-username"
              type="text"
              className="form-control-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="update-bio" className="form-label">
              Bio Tagline
            </label>
            <input
              id="update-bio"
              type="text"
              className="form-control-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell our readers about yourself..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="update-password" className="form-label">
              Password (leave empty to keep current)
            </label>
            <input
              id="update-password"
              type="password"
              className="form-control-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
          </div>

          <button type="submit" className="btn-modal-submit">
            Save Profile Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;