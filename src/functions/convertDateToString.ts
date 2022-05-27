import { formatWithOptions } from "date-fns/fp";
import { ar, enCA } from "date-fns/locale";

export const convertDateToString = (isoString: any, language: string) => {
  try {
    const locale = language === "ar" ? ar : enCA;
    const date = new Date(isoString);

    // transform date to string
    const dateToString = formatWithOptions({ locale: locale }, "d MMMM yyyy");
    const stringDate: string = dateToString(date);

    return stringDate;
  } catch (e) {
    return isoString;
  }
};
