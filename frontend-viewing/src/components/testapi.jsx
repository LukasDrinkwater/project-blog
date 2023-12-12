import { useEffect } from "react";

function TestApi() {
  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <p>Testing the api to the back end</p>
    </div>
  );
}

export { TestApi };
