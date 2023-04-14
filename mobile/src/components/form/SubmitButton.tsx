import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface SubmitButtonProps extends TouchableOpacityProps {
  text: string;
}

export function SubmitButton(props: SubmitButtonProps) {
  const { text, ...rest } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex p-3 h-14 mt-2 flex-row items-center justify-center bg-green-600 rounded-md"
      {...rest}
    >
      <Text className="text-white font-semibold text-base">{text}</Text>
    </TouchableOpacity>
  );
}
