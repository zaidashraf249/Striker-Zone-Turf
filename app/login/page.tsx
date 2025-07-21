"use client"

import type React from "react"

import { useState, useCallback, memo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// Memoized form input component to prevent re-renders
const FormInput = memo(
  ({
    label,
    type,
    placeholder,
    value,
    onChange,
    icon: Icon,
    required = false,
    togglePassword,
    showPassword,
    error,
  }: {
    label: string
    type: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    icon: any
    required?: boolean
    togglePassword?: () => void
    showPassword?: boolean
    error?: string
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-10 ${type === "password" ? "pr-10" : ""} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${label.toLowerCase()}-error` : undefined}
        />
        {type === "password" && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${label.toLowerCase()}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  ),
)

FormInput.displayName = "FormInput"

// Memoized tab button component
const TabButton = memo(
  ({
    id,
    label,
    activeTab,
    onClick,
  }: { id: string; label: string; activeTab: string; onClick: (id: string) => void }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
        activeTab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
      }`}
      aria-pressed={activeTab === id}
    >
      {label}
    </button>
  ),
)

TabButton.displayName = "TabButton"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"

  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  // Check if there's a redirect parameter
  useEffect(() => {
    const signup = searchParams.get("signup")
    if (signup === "true") {
      setActiveTab("signup")
    }
  }, [searchParams])

  // Memoized handlers to prevent re-renders
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
    // Clear errors when switching tabs
    setErrors({})
  }, [])

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const updateFormField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Name validation (only for signup)
    if (activeTab === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }

      // Phone validation (only for signup)
      if (!formData.phone) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Please enter a valid phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, activeTab])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (activeTab === "login") {
          toast({
            title: "Login Successful!",
            description: "Welcome back to Striker Zone.",
          })
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to Striker Zone. Please verify your email.",
          })
        }

        // Use router.push for client-side navigation
        router.push(redirectTo)
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [activeTab, validateForm, toast, router, redirectTo],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">SZ</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-gray-600">
              {activeTab === "login" ? "Sign in to your Striker Zone account" : "Join Striker Zone today"}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <TabButton id="login" label="Login" activeTab={activeTab} onClick={handleTabChange} />
              <TabButton id="signup" label="Sign Up" activeTab={activeTab} onClick={handleTabChange} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "signup" && (
                <>
                  <FormInput
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(value) => updateFormField("name", value)}
                    icon={User}
                    required
                    error={errors.name}
                  />

                  <FormInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(value) => updateFormField("phone", value)}
                    icon={Phone}
                    required
                    error={errors.phone}
                  />
                </>
              )}

              <FormInput
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(value) => updateFormField("email", value)}
                icon={Mail}
                required
                error={errors.email}
              />

              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value) => updateFormField("password", value)}
                icon={Lock}
                required
                togglePassword={togglePassword}
                showPassword={showPassword}
                error={errors.password}
              />

              {activeTab === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      aria-label="Remember me"
                    />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => router.push("/forgot-password")}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {activeTab === "login" ? "Signing In..." : "Creating Account..."}
                  </>
                ) : activeTab === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-transparent">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => handleTabChange("signup")}
                    className="text-green-600 hover:text-green-700 font-medium"
                    type="button"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => handleTabChange("login")}
                    className="text-green-600 hover:text-green-700 font-medium"
                    type="button"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
