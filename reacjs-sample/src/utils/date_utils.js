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

export const weekDays = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];
export function getWeekDays(now) {
  const currentDate = now;

  // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const currentDayOfWeek = currentDate.day() === 0 ? 7 : currentDate.day();

  // Initialize an array to store all the weekdays
  const allWeekdays = [];

  // Loop through each day of the week starting from Sunday (0) to Saturday (6)
  for (let i = 1; i <= 7; i++) {
    // Calculate the difference in days from the current day of the week
    const difference = i - currentDayOfWeek;

    // Calculate the date by adding the difference to the current date
    const weekday = currentDate.add(difference, "day");

    // Push the formatted date string along with the corresponding weekday name
    allWeekdays.push(weekday.format(dateFormatPattern));
  }

  return allWeekdays;
}

export function getWeekCurrentWeekDays() {
  return getWeekDays(dayjs());
}
