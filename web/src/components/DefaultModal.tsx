import {
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
  const { isOpen, onClose, initialRef, finalRef, body, footer, title } = props;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="1.8rem">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
