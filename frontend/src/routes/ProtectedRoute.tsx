import { Navigate, Outlet } from "react-router-dom"
import { authClient } from "@/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"

export default function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="h-dvh w-full items-center justify-center">
        <Spinner className="size-10" />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/sign-in" replace />
  }
  return <Outlet />
}
