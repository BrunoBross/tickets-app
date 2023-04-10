import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import EventDetails from "../screens/home/EventDetails";
import Search from "../screens/search/Search";
import Profile from "../screens/profile/Profile";
import Login from "../screens/profile/Login";
import ProfileInfo from "../screens/profile/ProfileInfo";
import MyTickets from "../screens/profile/MyTickets";
import Ticket from "../screens/profile/Ticket";
import Cart from "../screens/cart/Cart";
import { useAuth } from "../contexts/AuthContext";
import Register from "../screens/profile/Register";
import Who from "../screens/profile/Who";
import Help from "../screens/profile/Help";

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
      <Screen name="register" component={Register} />
      <Screen name="mytickets" component={MyTickets} />
      <Screen name="profileInfo" component={ProfileInfo} />
      <Screen name="ticket" component={Ticket} />
      <Screen name="who" component={Who} />
      <Screen name="help" component={Help} />
    </Navigator>
  );
};

export { ProfilePage };
