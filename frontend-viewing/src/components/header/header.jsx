import { NavLink, useNavigate } from "react-router-dom";

// Component that calls all the header components

function Header() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/logout", {
        withCredentials: true,
        credentials: "include",
        // mode: "cors",
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      if (response.ok) {
        navigate("/login");
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
      <NavLink to="/login"> Login</NavLink>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export { Header };
