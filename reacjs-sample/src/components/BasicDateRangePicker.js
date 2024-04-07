import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function BasicDateRangePicker({ start, end, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        value={[start, end]}
        onChange={onChange}
        localeText={{ start: "Bắt đầu", end: "Kết thúc" }}
      />
    </LocalizationProvider>
  );
}
