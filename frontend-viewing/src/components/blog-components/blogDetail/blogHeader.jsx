// Header that is on the blog page

function BlogHeader({ blog }) {
  return (
    <div className="blogHeader">
      <h1>{blog.title}</h1>
      <p>{blog.user.fullName}</p>
      <p>{blog.user.country}</p>
      <p>{blog.createdAtFormatted}</p>
    </div>
  );
}

export default BlogHeader;
