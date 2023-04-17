import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import EventDetails from "../subscreens/home/EventDetails";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import { useAuth } from "../contexts/AuthContext";
import Profile from "../screens/Profile";
import Login from "../subscreens/profile/Login";
import Register from "../subscreens/profile/Register";
import MyTickets from "../subscreens/profile/MyTickets";
import ProfileInfo from "../subscreens/profile/ProfileInfo";
import Ticket from "../subscreens/profile/Ticket";
import Who from "../subscreens/profile/Who";
import Help from "../subscreens/profile/Help";

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
