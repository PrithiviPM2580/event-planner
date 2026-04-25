import { createContext, useContext } from "react"
import type { User } from "better-auth"
import type { SignInForm, SignUpForm } from "@/validators/auth.validator"
import { authClient } from "@/lib/auth-client"
import { createAuthClient } from "better-auth/react"
import { Spinner } from "@/components/ui/spinner"
const { useSession } = createAuthClient()

export interface AuthContextType {
  user: User | null
  signup: (
    formData: SignUpForm,
    setIsLoading: (isLoading: boolean) => void,
    navigate: (path: string) => void
  ) => Promise<void>
  login: (
    formData: SignInForm,
    setIsLoading: (isLoading: boolean) => void,
    navigate: (path: string) => void
  ) => Promise<void>
  logout: (navigate: (path: string) => void) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  const user = session?.user ?? null

  const signup: AuthContextType["signup"] = async (
    formData,
    setIsLoading,
    navigate
  ) => {
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: async () => {
          setIsLoading(false)
          navigate("/dashboard")
        },
        onError: (ctx) => {
          setIsLoading(false)
          alert(ctx.error.message)
        },
      }
    )
  }

  const login: AuthContextType["login"] = async (
    formData,
    setIsLoading,
    navigate
  ) => {
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: async () => {
          setIsLoading(false)
          navigate("/dashboard")
        },
        onError: (ctx) => {
          setIsLoading(false)
          alert(ctx.error.message)
        },
      }
    )
  }

  const logout: AuthContextType["logout"] = async (navigate) => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => navigate("/sign-in"),
      },
    })
  }

  if (isPending) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <Spinner className="size-10" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
