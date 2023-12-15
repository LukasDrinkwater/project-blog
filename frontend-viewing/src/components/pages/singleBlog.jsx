import BlogDetail from "../blog-components/blogDetail/blogDetail";
import BlogHeader from "../blog-components//blogDetail/blogHeader";
import BlogComments from "../blog-components/blogDetail/blogComments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const [blog, setBlog] = useState(null);

  const { blogId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${blogId}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="singleBlogContainer">
      {blog !== null ? (
        <>
          <BlogHeader {...blog} />
          <BlogDetail {...blog} />
          <BlogComments comments={blog.comments} />
        </>
      ) : (
        <p>Loading blog...</p>
      )}
    </div>
  );
}

export default SingleBlog;
