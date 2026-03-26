"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TripForm } from "@/components/trip-form"
import { LoadingAnimation } from "@/components/loading-animation"
import { ItineraryDisplay } from "@/components/itinerary-display"
import { TripInput, Itinerary } from "@/lib/types"
import { generateItinerary } from "@/lib/mock-data"

type ViewState = 'form' | 'loading' | 'results'

export default function PlanPage() {
  const searchParams = useSearchParams()
  const initialDestination = searchParams.get('destination') || ''
  
  const [viewState, setViewState] = React.useState<ViewState>('form')
  const [itinerary, setItinerary] = React.useState<Itinerary | null>(null)

  const handleFormSubmit = (data: TripInput) => {
    setViewState('loading')
    
    // Simulate API call with 3 second delay
    setTimeout(() => {
      const generatedItinerary = generateItinerary(data)
      setItinerary(generatedItinerary)
      setViewState('results')
    }, 3000)
  }

  const handleEdit = () => {
    setViewState('form')
    setItinerary(null)
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Ambient background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header />
        
        <div className="flex-1 pt-24 pb-16 flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <AnimatePresence mode="wait">
            {viewState === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-6 tracking-tight drop-shadow-sm">
                    Plan Your Perfect Trip
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed">
                    Tell us about your dream journey, and we&apos;ll craft a personalized 
                    itinerary tailored to your preferences.
                  </p>
                </div>
                
                <div className="bg-background/40 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-black/20 rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 w-full max-w-3xl mx-auto">
                    <TripForm 
                      initialDestination={initialDestination}
                      onSubmit={handleFormSubmit} 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {viewState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="py-12"
              >
                <LoadingAnimation />
              </motion.div>
            )}

            {viewState === 'results' && itinerary && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-10">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Your Curated Itinerary
                  </h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Here&apos;s your personalized travel plan. Review the details, 
                    make adjustments, or proceed to booking.
                  </p>
                </div>
                
                <ItineraryDisplay 
                  itinerary={itinerary} 
                  onEdit={handleEdit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
