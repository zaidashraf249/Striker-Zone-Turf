// components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+, otherwise use react-router-dom for CRA

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Check for admin token in localStorage
    const token = localStorage.getItem("adminToken");
    if (!token) {
      // Not authenticated: redirect to login
      router.push("/login");
    }
    // Optionally: You can validate token with backend for better security
  }, [router]);

  return <>{children}</>;
}
