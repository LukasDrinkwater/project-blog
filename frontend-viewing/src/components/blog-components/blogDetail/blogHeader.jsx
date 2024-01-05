// Header that is on the blog page

function BlogHeader({ blog }) {
  return (
    <div className="blogHeader">
      <h1>{blog.title}</h1>
      <div className="singleBlogDetail">
        <p>Author: {blog.user.fullName}</p>
        <p>From: {blog.user.country}</p>
        <p>Posted: {blog.createdAtFormatted}</p>
      </div>
    </div>
  );
}

export default BlogHeader;
