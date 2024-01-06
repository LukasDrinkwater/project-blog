// Component for each individual comment

import { useState } from "react";

function SingleComment({
  update,
  setUpdate,
  text,
  user,
  createdAtFormatted,
  blog,
  _id,
}) {
  const [error, setError] = useState("");

  const deleteCommentClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/blogs/${blog}/comment/${_id}/delete`,
        {
          credentials: "include",
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setUpdate(!update);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="commentCard">
      <div className="commentUserInfo">
        <p id="commentUser">{user.fullName}</p>
        <p id="commentDate">{createdAtFormatted}</p>
      </div>
      <div className="commentContent">
        <section>
          <p id="commentText">{text}</p>
        </section>
        <button onClick={deleteCommentClick}>REMOVE</button>
      </div>
      <p>{error}</p>
    </div>
  );
}

export default SingleComment;
