import APIUser from "../interfaces/APIUser.model";

export default class User {
  isLoggedIn: boolean = false;
  uid: string;
  refCode: string;
  photo: string;
  apiToken: string = "";
  name: string;
  accessToken: string = "";
  refreshToken: string = "";
  email: string = "";
  points: number = 0;
  isAdmin: boolean = false;
  expiration: number;
  refetch: boolean = false;
  requestedDelete: boolean = false;

  constructor(data: APIUser) {
    this.uid = data._id;
    this.refCode = data.refCode;
    this.photo = data.picture;
    this.name = data.name;
    this.points = data.points;
    this.expiration = data.exp;
  }
}
