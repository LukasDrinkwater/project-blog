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
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, admin: false });
  // const [loggedIn, setLoggedIn] = useState(false);

  // runs on first page load. Initial load or after a user leaves and comes back to the
  // site and the session cookie still exists. Then updates loggedIn state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/check-auth", {
          credentials: "include",
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response);
        if (response.ok) {
          const data = await response.json();

          setLoggedIn({ loggedIn: true, admin: false });
          if (data.user.admin) {
            setLoggedIn({ loggedIn: true, admin: true });
          }
        } else {
          setLoggedIn({ loggedIn: false, admin: false });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
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
