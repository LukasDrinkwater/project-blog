import { useState, useContext } from "react";
import { LoginContext } from "../../App";

function CommentForm({ update, setUpdate, blog, _id }) {
  const [loggedIn] = useContext(LoginContext);

  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/blogs/${blog._id}/comment/add`,
        {
          credentials: "include",
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            commentText: commentText,
            blogId: blog._id,
          }),
        }
      );
      if (response.ok) {
        setUpdate(!update);
        setCommentText("");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      {loggedIn.loggedIn ? (
        <form onSubmit={handleSubmitComment}>
          <label htmlFor="commentText">Post Comment</label>
          <input
            name="commentText"
            id="commentText"
            type="text"
            placeholder=""
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></input>
          <input type="hidden" name="blogId" required={true} value={_id} />
          {/* <input type="hidden" name="userId" required={true} value={user} /> */}
          <button type="submit">Post</button>
        </form>
      ) : (
        <div className="loginWarning">
          <p>Please login to post a comment.</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </>
  );
}

export default CommentForm;
