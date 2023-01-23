export interface IUser {
  username: string;
  email: string;
  password?: string;
  location?: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  firstname: String; // firstName
  lastname: String; // lastName
  bio: String; // A new bio
  dob: String; // 23rd july 2018
  profile_pic: String | null;
  lastLogin: String | null;
}