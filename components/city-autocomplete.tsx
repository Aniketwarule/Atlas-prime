"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface CityAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  id?: string
}

export function CityAutocomplete({ value, onChange, placeholder, id }: CityAutocompleteProps) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<{ display_name: string }[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchGooglePlaces = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        return
      }
      setIsLoading(true)

      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
        // Using the New Places API over REST
        const url = "https://places.googleapis.com/v1/places:searchText"
        const requestBody = {
          textQuery: query,
          includedType: "locality", // restricts results to cities, towns, etc.
        }

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
          },
          body: JSON.stringify(requestBody),
        })

        if (!res.ok) {
          throw new Error(`Google API error: ${res.status}`)
        }

        const data = await res.json()
        const places = data.places || []

        const formatted = places.map((place: any) => {
          // If formattedAddress available, use it (e.g. "Mumbai, Maharashtra, India")
          const name = place.formattedAddress || place.displayName?.text || ""
          
          // Clean up string to purely "City, Country" or let the full address ride
          const parts = name.split(", ")
          if (parts.length > 2) {
            return { display_name: `${parts[0]}, ${parts[parts.length - 1]}` }
          }
          
          return { display_name: name }
        })

        // Filter duplicates
        const unique = formatted.filter(
          (v: any, i: number, a: any[]) => a.findIndex((t: any) => t.display_name === v.display_name) === i
        )

        setSuggestions(unique)
      } catch (e) {
        console.error("Failed to fetch cities from Google Places", e)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce the fetch
    const debounce = setTimeout(fetchGooglePlaces, 400)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <div className="relative group w-full" ref={wrapperRef}>
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
      <Input
        id={id}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          onChange(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-10 text-base rounded-xl bg-background/90 hover:bg-accent/80 focus-visible:bg-background transition-colors border-border/80 shadow-md relative z-0"
        autoComplete="off"
      />
      
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 p-1 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <ul className="max-h-60 overflow-y-auto w-full">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm hover:bg-accent/60 rounded-lg transition-colors flex items-center gap-3 text-foreground font-medium"
                    onClick={() => {
                      setQuery(s.display_name)
                      onChange(s.display_name)
                      setIsOpen(false)
                    }}
                  >
                    <MapPin className="h-4 w-4 text-primary/70" />
                    {s.display_name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
