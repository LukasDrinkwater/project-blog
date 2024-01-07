import { useEffect, useState } from "react";

import "./editSingleBlog.css";

function EditSingleBlog({ blog, enableEdit, setEnableEdit }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogSaved, setBlogSaved] = useState(false);

  const [error, setError] = useState("");

  const blogId = blog.id;

  // Could also just send down the content and title as props??????
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/blogs/${blogId}/edit`,
          {
            credentials: "include",
            mode: "cors",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setBlogTitle(data.title);
          setBlogContent(data.content);

          // Call autoResise after setting initial content of text area
          // to resise it so it fits
          const textarea = document.getElementById("blogContent");
          if (textarea) {
            autoResise(textarea);
          }
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  // Resise the text area when the user types into.
  const autoResise = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/blogs/${blogId}/edit`,
        {
          credentials: "include",
          mode: "cors",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ blogTitle, blogContent }),
        }
      );

      if (response.ok) {
        blogSaved(true);
        setBlogSaved(!blogSaved);
        setTimeout(() => {
          setBlogSaved(false);
        }, 5000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="editBlogFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="blogTitle" />
            <input
              name="blogTitle"
              id="blogTitle"
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="blogContent" />
            <textarea
              name="blogContent"
              id="blogContent"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              onInput={(e) => autoResise(e.target)}
            />
          </div>
          <div className="formGroup">
            <button type="submit">Save blog.</button>
          </div>
        </form>
      </div>
      {blogSaved && (
        <div className="blogSavedContainer">
          <p>Blog saved.</p>
        </div>
      )}
      {error && (
        <div className="errorContainer">
          <p>Error enabling blog editing: {error}</p>
        </div>
      )}
    </>
  );
}

export default EditSingleBlog;
