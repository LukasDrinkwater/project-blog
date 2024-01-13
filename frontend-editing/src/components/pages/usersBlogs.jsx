// Component to put together the page that shows a list of a single users blogs

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BlogPreview from "../blog-components/blogList/blogPreview";

function UsersBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [error, setError] = useState("");

  const { userId } = useParams();

  useEffect(() => {
    const getAllUsersBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          credentials: "include",
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAllBlogs(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getAllUsersBlogs();
  }, []);

  return (
    <div className="allUserBlogsContainer">
      {error && (
        <div className="errorContainer">
          <p>{error}</p>
        </div>
      )}
      {allBlogs.length > 0 ? (
        allBlogs.map((blog) => (
          <BlogPreview
            key={blog._id}
            {...blog}
            createdAtFormatted={blog.createdAtFormatted}
          />
        ))
      ) : (
        <div>Loading blogs...</div>
      )}
    </div>
  );
}

export default UsersBlogs;
