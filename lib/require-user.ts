import "server-only"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  if (!data?.user) return null

  return data.user
}

export const requireUser = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/")
  }
  return user
}