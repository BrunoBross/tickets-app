import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../../pages/auth/Login/Login";
import MyEvents from "../../pages/home/pages/MyEvents";
import Profile from "../../pages/home/pages/Profile";
import Home from "../../pages/home/Home";
import Loading from "../Loading/Loading";
import AllEvents from "../../pages/home/pages/AllEvents";
import { Container } from "@chakra-ui/react";
import styles from "./Routes.module.css";

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
        <Route path="allevents" element={<AllEvents />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    )
  );

  return (
    <>
      {isLoading ? (
        <Container w="100vw" h="100vh" className={styles.container}>
          <Loading />
        </Container>
      ) : (
        <RouterProvider router={routes} fallbackElement={<Loading />} />
      )}
    </>
  );
}
