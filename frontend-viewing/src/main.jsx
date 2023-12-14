import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Extra react imports
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

// importComponents
import { TestApi } from "./components/testapi.jsx";

// import Routes
// import { blogRouter } from "./routes/blogRoutes.jsx";
// import allRoutes from "./routes/allRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={allRoutes} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
