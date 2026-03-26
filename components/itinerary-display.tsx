"use client"

import { motion } from "framer-motion"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Wallet, 
  Users, 
  Download, 
  Edit3, 
  ChevronRight,
  Sunrise,
  Sun,
  Moon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Itinerary } from "@/lib/types"

interface ItineraryDisplayProps {
  itinerary: Itinerary
  onEdit: () => void
}

const budgetLabels = {
  cheap: 'Budget',
  moderate: 'Moderate',
  luxury: 'Luxury',
}

const companionLabels = {
  solo: 'Solo Traveler',
  couple: 'Couple',
  friends: 'Friends',
  family: 'Family',
}

const timeIcons = {
  Morning: Sunrise,
  Afternoon: Sun,
  Evening: Moon,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ItineraryDisplay({ itinerary, onEdit }: ItineraryDisplayProps) {
  const handleDownload = () => {
    // Create a simple text version of the itinerary
    let content = `ATLAS PRIME - Travel Itinerary\n${'='.repeat(40)}\n\n`
    content += `Destination: ${itinerary.destination}\n`
    content += `From: ${itinerary.origin}\n`
    content += `Date: ${itinerary.startDate}\n`
    content += `Duration: ${itinerary.duration} days\n`
    content += `Budget: ${budgetLabels[itinerary.budget]}\n`
    content += `Traveling: ${companionLabels[itinerary.travelingWith]}\n\n`
    content += `${'='.repeat(40)}\nITINERARY\n${'='.repeat(40)}\n\n`
    
    itinerary.days.forEach(day => {
      content += `DAY ${day.day}: ${day.title}\n${'-'.repeat(30)}\n`
      day.activities.forEach(activity => {
        content += `${activity.time}: ${activity.title}\n`
        content += `  ${activity.description}\n`
        if (activity.location) content += `  Location: ${activity.location}\n`
        content += '\n'
      })
    })
    
    content += `${'='.repeat(40)}\nESTIMATED COSTS\n${'='.repeat(40)}\n\n`
    itinerary.expenses.forEach(expense => {
      content += `${expense.category}: $${expense.amount}\n`
    })
    content += `\nTOTAL: $${itinerary.totalCost}\n`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `atlas-prime-itinerary-${itinerary.destination.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Header Summary */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                {itinerary.destination}
              </h1>
              <p className="text-muted-foreground">
                From {itinerary.origin}
              </p>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium">{itinerary.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">{itinerary.duration} Days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="text-sm font-medium">{budgetLabels[itinerary.budget]}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Traveling</p>
                  <p className="text-sm font-medium">{companionLabels[itinerary.travelingWith]}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Day-by-Day Itinerary */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl">Day-by-Day Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="day-1" className="space-y-2">
              {itinerary.days.map((day) => (
                <AccordionItem 
                  key={day.day} 
                  value={`day-${day.day}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">
                          {day.day}
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-foreground">
                          Day {day.day}: {day.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {day.activities.length} activities planned
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-4 ml-16">
                      {day.activities.map((activity, idx) => {
                        const TimeIcon = timeIcons[activity.time as keyof typeof timeIcons] || Sun
                        return (
                          <div key={idx} className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                              <TimeIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                                  {activity.time}
                                </span>
                              </div>
                              <h4 className="font-medium text-foreground mb-1">
                                {activity.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {activity.description}
                              </p>
                              {activity.location && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  {activity.location}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cost Breakdown */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl">Estimated Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itinerary.expenses.map((expense, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{expense.category}</TableCell>
                    <TableCell className="text-muted-foreground">{expense.description}</TableCell>
                    <TableCell className="text-right">${expense.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-semibold">Total Estimated Cost</TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    ${itinerary.totalCost.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <p className="text-xs text-muted-foreground mt-4">
              * Costs are estimates and may vary based on season, availability, and exchange rates.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={handleDownload} variant="outline" className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Download Itinerary
        </Button>
        <Button onClick={onEdit} variant="outline" className="flex-1 gap-2">
          <Edit3 className="h-4 w-4" />
          Edit Inputs
        </Button>
        <Button className="flex-1 gap-2">
          Book This Trip
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
