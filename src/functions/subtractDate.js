import { formatDistanceStrict } from "date-fns";
import { enCA, ar } from "date-fns/locale";

export const subtractDate = (
  isoString,
  language = "en",
  subtractedDate = Date.now()
) => {
  const locale = language === "ar" ? ar : enCA;

  const date = new Date(isoString);
  // used for
  const usedFor = formatDistanceStrict(date, subtractedDate, {
    addSuffix: false,
    locale: locale,
  });
  return usedFor;
};
