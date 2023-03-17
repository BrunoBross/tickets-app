import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Container,
  Heading,
  HStack,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  CalendarBlank,
  CalendarPlus,
  SignOut,
  Ticket,
  User,
} from "phosphor-react";
import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContextInterface } from "../../contexts/AuthContext";
import "./home.css";

interface HomeProps {
  auth: AuthContextInterface;
}

export default function Home(props: HomeProps) {
  const {
    auth: { Logout },
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const navigate = useNavigate();

  const LogoutDialog = () => {
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Sair
              </AlertDialogHeader>

              <AlertDialogBody>
                Você tem certeza que deseja sair?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" onClick={Logout} ml={3}>
                  Sim
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

  return (
    <>
      <LogoutDialog />
      <Container
        className="home-container"
        display="flex"
        maxWidth="100vw"
        maxHeight="100vh"
        width="100vw"
        height="100vh"
        padding="5rem 3rem 5rem 5rem"
      >
        <HStack display="flex" w="100%" h="100%" alignItems="flex-start">
          <VStack
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            width="15%"
            minWidth="10rem"
            height="100%"
            gap="1rem"
          >
            <VStack alignItems="flex-start" gap="5rem">
              <Heading
                size="lg"
                display="flex"
                alignItems="center"
                gap="0.5rem"
              >
                <Ticket size={28} weight="bold" />
                Tickets
              </Heading>
              <VStack alignItems="flex-start" gap="1rem">
                <Link display="flex" gap="0.5rem" onClick={() => navigate("/")}>
                  <CalendarBlank size={20} weight="bold" />
                  <Text fontSize="md" as="b">
                    Meus Eventos
                  </Text>
                </Link>
                <Link
                  display="flex"
                  gap="0.5rem"
                  onClick={() => navigate("/allevents")}
                >
                  <CalendarPlus size={20} weight="bold" />
                  <Text fontSize="md" as="b">
                    Todos Eventos
                  </Text>
                </Link>
                <Link
                  display="flex"
                  gap="0.5rem"
                  onClick={() => navigate("/profile")}
                >
                  <User size={20} weight="bold" />
                  <Text fontSize="md" as="b">
                    Meu Perfil
                  </Text>
                </Link>
              </VStack>
            </VStack>
            <Link display="flex" gap="0.5rem" onClick={onOpen}>
              <SignOut size={20} weight="bold" />
              <Text fontSize="md" as="b">
                Sair
              </Text>
            </Link>
          </VStack>
          <Container
            className="section-container"
            backgroundColor="#FFF"
            maxWidth="100%"
            height="100%"
            borderRadius="2rem"
            padding="3rem"
          >
            <Outlet />
          </Container>
        </HStack>
      </Container>
    </>
  );
}
