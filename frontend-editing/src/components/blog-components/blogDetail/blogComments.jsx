// Comments component to load all comments that belong to the blog being shown.

import SingleComment from "./singleComment";

function BlogComments({ comments, update, setUpdate }) {
  return (
    <div className="commentsContainer">
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <SingleComment
            key={comment._id}
            {...comment}
            update={update}
            setUpdate={setUpdate}
          />
        ))
      ) : (
        <p>Comments Loading</p>
      )}
    </div>
  );
}

export default BlogComments;
