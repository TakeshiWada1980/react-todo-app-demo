// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import App from "./01/App";

// const routes = createRoutesFromElements(
//   <>
//     <Route path="/" element={<App />} />
//   </>
// );

// export const Router = createBrowserRouter(routes);

// import {
//   Route,
//   createHashRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import App from "./01/App";

// const routes = createRoutesFromElements(
//   <>
//     <Route path="/" element={<App />} />
//   </>
// );

// const getBasename = () => {
//   if (process.env.NODE_ENV === "production") {
//     return "/react-todo-app-demo";
//   }
//   return "/";
// };

// export const Router = createHashRouter(routes, {
//   basename: getBasename(),
// });

import {
  Route,
  // createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App01 from "./01/App";
import App02 from "./02/App";

import { createBrowserRouter } from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App01 />} />
    <Route path="/2" element={<App02 />} />
  </>
);

export const Router = createBrowserRouter(routes, {
  // basename: "/react-todo-app-demo",
  basename:
    process.env.NODE_ENV === "production" ? "/react-todo-app-demo/" : "/",
});
