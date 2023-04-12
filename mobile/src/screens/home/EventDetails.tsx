import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { EventInterface } from "../../components/EventCard";
import formatDate from "../../utils/formatEventDate";
import { Ionicons } from "@expo/vector-icons";
import EventDetailsOptions from "../../components/EventDetailsOptions";
import { Feather } from "@expo/vector-icons";
import useApi from "../../lib/api";
import ImageColors from "react-native-image-colors";
import { useConnection } from "../../contexts/ConnectionContext";

interface Params {
  eventId: string;
}

export default function EventDetails() {
  const { goBack } = useNavigation();
  const api = useApi();
  const { serverIp } = useConnection();
  const route = useRoute();
  const { eventId } = route.params as Params;
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [averageColor, setAverageColor] = useState<string | null>(null);

  const retrieveEventById = async () => {
    const response = await api.get(`/event/${eventId}`);
    setEvent(response.data);

    await ImageColors.getColors(
      `${serverIp}/uploads/logo/${response.data.file_name}`,
      {
        fallback: "#7C3AED",
        quality: "highest",
        key: "unique_key",
      }
    )
      .then((response: any) => {
        console.log(response);
        if (response.vibrant === "#000000") {
          return setAverageColor("#7C3AED");
        }
        setAverageColor(response.vibrant);
      })
      .catch((error) => {
        setAverageColor("#7C3AED");
      });
  };

  useFocusEffect(
    useCallback(() => {
      retrieveEventById();
    }, [])
  );

  if (!event || !averageColor) {
    return (
      <View className="flex-1 bg-background p-5 gap-5">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Ionicons
            name="arrow-back-outline"
            size={40}
            color={colors.zinc[400]}
          />
        </TouchableOpacity>
        <View className="flex-1 bg-background justify-center items-center">
          <ActivityIndicator size="large" color={colors.violet[600]} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background p-5 pb-0 gap-5">
      <View className="justify-center h-10">
        <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
          <Ionicons
            name="arrow-back-outline"
            size={40}
            color={colors.zinc[400]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-32">
          <Image
            source={{
              uri: `${serverIp}/uploads/logo/${event.file_name}`,
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
              className="p-5 rounded-md"
              style={{ backgroundColor: averageColor }}
              onPress={() => Linking.openURL(event.location_link)}
            >
              <Feather name="map-pin" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <EventDetailsOptions event={event} averageColor={averageColor} />
        </View>
      </ScrollView>
    </View>
  );
}
