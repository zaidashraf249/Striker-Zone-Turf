"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react"; // Eye icon for password toggle
import axios from "axios";

// Example admin credentials
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "password123";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Treat email as username
    const payload = {
      username: email, // from your form state
      password: password // from your form state
    };

    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/login`, payload);

    if (res.data && res.data.token) {
      // Store admin login state & token
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("adminToken", res.data.token);

      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });

      router.push("/admin");
    } else {
      toast({
        title: "Login Failed",
        description: res.data?.error || "Invalid username or password.",
        variant: "destructive",
      });
    }
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.response?.data?.error || "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
        aria-label="Admin Login Form"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {/* Email Input */}
        <label htmlFor="email" className="block mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@example.com"
        />

        {/* Password Input with Eye Icon */}
        <label htmlFor="password" className="block mb-2 font-medium">
          Password
        </label>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-3 py-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}