import { Text, View } from "react-native";
import { ModalPageProps } from "../../screens/Profile";
import Container from "../Container";

export default function Who(props: ModalPageProps) {
  const { setIsModalPageOpen } = props;

  return (
    <Container hasBack onBack={() => setIsModalPageOpen(false)}>
      <View>
        <Text className="text-white text-base font-semibold">
          Somos uma empresa séria
        </Text>
      </View>
    </Container>
  );
}
