import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import About from "../components/About";
import Login from "../components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export { router };
