import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface DefaultModal {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  initialRef: any;
  finalRef: any;
  body: ReactNode;
  footer: ReactNode;
  title: string;
}

export default function DefaultModal(props: DefaultModal) {
  const { isOpen, onOpen, onClose, initialRef, finalRef, body, footer, title } =
    props;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
