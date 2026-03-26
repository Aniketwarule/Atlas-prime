"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/plan${searchQuery ? `?destination=${encodeURIComponent(searchQuery)}` : ''}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/main-image.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/45 to-black/65 dark:from-black/35 dark:via-black/50 dark:to-black/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,0.14),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-linear-to-b from-transparent via-[#0d1b30]/45 to-[#0d1b30]/78 dark:via-[#0d1b30]/60 dark:to-[#0d1b30]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight text-balance mb-4"
          >
            Discover the World,
            <span className="block font-serif italic text-[#d6a23a] text-6xl md:text-7xl lg:text-8xl font-semibold mt-1 md:mt-2">
              Your Way.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-[1.2rem] text-white/80 mb-14 text-pretty max-w-2xl mx-auto leading-snug"
          >
            Premium curated itineraries tailored to your unique travel style, budget, and companions.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto rounded-full border border-white/16 bg-[#172437]/75 dark:bg-[#172437]/88 p-1.5 backdrop-blur-lg shadow-[0_24px_50px_-22px_rgba(0,0,0,0.9)]"
          >
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 md:h-13 border-0 bg-transparent pl-12 text-base text-white placeholder:text-white/50 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 md:h-13 rounded-full bg-[#3e67c8] px-10 text-base font-semibold text-white hover:bg-[#3559ab]">
              <Search className="h-5 w-5 mr-2" />
              Start Planning
            </Button>
          </motion.form>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/45 rounded-full flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-2.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
