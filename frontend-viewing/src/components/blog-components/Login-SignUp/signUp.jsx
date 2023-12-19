// Component to handle the signup form
import { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Doe");
  const [username, setUsername] = useState("jamesdoe123");
  const [password, setPassword] = useState("12345");
  const [email, setEmail] = useState("jamesdoe@email.coom");
  const [country, setCountry] = useState("Scotland");
  const [isChecked, setIsChecked] = useState(true);

  const changeTickBox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="signUpContainer">
      <h1>Sign up</h1>
      <div className="signUpFormContainer">
        <form action="http://localhost:3000/signup" method="POST">
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            placeholder=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder=""
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="country">Country</label>
          <input
            name="country"
            id="country"
            type="text"
            placeholder=""
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
          <label htmlFor="admin">Admin</label>
          <input
            name="admin"
            id="admin"
            type="checkbox"
            checked={isChecked}
            value={isChecked}
            onChange={changeTickBox}
          />
          <button type="submit">Signup</button>
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
