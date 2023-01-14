export default function formatTime(date: number) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return Intl.DateTimeFormat(undefined, dateOptions).format(new Date(date));
}