import { ReactNode } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

interface ContentModalProps {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  swipeDir?: "down" | "up" | "left" | "right";
  children: ReactNode;
}

export default function ContentModal(props: ContentModalProps) {
  const { isVisible, setIsVisible, children } = props;

  const handleCloseModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={handleCloseModal}
      onBackdropPress={handleCloseModal}
      className="m-0"
    >
      <View className="flex-1">{children}</View>
    </Modal>
  );
}
