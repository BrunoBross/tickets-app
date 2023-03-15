import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { EventInterface } from "../pages/Home/pages/MyEvents";

interface EventCardProps {
  event: EventInterface;
}

export default function EventCard(props: EventCardProps) {
  const {
    event: { name, date, location },
  } = props;

  const info = `${date} • ${location}`;

  return (
    <div
      style={{
        width: "20rem",
        height: "16rem",
        borderRadius: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: "8rem",
          borderRadius: "1rem",
        }}
      />
      <Heading size="lg">{name}</Heading>
      <Text>{info}</Text>
    </div>
  );
}
