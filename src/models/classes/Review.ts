import { APIReview } from "../interfaces/APIReview.model";

export default class Review {
  id: string;
  type: string;
  targetId: string;
  targetName: string;
  userId: string;
  userName: string;
  photo: string;
  createdAt: string;
  views: number;
  likes: number;
  commentsCount: number;
  shares: number;
  ownedAt: string;
  generalRating: number;
  uiRating: number;
  manufacturingQuality: number;
  valueForMoney: number;
  camera: number;
  callQuality: number;
  battery: number;
  pros: string;
  cons: string;
  liked: boolean;
  isExpanded: boolean = false;

  constructor(data: APIReview) {
    this.id = data._id;
    this.type = data.type;
    this.targetId = data.targetId;
    this.targetName = data.targetName;
    this.userId = data.userId;
    this.userName = data.userName;
    this.photo = data.photo;
    this.createdAt = data.createdAt;
    this.views = data.views;
    this.likes = data.likes;
    this.commentsCount = data.commentsCount;
    this.shares = data.shares;
    this.ownedAt = data.ownedAt;
    this.generalRating = data.generalRating;
    this.uiRating = data.uiRating;
    this.manufacturingQuality = data.manufacturingQuality;
    this.valueForMoney = data.valueForMoney;
    this.camera = data.camera;
    this.callQuality = data.callQuality;
    this.battery = data.battery;
    this.pros = data.pros;
    this.cons = data.cons;
    this.liked = data.liked;
  }
}
