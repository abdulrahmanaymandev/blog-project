import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import "./update-post.css";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "") return toast.error("Post Description is required");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="update-post-overlay">
      <div className="update-post-modal">
        <button
          onClick={() => setUpdatePost(false)}
          className="update-post-close-btn"
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <h2 className="update-modal-title">Edit Article</h2>
        <p className="update-modal-desc">Modify the details of your article below.</p>

        <form onSubmit={formSubmitHandler} className="update-post-form">
          <div className="form-group">
            <label htmlFor="update-title" className="form-label">
              Article Title
            </label>
            <input
              id="update-title"
              type="text"
              className="form-control-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="update-category" className="form-label">
              Category
            </label>
            <select
              id="update-category"
              className="form-control-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option disabled value="">
                Select A Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="update-description" className="form-label">
              Content Description
            </label>
            <textarea
              id="update-description"
              className="form-control-textarea"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-modal-submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
