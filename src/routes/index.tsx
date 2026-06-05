import { Label } from '#/components/ui/label'
import { Switch } from '#/components/ui/switch'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <div className="flex items-center space-x-2">
        <Switch id="switch"/>
        <Label htmlFor="switch">Toggle it!</Label>
      </div>
    </div>
  )
}
