import { Text, TouchableOpacity, View } from "react-native";
import Container from "../Container";
import { Form } from "../form";
import { TicketInterface } from "../profile/Ticket";
import ConfirmModal from "../modals/ConfirmModal";
import { TransferTicketType } from "./transferTicketSchema";
import { UserInterface } from "../../contexts/AuthContext";
import { UseFormReturn } from "react-hook-form";

interface TransferTicketProps {
  ticket: TicketInterface;
  createTransferTicketForm: UseFormReturn<
    {
      cpf: string;
    },
    any
  >;
  onSubmit: (data: TransferTicketType) => Promise<void>;
  userTransfer: UserInterface | null;
  handleTransferTicket: () => void;
  isConfirmTransferModalOpen: boolean;
  setIsConfirmTransferModalOpen: (state: boolean) => void;
  setIsTransferModalOpen: (state: boolean) => void;
}

export default function TransferTicket(props: TransferTicketProps) {
  const {
    ticket,
    createTransferTicketForm,
    onSubmit,
    userTransfer,
    handleTransferTicket,
    isConfirmTransferModalOpen,
    setIsConfirmTransferModalOpen,
    setIsTransferModalOpen,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = createTransferTicketForm;

  return (
    <>
      <ConfirmModal
        title="Transferir"
        message={`Confirmar transferencia do ingresso para ${userTransfer?.name} ${userTransfer?.surname}?`}
        confirmText="Transferir"
        cancelText="Cancelar"
        isDanger
        isVisible={isConfirmTransferModalOpen}
        setIsVisible={setIsConfirmTransferModalOpen}
        handler={handleTransferTicket}
      />
      <Container hasBack onBack={() => setIsTransferModalOpen(false)}>
        <View className="flex-1 justify-between">
          <View>
            <Form.ControlledInput
              title="CPF destinatário"
              name="cpf"
              keyboardType="numeric"
              placeholder="000.000.000-00"
              autoCapitalize="none"
              control={control}
              error={errors.cpf}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex flex-row bg-violet-600 p-4 rounded-md mt-3 justify-center"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="pl-3 text-white text-base font-semibold">
                Transferir
              </Text>
            </TouchableOpacity>
          </View>
          <View className="gap-y-2 mb-2">
            <Text className="text-white text-base font-semibold">
              Você está transferindo o ingresso:
            </Text>
            <View className="flex-row border-2 border-violet-600 h-14 items-center justify-center rounded-md">
              <Text className="text-white text-base font-semibold">
                {ticket.event.name}
              </Text>
              <Text className="text-white text-base font-semibold pl-2">
                {ticket.ticket_type.name.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </Container>
    </>
  );
}
