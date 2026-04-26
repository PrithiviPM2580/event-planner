import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:3000", // your frontend origin
    "http://localhost:5173", // if using Vite dev server
  ],
  advanced: {
    disableCSRFCheck: process.env.NODE_ENV === "development" ? true : false, // ONLY for development/testing!
  },
});
