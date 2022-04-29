import { addYears, formatDistance, subDays } from "date-fns";
import { formatWithOptions } from "date-fns/fp";
import { ar, en, enCA } from "date-fns/locale";
import { useAppSelector } from "../store/hooks";

export const useConvertDateToString = (isoString) => {
  const language = useAppSelector((state) => state.language.language);

  const locale = language === "ar" ? ar : enCA;
  const date = new Date(isoString);

  // transform date to string
  const dateToString = formatWithOptions({ locale: locale }, "d MMMM yyyy");
  const stringDate = dateToString(date);

  return stringDate;
};
