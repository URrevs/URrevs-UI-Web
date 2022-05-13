export default interface APIComment {
  _id: string;
  userId: string;
  userName: string;
  userPicture: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  replies: APIComment[];
}
