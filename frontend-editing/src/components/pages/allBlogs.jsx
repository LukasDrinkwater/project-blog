// Component that render a list of all blogs
import { useEffect, useState } from "react";
import "./allBlogs.css";

// Import components
import BlogPreview from "../blog-components/blogList/blogPreview";

function BlogList() {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs", {
      credentials: "include",
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllBlogs(data);
      });
  }, []);

  return (
    <div className="allBlogsContainer">
      {allBlogs.length > 0 ? (
        allBlogs.map((blog) => (
          // blog.published &&
          <BlogPreview
            key={blog._id}
            {...blog}
            createdAtFormatted={blog.createdAtFormatted}
            allBlogs={allBlogs}
            setAllBlogs={setAllBlogs}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
export default BlogList;
