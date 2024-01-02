import BlogDetail from "../blog-components/blogDetail/blogDetail";
import BlogHeader from "../blog-components//blogDetail/blogHeader";
import BlogComments from "../blog-components/blogDetail/blogComments";
import CommentForm from "../addComment/commentForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const [blog, setBlog] = useState(null);
  const [update, setUpdate] = useState(false);

  const { blogId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${blogId}`, {
      credentials: "include",
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [update]);

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
      <div className="addCommentContainer">
        <CommentForm {...blog} update={update} setUpdate={setUpdate} />
      </div>
    </div>
  );
}

export default SingleBlog;
