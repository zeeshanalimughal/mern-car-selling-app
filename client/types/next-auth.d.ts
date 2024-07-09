import NextAuth from "next-auth";

type UserType = {
  id?: string;
  email: string;
  name: string;
  token?: string;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType;
  }
}
