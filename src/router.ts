import { lazy } from "react";
import {createBrowserRouter} from "react-router-dom";


const Home = lazy(() => import("./pages/Home"));
const Details = lazy(() => import("./pages/Details"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const UserWelcome = lazy(() => import("./pages/UserWelcome"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));


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
        path: "/user/welcome",
        Component: UserWelcome,
        children: []
    },
    {
        path: "/forgot-password",
        Component: ForgotPassword,
        children: []
    },
    {
        path: "/update-password",
        Component: UpdatePassword,
        children: []
    },
    {
        path: "/:id",
        Component: Details,
        children: []
    },
    {
        path: "*",
        Component: NotFound,
        children: []
    },
]);



export default router;