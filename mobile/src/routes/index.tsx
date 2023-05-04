import { useNavigation } from "@react-navigation/native";
import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "../screens/Profile";
import Who from "../components/profile/Who";
import EventDetails from "../components/event/EventDetails";
import { Text, View } from "react-native";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import Help from "../components/profile/Help";
import MyTickets from "../components/profile/MyTickets";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../contexts/AuthContext";
import Login from "../screens/Login";
import {
  getScreenOptions,
  stackScreenOptions,
  tabScreenOptions,
} from "./options";
import Register from "../components/profile/Register";
import Ticket from "../components/profile/Ticket";
import TransferTicket from "../components/transferTicket/TransferTicket";
import { useCart } from "../contexts/CartContext";
import FloatingButton from "../components/bottomBar/FloatingButton";
import TabBar from "../components/bottomBar/TabBar";

const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeSubRoutes = () => {
  return (
    <HomeStack.Navigator screenOptions={{ ...stackScreenOptions }}>
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="eventDetails" component={EventDetails} />
    </HomeStack.Navigator>
  );
};

const CartSubRoutes = () => {
  return (
    <CartStack.Navigator screenOptions={{ ...stackScreenOptions }}>
      <CartStack.Screen name="cart" component={Cart} />
    </CartStack.Navigator>
  );
};

const ProfileSubRoutes = () => {
  const { signed } = useAuth();
  return (
    <ProfileStack.Navigator screenOptions={{ ...stackScreenOptions }}>
      {signed ? (
        <>
          <ProfileStack.Screen name="profile" component={Profile} />
          <ProfileStack.Screen name="profileInfo" component={ProfileInfo} />
          <ProfileStack.Screen name="myTickets" component={MyTickets} />
          <ProfileStack.Screen name="ticketInfo" component={Ticket} />
          <ProfileStack.Screen
            name="transferTicket"
            component={TransferTicket}
          />
          <ProfileStack.Screen name="who" component={Who} />
          <ProfileStack.Screen name="help" component={Help} />
        </>
      ) : (
        <>
          <ProfileStack.Screen name="login" component={Login} />
          <ProfileStack.Screen name="register" component={Register} />
        </>
      )}
    </ProfileStack.Navigator>
  );
};

export function Routes() {
  return (
    <View className="flex-1 pt-5 bg-background">
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{ ...tabScreenOptions }}
        tabBar={(props) => <TabBar {...props} />}
        keyboardDismissMode="none"
      >
        <Tab.Screen
          name="Home"
          component={HomeSubRoutes}
          options={getScreenOptions("home-outline", "home")}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={getScreenOptions("search-outline", "search")}
        />
        <Tab.Screen
          name="Cart"
          component={CartSubRoutes}
          options={getScreenOptions("cart-outline", "cart")}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileSubRoutes}
          options={getScreenOptions("person-circle-outline", "person-circle")}
        />
      </Tab.Navigator>
    </View>
  );
}
