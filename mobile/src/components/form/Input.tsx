import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { ComponentProps } from "react";
import { FieldError } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import colors from "tailwindcss/colors";

export interface InputProps extends TextInputProps {
  title: string;
  onChangeText?: (...event: any[]) => void;
  value?: any;
  icon?: ComponentProps<typeof Feather>["name"];
  error: FieldError | undefined;
}

export function Input(props: InputProps) {
  const { title, onChangeText, icon, error, ...rest } = props;

  return (
    <View>
      <Text className="text-zinc-500 text-base font-semibold mb-2">
        {title}
      </Text>
      <View
        className={clsx(
          "flex-row h-14 p-3 mb-2 items-center justify-between bg-zinc-900 border-2 rounded-md",
          {
            ["border-zinc-800 focus:border-green-600"]: !error?.message,
            ["border-red-600 focus:border-red-600"]: error?.message,
          }
        )}
      >
        <TextInput
          selectionColor={colors.green[600]}
          placeholderTextColor={colors.zinc[500]}
          onChangeText={onChangeText}
          className="flex-1 text-white text-base"
          placeholder={title}
          {...rest}
        />
        <Feather name={icon} size={24} color={colors.white} />
      </View>
      {error?.message && (
        <Text className="text-red-600 text-base font-semibold mb-2">
          {error?.message}
        </Text>
      )}
    </View>
  );
}
