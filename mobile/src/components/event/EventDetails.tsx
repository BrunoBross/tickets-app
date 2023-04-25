import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { EventInterface } from "./EventCard";
import formatDate from "../../utils/formatEventDate";
import { Feather } from "@expo/vector-icons";
import useApi from "../../lib/api";
import EventDetailsOptions from "./EventDetailsOptions";
import Container from "../Container";
import FloatingButton from "../bottomBar/FloatingButton";
import { useCart } from "../../contexts/CartContext";
import { useRoute } from "../../contexts/RouteContext";

interface EventDetailsProps {
  event: EventInterface;
  handleCloseModal: () => void;
}

export default function EventDetails(props: EventDetailsProps) {
  const { event, handleCloseModal } = props;
  const { setIndex } = useRoute();
  const { cartList } = useCart();
  const { serverIp } = useApi();

  return (
    <>
      <Container hasBack onBack={handleCloseModal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-32">
            <Image
              source={{
                uri: `${serverIp}uploads/logo/${event.file_name}`,
              }}
              className="w-full h-40 rounded-md"
            />

            <View className="flex pt-3 flex-row items-center justify-between">
              <View>
                <Text className="text-white text-4xl font-semibold">
                  {event.name}
                </Text>
                <Text className="text-white text-base font-semibold">
                  {formatDate(event.date)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                className="p-5 rounded-md bg-violet-600"
                onPress={() => Linking.openURL(event.location_link)}
              >
                <Feather name="map-pin" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
            <EventDetailsOptions event={event} />
          </View>
        </ScrollView>
      </Container>
      {cartList.length > 0 && (
        <FloatingButton
          title="Ir para o carrinho"
          handler={() => setIndex(2)}
          modal
        />
      )}
    </>
  );
}
