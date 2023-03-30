import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import { EventInterface } from "../components/EventCard";
import formatDate from "../utils/formatEventDate";
import { Ionicons } from "@expo/vector-icons";
import EventDetailsOptions from "../components/EventDetailsOptions";

interface Params {
  eventId: string;
}

export default function EventDetails() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { eventId } = route.params as Params;
  const [refreshing, setRefreshing] = useState(false);
  const [event, setEvent] = useState<EventInterface | null>(null);

  const retrieveEventById = async () => {
    const response = await api.get(`/event/${eventId}`);
    setEvent(response.data);
  };

  useEffect(() => {
    retrieveEventById();
  }, []);

  if (!event) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background p-5 gap-5">
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <Ionicons name="arrow-back-outline" size={40} color="#a1a1aa" />
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => retrieveEventById()}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-32">
          <Image
            source={{
              uri: `http://192.168.1.104:3001/uploads/logo/${event.file_name}`,
            }}
            className="w-full h-40 rounded-md"
          />
          <View className="flex pt-3">
            <Text className="text-white text-4xl font-semibold">
              {event.name}
            </Text>
            <Text className="text-white text-xl font-semibold">
              {formatDate(event.date)}
            </Text>
          </View>
          <EventDetailsOptions event={event} />
        </View>
      </ScrollView>
    </View>
  );
}
