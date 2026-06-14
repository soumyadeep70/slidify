import { Navbar } from '#/components/navbar'
import { getSession } from '#/lib/auth.functions'
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    try {
      const session = await getSession()
      return { user: session.user }
    } catch {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: App,
})

function App() {
  return (
    <div>
      <Navbar />
      <main className="pt-24 pb-12 px-4">
        <Outlet />
      </main>
    </div>
  )
}
