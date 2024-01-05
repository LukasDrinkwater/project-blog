// Preview of the blog
import { Link } from "react-router-dom";

function BlogPreview({ title, user, createdAtFormatted, _id }) {
  // console.log("country", createdAtFormatted);
  return (
    <div className="blogPreview">
      <Link to={`${_id}`}>
        <h2>{title}</h2>
      </Link>

      <div className="previewDetail">
        <p>Author: {user.fullName}</p>
        <p>From: {user.country}</p>
        <p>Posted:{createdAtFormatted}</p>
      </div>
    </div>
  );
}

export default BlogPreview;
