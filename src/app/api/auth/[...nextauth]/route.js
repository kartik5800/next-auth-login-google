import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
import { connectionStr } from "@/lib/db";
import { RagisterData } from "@/lib/model/register";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await mongoose.connect(connectionStr);

        const result = await RagisterData.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        // const checkPassword = bcrypt.compareSync(
        //   credentials.password,
        //   result.password
        // );

        // // incorrect password
        // if (!checkPassword || result.email !== credentials.email) {
        //   throw new Error("Username or Password doesn't match");
        // }

        if (
          result.password !== credentials.password ||
          result.email !== credentials.email
        ) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],
  session: {
    // strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
