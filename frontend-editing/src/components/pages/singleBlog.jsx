import "./singleBlog.css";

import BlogDetail from "../blog-components/blogDetail/blogDetail";
import BlogHeader from "../blog-components//blogDetail/blogHeader";
import BlogComments from "../blog-components/blogDetail/blogComments";
import CommentForm from "../addComment/commentForm";

import EditSingleBlog from "./editSingleBlog";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const [blog, setBlog] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);
  //update triggers the useEffect to run after a comment has been added or deleted.
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState("");

  const { blogId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/blogs/${blogId}`, {
          credentials: "include",
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const blogData = await response.json();
          setBlog(blogData);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [update]);

  const handleEditBlogClick = () => {
    setEnableEdit(!enableEdit);
  };

  return (
    <>
      {!enableEdit ? (
        <div className="editBlogButton">
          <button onClick={handleEditBlogClick}>Edit blog.</button>
        </div>
      ) : (
        <div className="ViewEditedBlogButton">
          <button onClick={handleEditBlogClick}>View blog.</button>
        </div>
      )}
      {!enableEdit ? (
        <div className="singleBlogContainer">
          {error && <p>Error loading blog: {error}</p>}
          {blog !== null ? (
            <>
              <BlogHeader {...blog} />
              <BlogDetail {...blog} />
              <BlogComments
                comments={blog.comments}
                update={update}
                setUpdate={setUpdate}
              />
            </>
          ) : (
            <p>Loading blog...</p>
          )}
          <div className="addCommentContainer">
            <CommentForm {...blog} update={update} setUpdate={setUpdate} />
          </div>
        </div>
      ) : (
        <div className="editSingleBlogContainer">
          <EditSingleBlog
            {...blog}
            enableEdit={enableEdit}
            setEnableEdit={setEnableEdit}
          />
        </div>
      )}
    </>
  );
}

export default SingleBlog;
