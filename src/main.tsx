import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./Router";
import { RouterProvider } from "react-router";

// import App from "./01/App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={Router} />
  </StrictMode>
);
