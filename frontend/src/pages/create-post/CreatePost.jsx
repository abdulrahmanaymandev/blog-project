import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="editor-container">
      <div className="editor-card">
        <div className="editor-header">
          <p className="editor-subtitle">Publishing Studio</p>
          <h1 className="editor-main-title">Create a New Story</h1>
        </div>

        <form onSubmit={formSubmitHandler} className="editor-form">
          {/* Cover Image Upload Area with Live Preview */}
          <div className="editor-upload-zone">
            <span className="editor-select-label">Cover Image</span>
            {file ? (
              <div className="editor-preview-container">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Cover preview"
                  className="editor-preview-img"
                />
                <div className="editor-preview-overlay">
                  <div className="editor-change-btn">
                    <i className="bi bi-camera"></i>
                    <span>Replace Image</span>
                  </div>
                </div>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="editor-file-input"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
              </div>
            ) : (
              <div className="editor-dropzone">
                <i className="bi bi-cloud-arrow-up editor-dropzone-icon"></i>
                <span className="editor-dropzone-text">Upload a cover image</span>
                <span className="editor-dropzone-hint">Supports PNG, JPG, JPEG or WEBP (Max 10MB)</span>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="editor-file-input"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
              </div>
            )}
          </div>

          {/* Large Serif Title Input */}
          <input
            type="text"
            placeholder="Title of your story..."
            className="editor-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Category Dropdown */}
          <div className="editor-meta-row">
            <div className="editor-select-wrapper">
              <label htmlFor="category-select" className="editor-select-label">
                Select Category
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="editor-select"
              >
                <option disabled value="">
                  Select A Category...
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clean Draft Textarea */}
          <div className="editor-body-group">
            <label className="editor-select-label">Story Draft</label>
            <textarea
              className="editor-textarea"
              placeholder="Tell your story. Unleash your ideas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Actions */}
          <div className="editor-actions">
            <button type="submit" className="editor-publish-btn" disabled={loading}>
              {loading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <>
                  <span>Publish Story</span>
                  <i className="bi bi-send"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
