import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import AuthService from "@/services/auth";

export const { signIn, handlers, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log(credentials);
          const response = await AuthService.signIn(
            credentials as {
              email: string;
              password: string;
            }
          );
          if (!response?.user) throw new Error("Invalid credentials");
          response.user.token = response.token;
          return response.user;
        } catch (error: any) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any | any }) {
      if (token && user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
  },
  debug: false,
});
