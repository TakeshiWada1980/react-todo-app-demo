import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./01/App";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />} />
  </>
);

export const Router = createBrowserRouter(routes);

// npm i react-router
// npm i react-router-dom
