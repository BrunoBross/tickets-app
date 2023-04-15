import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useDatePicker from "./useDatePicker";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface DatePickerInputProps {
  title: string;
  date: Date | null;
  setDate: (date: Date) => void;
  error: FieldError | undefined;
}

export function DatePickerInput(props: DatePickerInputProps) {
  const { title, date, setDate, error } = props;
  const {
    isDatePickerOpen,
    setIsDatePickerOpen,
    maximumDate,
    handleFormatDate,
    handleChangeDate,
  } = useDatePicker({ setDate });

  return (
    <View>
      <Text className="text-zinc-500 text-base font-semibold mb-2">
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className={clsx(
          "flex-row h-14 p-3 mb-2 items-center justify-between text-white text-base bg-zinc-900 border-2 rounded-md",
          {
            ["border-zinc-800 focus:border-green-600"]: !error?.message,
            ["border-red-600 focus:border-red-600"]: error?.message,
          }
        )}
        onPress={() => setIsDatePickerOpen(true)}
      >
        {date ? (
          <Text className="text-white text-lg">{handleFormatDate(date)}</Text>
        ) : (
          <Text className="text-zinc-500 text-lg">
            {handleFormatDate(maximumDate)}
          </Text>
        )}
      </TouchableOpacity>
      {isDatePickerOpen && (
        <DateTimePicker
          locale="pt"
          value={date ? date : maximumDate}
          mode="date"
          dateFormat="day month year"
          display="spinner"
          maximumDate={maximumDate}
          onChange={handleChangeDate}
        />
      )}
      {error?.message && (
        <Text className="text-red-600 text-base font-semibold mb-2">
          {error?.message}
        </Text>
      )}
    </View>
  );
}
