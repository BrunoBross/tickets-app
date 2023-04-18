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
}

export default function NewConfirmModal(props: NewConfirmModalProps) {
  const {
    isVisible,
    setIsVisible,
    title,
    message,
    confirmText,
    cancelText,
    handler,
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
          <TouchableOpacity
            className="flex-1 bg-zinc-600 h-14 justify-center items-center rounded-md"
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text className="text-white text-lg font-semibold">
              {cancelText ? cancelText : "Não"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-red-600 h-14 justify-center items-center rounded-md"
            onPress={handler}
          >
            <Text className="text-white text-lg font-semibold">
              {confirmText ? confirmText : "Sim"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
