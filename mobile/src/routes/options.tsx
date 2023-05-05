import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import {
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { StyleProp, ViewStyle } from "react-native";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";

interface TabBarIconFunctionProps {
  focused: boolean;
  color: string;
}

export const getScreenOptions = (
  iconName: keyof typeof Ionicons.glyphMap,
  iconFocusedName: keyof typeof Ionicons.glyphMap
) => {
  const options = {
    tabBarIconStyle: tabBarIconStyle,
    tabBarIcon: ({ focused }: TabBarIconFunctionProps) =>
      getTabIcon(iconName, iconFocusedName, focused),
  };
  return options;
};

export const getTabIcon = (
  iconName: keyof typeof Ionicons.glyphMap,
  iconFocusedName: keyof typeof Ionicons.glyphMap,
  isFocused: boolean
) => {
  const name = isFocused ? iconFocusedName : iconName;
  const color = isFocused ? colors.white : colors.zinc[700];
  return <Ionicons name={name} size={30} color={color} />;
};

export const tabBarIconStyle: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
};

export const stackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  gestureDirection: "horizontal",
};

export const tabScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIndicatorContainerStyle: {
    backgroundColor: "#09090a",
    borderTopColor: colors.zinc[700],
    borderTopWidth: 2,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.white,
    top: -1.8,
    borderRadius: 100,
  },
  tabBarLabelStyle: {
    display: "none",
  },
  swipeEnabled: false,
};
