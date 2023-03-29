import { Image, Text, TouchableOpacity, View } from "react-native";
import formatDate from "../utils/dateFormatter";

export interface EventInterface {
  id: string;
  name: string;
  location: string;
  attraction: string;
  description: string;
  date: Date;
  batch: number;
  organizer_id: string;
  file_name: string;
}

interface EventProps {
  event: EventInterface;
}

export default function EventCard(props: EventProps) {
  const {
    event: { date, location, file_name },
  } = props;

  const newDate = formatDate(date);
  const info = `${newDate} • ${location}`;

  return (
    <TouchableOpacity activeOpacity={0.7} className="mb-4">
      <Image
        source={{
          uri: `http://192.168.1.104:3001/uploads/logo/${file_name}`,
        }}
        className="w-full h-40 rounded-md"
      />
      <Text className="text-white pt-2 text-lg">{info}</Text>
    </TouchableOpacity>
  );
}
