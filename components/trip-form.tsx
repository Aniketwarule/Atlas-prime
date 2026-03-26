"use client"

import * as React from "react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CalendarIcon, 
  MapPin, 
  User, 
  Users, 
  Heart, 
  UserPlus,
  Wallet,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { TripInput } from "@/lib/types"
import { destinationOptions } from "@/lib/mock-data"
import { CityAutocomplete } from "@/components/city-autocomplete"

interface TripFormProps {
  initialDestination?: string
  onSubmit: (data: TripInput) => void
}

const budgetOptions = [
  { value: 'cheap', label: 'Budget', description: 'Affordable options', icon: Wallet },
  { value: 'moderate', label: 'Moderate', description: 'Balance of comfort', icon: Wallet },
  { value: 'luxury', label: 'Luxury', description: 'Premium experiences', icon: Wallet },
] as const

const companionOptions = [
  { value: 'solo', label: 'Solo', icon: User },
  { value: 'couple', label: 'Couple', icon: Heart },
  { value: 'friends', label: 'Friends', icon: Users },
  { value: 'family', label: 'Family', icon: UserPlus },
] as const

const steps = [
  { id: 1, title: 'Destination', description: 'Where would you like to go?' },
  { id: 2, title: 'Dates', description: 'When and how long?' },
  { id: 3, title: 'Preferences', description: 'Budget and companions' },
]

export function TripForm({ initialDestination, onSubmit }: TripFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<TripInput>({
    destination: initialDestination || '',
    origin: '',
    startDate: undefined,
    duration: 5,
    budget: 'moderate',
    travelingWith: 'couple',
  })

  const updateFormData = (updates: Partial<TripInput>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.destination && formData.origin
      case 2:
        return formData.startDate && formData.duration >= 1
      case 3:
        return formData.budget && formData.travelingWith
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    } else {
      onSubmit(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: currentStep >= step.id ? 'var(--primary)' : 'var(--muted)',
                  }}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold transition-all duration-300",
                    currentStep >= step.id ? "text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground",
                    currentStep === step.id ? "ring-4 ring-primary/20 scale-110" : ""
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    step.id
                  )}
                </motion.div>
                <div className="hidden sm:block ml-4">
                  <p className={cn(
                    "text-sm font-semibold tracking-tight transition-colors",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 h-0.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    className="h-full bg-primary"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <Label htmlFor="destination" className="text-base font-semibold">
                Where do you want to travel?
              </Label>
              <CityAutocomplete
                id="destination"
                value={formData.destination}
                onChange={(value) => updateFormData({ destination: value })}
                placeholder="Search for a city..."
              />
            </div>

            <div className="space-y-3 pt-4">
              <Label htmlFor="origin" className="text-base font-semibold">
                Where are you traveling from?
              </Label>
              <CityAutocomplete
                id="origin"
                value={formData.origin}
                onChange={(value) => updateFormData({ origin: value })}
                placeholder="Search for a city..."
              />
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <Label className="text-base font-semibold">When do you want to start?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-14 justify-start text-left font-normal text-base rounded-xl bg-background/50 hover:bg-accent/50 transition-colors border-border/50 shadow-sm",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP")
                    ) : (
                      "Pick a date"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => updateFormData({ startDate: date })}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Trip duration</Label>
                <span className="text-xl font-bold text-primary bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
                  {formData.duration} {formData.duration === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="flex items-center gap-6 px-2">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <Slider
                  value={[formData.duration]}
                  onValueChange={([value]) => updateFormData({ duration: value })}
                  min={1}
                  max={21}
                  step={1}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Slide to select between 1 and 21 days
              </p>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Label className="text-base font-semibold">What's your budget preference?</Label>
              <div className="grid grid-cols-3 gap-4">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ budget: option.value })}
                    className={cn(
                      "relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300",
                      formData.budget === option.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-[1.02]"
                        : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-accent/50 hover:scale-[1.01]"
                    )}
                  >
                    <option.icon className={cn(
                      "h-8 w-8 transition-colors",
                      formData.budget === option.value ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "font-semibold text-base",
                      formData.budget === option.value ? "text-primary" : "text-foreground"
                    )}>
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground text-center line-clamp-2">
                      {option.description}
                    </span>
                    {formData.budget === option.value && (
                      <motion.div
                        layoutId="budget-check"
                        className="absolute -top-3 -right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-sm"
                      >
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Label className="text-base font-semibold">Who are you traveling with?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {companionOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateFormData({ travelingWith: option.value })}
                    className={cn(
                      "relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300",
                      formData.travelingWith === option.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10 scale-[1.02]"
                        : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-accent/50 hover:scale-[1.01]"
                    )}
                  >
                    <option.icon className={cn(
                      "h-8 w-8 transition-colors",
                      formData.travelingWith === option.value ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "font-semibold text-base",
                      formData.travelingWith === option.value ? "text-primary" : "text-foreground"
                    )}>
                      {option.label}
                    </span>
                    {formData.travelingWith === option.value && (
                      <motion.div
                        layoutId="companion-check"
                        className="absolute -top-3 -right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-sm"
                      >
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12 pt-8 border-t border-border/40">
        <Button
          variant="outline"
          size="lg"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-2 h-12 px-6 rounded-xl border-border/50 bg-background/50 hover:bg-accent/50 font-medium transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!canProceed()}
          className="gap-2 h-12 px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 font-semibold transition-all hover:-translate-y-0.5"
        >
          {currentStep === 3 ? 'Generate Itinerary' : 'Continue'}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
