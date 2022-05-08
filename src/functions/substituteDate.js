import { formatDistance } from "date-fns";
import { enCA, ar } from "date-fns/locale";

export const substituteDate = (isoString, language = "en") => {
  const locale = language === "ar" ? ar : enCA;

  const date = new Date(isoString);

  // used for
  const usedFor = formatDistance(date, new Date(), {
    addSuffix: false,
    locale: locale,
  });
  return usedFor;
};
