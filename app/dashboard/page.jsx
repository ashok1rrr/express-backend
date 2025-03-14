"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast("You have been logged out successfully")
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4 flex gap-2">
        <ThemeToggle />
        <Button variant="outline" size="icon" onClick={handleLogout} className="w-9 h-9">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Hi {user.name}!</h1>
            <p className="text-muted-foreground">You have successfully logged in to your account.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
