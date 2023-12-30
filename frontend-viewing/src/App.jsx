import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

// IMPORT COMPONENTS

import { Header } from "./components/header/header";
import BlogList from "./components/pages/allBlogs";
import SingleBlog from "./components/pages/singleBlog";
import LoginPage from "./components/pages/loginPage";
import SignUpPage from "./components/pages/signUpPage";

export const LoginContext = createContext();

function App() {
  const [count, setCount] = useState(0);
  const [LoggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   console.log("checking");
  //   fetch("http://localhost:3000/check-auth", {
  //     credentials: "include",
  //     mode: "cors",
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.ok);
  //       if (response.ok) {
  //         setLoggedIn(true);
  //       } else {
  //         setLoggedIn(false);
  //       }
  //     })
  //     .catch();
  // }, []);

  return (
    <LoginContext.Provider value={[LoggedIn, setLoggedIn]}>
      <>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" Component={BlogList}></Route>
            <Route path="/blogs" Component={BlogList}></Route>
            <Route path="/blogs/:blogId" Component={SingleBlog} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/signup" Component={SignUpPage} />
          </Routes>
        </div>
      </>
    </LoginContext.Provider>
  );
}

export default App;
