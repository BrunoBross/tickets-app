import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { ComponentProps } from "react";
import { FieldError } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import colors from "tailwindcss/colors";

export interface InputProps extends TextInputProps {
  title: string;
  onChangeText?: (...event: any[]) => void;
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
      <TextInput
        selectionColor={colors.green[600]}
        placeholderTextColor={colors.zinc[500]}
        onChangeText={onChangeText}
        className={clsx(
          "flex-row p-4 mb-2 items-center justify-between text-white text-base bg-zinc-900 border-2 rounded-md",
          {
            ["border-zinc-800 focus:border-green-600"]: !error?.message,
            ["border-red-600 focus:border-red-600"]: error?.message,
          }
        )}
        placeholder={title}
        {...rest}
      />
      {error?.message && (
        <Text className="text-red-600 text-base font-semibold mb-2">
          {error?.message}
        </Text>
      )}
    </View>
  );
}
