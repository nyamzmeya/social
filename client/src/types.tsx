export interface IPost {
  _id: string;
  content: string;
  author: string;
  image: string;
  createdAt: Date;
}


export interface IUser {
  _id: string;
  username: string;
  email: string;
  firstName: string,
  lastName: string,
  profilePicture: string;
  education: string,
  home: string,
  password: string;
  friends: Array<string>;
  posts: Array<IPost>;
}

export interface LoginProps {
  email: string;
  password: string;
}


