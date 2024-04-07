import dayjs from "dayjs";

export const dateFormatPattern = "YYYY-MM-DD";

export function getStartAndEndOfCurrentMonth() {
  return getStartAndEndMonth(dayjs());
}

export function getStartAndEndOfLastMonth() {
  return getStartAndEndMonth(dayjs().subtract(1, "month"));
}

export function getStartAndEndMonth(date) {
  return [date.startOf("month"), date.endOf("month")];
}
