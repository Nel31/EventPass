import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUser } from "./use-user"

export function useProtectedRoute() {
  const router = useRouter()
  const { user, loading } = useUser()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])
}
