import { NavLink } from "react-router-dom";

// Component that calls all the header components

function Header() {
  return (
    <div className="headerContainer">
      <NavLink to="/blogs"> All Blogs</NavLink>
      <NavLink to="/users"> All Users</NavLink>
      <NavLink to="/signup"> Sign Up</NavLink>
    </div>
  );
}

export { Header };
