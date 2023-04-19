import clsx from "clsx";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface NewConfirmModalProps {
  isVisible: boolean;
  setIsVisible: (condition: boolean) => void;
  title?: string;
  message?: string;
  confirmText?: string | ReactNode;
  cancelText?: string | ReactNode;
  handler: () => void;
  isDanger?: boolean;
}

export default function ConfirmModal(props: NewConfirmModalProps) {
  const {
    isVisible,
    setIsVisible,
    title,
    message,
    confirmText,
    cancelText,
    handler,
    isDanger,
  } = props;

  const handleCloseModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={handleCloseModal}
      onBackdropPress={handleCloseModal}
      swipeDirection={["right", "left", "down"]}
      className="m-0 justify-end"
    >
      <View className="bg-zinc-900 p-4">
        {title && (
          <Text className="text-white text-3xl font-semibold mb-4">
            {title}
          </Text>
        )}
        {message && (
          <Text className="text-white text-lg font-semibold">{message}</Text>
        )}
        <View className="flex-row mt-5 gap-x-4">
          {cancelText && (
            <TouchableOpacity
              className="flex-1 bg-zinc-600 h-14 justify-center items-center rounded-md"
              onPress={() => setIsVisible(!isVisible)}
            >
              <Text className="text-white text-lg font-semibold">
                {cancelText}
              </Text>
            </TouchableOpacity>
          )}
          {confirmText && (
            <TouchableOpacity
              className={clsx(
                "flex-1 h-14 justify-center items-center rounded-md",
                {
                  ["bg-red-600"]: isDanger,
                  ["bg-violet-600"]: !isDanger,
                }
              )}
              onPress={handler}
            >
              <Text className="text-white text-lg font-semibold">
                {confirmText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
