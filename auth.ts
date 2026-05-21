import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import Admin from '@/models/Admin'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages:   { signIn: '/admin/login' },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await connectDB()
        const admin = await Admin.findOne({ email: credentials.email }).lean() as any

        if (!admin) return null
        if (admin.role !== 'admin') return null

        const valid = await bcrypt.compare(credentials.password as string, admin.password)
        if (!valid) return null

        return { id: admin._id.toString(), email: admin.email, role: admin.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role
      return session
    },
  },
})
