"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sun, Moon, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const [mounted, setMounted] = React.useState(false)
  
  const headerHeight = useTransform(scrollY, [0, 100], [80, 64])
  const headerPadding = useTransform(scrollY, [0, 100], [24, 16])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.header
      style={{ height: headerHeight }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/55 dark:bg-slate-950/35 backdrop-blur-md border-b border-black/10 dark:border-white/10"
    >
      <motion.div 
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="container mx-auto flex items-center justify-between px-4 lg:px-8 h-full"
      >
        <motion.div style={{ scale: logoScale }}>
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-7 w-7 text-foreground dark:text-white" />
            <span className="font-serif text-xl md:text-2xl font-bold text-foreground dark:text-white tracking-tight">
              Atlas Prime
            </span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground dark:text-white/85 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/#destinations" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground dark:text-white/85 dark:hover:text-white transition-colors"
          >
            Destinations
          </Link>
          <Link 
            href="/#about" 
            className="text-sm font-medium text-foreground/80 hover:text-foreground dark:text-white/85 dark:hover:text-white transition-colors"
          >
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative h-9 w-9 rounded-full text-foreground dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white"
          >
            {mounted && (
              <>
                <Sun className={cn(
                  "h-4 w-4 transition-all",
                  theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                )} />
                <Moon className={cn(
                  "absolute h-4 w-4 transition-all",
                  theme === "dark" ? "-rotate-90 scale-0" : "rotate-0 scale-100"
                )} />
              </>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="/plan">
            <Button className="font-medium bg-[#d6a23a] text-white hover:bg-[#c29031]">
              Plan My Trip
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}
