// Component that render a list of all blogs

import { BlogPreview } from "./blogPreview";

function BlogList({ allBlogs }) {
  return allBlogs.forEach((blog) => {
    <BlogPreview {...blog} />;
  });
}
export default BlogList;
