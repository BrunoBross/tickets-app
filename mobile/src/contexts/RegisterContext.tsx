import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import {
  FieldValues,
  UseFormGetValues,
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

  onSubmit: () => void;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

interface ReducerStateInterface {
  account: boolean;
  address: boolean;
  password: boolean;
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
        account: true,
        address: false,
        password: false,
      };
    case RegisterPageEnum.ADDRESS:
      return {
        account: false,
        address: true,
        password: false,
      };
    case RegisterPageEnum.PASSWORD:
      return {
        account: false,
        address: false,
        password: true,
      };
    default:
      return state;
  }
};

const initialValues: ReducerStateInterface = {
  account: true,
  address: false,
  password: false,
};

const RegisterContext = createContext({} as RegisterContextInterface);

export default function RegisterProvider(props: RegisterProviderProps) {
  const { children } = props;
  const [page, setPage] = useReducer(reducer, initialValues);
  const [readyList, setReadyList] = useState<RegisterPageEnum[]>([]);

  const { handleSubmit, getValues, setValue } = useForm();

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
        setValue,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);
