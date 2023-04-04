import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import Account from "../components/register/Account";
import Info from "../components/register/Info";
import Password from "../components/register/Password";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "account":
      return {
        account: true,
        info: false,
        password: false,
      };
    case "info":
      return {
        account: false,
        info: true,
        password: false,
      };
    case "password":
      return {
        account: false,
        info: false,
        password: true,
      };
    default:
      return state;
  }
};

const initialValues = {
  account: true,
  info: false,
  password: false,
};

export default function Register() {
  const { goBack } = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialValues);

  const { handleSubmit, getValues, setValue } = useForm();

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <View className="flex-1 bg-background">
      {state.account && (
        <Account
          setValue={setValue}
          getValues={getValues}
          dispatch={dispatch}
          goBack={goBack}
        />
      )}
      {state.info && (
        <Info setValue={setValue} getValues={getValues} dispatch={dispatch} />
      )}
      {state.password && (
        <Password
          setValue={setValue}
          getValues={getValues}
          dispatch={dispatch}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </View>
  );
}
