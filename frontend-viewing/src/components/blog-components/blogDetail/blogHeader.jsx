// Header that is on the blog page

function BlogHeader({ blogTitle, blogAuthor, country, dateTimeCreated }) {
  return (
    <div className="blogHeader">
      <h1>{blogTitle}</h1>
      <p>{blogAuthor}</p>
      <p>{country}</p>
      <p>{dateTimeCreated}</p>
    </div>
  );
}
