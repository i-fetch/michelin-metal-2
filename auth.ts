// auth.ts  (project root)
import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { AdminModel } from '@/models/Admin'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: { id: string; role: string } & DefaultSession['user']
  }
  interface User {
    role?: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await connectDB()
        const admin = await AdminModel.findOne({ email: credentials.email }).select('+password')
        if (!admin) return null

        const valid = await bcrypt.compare(credentials.password as string, admin.password)
        if (!valid) return null

        return { id: admin._id.toString(), email: admin.email, name: admin.name, role: admin.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id   = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})
