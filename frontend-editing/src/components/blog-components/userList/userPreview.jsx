import { Link } from "react-router-dom";

function UserPreview({ user, blogCount }) {
  return (
    <div className="userPreview">
      <Link to={`${user._id}`}>
        <h2>{user.fullName}</h2>
      </Link>

      <div className="userPreviewDetail">
        <p>Blogs posted: {blogCount}</p>
      </div>
    </div>
  );
}

export default UserPreview;
