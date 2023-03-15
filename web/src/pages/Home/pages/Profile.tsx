import { Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../../../contexts/AuthContext";

export default function Profile() {
  const { organizer } = useAuth();

  return (
    <div>
      <Heading size="lg">
        {organizer?.name} {organizer?.surname}
      </Heading>
      <Text>{organizer?.email}</Text>
    </div>
  );
}
