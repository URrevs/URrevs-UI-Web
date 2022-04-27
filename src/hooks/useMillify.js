import { useAppSelector } from "../store/hooks";
import millify from "millify";

export const useConvertNumberToHumanLanguage = (number) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const units = [
    "",
    textContainer.short_thousands,
    textContainer.short_millions,
    textContainer.short_billions,
  ];

  return millify(number, {
    units: units,
    space: true,
  });
};
