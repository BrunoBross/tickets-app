import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useTransferTicket from "./useTransferTicket";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamList } from "../../../../@types/navigation";
import Container from "../../../Container";
import ConfirmModal from "../../../modals/ConfirmModal";
import { Form } from "../../../form";

export default function TransferTicket() {
  const {
    params: { ticket },
  } = useRoute<RouteProp<ParamList, "transferTicket">>();

  const {
    createTransferTicketForm,
    handleTransferTicket,
    isConfirmTransferModalOpen,
    onSubmit,
    setIsConfirmTransferModalOpen,
    userTransfer,
  } = useTransferTicket({
    ticket,
  });

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
      <Container hasBack>
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-white text-2xl font-semibold mb-4">
              Transferência de Ingresso
            </Text>
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
              className="flex flex-row bg-violet-600 p-4 rounded-md justify-center"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="pl-3 text-white text-base font-semibold">
                Transferir
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            className="flex-1 justify-end"
            behavior="padding"
          >
            <View className="gap-y-2 mb-2">
              <Text className="text-white text-base font-semibold">
                Você está transferindo o ingresso:
              </Text>
              <View className="flex-row border-2 border-violet-600 h-14 items-center justify-center rounded-md">
                <Text className="text-white text-base font-semibold">
                  {ticket?.ticket_lot.event.name}
                </Text>
                <Text className="text-white text-base font-semibold pl-2">
                  {ticket?.ticket_lot.ticket_type.name.toUpperCase()}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Container>
    </>
  );
}
