import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import AdminUser from "@/models/AdminUser";

export const authOptions = {
  providers: [CredentialsProvider({
    name: "Administrator",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      await connectToDatabase();
      const user = await AdminUser.findOne({ email: credentials.email.toLowerCase().trim() }).select("+passwordHash");
      if (!user || !await bcrypt.compare(credentials.password, user.passwordHash)) return null;
      return { id: user._id.toString(), email: user.email, role: "admin" };
    }
  })],
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }) { if (user) { token.role = user.role; token.adminId = user.id; } return token; },
    async session({ session, token }) { if (session.user) { session.user.role = token.role; session.user.id = token.adminId; } return session; }
  },
  secret: process.env.AUTH_SECRET
};
