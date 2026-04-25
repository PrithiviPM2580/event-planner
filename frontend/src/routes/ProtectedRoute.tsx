import { Navigate, Outlet } from "react-router-dom"
import { authClient } from "@/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"

export default function ProtectedRoute() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2" />
    )
  }

  if (!session?.user) {
    return <Navigate to="/sign-in" replace />
  }
  return <Outlet />
}
