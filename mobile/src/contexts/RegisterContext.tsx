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
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";

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
  getValues: UseFormGetValues<RegisterFormFields>;
  setValue: UseFormSetValue<RegisterFormFields>;
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
  const [page, setPage] = useReducer(reducer, initialValues);
  const [readyList, setReadyList] = useState<RegisterPageEnum[]>([]);

  const { handleSubmit, register, getValues, setValue, watch } =
    useForm<RegisterFormFields>();

  const name = watch("name");
  const surname = watch("surname");
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");

  useEffect(() => {
    if (page.ACCOUNT) {
      if (name && surname && email && confirmEmail && email === confirmEmail) {
        if (!readyList.includes(RegisterPageEnum.ACCOUNT)) {
          setReadyList((prevState) => [...prevState, RegisterPageEnum.ACCOUNT]);
        }
      } else {
        const newReadyList = readyList.filter(
          (filter) => filter !== RegisterPageEnum.ACCOUNT
        );
        setReadyList(newReadyList);
      }
      console.log(readyList);
    }
  }, [name, surname, email, confirmEmail]);

  const onSubmit = () => {
    handleSubmit(() => {
      console.log("oi");
    });
  };

  return (
    <RegisterContext.Provider
      value={{
        readyList,
        page,
        setPage,
        onSubmit,
        getValues,
        register,
        setValue,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);
