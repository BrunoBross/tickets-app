import clsx from "clsx";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface AlertModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  isError?: boolean;
  buttonText: string;
}

export default function AlertModal(props: AlertModalProps) {
  const { isOpen, setIsOpen, title, message, buttonText, isError } = props;

  return (
    <Modal visible={isOpen} transparent={true}>
      <View className="flex-1 justify-center items-center bg-transparent/90">
        <View className="p-3 gap-y-3 w-[90%] bg-zinc-700 rounded-md">
          <Text
            className={clsx(" text-3xl font-semibold", {
              ["text-white"]: !isError,
              ["text-red-500"]: isError,
            })}
          >
            {title}
          </Text>
          <Text className="text-white text-base font-semibold">{message}</Text>
          <View className="flex-row justify-end gap-x-3">
            <TouchableOpacity
              activeOpacity={0.7}
              className="p-3 bg-violet-600 rounded-md"
              onPress={() => setIsOpen(false)}
            >
              <Text className="text-white text-base font-semibold">
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
