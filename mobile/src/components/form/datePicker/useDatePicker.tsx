import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";

interface HandleChangeDateProps {
  setDate: (date: Date) => void;
  event: any;
  selectedDate?: Date;
}

interface UseDatePickerProps {
  setDate: (date: Date) => void;
}

export default function useDatePicker(props: UseDatePickerProps) {
  const { setDate } = props;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const today = new Date();
  const maximumDate: Date = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const handleFormatDate = (date: Date): string => {
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setIsDatePickerOpen(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return {
    isDatePickerOpen,
    setIsDatePickerOpen,
    maximumDate,
    handleFormatDate,
    handleChangeDate,
  };
}
