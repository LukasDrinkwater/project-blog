// Preview of the blog
import { Link } from "react-router-dom";

function BlogPreview({ title, user, country, createdAtFormatted, _id }) {
  return (
    <div className="blogPreview">
      <Link to={`${_id}`}>
        <p>{title}</p>
      </Link>

      <div className="previewDetail">
        <p>{user.fullName}</p>
        <p>{country}</p>
        <p>{createdAtFormatted}</p>
      </div>
    </div>
  );
}

export default BlogPreview;
