import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      password: string;
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
      followers: any;
      following: any;
      requests: any;
    } & DefaultSession["user"]
  }
}