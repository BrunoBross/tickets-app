import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/auth/Login/Login";
import Home from "../pages/Home";
import Loading from "./Loading";

export default function Routes() {
  const auth = useAuth();
  const { signed, isLoading } = auth;

  const routes = createBrowserRouter([
    {
      path: "/",
      element: signed ? <Home /> : <Login auth={auth} />,
    },
    {
      path: "/login",
      element: <Login auth={auth} />,
    },
  ]);

  return <>{isLoading ? <Loading /> : <RouterProvider router={routes} />}</>;
}
