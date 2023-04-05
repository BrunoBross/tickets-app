import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import EventDetails from "../screens/EventDetails";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import ProfileInfo from "../screens/ProfileInfo";
import MyTickets from "../screens/MyTickets";
import Ticket from "../screens/Ticket";
import Cart from "../screens/Cart";
import { useAuth } from "../contexts/AuthContext";
import Register from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

const HomePage = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="details" component={EventDetails} />
    </Navigator>
  );
};

export { HomePage };

const SearchPage = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Screen name="search" component={Search} />
    </Navigator>
  );
};

export { SearchPage };

const CartPage = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Screen name="cart" component={Cart} />
    </Navigator>
  );
};

export { CartPage };

const ProfilePage = () => {
  const { signed } = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Screen name="profile" component={signed ? Profile : Login} />
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
      <Screen name="mytickets" component={MyTickets} />
      <Screen name="profileInfo" component={ProfileInfo} />
      <Screen name="ticket" component={Ticket} />
    </Navigator>
  );
};

export { ProfilePage };
