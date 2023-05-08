import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import colors from "tailwindcss/colors";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import clsx from "clsx";
import { ParamListBase, RouteProp } from "@react-navigation/native";

interface TabBarIconFunctionProps {
  focused: boolean;
  color: string;
}

export const tabBarIconStyle: StyleProp<ViewStyle> = {
  height: "100%",
  width: "100%",
};

export const getScreenOptions = (label: string) => {
  const options = {
    tabBarIconStyle: tabBarIconStyle,
    tabBarIcon: ({ focused }: TabBarIconFunctionProps) => {
      return getTabLabel(label, focused);
    },
  };
  return options;
};

export const getTabLabel = (label: string, isFocused: boolean) => {
  return (
    <Text
      className={clsx("text-base font-semibold ml-1", {
        ["text-white"]: isFocused,
        ["text-black"]: !isFocused,
      })}
    >
      {label}
    </Text>
  );
};

export const tabScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarPressColor: colors.transparent,
  tabBarIndicatorContainerStyle: {
    backgroundColor: colors.violet[800],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.zinc[800],
  },
  tabBarIndicatorStyle: {
    bottom: -2,
    height: 48,
    backgroundColor: colors.violet[600],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  tabBarLabelStyle: {
    display: "none",
  },
};
