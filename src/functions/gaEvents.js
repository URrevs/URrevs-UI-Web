import ReactGA from "react-ga";

export const GAevent = (categoryName, eventName, label, byDefault) => {
  ReactGA.event({
    category: eventName, // Required
    action: eventName, // Required
    label: label,
    nonInteraction: byDefault,
  });
};
