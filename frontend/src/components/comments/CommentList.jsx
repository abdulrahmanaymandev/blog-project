import swal from "sweetalert";
import { useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";
import UpdateCommentModal from "./UpdateCommentModal";
import "./comment-list.css";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="responses-list-container">
      {comments && comments.length > 0 ? (
        <div className="responses-feed">
          {comments.map((comment) => {
            const initial = comment.username ? comment.username.charAt(0).toUpperCase() : "?";

            return (
              <div key={comment._id} className="response-card">
                <div className="response-card-header">
                  <div className="response-card-author-area">
                    {/* Circle avatar badge with initial */}
                    <div className="response-avatar">{initial}</div>
                    <div className="response-author-meta">
                      <span className="response-author-name">{comment.username}</span>
                      <span className="response-timestamp">
                        <Moment fromNow ago>
                          {comment.createdAt}
                        </Moment>{" "}
                        ago
                      </span>
                    </div>
                  </div>

                  {user?._id === comment.user && (
                    <div className="response-actions">
                      <button
                        onClick={() => updateCommentHandler(comment)}
                        className="btn-response-action btn-response-edit"
                        title="Edit response"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => deleteCommentHandler(comment?._id)}
                        className="btn-response-action btn-response-delete"
                        title="Delete response"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  )}
                </div>

                <div className="response-card-body">
                  <p className="response-text">{comment.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="responses-empty-state">
          <p>No responses yet. Be the first to share your thoughts!</p>
        </div>
      )}

      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
