import "./add-comment.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({postId}) => {
    const dispatch = useDispatch();
   
    const [text, setText] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(text.trim() === "") return toast.error("Please write something");

        dispatch(createComment({ text, postId }));
        setText("");
    }

    return ( 
        <form onSubmit={formSubmitHandler} className="add-comment">
            <textarea
             placeholder="Add a comment" 
             className="add-comment-input"
             value={text}
             onChange={(e) => setText(e.target.value)}
             rows="3"
            ></textarea>
            <button type="submit" className="add-comment-btn">
                Comment
            </button>
        </form>
     );
}
 
export default AddComment;
