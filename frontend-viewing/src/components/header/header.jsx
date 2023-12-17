import { NavLink } from "react-router-dom";

// Component that calls all the header components

function Header() {
  return (
    <div className="headerContainer">
      <NavLink to="/blogs"> All Blogs</NavLink>
      <NavLink to="/users"> All Users</NavLink>
      <NavLink to="/signup"> Sign Up</NavLink>
      <NavLink to="/login"> Login</NavLink>
      <form action="http://localhost:5173/logout" method="GET">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export { Header };
