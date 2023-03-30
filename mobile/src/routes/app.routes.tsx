import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import Cart from "../screens/Cart";
import EventDetails from "../screens/EventDetails";

const { Navigator, Screen } = createNativeStackNavigator();

import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import ProfileInfo from "../screens/ProfileInfo";
import Register from "../screens/Register";
import Search from "../screens/Search";

export function AppRoutes() {
  const auth = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="search" component={Search} />
      <Screen name="cart" component={Cart} />
      <Screen name="profile" component={auth.signed ? Profile : Login} />
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="details" component={EventDetails} />
      <Screen name="profileInfo" component={ProfileInfo} />
    </Navigator>
  );
}
