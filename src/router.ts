import { lazy } from "react";
import {createBrowserRouter} from "react-router-dom";


const Home = lazy(() => import("./pages/Home"));
const Details = lazy(() => import("./pages/Details"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));


const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        children: []
    },
    {
        path: "/login",
        Component: Login,
        children: []
    },
    {
        path: "/register",
        Component: Register,
        children: []
    },
    {
        path: "/profile",
        Component: Profile,
        children: []
    },
    {
        path: "/:id",
        Component: Details,
        children: []
    },
]);



export default router;