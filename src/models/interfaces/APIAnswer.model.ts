export default interface APIAnswer {
  _id: string;
  userId: string;
  userName: string;
  picture: string;
  content: string;
  createdAt: string;
  ownedAt: string;
  upvotes: number;
  likes: number;
  upvoted: boolean;
  liked: boolean;
  commentId: string;
  isReply: boolean;
  replies: APIAnswer[];
}
