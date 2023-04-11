import clsx from "clsx";
import { ReactNode } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  handler: () => void;
  cancelHandler?: () => void;
  confirmText: string;
  cancelText?: string;
  children: ReactNode;
  isDanger?: boolean;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const {
    isOpen,
    title,
    handler,
    cancelHandler,
    confirmText,
    cancelText,
    children,
    isDanger,
  } = props;

  return (
    <Modal visible={isOpen} transparent={true}>
      <View className="flex-1 justify-center items-center bg-transparent/90">
        <View className="p-3 gap-y-3 w-[90%] bg-zinc-900 rounded-md">
          <Text className="text-white text-3xl font-semibold">{title}</Text>
          {children}
          {cancelText ? (
            <View className="flex-row justify-end gap-x-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-3 bg-zinc-600 rounded-md"
                onPress={cancelHandler}
              >
                <Text className="text-white text-base font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className={clsx("p-3 rounded-md", {
                  ["bg-violet-600"]: !isDanger,
                  ["bg-red-600"]: isDanger,
                })}
                onPress={handler}
              >
                <Text className="text-white text-base font-semibold">
                  {confirmText}
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
