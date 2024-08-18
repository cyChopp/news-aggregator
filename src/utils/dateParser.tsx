import { format } from "date-fns";

export const dateParser = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
