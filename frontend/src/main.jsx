import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Play from "./pages/Play";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Play",
        element: <Play />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
