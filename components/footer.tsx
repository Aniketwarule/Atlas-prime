import Link from "next/link"
import { Compass } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Compass className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold text-foreground">
                Atlas Prime
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Your trusted partner in crafting unforgettable travel experiences. 
              We curate personalized itineraries that transform your travel dreams into reality.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/plan" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Plan Your Trip
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>info@atlasprime.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon - Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Atlas Prime. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
