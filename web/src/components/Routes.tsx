import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/auth/Login/Login";
import MyEvents from "../pages/Home/components/MyEvents";
import NewEvent from "../pages/Home/components/NewEvent";
import Home from "../pages/Home/Home";
import Loading from "./Loading";

export default function Routes() {
  const auth = useAuth();
  const { signed, isLoading } = auth;

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home auth={auth} />}>
        <Route index element={<MyEvents />} />
        <Route path="new" element={<NewEvent />} />
      </Route>
    )
  );

  [
    {
      path: "/",
      element: signed ? <Home auth={auth} /> : <Login auth={auth} />,
    },
    {
      path: "/login",
      element: <Login auth={auth} />,
    },
  ];

  return <>{isLoading ? <Loading /> : <RouterProvider router={routes} />}</>;
}
