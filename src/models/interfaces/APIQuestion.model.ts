import APIAnswer from "./APIAnswer.model";

export interface APIQuestion {
  _id: string;
  type: string;
  userId: string;
  createdAt: string;
  targetId: string;
  targetName: string;
  content: string;
  upvotes: number;
  ansCount: number;
  shares: number;
  upvoted: boolean;
  acceptedAns: APIAnswer;
}
