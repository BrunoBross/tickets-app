import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import Profile from "../screens/Profile";
import Login from "../screens/Login";

const { Navigator, Screen } = createNativeStackNavigator();

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
    </Navigator>
  );
};

export { ProfilePage };
