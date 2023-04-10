import { ReactNode } from "react";
import { TextInput, View } from "react-native";
import colors from "tailwindcss/colors";

interface InputTextProps {
  placeholder: string;
  icon?: ReactNode;
  onChangeText: (() => void) | ((input: string) => Promise<void>);
}

export function Input(props: InputTextProps) {
  const { placeholder, onChangeText, icon } = props;
  return (
    <View className="flex-row items-center px-3 bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600">
      <TextInput
        selectionColor={colors.green[600]}
        placeholderTextColor={colors.zinc[500]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="flex-1 h-14 text-base text-white "
      />
      {icon}
    </View>
  );
}
