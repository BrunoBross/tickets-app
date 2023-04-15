import { Control, Controller, FieldError } from "react-hook-form";
import { InputProps } from "./Input";
import { DatePickerInput } from "./datePicker/DatePickerInput";

interface ControlledInputProps extends InputProps {
  title: string;
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
}

export function ControlledDateInput(props: ControlledInputProps) {
  const { title, placeholder, name, control, error, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DatePickerInput
          title="Data de nascimento"
          date={value}
          setDate={onChange}
          error={error}
        />
      )}
    />
  );
}
