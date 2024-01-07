import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

// IMPORT COMPONENTS

import { Header } from "./components/header/header";
import BlogList from "./components/pages/allBlogs";
import SingleBlog from "./components/pages/singleBlog";
import LoginPage from "./components/pages/loginPage";
import SignUpPage from "./components/pages/signUpPage";
import EditSingleBlog from "./components/pages/editSingleBlog";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, admin: false });

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
        <div className="content">
          <Header />
          <div className="mainContainer">
            <Routes>
              <Route path="/" Component={BlogList}></Route>
              <Route path="/blogs" Component={BlogList}></Route>
              <Route path="/blogs/:blogId" Component={SingleBlog} />
              {/* <Route path="/blogs/:blogId/edit" Component={EditSingleBlog} /> */}
              <Route path="/login" Component={LoginPage} />
              <Route path="/signup" Component={SignUpPage} />
            </Routes>
          </div>
        </div>
      </>
    </LoginContext.Provider>
  );
}

export default App;
