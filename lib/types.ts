export interface TripInput {
  destination: string
  origin: string
  startDate: Date | undefined
  duration: number
  budget: 'cheap' | 'moderate' | 'luxury'
  travelingWith: 'solo' | 'friends' | 'couple' | 'family'
}

export interface Activity {
  time: string
  title: string
  description: string
  location?: string
}

export interface DayItinerary {
  day: number
  title: string
  activities: Activity[]
}

export interface ExpenseItem {
  category: string
  description: string
  amount: number
}

export interface Itinerary {
  destination: string
  origin: string
  duration: number
  budget: 'cheap' | 'moderate' | 'luxury'
  travelingWith: 'solo' | 'friends' | 'couple' | 'family'
  startDate: string
  days: DayItinerary[]
  expenses: ExpenseItem[]
  totalCost: number
}

export interface Destination {
  id: string
  name: string
  country: string
  image: string
  description: string
}
