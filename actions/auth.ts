// actions/auth.ts
'use server'

import { signIn, signOut } from '@/auth'
import AuthError from "next-auth"
import type { ActionResult } from '@/types'

export async function loginAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await signIn('credentials', {
      email:    formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin/dashboard',
    })
    return { success: true, data: undefined }
  } catch (err: any) {
    // err may be an object with a `type` property (e.g. from NextAuth)
    if (err && typeof err === 'object' && 'type' in err) {
      switch (err.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password.' }
        default:
          return { success: false, error: 'Something went wrong. Please try again.' }
      }
    }
    // signIn throws a NEXT_REDIRECT — re-throw so Next.js handles it
    throw err
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: '/admin/login' })
}
