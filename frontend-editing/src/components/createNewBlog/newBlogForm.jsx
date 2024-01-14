import { useState } from "react";

function NewBlogForm() {
  const [error, setError] = useState("");
  const [showBlogCreated, setShowBlogCreated] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [published, setpublished] = useState(false);

  // Resise the text area when the user types into.
  const autoResise = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const changeTickBox = () => {
    setpublished(!published);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(blogTitle, blogContent);

    try {
      const response = await fetch("http://localhost:3000/blogs/newBlog", {
        credentials: "include",
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          published,
        }),
      });

      if (response.ok) {
        // blog created

        setShowBlogCreated(!showBlogCreated);
        setTimeout(() => {
          setShowBlogCreated(false);
        }, 3000);

        setBlogTitle("");
        setBlogContent("");
        setpublished("");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      {error && (
        <div className="errorContainer">
          <p>There was an error creating new blog: {error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="blogTitle">Blog Title:</label>
          <input
            name="blogTitle"
            id="blogTitle"
            value={blogTitle}
            type="text"
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="blogContent"></label>
          <textarea
            name="blogContent"
            id="blogContent"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            onInput={(e) => autoResise(e.target)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="published">Published:</label>
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={published}
            value={published}
            onChange={changeTickBox}
          />
        </div>
        <div className="formGroup">
          <button type="submit">Create Blog</button>
        </div>
      </form>
      {showBlogCreated && (
        <div>
          <p>Blog has been created.</p>
        </div>
      )}
    </>
  );
}

export default NewBlogForm;
