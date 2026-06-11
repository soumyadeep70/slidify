import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '#/components/auth/login-page'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginComponent,
})

function LoginComponent() {
  const { redirect } = Route.useSearch()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginPage redirectTo={redirect}/>
      </div>
    </div>
  )
}
