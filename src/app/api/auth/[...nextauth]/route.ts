import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import connectDB from "@/utils/mongodb";
import { verifyPassword } from "@/utils/password";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },

        role: {
          label: "Role",
          type: "text",
        },
      },

      async authorize(credentials) {
        console.log("credentilas", credentials);
        // =====================================================
        // 1. Connect to MongoDB
        // =====================================================
        await connectDB();

        // =====================================================
        // 2. Validate credentials
        // =====================================================
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error("Email, password and role are required");
        }

        // =====================================================
        // 3. Find user by email
        // =====================================================
        const user = await User.findOne({
          email: credentials.email,
        });
        console.log(user);
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // =====================================================
        // 4. Verify password
        // =====================================================
        const isMatched = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isMatched) {
          throw new Error("Invalid email or password");
        }

        // =====================================================
        // 5. Verify selected role
        // =====================================================
        if (credentials.role !== user.role) {
          throw new Error("Invalid role");
        }

        // =====================================================
        // 6. Return authenticated user
        // =====================================================
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // =========================================================
  // SESSION CONFIGURATION
  // =========================================================
  session: {
    strategy: "jwt",
  },

  // =========================================================
  // CALLBACKS
  // =========================================================
  callbacks: {
    // -------------------------------------------------------
    // JWT CALLBACK
    // -------------------------------------------------------
    async jwt({ token, user }) {
      // `user` is available when the user first signs in.
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
      }

      return token;
    },

    // -------------------------------------------------------
    // SESSION CALLBACK
    // -------------------------------------------------------
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        (session.user as any).role = token.role as string;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
