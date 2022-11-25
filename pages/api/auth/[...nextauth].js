import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../model/Schema";
import connectMongo from "../../../database/conn";
import md5 from "md5";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...";
        });

        //check user credentials
        const result = await Users.findOne({ email: credentials.email });
        if (!result) throw new Error("No user found with email");

        //compare
        const checkPassword = md5(credentials.password).localeCompare(
          result.password
        );
        if (checkPassword !== 0 || result.email !== credentials.email) {
          throw new Error("Invalid credentials. Please try again");
        }
        return result;
      },
    }),
  ],
  secret: "nVdNvUzB97IHOYQUkoHOSBaICXRfpX9Zt/HyAtc3oTQ=", // to prevent warning in console
});
