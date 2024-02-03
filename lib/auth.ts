import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PROD_URL } from "./api";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ user }) {
      await fetch(`${PROD_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          profileImage: user.image,
        }),
      });

      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        picture: user?.image,
      };
    },
  },
};
