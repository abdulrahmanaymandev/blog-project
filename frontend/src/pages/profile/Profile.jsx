import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import UpdateProfileModal from "./UpdateProfileModal";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import PostItem from "../../components/posts/PostItem";
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file selected!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
    setFile(null); // Clear selected file
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Delete Account?",
      text: "Once deleted, all of your articles, comments, and profile data will be permanently removed! This cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  if (loading) {
    return (
      <div className="profile-loader-container">
        <Oval
          height={60}
          width={60}
          color="#10B981"
          secondaryColor="#EEF3F0"
          strokeWidth={4}
          strokeWidthSecondary={4}
          visible={true}
          ariaLabel="oval-loading"
        />
        <p>Loading member profile...</p>
      </div>
    );
  }

  // Stats calculation
  const totalPosts = profile?.posts?.length || 0;
  const totalLikes = profile?.posts?.reduce((sum, post) => sum + (post.likes?.length || 0), 0) || 0;

  return (
    <main className="profile-page-wrapper">
      {/* 1. Header Banner & Profile Information */}
      <section className="profile-hero-section">
        <div className="profile-cover-banner" />
        <div className="profile-info-container">
          {/* Avatar Area */}
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-inner">
              <img
                src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
                alt={profile?.username}
                className="profile-avatar-img"
              />

              {user?._id === profile?._id && (
                <form onSubmit={formSubmitHandler} className="avatar-uploader-form">
                  {!file ? (
                    <>
                      <label htmlFor="avatar-file" className="avatar-upload-trigger" title="Upload new photo">
                        <i className="bi bi-camera"></i>
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="avatar-file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                        accept="image/*"
                      />
                    </>
                  ) : (
                    <div className="avatar-save-actions">
                      <button type="submit" className="btn-avatar-save" title="Save new photo">
                        <i className="bi bi-check-lg"></i>
                      </button>
                      <button type="button" className="btn-avatar-cancel" title="Cancel" onClick={() => setFile(null)}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          <h1 className="profile-display-name">{profile?.username}</h1>
          <p className="profile-display-bio">{profile?.bio || "No bio written yet."}</p>

          <div className="profile-joined-date">
            <i className="bi bi-calendar-event"></i>
            <span>Joined {new Date(profile?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
          </div>

          {/* Stats Bar */}
          <div className="profile-stats-bar">
            <div className="stat-pill">
              <span className="stat-value">{totalPosts}</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="stat-pill">
              <span className="stat-value">{totalLikes}</span>
              <span className="stat-label">Total Likes</span>
            </div>
          </div>

          {user?._id === profile?._id && (
            <div className="profile-action-buttons">
              <button onClick={() => setUpdateProfile(true)} className="btn-profile-edit">
                <i className="bi bi-gear"></i>
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Posts Grid Section */}
      <section className="profile-feed-section">
        <h2 className="profile-feed-title">Articles by {profile?.username}</h2>
        {totalPosts > 0 ? (
          <div className="profile-posts-grid">
            {profile?.posts?.map((post) => (
              <PostItem
                key={post._id}
                post={post}
                username={profile?.username}
                userId={profile?._id}
              />
            ))}
          </div>
        ) : (
          <div className="profile-empty-posts">
            <i className="bi bi-journal-text"></i>
            <h3>No stories published yet</h3>
            <p>Write and share your perspective on Inkline.</p>
          </div>
        )}
      </section>

      {/* 3. Account Settings (Delete Button for Owners) */}
      {user?._id === profile?._id && (
        <section className="profile-danger-zone">
          <div className="danger-zone-card">
            <div className="danger-text">
              <h4>Delete Inkline Account</h4>
              <p>Permanently delete your account and all published articles. This action cannot be undone.</p>
            </div>
            <button onClick={deleteAccountHandler} className="btn-profile-delete-account">
              Delete Account
            </button>
          </div>
        </section>
      )}

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </main>
  );
};

export default Profile;
