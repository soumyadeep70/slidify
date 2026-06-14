import { auth } from '#/lib/auth'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleWare = createMiddleware({ type: 'request' }).server(
  async ({ request, next }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session) throw new Error('Unauthorized access')
    return next({ context: { session } })
  },
)
