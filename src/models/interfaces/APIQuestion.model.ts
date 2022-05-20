export interface APIQuestion {
  _id: string;
  type: string;
  phoneId: string;
  phoneName: string;
  userId: string;
  userName: string;
  photo: string;
  views: number;
  likes: number;
  commentsCount: number;
  shares: number;
  createdAt: string;
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
}
