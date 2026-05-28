// /types/next-auth.d.ts

import NextAuth, {
  DefaultSession,
} from "next-auth"

import { DefaultJWT } from "next-auth/jwt"

export type UserRole = "admin"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email?: string
      name?: string
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email?: string
    name?: string
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    email?: string
    name?: string
    role: UserRole
  }
}