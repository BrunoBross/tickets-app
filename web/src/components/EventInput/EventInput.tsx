import { Heading, Input, InputGroup } from "@chakra-ui/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface EventInput {
  inputName: string;
  placeholder: string;
  registerName: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
}

export default function EventInput(props: EventInput) {
  const {
    inputName,
    placeholder,
    registerName,
    type = "text",
    register,
  } = props;
  return (
    <InputGroup display="flex" flexDir="column" h="5.5rem" gap="0.5rem">
      <Heading display="flex" size="md" gap="0.5rem" alignItems="flex-start">
        {inputName}
        <span style={{ color: "red" }}>*</span>
      </Heading>
      <Input
        type={type}
        borderColor="blue.500"
        borderWidth="2px"
        size="lg"
        placeholder={placeholder}
        {...register(registerName)}
      />
    </InputGroup>
  );
}
