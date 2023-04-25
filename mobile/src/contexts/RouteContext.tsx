import { ReactNode, createContext, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface RouteType {
  key: string;
  title: string;
  icon: string | any;
  iconFocused: string | any;
}

interface RenderType {
  route: RouteType;
  focused: boolean;
}

interface RouteProviderProps {
  children: ReactNode;
}

interface RouteProviderInterface {
  index: number;
  setIndex: (state: number) => void;
  routes: RouteType[];
  renderIcon: ({ route, focused }: RenderType) => JSX.Element;
}

const RouteContext = createContext({} as RouteProviderInterface);

export default function RouteProvider(props: RouteProviderProps) {
  const { children } = props;

  const [index, setIndex] = useState(0);
  const [routes] = useState<RouteType[]>([
    { key: "home", title: "Home", icon: "home-outline", iconFocused: "home" },
    {
      key: "search",
      title: "Search",
      icon: "search-outline",
      iconFocused: "search",
    },
    { key: "cart", title: "Cart", icon: "cart-outline", iconFocused: "cart" },
    {
      key: "profile",
      title: "Profile",
      icon: "person-circle-outline",
      iconFocused: "person-circle",
    },
  ]);

  const renderIcon = ({ route, focused }: RenderType) => {
    const iconName = focused ? route.iconFocused : route.icon;
    const iconColor = focused ? colors.white : colors.zinc[700];
    return <Ionicons name={iconName} size={30} color={iconColor} />;
  };

  return (
    <RouteContext.Provider
      value={{
        index,
        setIndex,
        routes,
        renderIcon,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export const useRoute = () => useContext(RouteContext);
