import { formatDistance } from "date-fns";
import { enCA, ar } from "date-fns/locale";
import { useAppSelector } from "../store/hooks";

export const useSubstituteDate = (isoString) => {
  const language = useAppSelector((state) => state.language.language);
  const locale = language === "ar" ? ar : enCA;

  const date = new Date(isoString);

  // used for
  const usedFor = formatDistance(date, new Date(), {
    addSuffix: false,
    locale: locale,
  });
  return usedFor;
};
