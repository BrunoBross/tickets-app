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
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { verifyCpf } from "../components/register/utils";
import { api } from "../lib/api";
import { useNavigation } from "@react-navigation/native";

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
  register: UseFormRegister<RegisterFormFields>;

  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<RegisterFormFields>;

  getValues: UseFormGetValues<RegisterFormFields>;
  setValue: UseFormSetValue<RegisterFormFields>;
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

interface RegisterFormFields {
  name: string;
  surname: string;
  email: string;
  confirmEmail: string;
  birthDate: Date;
  cpf: string;
  cep: string;
  address: string;
  addressNumber: string;
  password: string;
  confirmPassword: string;
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

const RegisterContext = createContext({} as RegisterContextInterface);

export default function RegisterProvider(props: RegisterProviderProps) {
  const { children } = props;
  const { navigate } = useNavigation();
  const [page, setPage] = useReducer(reducer, initialValues);
  const [readyList, setReadyList] = useState<RegisterPageEnum[]>([]);

  const { handleSubmit, register, getValues, setValue, watch } =
    useForm<RegisterFormFields>();
  const [cpf, setCpf] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  useEffect(() => {
    setValue("cpf", cpf);
  }, [cpf]);

  useEffect(() => {
    setValue("cep", cep);
  }, [cep]);

  useEffect(() => {
    birthDate && setValue("birthDate", birthDate);
  }, [birthDate]);

  const onSubmit = async () => {
    await api
      .post("/user", {
        name: getValues("name"),
        surname: getValues("surname"),
        email: getValues("email"),
        cpf: getValues("cpf"),
        birth: getValues("birthDate"),
        address: getValues("address") + ", " + getValues("addressNumber"),
        zip_code: getValues("cep"),
        password: getValues("password"),
      })
      .then((response) => {
        console.log(response);
        navigate("login");
      });
  };

  const name = watch("name");
  const surname = watch("surname");
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");

  useEffect(() => {
    if (page.ACCOUNT) {
      if (
        name &&
        surname &&
        email &&
        confirmEmail &&
        birthDate &&
        email === confirmEmail &&
        verifyCpf(cpf)
      ) {
        if (!readyList.includes(RegisterPageEnum.ACCOUNT)) {
          setReadyList((prevState) => [...prevState, RegisterPageEnum.ACCOUNT]);
        }
      } else {
        const newReadyList = readyList.filter(
          (filter) => filter !== RegisterPageEnum.ACCOUNT
        );
        setReadyList(newReadyList);
      }
    }
  }, [name, surname, email, confirmEmail, cpf, birthDate]);

  const address = watch("address");
  const addressNumber = watch("addressNumber");

  useEffect(() => {
    if (page.ADDRESS) {
      if (cep.length >= 9 && address && addressNumber) {
        if (!readyList.includes(RegisterPageEnum.ADDRESS)) {
          setReadyList((prevState) => [...prevState, RegisterPageEnum.ADDRESS]);
        }
      } else {
        const newReadyList = readyList.filter(
          (filter) => filter !== RegisterPageEnum.ADDRESS
        );
        setReadyList(newReadyList);
      }
    }
  }, [cep, address, addressNumber]);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (page.PASSWORD) {
      if (password.length >= 8 && password === confirmPassword) {
        if (!readyList.includes(RegisterPageEnum.PASSWORD)) {
          setReadyList((prevState) => [
            ...prevState,
            RegisterPageEnum.PASSWORD,
          ]);
        }
      } else {
        const newReadyList = readyList.filter(
          (filter) => filter !== RegisterPageEnum.PASSWORD
        );
        setReadyList(newReadyList);
      }
    }
  }, [password, confirmPassword]);

  return (
    <RegisterContext.Provider
      value={{
        readyList,
        page,
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
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);
