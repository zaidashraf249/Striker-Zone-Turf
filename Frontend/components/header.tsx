"use client"

import type React from "react"

import { useState, useCallback, memo, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, User } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

// Memoized navigation item to prevent re-renders
const NavItem = memo(({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
  <NavigationMenuItem>
    <Link href={href} passHref legacyBehavior>
      <NavigationMenuLink
        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${isActive ? "bg-gray-100 text-gray-900" : "bg-white text-gray-700"
          }`}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
))

NavItem.displayName = "NavItem"

// Memoized mobile navigation item
const MobileNavItem = memo(
  ({
    href,
    children,
    isActive,
    onClick,
  }: { href: string; children: React.ReactNode; isActive: boolean; onClick: () => void }) => (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer block w-full text-left ${isActive ? "bg-gray-100 font-medium" : ""
        }`}
    >
      {children}
    </Link>
  ),
)

MobileNavItem.displayName = "MobileNavItem"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Call once on load and whenever menu opens (to catch login/logout on another tab)
    setIsAdmin(!!localStorage.getItem("adminToken"));
  }, [isMenuOpen, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    router.push("/login"); // or wherever you want to go after logout
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Toggle menu with memoization
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Navigation items with active state
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Book Now" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ]

  // Mobile navigation items
  const mobileNavItems = [
    ...navItems,
    { href: "/notifications", label: "Notifications" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-200 ${scrolled ? "bg-white/95 shadow-sm" : "bg-white/90"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SZ</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Striker Zone</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} isActive={pathname === item.href}>
                  {item.label}
                </NavItem>
              ))}
              {isAdmin ? (
              <Link href="/admin" passHref legacyBehavior>
                <Button variant="outline" size="sm" asChild>
                  <a>
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </a>
                </Button>
              </Link>
            ) : (
              <></>
            )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link href="/login" passHref legacyBehavior>
                <Button variant="outline" size="sm" asChild>
                  <a>
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </a>
                </Button>
              </Link>
            )}
            <Link href="/booking" passHref legacyBehavior>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <a>Book Now</a>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Only render when open to improve performance */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {mobileNavItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </MobileNavItem>
              ))}
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              )}
              <div className="px-4 py-2 text-sm text-gray-600 flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
