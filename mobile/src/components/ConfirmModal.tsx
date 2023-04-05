import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  handler: () => void;
  confirmText: string;
  cancelText?: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const {
    isOpen,
    setIsOpen,
    title,
    message,
    handler,
    confirmText,
    cancelText,
  } = props;

  return (
    <Modal visible={isOpen} transparent={true}>
      <View className="flex-1 justify-center items-center bg-transparent/90">
        <View className="p-3 gap-y-3 w-[90%] bg-zinc-700 rounded-md">
          <Text className="text-white text-3xl font-semibold">{title}</Text>
          <Text className="text-white text-base font-semibold">{message}</Text>
          {cancelText ? (
            <View className="flex-row justify-end gap-x-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-3 bg-zinc-600 rounded-md"
                onPress={() => setIsOpen(false)}
              >
                <Text className="text-white text-base font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-3 bg-violet-600 rounded-md"
                onPress={handler}
              >
                <Text className="text-white text-base font-semibold">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row justify-end gap-x-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-3 bg-violet-600 rounded-md"
                onPress={handler}
              >
                <Text className="text-white text-base font-semibold">
                  {confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
