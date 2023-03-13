import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/auth/Login/Login";
import Home from "../pages/Home";

export default function Routes() {
  const auth = useAuth();

  const routes = createBrowserRouter([
    {
      path: "/",
      element: auth.signed ? <Home /> : <Login auth={auth} />,
    },
    {
      path: "/login",
      element: <Login auth={auth} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
