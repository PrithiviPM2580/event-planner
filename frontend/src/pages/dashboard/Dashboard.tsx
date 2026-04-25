import { useAuth } from "@/context/auth-context"

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div>
      Dashboard {user?.email} :{user?.name}
    </div>
  )
}
