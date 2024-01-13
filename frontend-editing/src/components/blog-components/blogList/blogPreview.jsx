// Preview of the blog
import { useContext, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { LoginContext } from "../../../App.jsx";

function BlogPreview({ title, user, createdAtFormatted, _id, published }) {
  const userIdParam = useParams();

  const [loggedIn] = useContext(LoginContext);
  const [error, setError] = useState("");

  const deleteBlogClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/blogs/${_id}/delete`,
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
        console.log("blog removed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="blogPreview">
      {/* if its showing a blog preview on the All Users page user === iserIdParam.userId
      from the URL so it needs to be a NavLink to link to the blog/blogId url */}
      {user._id === userIdParam.userId ? (
        <NavLink to={`/blogs/${_id}`}>
          <h2>{title}</h2>
        </NavLink>
      ) : (
        <Link to={`${_id}`}>
          <h2>{title}</h2>
        </Link>
      )}

      <div className="previewDetail">
        <p>User: {user.fullName}</p>
        <p>From: {user.country}</p>
        <p>
          Posted:
          {loggedIn.admin && published
            ? createdAtFormatted
            : "Blog hasnt been posted yet."}
        </p>
        <div className="deleteBlogButton">
          <button onClick={deleteBlogClick}>Delete blog</button>
        </div>
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
}

export default BlogPreview;
