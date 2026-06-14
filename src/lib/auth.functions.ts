import { createServerFn } from '@tanstack/react-start'
import { authMiddleWare } from '#/middlewares/auth'

export const getSession = createServerFn({ method: 'GET' })
  .middleware([authMiddleWare])
  .handler(async ({ context }) => {
    return context.session
  })
