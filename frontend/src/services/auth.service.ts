import { authClient } from "@/lib/auth-client"
import type { SignInForm, SignUpForm } from "@/validators/auth.validator"
import { toast } from "sonner"

export async function signUp(
  signUpData: SignUpForm,
  setIsLoading: (isLoading: boolean) => void,
  onSuccessRedirect?: () => void
) {
  const { data, error } = await authClient.signUp.email(
    {
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    },
    {
      onRequest: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        toast.success("Sign up successful!")
        onSuccessRedirect?.()
      },
      onError: (ctx) => {
        setIsLoading(false)
        console.log("Error signing up:", ctx.error)
        toast.error("Error signing up: " + ctx.error.message)
      },
    }
  )

  return { data, error }
}

export async function signIn(
  signInData: SignInForm,
  setIsLoading: (isLoading: boolean) => void,
  onSuccessRedirect?: () => void
) {
  const { data, error } = await authClient.signIn.email(
    {
      email: signInData.email,
      password: signInData.password,
    },
    {
      onRequest: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        toast.success("Sign in successful!")
        onSuccessRedirect?.()
      },
      onError: (ctx) => {
        setIsLoading(false)
        console.log("Error signing in:", ctx.error)
        toast.error("Error signing in: " + ctx.error.message)
      },
    }
  )

  return { data, error }
}
