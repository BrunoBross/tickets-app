import { useNavigation } from "@react-navigation/native";
import { ReactNode, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import ConfirmModal from "./modals/ConfirmModal";

interface ContainerProps {
  title?: string;
  hasBack?: boolean;
  onBack?: () => void;
  askConfirm?: boolean;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  button?: ReactNode;
  refreshName?: string;
  children: ReactNode;
}

export default function Container(props: ContainerProps) {
  const {
    title,
    hasBack,
    onBack,
    askConfirm,
    message,
    confirmText,
    cancelText,
    isDanger,
    button,
    refreshName,
    children,
  } = props;
  const { goBack } = useNavigation();
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  const handleGoBack = () => {
    askConfirm && !onBack
      ? setIsBackModalOpen(!isBackModalOpen)
      : onBack
      ? onBack()
      : goBack();
  };

  return (
    <>
      {askConfirm && (
        <ConfirmModal
          isVisible={isBackModalOpen}
          setIsVisible={setIsBackModalOpen}
          message={message}
          confirmText={confirmText}
          cancelText={cancelText}
          handler={goBack}
          isDanger={isDanger}
        />
      )}
      <View className="flex-1 mt-4">
        <View className="flex-1 bg-background px-5 pb-0">
          {refreshName && (
            <View className="flex-row items-center justify-center gap-x-2 py-1">
              <Ionicons
                name="arrow-down-circle-outline"
                size={24}
                color={colors.white}
              />
              <Text className=" text-white text-xs font-semibold">
                Arraste para baixo para atualizar os {refreshName}
              </Text>
            </View>
          )}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {hasBack && (
                <View className="justify-center h-14">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleGoBack}
                    className="py-2 pr-4"
                  >
                    <Ionicons
                      name="arrow-back"
                      size={40}
                      color={colors.zinc[400]}
                      style={{ left: -5 }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {title && (
                <View className="justify-center h-14">
                  <Text className=" text-white text-4xl font-extrabold tracking-widest">
                    {title}
                  </Text>
                </View>
              )}
            </View>
            {button}
          </View>
          <View className="flex-1 mt-3">{children}</View>
        </View>
      </View>
    </>
  );
}
