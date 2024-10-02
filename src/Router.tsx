import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App01 from "./01/App";
import App02 from "./02/App";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App01 />} />
    <Route path="/2" element={<App02 />} />
  </>
);

export const Router = createBrowserRouter(routes, {
  basename:
    process.env.NODE_ENV === "production" ? "/react-todo-app-demo/" : "/",
});
