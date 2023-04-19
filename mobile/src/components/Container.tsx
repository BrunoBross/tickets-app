import { useNavigation } from "@react-navigation/native";
import { ReactNode, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import NewConfirmModal from "./modals/ConfirmModal";

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
        <NewConfirmModal
          isVisible={isBackModalOpen}
          setIsVisible={setIsBackModalOpen}
          message={message}
          confirmText={confirmText}
          cancelText={cancelText}
          handler={goBack}
          isDanger={isDanger}
        />
      )}
      <View className="flex-1 bg-background p-5 pb-0 gap-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {hasBack && (
              <View className="justify-center h-14 pr-4">
                <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
                  <Ionicons
                    name="arrow-back-outline"
                    size={40}
                    color={colors.zinc[400]}
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
        <View className="flex-1">{children}</View>
      </View>
    </>
  );
}
