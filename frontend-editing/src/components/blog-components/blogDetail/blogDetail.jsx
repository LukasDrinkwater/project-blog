// Component that renders the blog
// import { NavLink } from "react-router-dom";

function BlogDetail({ blog }) {
  const blogContent = blog.content;
  // const blogId = blog._id;

  return (
    <div className="blogContainer">
      {/* <span>
        <NavLink to="edit"> Edit blog post.</NavLink>
      </span> */}
      <p>{blogContent}</p>
    </div>
  );
}

export default BlogDetail;
