import ReactGA from "react-ga";

export const GAevent = (categoryName, eventName, label, byDefault) => {
  ReactGA.event({
    category: categoryName, // Required
    action: eventName, // Required
    label: label,
    nonInteraction: byDefault,
  });
};
