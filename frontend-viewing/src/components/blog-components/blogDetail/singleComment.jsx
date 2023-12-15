// Component for each individual comment

function SingleComment({ text, user, createdAtFormatted, blog }) {
  return (
    <div className="commentCard">
      <p>{user.fullName}</p>
      <p>{text}</p>
      <p>{createdAtFormatted}</p>
    </div>
  );
}

export default SingleComment;
