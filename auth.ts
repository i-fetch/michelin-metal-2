// auth.ts  (project root)
import type { NextAuthOptions } from "next-auth";
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { User } from "./models/User";

export const authOptions: NextAuthOptions = {  
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await connectDB()
        const user = await User.findOne({ email: credentials.email }).select('+password')
        if (!user) return null

        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if (!valid) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          role: user.role
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.role = token.role as "admin";
      }
      return session
    },
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.AUTH_SECRET,
}
