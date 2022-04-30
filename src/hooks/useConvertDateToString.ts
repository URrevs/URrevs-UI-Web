import { formatWithOptions } from "date-fns/fp";
import { ar, enCA } from "date-fns/locale";
import { useAppSelector } from "../store/hooks";

export const useConvertDateToString = (isoString: any) => {
  const language = useAppSelector((state) => state.language.language);

  const locale = language === "ar" ? ar : enCA;
  const date = new Date(isoString);

  // transform date to string
  const dateToString = formatWithOptions({ locale: locale }, "d MMMM yyyy");
  const stringDate: string = dateToString(date);

  return stringDate;
};
