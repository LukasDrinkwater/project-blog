// Preview of the blog
import { Link, useParams, NavLink } from "react-router-dom";

function BlogPreview({ title, user, createdAtFormatted, _id }) {
  const userIdParam = useParams();

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
        <p>Posted:{createdAtFormatted}</p>
      </div>
    </div>
  );
}

export default BlogPreview;
