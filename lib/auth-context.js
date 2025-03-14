"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname === "/login" || pathname === "/signup" || pathname === "/"

      if (!user && pathname.startsWith("/dashboard")) {
        router.push("/login")
      } else if (user && isAuthRoute) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email, password) => {
    const storedCredentialsJson = localStorage.getItem("user_credentials")

    if (!storedCredentialsJson) {
      throw new Error("No registered users found. Please sign up first.")
    }

    const storedCredentials = JSON.parse(storedCredentialsJson)
    const matchedUser = storedCredentials.find((cred) => cred.email === email && cred.password === password)

    if (!matchedUser) {
      throw new Error("Invalid email or password")
    }

    const loggedInUser = {
      id: email,
      name: matchedUser.name,
      email: email,
    }

    localStorage.setItem("current_user", JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  const signup = async (name, email, password) => {
    const storedCredentialsJson = localStorage.getItem("user_credentials")
    const storedCredentials = storedCredentialsJson ? JSON.parse(storedCredentialsJson) : []

    if (storedCredentials.some((cred) => cred.email === email)) {
      throw new Error("Email already registered")
    }

    const newCredentials = [...storedCredentials, { name, email, password }]
    localStorage.setItem("user_credentials", JSON.stringify(newCredentials))

    const newUser = {
      id: email,
      name,
      email,
    }

    localStorage.setItem("current_user", JSON.stringify(newUser))
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem("current_user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
