import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";

interface UseDatePickerProps {
  setDate: (date: Date) => void;
}

export default function useDatePicker(props: UseDatePickerProps) {
  const { setDate } = props;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [today] = useState(new Date());
  const [maximumDate] = useState(
    new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
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
    if (selectedDate && event.type === "set") {
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
