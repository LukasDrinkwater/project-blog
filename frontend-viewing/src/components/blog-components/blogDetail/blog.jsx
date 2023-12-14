// Component that renders the blog

function Blog({ blog }) {
  const blogContent = blog.content;
  return (
    <div className="blogContainer">
      <p>{blogContent}</p>
    </div>
  );
}
