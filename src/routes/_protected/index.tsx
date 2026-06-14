import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1>Hello</h1>
    </div>
  )
}
