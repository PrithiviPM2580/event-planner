import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2" />
    )
  }
  return <div>Dashboard</div>
}
