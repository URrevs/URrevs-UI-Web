import { formatDistance } from "date-fns";

const useSubstituteDate = (isoString) => {
    const date = new Date(isoString);

  // used for
  const usedFor = formatDistance(date, new Date(), {
    addSuffix: false,
    locale: en,
  });
  return usedFor;
};
