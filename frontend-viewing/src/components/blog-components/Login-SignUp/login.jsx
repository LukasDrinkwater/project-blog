// Component for login

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        // credentials: "include",
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        console.log("logged in");
        // Redirect
        navigate("/blogs");
      } else {
        console.error("Error logging in:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <div className="loginFormContainer">
        <form onSubmit={handleLoginSubmit}>
          {/* <form action="http://localhost:3000/login" method="POST"> */}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
