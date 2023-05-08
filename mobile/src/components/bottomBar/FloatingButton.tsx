import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import formatPrice from "../../utils/formatPrice";
import { useCart } from "../../contexts/CartContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FloatingButtonProps {
  handler?: () => void;
  title: string;
  upper?: boolean;
  modal?: boolean;
}

export default function FloatingButton(props: FloatingButtonProps) {
  const { handler, title, upper, modal } = props;
  const { cartTotalPrice } = useCart();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx("w-full h-14 items-center absolute", {
        ["bottom-[135]"]: upper,
        ["bottom-[70]"]: !upper,
        ["bottom-[10]"]: modal,
      })}
      onPress={handler}
    >
      <View
        className={clsx(
          "flex-1 w-[93%] h-full rounded-md flex-row items-center justify-between px-4",
          {
            ["bg-green-600"]: !upper,
            ["bg-zinc-600"]: upper,
          }
        )}
      >
        <View className="flex flex-row">
          <MaterialCommunityIcons
            name={upper ? "trash-can-outline" : "cart-arrow-down"}
            size={24}
            color={colors.white}
          />
          <Text className=" text-white text-base font-semibold pl-2">
            {title}
          </Text>
        </View>
        {!upper && (
          <Text className=" text-white text-base font-semibold pl-2">
            {formatPrice(cartTotalPrice)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
