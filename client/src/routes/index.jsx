import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/main"
import Home from "../pages/home";
import About from "../pages/about";
import Login from "../pages/login";
import NotFound from "../pages/notfound";
import Profile from "../pages/profile";
import Register from "../pages/register";


const routes = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout />,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"*",
                element:<NotFound/>
            },
            {
                path:":slug",
                element:<Profile/>
            },
        ]
    },
]);

export default routes;
