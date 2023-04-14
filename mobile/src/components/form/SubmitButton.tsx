import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "tailwindcss/colors";

interface SubmitButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading: boolean;
}

export function SubmitButton(props: SubmitButtonProps) {
  const { text, isLoading, ...rest } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={
        "flex p-3 h-14 mt-2 flex-row items-center justify-center bg-green-600  rounded-md"
      }
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <Text className="text-white font-semibold text-base">{text}</Text>
      )}
    </TouchableOpacity>
  );
}
