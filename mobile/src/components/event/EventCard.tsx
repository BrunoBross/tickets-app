import { Image, Text, TouchableOpacity, View } from "react-native";
import formatEventDate from "../../utils/formatEventDate";
import useApi from "../../lib/api";
import ContentModal from "../modals/ContentModal";
import { useState } from "react";
import EventDetails from "./EventDetails";

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
  const { serverIp } = useApi();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const newDate = formatEventDate(event.date);
  const info = `${newDate} • ${event.location}`;

  return (
    <>
      <ContentModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        swipeDir="down"
      >
        <EventDetails event={event} handleCloseModal={handleToggleModal} />
      </ContentModal>
      <TouchableOpacity
        activeOpacity={0.7}
        className="mb-4"
        onPress={handleToggleModal}
      >
        <Image
          source={{
            uri: `${serverIp}uploads/logo/${event.file_name}`,
          }}
          className="w-full h-40 rounded-md"
        />
        <Text className="text-white pt-2 text-base font-semibold">{info}</Text>
      </TouchableOpacity>
    </>
  );
}
