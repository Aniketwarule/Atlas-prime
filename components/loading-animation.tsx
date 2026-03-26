"use client"

import { motion } from "framer-motion"
import { Plane } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const loadingMessages = [
  "Discovering hidden gems...",
  "Crafting your perfect itinerary...",
  "Finding the best experiences...",
  "Calculating optimal routes...",
  "Selecting top recommendations...",
]

export function LoadingAnimation() {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      {/* Animated Plane */}
      <div className="relative h-40 mb-8">
        {/* Flight Path */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 120"
          fill="none"
        >
          <motion.path
            d="M 40 80 Q 120 20, 200 60 Q 280 100, 360 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 4"
            className="text-border"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Animated Plane */}
        <motion.div
          className="absolute"
          initial={{ left: "10%", top: "60%", rotate: -20 }}
          animate={{
            left: ["10%", "30%", "50%", "70%", "90%"],
            top: ["60%", "15%", "45%", "75%", "25%"],
            rotate: [-20, -35, 10, 25, -15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Plane className="h-8 w-8 text-primary" />
        </motion.div>

        {/* Globe/Dots Background */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 10}%`,
              top: `${30 + Math.sin(i) * 30}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
          Planning Your Journey
        </h2>
        <motion.p
          className="text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </motion.p>
      </motion.div>

      {/* Skeleton Itinerary Preview */}
      <div className="bg-card border border-border rounded-xl p-6 text-left">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
