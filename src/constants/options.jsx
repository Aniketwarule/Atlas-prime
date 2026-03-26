export const SelectTravelesList = [
  { id: 1, title: 'Just Me', desc: 'A solo adventure', icon: '✈️', people: '1', type: 'solo' },
  { id: 2, title: 'A Couple', desc: 'Two travelers in tandem', icon: '🍾', people: '2 People', type: 'couple' },
  { id: 3, title: 'Family', desc: 'Fun-loving adventurers', icon: '👨‍👩‍👧‍👦', people: '3 to 5 People', type: 'family' },
  { id: 4, title: 'Friends', desc: 'A bunch of thrill-seekers', icon: '🪩', people: '5 to 10 People', type: 'friends' },
];

export const SelectBudgetoptions = [
  { id: 1, title: 'Cheap', desc: 'Stay conscious of costs', icon: '💵' },
  { id: 2, title: 'Moderate', desc: 'Keep cost on the average side', icon: '💰' },
  { id: 3, title: 'Luxury', desc: "Don't worry about cost", icon: '🤑' },
];

export const SelectTravelModes = [
  { id: 1, title: 'Flight', desc: 'Fastest way to travel', icon: '✈️' },
  { id: 2, title: 'Train', desc: 'Scenic & comfortable', icon: '🚆' },
  { id: 3, title: 'Bus', desc: 'Budget-friendly option', icon: '🚌' },
  { id: 4, title: 'Car', desc: 'Freedom to explore', icon: '🚗' },
];

export const SelectTravelInterests = [
  { id: 1, title: 'Historical & Cultural', desc: 'Museums, monuments, history', icon: '🏛️' },
  { id: 2, title: 'Nature & Trekking', desc: 'Mountains, forests, outdoors', icon: '🏔️' },
  { id: 3, title: 'Spiritual', desc: 'Temples, ashrams, peace', icon: '🧘🏽‍♂️' },
  { id: 4, title: 'Adventure & Sports', desc: 'Sports, thrill rides', icon: '🧗🏽‍♂️' },
  { id: 5, title: 'Relaxation & Wellness', desc: 'Spas, beaches, chill', icon: '🏖️' },
  { id: 6, title: 'Food & Culinary', desc: 'Street food, fine dining', icon: '🍜' },
  { id: 7, title: 'Nightlife & Parties', desc: 'Clubs, bars, music', icon: '🪩' },
  { id: 8, title: 'Shopping', desc: 'Malls, local markets', icon: '🛍️' },
];

/* ─── STAGE 1: Detailed Itinerary ─── */
export const PROMPT_STAGE_1 = `
Generate a detailed day-by-day travel itinerary for {location} for {totalDays} days for {traveler} with a {budget} budget, traveling by {travelMode} from {sourceLocation}.
Travel Interests: {travelInterests}.
Departure Date: {departureDate}, Return Date: {returnDate}.

RULES:
1. Return ONLY a valid JSON object. No markdown, no code fences, no arrays.
2. Use camelCase property names. All prices in INR (₹).
3. Include the journey FROM the starting city TO the destination as part of Day 1.
4. Each activity MUST have a "timeOfDay" field: "morning", "afternoon", or "evening".

JSON structure:
{
  "destination": "string",
  "totalDays": number,
  "travelMode": "string",
  "tripHighlights": ["string", "string", "string"],
  "itinerary": {
    "day1": {
      "theme": "string",
      "bestTimeToVisit": "string",
      "activities": [
        {
          "timeOfDay": "morning|afternoon|evening",
          "placeName": "string",
          "placeDetails": "string (2-3 sentences, vivid description)",
          "placeImageUrl": "string",
          "geoCoordinates": { "latitude": number, "longitude": number },
          "ticketPricing": "string",
          "rating": number,
          "travelTime": "string"
        }
      ]
    }
  }
}
`;

/* ─── STAGE 2: Hotels, Hostels & Transport ─── */
export const PROMPT_STAGE_2 = `
For a {totalDays}-day trip to {location} ({budget} budget, {traveler}, traveling by {travelMode} from {sourceLocation}):

RULES:
1. Return ONLY a valid JSON object. No markdown, no arrays.
2. Use camelCase. Prices in INR (₹).
3. Include hostels ONLY if traveler type is solo or friends.

JSON structure:
{
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string (per night)",
      "geoCoordinates": { "latitude": number, "longitude": number },
      "rating": number,
      "description": "string",
      "amenities": ["string"]
    }
  ],
  "hostels": [
    {
      "hostelName": "string",
      "hostelAddress": "string",
      "price": "string (per night)",
      "geoCoordinates": { "latitude": number, "longitude": number },
      "rating": number,
      "description": "string",
      "amenities": ["string"]
    }
  ],
  "transportOptions": [
    {
      "name": "string",
      "number": "string",
      "departureTime": "string",
      "arrivalTime": "string",
      "duration": "string",
      "price": "string",
      "bookingLink": "string"
    }
  ]
}
`;

/* ─── STAGE 3: Costs, Experiences & Hacks ─── */
export const PROMPT_STAGE_3 = `
For a {totalDays}-day trip to {location} ({budget} budget, {traveler}, {travelMode}, interests: {travelInterests}):

RULES:
1. Return ONLY valid JSON. No markdown.
2. Prices in INR (₹).
3. travelHacks must be SPECIFIC insider tips for THIS destination — NOT generic advice like "best time to visit" or "book early". Think like a local who knows hidden tricks, seasonal secrets, and money-saving hacks unique to this place and time.

JSON structure:
{
  "costBreakdown": {
    "accommodation": "string",
    "transport": "string",
    "activities": "string",
    "food": "string",
    "miscellaneous": "string",
    "total": "string"
  },
  "localExperiences": [
    {
      "title": "string",
      "description": "string (2-3 sentences)",
      "category": "Food|Culture|Adventure|Nightlife|Shopping",
      "icon": "emoji",
      "estimatedCost": "string"
    }
  ],
  "travelHacks": [
    {
      "title": "string (catchy one-liner)",
      "description": "string (2-3 sentence insider tip)",
      "icon": "emoji"
    }
  ]
}
`;