import type React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { memo } from "react";

// Memoized link component to prevent re-renders
const FooterLink = memo(
  ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors cursor-pointer"
    >
      {children}
    </Link>
  )
);

FooterLink.displayName = "FooterLink";

// Memoized social icon component
const SocialIcon = memo(({ href, icon: Icon }: { href: string; icon: any }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-5 w-5" />
  </a>
));

SocialIcon.displayName = "SocialIcon";

// Memoized contact item component
const ContactItem = memo(
  ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-green-500 mt-1" />
      <div>{children}</div>
    </div>
  )
);

ContactItem.displayName = "ContactItem";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SZ</span>
              </div>
              <span className="text-xl font-bold">Striker Zone</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Premium turf booking platform offering world-class facilities,
              real-time booking, and exceptional sports experience for players
              of all levels in Nagpur.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={Facebook} />
              <SocialIcon href="#" icon={Twitter} />
              <SocialIcon
                href="https://www.instagram.com/strikers.zone_/"
                icon={Instagram}
              />
              <SocialIcon href="#" icon={Youtube} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/booking">Book Now</FooterLink>
              </li>
              <li>
                <FooterLink href="/gallery">Gallery</FooterLink>
              </li>
              <li>
                <FooterLink href="/pricing">Pricing</FooterLink>
              </li>
              <li>
                <FooterLink href="/dashboard">Dashboard</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Football Turf Booking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Cricket Practice Nets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Corporate Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Tournament Hosting
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Equipment Rental
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Coaching Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <ContactItem icon={MapPin}>
                <p className="text-gray-300">Striker Zone Sports Complex</p>
                <p className="text-gray-300">Nagpur, Maharashtra</p>
              </ContactItem>

              <ContactItem icon={Phone}>
                <p className="text-gray-300">+91 98765 43210</p>
                <p className="text-gray-300">+91 87654 32109</p>
              </ContactItem>

              <ContactItem icon={Mail}>
                <p className="text-gray-300">info@strikezone.com</p>
                <p className="text-gray-300">bookings@strikezone.com</p>
              </ContactItem>

              <ContactItem icon={Clock}>
                <p className="text-gray-300">6:00 AM - 11:00 PM</p>
                <p className="text-gray-300">All Days</p>
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Strike Zone. All rights reserved. |
              Designed for the love of the game.
            </div>
            <div className="flex space-x-6 text-sm">
              <FooterLink href="/terms/privacy-policy">
                Privacy Policy
              </FooterLink>
              <FooterLink href="/terms/terms-of-service">
                Terms of Service
              </FooterLink>
              <FooterLink href="/terms/refund-policy">
              Refund Policy
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
