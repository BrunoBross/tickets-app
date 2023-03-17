import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { EventInterface } from "../../pages/home/pages/MyEvents";
import { formatDate } from "../../utils/dateFormatter";

interface EventCardProps {
  event: EventInterface;
}

export default function EventCard(props: EventCardProps) {
  const {
    event: { name, date, location },
  } = props;

  const newDate = formatDate(date);
  const info = `${newDate} • ${location}`;

  return (
    <Box
      display="flex"
      flexDir="column"
      flex="1"
      padding="1rem"
      gap="0.5rem"
      minWidth="15rem"
      maxWidth="20rem"
      height="16rem"
      borderRadius="1rem"
      className="event-card transition"
    >
      <Image
        height="70%"
        objectFit="cover"
        src="https://guiafloripa.com.br/wp-content/uploads/2019/04/endireita.png"
        backgroundColor="gray"
        borderRadius="1rem"
      />

      <VStack display="flex" flex="1" alignItems="flex-start">
        <Heading size="lg">{name}</Heading>
        <Text>{info}</Text>
      </VStack>
    </Box>
  );
}
