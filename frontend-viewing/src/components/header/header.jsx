import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../App";

// Component that calls all the header components

function Header() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/logout", {
        withCredentials: true,
        credentials: "include",
        // mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setLoggedIn(false);
      } else {
        console.error("Error creating user:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="headerContainer">
      <NavLink to="/blogs"> All Blogs</NavLink>
      <NavLink to="/users"> All Users</NavLink>
      <NavLink to="/signup"> Sign Up</NavLink>
      {!loggedIn ? (
        <NavLink to="/login"> Login</NavLink>
      ) : (
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
      )}
      {/* <NavLink to="/login"> Login</NavLink>
      {loggedIn && (
        <form onSubmit={handleLogout}>
          <button type="submit">Logout</button>
        </form>
      )} */}
    </div>
  );
}

export { Header };
