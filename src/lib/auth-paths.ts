export const LOGIN_PATH = '/login'
export const AUTH_API_PATH = '/api/auth'
export const INNGEST_API_PATH = '/api/inngest'

export function isPublicPath(pathname: string) {
  return [AUTH_API_PATH, INNGEST_API_PATH].some((e) => pathname.startsWith(e))
}

export function isLoginPath(pathname: string) {
  return pathname.startsWith(LOGIN_PATH)
}
