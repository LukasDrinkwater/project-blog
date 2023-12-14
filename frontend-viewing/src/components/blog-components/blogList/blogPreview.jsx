// Preview of the blog
import { Link } from "react";

function BlogPreview({ title, user, country, createdAt }) {
  return (
    <div className="blogPreview">
      <Link>
        <p>{title}</p>
      </Link>

      <div className="previewDetail">
        <p>{user}</p>
        <p>{country}</p>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}

export default BlogPreview;
