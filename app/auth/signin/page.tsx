"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple mock authentication
    if (password === "password123") {
      // Store user in localStorage for demo
      const user = {
        email,
        name: email === "admin@teekart.com" ? "Admin User" : "John Doe",
        role: email === "admin@teekart.com" ? "admin" : "user",
      }
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/")
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your TeeKart account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Email: john@example.com</p>
              <p className="text-xs text-muted-foreground">Password: password123</p>
              <p className="text-xs text-muted-foreground mt-2">Admin: admin@teekart.com / password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
