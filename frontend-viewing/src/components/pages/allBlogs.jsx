// Component that render a list of all blogs

import { useEffect, useState } from "react";

// Import components
// import { BlogPreview } from "../blog-components/blogList/blogPreview";
import BlogPreview from "../blog-components/blogList/blogPreview";

function BlogList() {
  const [allBlogs, setAllBlogs] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllBlogs(data);
      });
  }, []);
  // console.log(allBlogs);

  return (
    <div className="allBlogsContainer">
      {allBlogs.map((blog) => (
        <BlogPreview key={blog.id} {...blog} />
      ))}
    </div>
  );
}
export default BlogList;
