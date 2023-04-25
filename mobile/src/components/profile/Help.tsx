import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { ModalPageProps } from "../../screens/Profile";
import Container from "../Container";

export default function Help(props: ModalPageProps) {
  const { setIsModalPageOpen } = props;

  return (
    <Container hasBack onBack={() => setIsModalPageOpen(false)}>
      <View>
        <Text className="text-white text-base font-semibold">
          Te vira meu fi
        </Text>
      </View>
    </Container>
  );
}
