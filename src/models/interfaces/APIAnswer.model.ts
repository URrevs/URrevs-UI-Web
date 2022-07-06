export default interface APIAnswer {
  _id: string;
  id: string;
  userId: string;
  userName: string;
  picture: string;
  userPicture: string;
  content: string;
  createdAt: string;
  ownedAt: string;
  upvotes: number;
  likes: number;
  upvoted: boolean;
  isAccepted: boolean;
  liked: boolean;
  commentId: string;
  isReply: boolean;
  acceptedReply: boolean;
  replies: APIAnswer[];
}
