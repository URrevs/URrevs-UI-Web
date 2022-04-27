import arDictionary from "./Translations/ar.json";
import enDictionary from "./Translations/en.json";

export default interface Dictionary {
  urrevs: string;
  generalProductRating: string;
  userInterface: string;
  manufacturingQuality: string;
  priceQuality: string;
  camera: string;
  callsQuality: string;
  battery: string;
  pros: string;
  cons: string;
  like: string;
  liked: string;
  comment: string;
  share: string;
  seeMore: string;
  seeLess: string;
  iDontLikeThis: string;
  reply: string;
  price: string;
  manufacturingCompany: string;
  releaseDate: string;
  productDimensions: string;
  networkType: string;
  productWeight: string;
  simCard: string;
  displayType: string;
  displaySize: string;
  displayResolution: string;
  screenProtection: string;
  operatingSystem: string;
  chipset: string;
  CPU: string;
  GPU: string;
  externalMemory: string;
  internalMemory: string;
  mainCamera: string;
  frontCamera: string;
  loudSpeakers: string;
  wlan: string;
  bluetooth: string;
  GPS: string;
  NFC: string;
  radio: string;
  USB: string;
  sensors: string;
  charging: string;
  moreComments: string;
  jack3_5: string;
  egyptianPound: string;
  productName: string;
  productImage: string;
  companyRating: string;
  vote: string;
  answer: string;
  usedThisProductFor: string;
  acceptAnswer: string;
  acceptedAnswer: string;
  moreAnswers: string;
  usedThisFor: string;
  brandBriefing: string;
  googleAuth: string;
  facebookAuth: string;
  homeNavBarItem: string;
  AddNavBarItem: string;
  categoryNavBarItem: string;
  leaderboardNavBarItem: string;
  menuNavBarItem: string;
  smartphone: string;
  company: string;
  tabBarReviews: string;
  tabBarSpecs: string;
  tabBarReview: string;
  tabBarQuestion: string;
  tabBarQuestionsAndAnswers: string;
  search: string;
  short_thousands: string;
  short_millions: string;
  short_billions: string;
}

interface FullDictionary {
  ar: Dictionary;
  en: Dictionary;
}

export const text: FullDictionary = {
  ar: arDictionary,
  en: enDictionary,
};
