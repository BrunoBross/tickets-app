import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import {
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { StyleProp, ViewStyle } from "react-native";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";

const iconSize = 30;

export const getTabIcon = (
  iconName: keyof typeof Ionicons.glyphMap,
  iconFocusedName: keyof typeof Ionicons.glyphMap,
  isFocused: boolean
) => {
  const name = isFocused ? iconFocusedName : iconName;
  const color = isFocused ? colors.white : colors.zinc[700];
  return <Ionicons name={name} size={iconSize} color={color} />;
};

export const tabBarIconStyle: StyleProp<ViewStyle> = {
  height: iconSize,
  width: iconSize,
};

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};

export const screenStyleOptions: MaterialTopTabNavigationOptions = {
  tabBarPressColor: colors.transparent,
  tabBarIndicatorContainerStyle: {
    backgroundColor: "#09090a",
    borderTopColor: colors.zinc[700],
    borderTopWidth: 2,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.white,
    top: -1.5,
    borderRadius: 100,
  },
  tabBarLabelStyle: {
    display: "none",
  },
};
