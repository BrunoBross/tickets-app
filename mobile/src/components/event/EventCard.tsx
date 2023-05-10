import { Image, Text, TouchableOpacity, View } from "react-native";
import formatEventDate from "../../utils/formatEventDate";
import useApi from "../../lib/api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

export interface TicketType {
  id: string;
  name: string;
  description: string;
}

export interface TicketLot {
  id: string;
  amount_available: number;
  lot_number: number;
  price: number;
  tax: number;
  total_price: number;
  ticket_type: TicketType;
  event: EventInterface;
}

export interface EventInterface {
  id: string;
  name: string;
  location: string;
  location_link: string;
  attraction: string;
  description: string;
  date: Date;
  batch: number;
  organizer_id: string;
  file_name: string;
  ticket_lots: TicketLot[];
}

interface EventProps {
  event: EventInterface;
}

export default function EventCard(props: EventProps) {
  const { event } = props;
  const { name } = useRoute();
  const { serverIp } = useApi();
  const { navigate } = useNavigation();
  const [newDate] = useState(formatEventDate(event.date));
  const [info] = useState(`${newDate} • ${event.location}`);

  const handleNavigate = () => {
    const routeToGo = name === "home" ? "eventDetails" : "searchEventDetails";

    navigate(routeToGo, { event });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="mb-4"
        onPress={handleNavigate}
      >
        <View className="aspect-video border-2 border-white rounded-lg">
          <Image
            source={{
              uri: `${serverIp}uploads/logo/${event.file_name}`,
            }}
            className="flex-1 rounded-md"
          />
        </View>
        <Text className="text-white pt-2 text-base font-semibold">{info}</Text>
      </TouchableOpacity>
    </>
  );
}
