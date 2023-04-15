import { useNavigation } from "@react-navigation/native";
import { ReactNode, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import NewConfirmModal from "./modals/NewConfirmModal";

interface ContainerProps {
  title?: string;
  hasBack?: boolean;
  askConfirm?: boolean;
  message?: string;
  children: ReactNode;
}

export default function Container(props: ContainerProps) {
  const { title, hasBack, askConfirm, message, children } = props;
  const { goBack } = useNavigation();
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  const handleGoBack = () => {
    askConfirm ? setIsBackModalOpen(!isBackModalOpen) : goBack();
  };

  return (
    <>
      {askConfirm && (
        <NewConfirmModal
          isVisible={isBackModalOpen}
          setIsVisible={setIsBackModalOpen}
          message={message}
          handler={goBack}
        />
      )}
      <View className="flex-1 bg-background p-5 pb-0 gap-5">
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
        <View className="flex-1">{children}</View>
      </View>
    </>
  );
}
