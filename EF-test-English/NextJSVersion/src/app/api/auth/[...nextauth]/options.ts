import { getAdmin } from "@/lib/server-actions/admins";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "Your email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const admin = await getAdmin(credentials.email, credentials.password);
        if (admin) {
          return admin;
        }
        return null;
      },
    }),
  ],
};
