import NewBlogForm from "../createNewBlog/newBlogForm";

import "./createNewBlogPage.css";

function CreateNewBlogPage() {
  return (
    <div className="newBlogContainer">
      <div className="newBlogFormContainer">
        <NewBlogForm />
      </div>
    </div>
  );
}

export default CreateNewBlogPage;
