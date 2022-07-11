import {
  addListener,
  launch,
  stop,
  clear,
  removeListener,
} from "devtools-detector";

export const detectDeviceType = () => {
  // // check devtools is opened
  // let o;
  // // 1. add listener
  // addListener((isOpen) => (o = isOpen));

  // launch();
  // console.log(o);
  // removeListener();
  // stop();

  // if (o) return "mobile";
  
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};
