import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import Loading from "./Loading";

export default function Routes() {
  const auth = useAuth();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: auth.signed ? Home() : Login(),
    },
    {
      path: "/login",
      element: Login(),
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} fallbackElement={<Loading />} />
    </>
  );
}
