import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'
import LoginPage from '#/components/auth/login-page'
import { z } from 'zod'
import { getSession } from '#/lib/auth.functions'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    try {
      await getSession()
      throw redirect({ to: search.redirect ?? '/' })
    } catch (error) {
      if (isRedirect(error)) throw error
      return
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const search = Route.useSearch()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginPage redirectTo={search.redirect} />
      </div>
    </div>
  )
}
