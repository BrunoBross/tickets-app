import clsx from "clsx";
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import ExtraDimensions from "react-native-extra-dimensions-android";

interface AlertModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  isError?: boolean;
  buttonText: string;
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : ExtraDimensions.get("REAL_WINDOW_HEIGHT");

export default function AlertModal(props: AlertModalProps) {
  const { isOpen, setIsOpen, title, message, buttonText, isError } = props;

  return (
    <View>
      <Modal
        isVisible={isOpen}
        backdropOpacity={0.9}
        style={{ margin: 0 }}
        statusBarTranslucent={true}
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        onBackdropPress={() => setIsOpen(false)}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
      >
        <View className="flex-1 justify-center items-center">
          <View className="p-3 gap-y-3 w-[90%] bg-zinc-700 rounded-md">
            <Text
              className={clsx(" text-3xl font-semibold", {
                ["text-white"]: !isError,
                ["text-red-500"]: isError,
              })}
            >
              {title}
            </Text>
            <Text className="text-white text-base font-semibold">
              {message}
            </Text>
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
    </View>
  );
}
