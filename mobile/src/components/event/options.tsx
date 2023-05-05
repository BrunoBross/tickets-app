import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import colors from "tailwindcss/colors";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import clsx from "clsx";

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
    <View className="flex-1 flex-row items-center justify-center">
      <Text
        className={clsx("text-base font-semibold ml-1", {
          ["text-white"]: isFocused,
          ["text-zinc-900"]: !isFocused,
        })}
      >
        {label}
      </Text>
    </View>
  );
};

export const tabScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarPressColor: colors.transparent,
  tabBarIndicatorContainerStyle: {
    backgroundColor: colors.violet[600],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomColor: colors.zinc[600],
    borderBottomWidth: 2,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.white,
    bottom: -2,
    borderRadius: 100,
  },
  tabBarLabelStyle: {
    display: "none",
  },
};
