import { Control, Controller, FieldError } from "react-hook-form";
import { Input, InputProps } from "./Input";

interface ControlledInputProps extends InputProps {
  title: string;
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
}

export function ControlledInput(props: ControlledInputProps) {
  const { title, name, control, error, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          title={title}
          onChangeText={onChange}
          value={value}
          error={error}
          {...rest}
        />
      )}
    />
  );
}
