export interface Review {
  _id: string;
  user_name: string;
  brand: string;
  product: string;
  rating: 1;
  pros: string;
  cons: string;
  ratings: {};
  approved: boolean;
  brand_rating: number;
  brand_pros: string;
  brand_cons: string;
  date_buy: string;
  date_rev: string;
  isExpanded: boolean;
  user_avatar: string;
}
