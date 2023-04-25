import clsx from "clsx";
import { Text, TouchableOpacity } from "react-native";

interface SectionButtonProps {
  title: string;
  state: boolean;
  handler: (props: any) => void;
  right?: boolean;
}

export default function SectionButton(props: SectionButtonProps) {
  const { title, state, handler, right } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      className={clsx("flex-1 p-3 h-14 bg-violet-600 items-center", {
        ["border-b-2 border-white"]: state,
        ["opacity-50"]: !state,
        ["rounded-tr-md"]: right,
        ["rounded-tl-md"]: !right,
      })}
      onPress={handler}
    >
      <Text
        className={clsx("text-xl font-semibold", {
          ["text-white"]: state,
          ["text-zinc-400"]: !state,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
