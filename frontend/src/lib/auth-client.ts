import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  // Use explicit backend URL in dev when env is missing.
  baseURL: import.meta.env.VITE_BASE_URL ?? "http://localhost:3000",
})
