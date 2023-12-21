import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

// IMPORT COMPONENTS

import { Header } from "./components/header/header";
import BlogList from "./components/pages/allBlogs";
import SingleBlog from "./components/pages/singleBlog";
import LoginPage from "./components/pages/loginPage";
import SignUpPage from "./components/pages/signUpPage";

function App() {
  const [count, setCount] = useState(0);

  return (
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
          <Route path="/blogs" Component={BlogList}></Route>
          <Route path="/blogs/:blogId" Component={SingleBlog} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup" Component={SignUpPage} />
        </Routes>
      </div>
    </>
  );
}

export default App;
