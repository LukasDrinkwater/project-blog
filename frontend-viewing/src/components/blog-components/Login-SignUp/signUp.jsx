// Component to handle the signup form
import { useState } from "react";

function SignUp() {
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
            type="text"
            placeholder=""
            value="James"
          ></input>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" placeholder="" value="Doe"></input>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder=""
            value="JamesDoe123"
          ></input>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder=""
            value="12345"
          ></input>
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder=""
            value="jamesdoe@email.com"
          ></input>
          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            placeholder=""
            value="England"
          ></input>
          <input type="checkbox" checked={isChecked} onChange={changeTickBox} />
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
