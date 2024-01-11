// Component that renders all the authors.
import { useEffect, useState } from "react";

import UserPreview from "../blog-components/userList/userPreview";

function AllUsersPage() {
  const [userData, setUserData] = useState({ allUsers: [], allBlogs: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          credentials: "include",
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getAllUsers();
  }, []);

  return (
    <div className="allUsersContainer">
      {error && (
        <div className="errorContainer">
          <p>{error}</p>
        </div>
      )}
      {userData.allUsers.length > 0 ? (
        userData.allUsers.map((user) => {
          const blogCount = userData.allBlogs.filter(
            (blog) => blog.user === user._id
          ).length;

          return (
            <UserPreview key={user._id} user={user} blogCount={blogCount} />
          );
        })
      ) : (
        <div>Loading Authors...</div>
      )}
    </div>
  );
}

export default AllUsersPage;
