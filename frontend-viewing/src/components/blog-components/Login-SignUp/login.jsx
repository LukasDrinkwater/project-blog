// Component for login

function Login() {
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <div className="loginFormContainer">
        <form action="" method="POST">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
