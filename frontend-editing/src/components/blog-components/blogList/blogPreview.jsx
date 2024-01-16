// Preview of the blog
import { useContext, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { LoginContext } from "../../../App.jsx";

function BlogPreview({
  title,
  user,
  createdAtFormatted,
  _id,
  published,
  allBlogs,
  setAllBlogs,
}) {
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
        const data = await response.json();
        // the blog that was deleted is sent back as data.blog
        // Update the allBlogs object to updatedAllBlogs which filters out the blog that
        // was deleted. But using the blog that is sent back to make sure its correct.
        const updatedAllBlogs = allBlogs.filter(
          (blog) => blog._id !== data.blog._id
        );
        setAllBlogs(updatedAllBlogs);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePublishBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/blogs/${_id}/publish`,
        {
          credentials: "include",
          mode: "cors",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // loops through the current allBlogs state and if the blog matches
        // the blog that has just been published set published to the new published
        const updatedAllBlogs = allBlogs.map((blog) =>
          blog._id === data._id
            ? {
                ...blog,
                published: data.published,
              }
            : blog
        );
        setAllBlogs(updatedAllBlogs);
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
          {published ? createdAtFormatted : "Blog hasnt been posted yet."}
        </p>
        <div className="deletePreviewButtonContainer">
          {loggedIn.admin && (
            <div className="deleteBlogButton">
              <button onClick={deleteBlogClick}>Delete blog</button>
            </div>
          )}
          {error && <div>Error: {error}</div>}
          <div className="publishButton">
            <button onClick={handlePublishBlog}>Publish blog</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPreview;
