// Component to handle the signup form
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("Jmes");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const changeTickBox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signup", {
        credentials: "include",
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          email,
          country,
          admin: isChecked,
        }),
      });
      console.log("response");
      console.log(response);

      if (response.ok) {
        console.log("User created");
        // Redirect
        navigate("/login");
      } else {
        console.error("Error creating user:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="signUpContainer">
      <h1>Sign up</h1>
      <div className="signUpFormContainer">
        {/* <form action="http://localhost:3000/signup" method="POST"> */}
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="formGroup">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder=""
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="formGroup">
            <label htmlFor="country">Country</label>
            <input
              name="country"
              id="country"
              type="text"
              placeholder=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>

          <label htmlFor="admin">Admin</label>
          <input
            name="admin"
            id="admin"
            type="checkbox"
            checked={isChecked}
            value={isChecked}
            onChange={changeTickBox}
          />
          <div className="formGroup">
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
// First name
// Last name
// Username
// password
// Email
// country
// admin TRUE/FALSE

export default SignUp;
