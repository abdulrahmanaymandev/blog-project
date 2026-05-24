import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateComment } from "../../redux/apiCalls/commentApiCall";
import "./update-comment.css";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(commentForUpdate?.text || "");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    dispatch(updateComment(commentForUpdate?._id, { text }));
    setUpdateComment(false);
  };

  return (
    <div className="update-comment-overlay">
      <div className="update-comment-modal">
        <button
          onClick={() => setUpdateComment(false)}
          className="update-comment-close-btn"
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <h2 className="update-comment-title">Edit Response</h2>
        <p className="update-comment-desc">Modify your comment response below.</p>

        <form onSubmit={formSubmitHandler} className="update-comment-form">
          <div className="comment-form-group">
            <textarea
              className="update-comment-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="5"
              placeholder="Update your response..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-update-comment-submit">
            Save Response
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
