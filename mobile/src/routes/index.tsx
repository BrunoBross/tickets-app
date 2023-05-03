import { useNavigation } from "@react-navigation/native";
import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "../screens/Profile";
import Who from "../components/profile/Who";
import EventDetails from "../components/event/EventDetails";
import { View } from "react-native";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import Help from "../components/profile/Help";
import MyTickets from "../components/profile/MyTickets";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../contexts/AuthContext";
import Login from "../screens/Login";
import {
  getTabIcon,
  screenOptions,
  screenStyleOptions,
  tabBarIconStyle,
} from "./options";
import Register from "../components/profile/Register";
import Ticket from "../components/profile/Ticket";
import TransferTicket from "../components/transferTicket/TransferTicket";
import { useCart } from "../contexts/CartContext";
import FloatingButton from "../components/bottomBar/FloatingButton";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeSubRoutes = () => {
  return (
    <HomeStack.Navigator screenOptions={{ ...screenOptions }}>
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="eventDetails" component={EventDetails} />
    </HomeStack.Navigator>
  );
};

const ProfileSubRoutes = () => {
  const { signed } = useAuth();
  return (
    <ProfileStack.Navigator screenOptions={{ ...screenOptions }}>
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
  const { navigate } = useNavigation();
  const { cartList, clearCartList, handleBuyTickets } = useCart();
  const showCartButton = cartList.length > 0;

  console.log(showCartButton);

  return (
    <View className="flex-1 pt-5 bg-background">
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{ ...screenStyleOptions }}
        keyboardDismissMode="none"
      >
        <Tab.Screen
          name="Home"
          component={HomeSubRoutes}
          options={{
            tabBarIconStyle: tabBarIconStyle,
            tabBarIcon: ({ focused }) =>
              getTabIcon("home", "home-outline", focused),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIconStyle: tabBarIconStyle,
            tabBarIcon: ({ focused }) =>
              getTabIcon("search", "search-outline", focused),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIconStyle: tabBarIconStyle,
            tabBarIcon: ({ focused }) =>
              getTabIcon("cart", "cart-outline", focused),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileSubRoutes}
          options={{
            tabBarIconStyle: tabBarIconStyle,
            tabBarIcon: ({ focused }) =>
              getTabIcon("person-circle", "person-circle-outline", focused),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
