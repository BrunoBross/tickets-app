import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import ProfileInfo from "../components/profile/ProfileInfo";
import Who from "../components/profile/Who";
import MyTickets from "../components/profile/MyTickets";
import Help from "../components/profile/Help";

const { Navigator, Screen } = createNativeStackNavigator();

const ProfilePage = () => {
  const { signed } = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
      }}
    >
      <Screen name="profile" component={signed ? Profile : Login} />
      <Screen name="profileInfo" component={ProfileInfo} />
      <Screen name="myTickets" component={MyTickets} />
      <Screen name="who" component={Who} />
      <Screen name="help" component={Help} />
    </Navigator>
  );
};

export { ProfilePage };
