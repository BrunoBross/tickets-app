import { TextInput } from "react-native";
import colors from "tailwindcss/colors";

interface InputTextProps {
  placeholder: string;
  onChangeText: (() => void) | ((input: string) => Promise<void>);
}

export default function InputText(props: InputTextProps) {
  const { placeholder, onChangeText } = props;
  return (
    <TextInput
      selectionColor={colors.green[600]}
      placeholderTextColor={colors.zinc[500]}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className=" h-14 p-3 text-base text-white bg-zinc-900 border-2 border-zinc-800 rounded-md focus:border-green-600"
    />
  );
}
