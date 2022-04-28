import { addYears, formatDistance, subDays } from "date-fns";
import { formatWithOptions } from "date-fns/fp";
import { ar, en } from "date-fns/locale";

export const useConvertDateToString = (isoString) => {
  console.log(isoString);
  
  const date = new Date(isoString);

  // transform date to string
  const dateToString = formatWithOptions({ locale: ar }, "d MMMM yyyy");
  const stringDate = dateToString(date);

  return stringDate;
};
