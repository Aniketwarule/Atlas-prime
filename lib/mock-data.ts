import { Destination, Itinerary, TripInput } from './types'

export const destinations: Destination[] = [
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    description: 'Majestic peaks and pristine alpine villages',
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'Tropical paradise with ancient temples',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    description: 'Serene backwaters and lush landscapes',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'The city of lights and romance',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    description: 'Iconic blue domes and sunset views',
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    description: 'Ancient temples and cherry blossoms',
  },
]

export const destinationOptions = [
  'Swiss Alps, Switzerland',
  'Bali, Indonesia',
  'Kerala, India',
  'Paris, France',
  'Santorini, Greece',
  'Kyoto, Japan',
  'Maldives',
  'Dubai, UAE',
  'New York, USA',
  'Rome, Italy',
  'Barcelona, Spain',
  'London, UK',
]

export function generateItinerary(input: TripInput): Itinerary {
  const budgetMultiplier = input.budget === 'cheap' ? 1 : input.budget === 'moderate' ? 2 : 3.5
  const companionMultiplier = input.travelingWith === 'solo' ? 1 : input.travelingWith === 'couple' ? 1.8 : input.travelingWith === 'friends' ? 2.5 : 3

  const baseCosts = {
    accommodation: 80 * budgetMultiplier * input.duration,
    food: 40 * budgetMultiplier * input.duration,
    activities: 50 * budgetMultiplier * input.duration,
    transport: 30 * budgetMultiplier * input.duration,
    miscellaneous: 20 * budgetMultiplier * input.duration,
  }

  const days = Array.from({ length: input.duration }, (_, i) => {
    const dayNum = i + 1
    const isFirstDay = dayNum === 1
    const isLastDay = dayNum === input.duration

    let title = ''
    let activities = []

    if (isFirstDay) {
      title = 'Arrival & City Exploration'
      activities = [
        {
          time: 'Morning',
          title: 'Airport Arrival',
          description: `Arrive at ${input.destination}. Transfer to your ${input.budget === 'luxury' ? 'luxury resort' : input.budget === 'moderate' ? 'boutique hotel' : 'comfortable accommodation'}.`,
          location: 'Airport',
        },
        {
          time: 'Afternoon',
          title: 'Check-in & Rest',
          description: 'Settle into your accommodation and freshen up after your journey.',
          location: 'Hotel',
        },
        {
          time: 'Evening',
          title: 'Welcome Dinner',
          description: `Enjoy a ${input.budget === 'luxury' ? 'fine dining experience at a renowned restaurant' : input.budget === 'moderate' ? 'delightful dinner at a local favorite' : 'authentic local cuisine at a popular eatery'}.`,
          location: 'Local Restaurant',
        },
      ]
    } else if (isLastDay) {
      title = 'Departure Day'
      activities = [
        {
          time: 'Morning',
          title: 'Leisure Time',
          description: 'Enjoy a relaxed morning with breakfast and last-minute souvenir shopping.',
          location: 'Hotel & Local Markets',
        },
        {
          time: 'Afternoon',
          title: 'Check-out & Transfer',
          description: 'Complete check-out procedures and transfer to the airport.',
          location: 'Hotel to Airport',
        },
        {
          time: 'Evening',
          title: 'Departure',
          description: 'Board your flight back home with wonderful memories.',
          location: 'Airport',
        },
      ]
    } else {
      const dayActivities = [
        {
          title: 'Cultural Discovery',
          activities: [
            {
              time: 'Morning',
              title: 'Historical Site Visit',
              description: `Explore the rich history and architecture of ${input.destination}'s most iconic landmarks.`,
              location: 'Heritage District',
            },
            {
              time: 'Afternoon',
              title: 'Local Market Tour',
              description: 'Wander through vibrant local markets and discover authentic crafts and delicacies.',
              location: 'Central Market',
            },
            {
              time: 'Evening',
              title: 'Cultural Show',
              description: 'Experience traditional performances and local entertainment.',
              location: 'Cultural Center',
            },
          ],
        },
        {
          title: 'Nature & Adventure',
          activities: [
            {
              time: 'Morning',
              title: 'Scenic Excursion',
              description: `${input.budget === 'luxury' ? 'Private guided tour' : 'Group tour'} to breathtaking natural landscapes.`,
              location: 'Natural Park',
            },
            {
              time: 'Afternoon',
              title: 'Adventure Activity',
              description: input.travelingWith === 'family' ? 'Family-friendly nature walk and wildlife spotting.' : 'Exciting outdoor activities suited to your group.',
              location: 'Adventure Zone',
            },
            {
              time: 'Evening',
              title: 'Sunset Experience',
              description: 'Watch the sunset from a scenic viewpoint with refreshments.',
              location: 'Viewpoint',
            },
          ],
        },
        {
          title: 'Relaxation & Wellness',
          activities: [
            {
              time: 'Morning',
              title: 'Spa & Wellness',
              description: `${input.budget === 'luxury' ? 'Indulge in a premium spa treatment' : 'Relax with a rejuvenating wellness session'}.`,
              location: 'Wellness Center',
            },
            {
              time: 'Afternoon',
              title: 'Beach/Pool Time',
              description: 'Unwind by the water with refreshing drinks and light snacks.',
              location: 'Resort Amenities',
            },
            {
              time: 'Evening',
              title: 'Gourmet Dinner',
              description: 'Savor exquisite local and international cuisine.',
              location: 'Fine Restaurant',
            },
          ],
        },
      ]

      const selectedActivity = dayActivities[(dayNum - 2) % dayActivities.length]
      title = selectedActivity.title
      activities = selectedActivity.activities
    }

    return {
      day: dayNum,
      title,
      activities,
    }
  })

  const totalCost = Math.round(
    (baseCosts.accommodation + baseCosts.food + baseCosts.activities + baseCosts.transport + baseCosts.miscellaneous) * companionMultiplier
  )

  return {
    destination: input.destination,
    origin: input.origin,
    duration: input.duration,
    budget: input.budget,
    travelingWith: input.travelingWith,
    startDate: input.startDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || 'Not specified',
    days,
    expenses: [
      { category: 'Accommodation', description: `${input.duration} nights`, amount: Math.round(baseCosts.accommodation * companionMultiplier) },
      { category: 'Food & Dining', description: 'All meals', amount: Math.round(baseCosts.food * companionMultiplier) },
      { category: 'Activities & Tours', description: 'Excursions and experiences', amount: Math.round(baseCosts.activities * companionMultiplier) },
      { category: 'Local Transport', description: 'Transfers and travel', amount: Math.round(baseCosts.transport * companionMultiplier) },
      { category: 'Miscellaneous', description: 'Tips, souvenirs, etc.', amount: Math.round(baseCosts.miscellaneous * companionMultiplier) },
    ],
    totalCost,
  }
}
