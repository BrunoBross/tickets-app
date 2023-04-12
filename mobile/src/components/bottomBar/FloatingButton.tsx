import clsx from "clsx";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

interface FloatingButtonProps {
  handler: () => void;
  upper?: boolean;
  children: ReactNode;
}

export default function FloatingButton(props: FloatingButtonProps) {
  const { handler, upper, children } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx("w-full h-14 items-center absolute", {
        ["bottom-32"]: upper,
        ["bottom-16"]: !upper,
      })}
      onPress={handler}
    >
      {children}
    </TouchableOpacity>
  );
}
