import clsx from "clsx";
import { Text, View } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CustomToastProps {
  toast: ToastProps;
}

export default function CustomToast(props: CustomToastProps) {
  const { toast } = props;

  const toastStyle = {
    ["bg-violet-600"]: toast.type === "normal",
    ["bg-green-600"]: toast.type === "success",
    ["bg-orange-600"]: toast.type === "warning",
    ["bg-red-600"]: toast.type === "danger",
  };

  return (
    <View
      className={clsx(
        "flex p-3 h-14 w-[90%] flex-row items-center justify-center rounded-md",
        toastStyle
      )}
    >
      {toast.type === "success" && (
        <Feather name="check-circle" size={24} color={colors.white} />
      )}
      {toast.type === "warning" && (
        <Feather name="radio" size={24} color={colors.white} />
      )}
      {toast.type === "danger" && (
        <Feather name="alert-triangle" size={24} color={colors.white} />
      )}
      <Text className="text-white font-semibold text-base pl-2">
        {toast.message}
      </Text>
    </View>
  );
}
