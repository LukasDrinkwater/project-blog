import { createBrowserRouter } from "react-router-dom";
import { blogRouter } from "./blogRoutes";

const allRoutes = createBrowserRouter([...blogRouter]);

export default allRoutes;
