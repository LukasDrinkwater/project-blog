// Component that renders the blog
// import { NavLink } from "react-router-dom";

function BlogDetail({ blog }) {
  const blogContent = blog.content;

  return (
    <div className="blogContainer">
      <p>{blogContent}</p>
    </div>
  );
}

export default BlogDetail;
