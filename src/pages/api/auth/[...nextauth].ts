import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../backend/database/configs/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import CreateLife from "../../../backend/services/CreateLife";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
      async session(data) {
        const { user } = data;
        await CreateLife.execute({ user });
        return data.session;
      },
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
  });
}
