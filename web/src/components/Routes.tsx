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
import Profile from "../pages/Home/components/Profile";
import Home from "../pages/Home/Home";
import Loading from "./Loading";

export default function Routes() {
  const auth = useAuth();
  const { signed, isLoading } = auth;

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={signed ? <Home auth={auth} /> : <Login auth={auth} />}
      >
        <Route index element={<MyEvents />} />
        <Route path="new" element={<NewEvent />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    )
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <RouterProvider router={routes} fallbackElement={<Loading />} />
      )}
    </>
  );
}
