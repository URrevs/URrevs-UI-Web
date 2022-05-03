import { APIReview } from "../interfaces/APIReview.model";

export default class Review {
  _id: string;
  user_name: string;
  product: string;
  brand: string;
  pros: string;
  cons: string;
  approved: boolean;
  brand_rating: number = 0;
  date_buy: string;
  date_rev: string;
  user_avatar: string;
  isExpanded: boolean = false;
  isLiked: boolean = false;

  constructor(data: APIReview) {
    this._id = data._id;
    this.user_name = data.user_name;
    this.product = data.product;
    this.brand = data.brand;
    this.pros = data.pros;
    this.cons = data.cons;
    this.approved = data.approved ?? true;
    this.brand_rating = data.brand_rating ?? 0;
    this.date_buy = data.date_buy;
    this.date_rev = data.date_rev;
    this.user_avatar = data.user_avatar;
    this.isExpanded = data.isExpanded ?? false;
  }
}
