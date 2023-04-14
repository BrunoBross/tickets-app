import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  Control,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { verifyCpf } from "../components/register/utils";
import { useNavigation } from "@react-navigation/native";
import ConfirmModal from "../components/modals/ConfirmModal";
import AlertModal from "../components/modals/AlertModal";
import { Text } from "react-native";
import useApi from "../lib/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterProviderProps {
  children: ReactNode;
}

export enum RegisterPageEnum {
  ACCOUNT = "ACCOUNT",
  ADDRESS = "ADDRESS",
  PASSWORD = "PASSWORD",
}

interface RegisterContextInterface {
  readyList: RegisterPageEnum[];

  page: ReducerStateInterface;
  setPage: Dispatch<ReducerActionInterface>;
  register: UseFormRegister<RegisterUserType>;

  onSubmit: (data: RegisterUserType) => void;
  handleSubmit: UseFormHandleSubmit<RegisterUserType>;

  control: Control<RegisterUserType>;
  getValues: UseFormGetValues<RegisterUserType>;
  setValue: UseFormSetValue<RegisterUserType>;
  birthDate: Date | null;
  setBirthDate: Dispatch<React.SetStateAction<Date | null>>;
  cpf: string;
  setCpf: Dispatch<React.SetStateAction<string>>;
  cep: string;
  setCep: Dispatch<React.SetStateAction<string>>;
}

interface ReducerStateInterface {
  ACCOUNT: boolean;
  ADDRESS: boolean;
  PASSWORD: boolean;
}

interface ReducerActionInterface {
  type: RegisterPageEnum;
  payload?: number;
}

const reducer = (
  state: ReducerStateInterface,
  action: ReducerActionInterface
) => {
  switch (action.type) {
    case RegisterPageEnum.ACCOUNT:
      return {
        ACCOUNT: true,
        ADDRESS: false,
        PASSWORD: false,
      };
    case RegisterPageEnum.ADDRESS:
      return {
        ACCOUNT: false,
        ADDRESS: true,
        PASSWORD: false,
      };
    case RegisterPageEnum.PASSWORD:
      return {
        ACCOUNT: false,
        ADDRESS: false,
        PASSWORD: true,
      };
    default:
      return state;
  }
};

const initialValues: ReducerStateInterface = {
  ACCOUNT: true,
  ADDRESS: false,
  PASSWORD: false,
};

const registerUserSchema = z.object({
  name: z.string().nonempty({ message: "O nome é obrigatório" }),
  surname: z.string().nonempty({ message: "O sobrenome é obrigatório" }),
  email: z
    .string()
    .nonempty({ message: "O e-mail é obrigatório" })
    .email({ message: "Formato de e-mail inválido" })
    .toLowerCase(),
  confirmEmail: z
    .string()
    .nonempty({ message: "O e-mail é obrigatório" })
    .email({ message: "Formato de e-mail inválido" })
    .toLowerCase(),
  cpf: z
    .string()
    .nonempty({ message: "O cpf é obrigatório" })
    .min(14, { message: "Formato de cpf inválido" })
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
    .transform((value) => value.replace(/[^0-9]/g, "")),
  birth: z.date(),
  zip_code: z.string().min(9, { message: "Formato de cep inválido" }),
  address: z.string().nonempty({ message: "O endereço é obrigatório" }),
  addressNumber: z.number(),
  password: z
    .string()
    .nonempty({
      message: "A senha é obrigatória",
    })
    .min(8, {
      message: "A senha precisa ter no mínimo 8 caracteres",
    }),
});

type RegisterUserType = z.infer<typeof registerUserSchema>;

const RegisterContext = createContext({} as RegisterContextInterface);

export default function RegisterProvider(props: RegisterProviderProps) {
  const { children } = props;
  const { navigate } = useNavigation();
  const api = useApi();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [page, setPage] = useReducer(reducer, initialValues);
  const [readyList, setReadyList] = useState<RegisterPageEnum[]>([]);

  const [error, setError] = useState("");

  const createRegisterForm = useForm<RegisterUserType>({
    resolver: zodResolver(registerUserSchema),
  });

  const { handleSubmit, register, getValues, setValue, control } =
    createRegisterForm;
  const [cpf, setCpf] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const onSubmit = (data: RegisterUserType) => {
    console.log("oi");
    console.log(data);
  };

  const handleGoLogin = () => {
    setIsModalOpen(false);
    navigate("profile");
  };

  const cancelLogin = () => {
    setIsModalOpen(false);
  };

  return (
    <RegisterContext.Provider
      value={{
        readyList,
        page,
        control,
        setPage,
        onSubmit,
        handleSubmit,
        getValues,
        register,
        setValue,
        birthDate,
        setBirthDate,
        cpf,
        setCpf,
        cep,
        setCep,
      }}
    >
      <ConfirmModal
        isOpen={isModalOpen}
        handler={handleGoLogin}
        cancelHandler={cancelLogin}
        title="Cadastro"
        confirmText="Ir para o Login"
      >
        <Text className="text-white text-base font-semibold">
          Você se cadastrou com sucesso!
        </Text>
      </ConfirmModal>
      <AlertModal
        isOpen={isErrorModalOpen}
        setIsOpen={setIsErrorModalOpen}
        isError
        title="Erro"
        message={error}
        buttonText="Fechar"
      />
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);
