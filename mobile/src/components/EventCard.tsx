import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import formatEventDate from "../utils/formatEventDate";
import { useNavigation } from "@react-navigation/native";
import colors from "tailwindcss/colors";

export interface TicketType {
  id: string;
  price: number;
  name: string;
  batch: number;
  gender: string;
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
  TicketType: TicketType[];
}

interface EventProps {
  event: EventInterface;
}

export default function EventCard(props: EventProps) {
  const {
    event: { id, date, location, file_name },
  } = props;

  const { navigate } = useNavigation();
  const newDate = formatEventDate(date);
  const info = `${newDate} • ${location}`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="mb-4"
      onPress={() => navigate("details", { eventId: id })}
    >
      <Image
        source={{
          uri: `http://192.168.111.227:3001/uploads/logo/${file_name}`,
        }}
        className="w-full h-40 rounded-md"
      />

      <Text className="text-white pt-2 text-base font-semibold">{info}</Text>
    </TouchableOpacity>
  );
}
