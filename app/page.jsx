import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className = "flex min-h-screen flex-col items-center justify-center p-4 bg-background">
    <div className = "absolute top-4 right-4 flex gap-2">
              <ThemeToggle />
    </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Frontend Developer Assignment</CardTitle>
          <CardDescription>Authentication system with protected dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This application demonstrates a complete authentication system with JWT tokens, protected routes, and a
            dashboard.
          </p>
          <div className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
