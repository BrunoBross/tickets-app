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
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "0.5rem",
        minWidth: "15rem",
        maxWidth: "20rem",
        height: "16rem",
        borderRadius: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "gray",
          borderRadius: "1rem",
        }}
      />
      <Heading size="lg">{name}</Heading>
      <Text>{info}</Text>
    </div>
  );
}
