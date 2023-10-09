import { Route, Routes, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main";
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";
import NotFound from "../pages/notfound";
import Profile from "../pages/profile";
import Register from "../pages/register";
import PrivateRoute from "../components/private-route";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "profile",
        element: <PrivateRoute />,
        children: [
          {
            path: ":slug",
            element: <Profile />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default routes;
