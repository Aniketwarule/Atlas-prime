const imagePool = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
]

const destinationBannerImages = {
  'paris-france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
  'tokyo-japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80',
  'bali-indonesia': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1600&q=80',
  'goa-india': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
  'jaipur-india': 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=80',
  'manali-india': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
  'kerala-india': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80',
  'varanasi-india': 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1600&q=80',
}

const dayNarrativeTemplates = [
  {
    theme: 'Arrival and Signature Sights',
    morning: 'Kick off your trip at {place} with an easy start and strong city orientation in {city}.',
    afternoon: 'Use the afternoon at {place} for deeper exploration and local culture touchpoints.',
    evening: 'Close day one at {place} for atmosphere, food options, and memorable evening views.',
  },
  {
    theme: 'Culture and Local Character',
    morning: 'Spend the morning at {place} to experience the local rhythm before crowds peak.',
    afternoon: 'At {place}, focus on architecture, local stories, and neighborhood exploration.',
    evening: 'Wrap with {place} in the evening when the place feels most alive and photogenic.',
  },
  {
    theme: 'Scenic Highlights and Hidden Gems',
    morning: '{place} works best in the morning light and gives you calmer access to key viewpoints.',
    afternoon: 'Move toward {place} to balance sightseeing with relaxed discovery and short stops.',
    evening: '{place} is a great evening anchor for food trails, local walks, and soft nightlife.',
  },
  {
    theme: 'Experiences and Flexible Exploration',
    morning: 'Use {place} as a morning base and keep room for spontaneous local recommendations.',
    afternoon: '{place} is ideal for your mid-day slot with plenty of nearby add-on options.',
    evening: 'Finish at {place} to keep the day flexible while still ending with a high-value experience.',
  },
]

const packageTitlesByDestination = {
  'paris-france': 'Romance & Art Signature Package',
  'tokyo-japan': 'City Pulse & Culture Package',
  'bali-indonesia': 'Island Bliss Escape Package',
  'goa-india': 'Beach Break & Night Vibes Package',
  'jaipur-india': 'Royal Heritage Circuit Package',
  'manali-india': 'Mountain Adventure Package',
  'kerala-india': 'Tea Hills Wellness Package',
  'varanasi-india': 'Spiritual Heritage Package',
}

const destinationConfigs = [
  {
    id: 'paris-france',
    city: 'Paris',
    country: 'France',
    emoji: '🗼',
    duration: 5,
    price: '₹1,85,000',
    origin: 'New Delhi, India',
    budget: 'Luxury',
    traveler: '2 People',
    travelerType: 'couple',
    travelMode: 'Flight',
    departureDate: '2026-06-10',
    center: { latitude: 48.8566, longitude: 2.3522 },
    highlights: ['Eiffel Tower sunset', 'Seine riverside evening', 'Louvre and Montmartre trail'],
    places: ['Eiffel Tower', 'Louvre Museum', 'Montmartre', 'Seine River Cruise', 'Notre Dame Area', 'Le Marais'],
    experiences: [
      { title: 'Pastry Crawl', description: 'Taste iconic patisseries across Left Bank.', category: 'Food', icon: '🥐', estimatedCost: '₹2,500' },
      { title: 'Hidden Courtyard Walk', description: 'Explore quiet historic lanes with local guides.', category: 'Culture', icon: '🏛️', estimatedCost: '₹1,800' },
      { title: 'Jazz Night', description: 'Late evening live jazz in classic cellar venues.', category: 'Nightlife', icon: '🎷', estimatedCost: '₹3,000' },
    ],
    hacks: [
      { title: 'Book timed slots early', description: 'Reserve Louvre and summit tickets 7-10 days ahead to skip long queues.', icon: '🎟️' },
      { title: 'Metro day pass wins', description: 'For 4+ rides in central Paris, a day pass is cheaper than single tickets.', icon: '🚇' },
      { title: 'Golden hour photos', description: 'Reach Trocadero 45 minutes before sunset for best Eiffel frames.', icon: '📸' },
    ],
  },
  {
    id: 'tokyo-japan',
    city: 'Tokyo',
    country: 'Japan',
    emoji: '🏯',
    duration: 7,
    price: '₹2,20,000',
    origin: 'Bengaluru, India',
    budget: 'Luxury',
    traveler: '2 People',
    travelerType: 'couple',
    travelMode: 'Flight',
    departureDate: '2026-07-03',
    center: { latitude: 35.6762, longitude: 139.6503 },
    highlights: ['Shibuya skyline lights', 'Asakusa culture district', 'Tokyo food alley evenings'],
    places: ['Shibuya Crossing', 'Asakusa Senso-ji', 'TeamLab Planets', 'Meiji Shrine', 'Ueno Park', 'Tokyo Skytree'],
    experiences: [
      { title: 'Ramen Alley Hunt', description: 'Try top ramen spots near station districts.', category: 'Food', icon: '🍜', estimatedCost: '₹3,200' },
      { title: 'Kimono Photo Walk', description: 'Traditional attire walk near temple streets.', category: 'Culture', icon: '👘', estimatedCost: '₹4,100' },
      { title: 'Arcade Night', description: 'Retro and modern game arcades after dinner.', category: 'Nightlife', icon: '🕹️', estimatedCost: '₹2,000' },
    ],
    hacks: [
      { title: 'IC card everything', description: 'Use one transit IC card for metros, stores, and many vending machines.', icon: '💳' },
      { title: 'Lunch sets are value', description: 'High-quality set lunches cost significantly less than dinner menus.', icon: '🍱' },
      { title: 'Station exits matter', description: 'Save 20+ minutes by mapping exact station exit before you move.', icon: '🗺️' },
    ],
  },
  {
    id: 'bali-indonesia',
    city: 'Bali',
    country: 'Indonesia',
    emoji: '🏖️',
    duration: 4,
    price: '₹1,25,000',
    origin: 'Mumbai, India',
    budget: 'Moderate',
    traveler: '2 People',
    travelerType: 'couple',
    travelMode: 'Flight',
    departureDate: '2026-08-14',
    center: { latitude: -8.3405, longitude: 115.092 },
    highlights: ['Ubud green escapes', 'Temple sunset views', 'Beach club evenings'],
    places: ['Ubud Monkey Forest', 'Tegalalang Rice Terrace', 'Uluwatu Temple', 'Seminyak Beach', 'Tanah Lot', 'Kuta Art Market'],
    experiences: [
      { title: 'Balinese Cooking Class', description: 'Hands-on local cooking in village kitchens.', category: 'Food', icon: '🍛', estimatedCost: '₹2,800' },
      { title: 'Waterfall Dip', description: 'Guided waterfall hop in inland jungle routes.', category: 'Adventure', icon: '💦', estimatedCost: '₹3,400' },
      { title: 'Sunset Fire Dance', description: 'Traditional Kecak performance at cliff temples.', category: 'Culture', icon: '🔥', estimatedCost: '₹1,600' },
    ],
    hacks: [
      { title: 'Temple dress code first', description: 'Carry a sarong and scarf to avoid on-site rental delays.', icon: '🧣' },
      { title: 'Traffic-aware planning', description: 'Cluster activities by area; crossing regions in peak hours is slow.', icon: '🛵' },
      { title: 'Cash for local stalls', description: 'Small vendors prefer cash and often offer better prices.', icon: '💵' },
    ],
  },
  {
    id: 'goa-india',
    city: 'Goa',
    country: 'India',
    emoji: '🌴',
    duration: 4,
    price: '₹65,000',
    origin: 'Pune, India',
    budget: 'Moderate',
    traveler: 'Friends',
    travelerType: 'friends',
    travelMode: 'Flight',
    departureDate: '2026-05-22',
    center: { latitude: 15.2993, longitude: 74.124 },
    highlights: ['North Goa beaches', 'Sunset forts', 'Shack hopping evenings'],
    places: ['Calangute Beach', 'Fort Aguada', 'Anjuna Flea Market', 'Baga Beach', 'Dona Paula', 'Fontainhas'],
    experiences: [
      { title: 'Sunset Kayak', description: 'Paddle through calm backwaters during golden hour.', category: 'Adventure', icon: '🛶', estimatedCost: '₹2,200' },
      { title: 'Goan Seafood Trail', description: 'Best fish thali and coastal specialties around Panjim.', category: 'Food', icon: '🐟', estimatedCost: '₹1,800' },
      { title: 'Latin Quarter Walk', description: 'Colorful Portuguese-era lanes and local cafes.', category: 'Culture', icon: '🏘️', estimatedCost: '₹900' },
    ],
    hacks: [
      { title: 'Scooter beats cabs', description: 'For short beach hops, self-drive scooters save time and money.', icon: '🛵' },
      { title: 'Weekday beach clubs', description: 'Cover charges and waiting time drop significantly on weekdays.', icon: '🎶' },
      { title: 'Early fort timing', description: 'Visit Aguada before noon for cooler climbs and cleaner photos.', icon: '🌤️' },
    ],
  },
  {
    id: 'jaipur-india',
    city: 'Jaipur',
    country: 'India',
    emoji: '🏰',
    duration: 5,
    price: '₹72,000',
    origin: 'Hyderabad, India',
    budget: 'Moderate',
    traveler: '2 People',
    travelerType: 'couple',
    travelMode: 'Flight',
    departureDate: '2026-10-12',
    center: { latitude: 26.9124, longitude: 75.7873 },
    highlights: ['Amber Fort sunrise', 'Royal city palaces', 'Old bazaar shopping'],
    places: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jal Mahal', 'Nahargarh Fort', 'Bapu Bazaar'],
    experiences: [
      { title: 'Block Print Workshop', description: 'Create your own Rajasthani textile print.', category: 'Culture', icon: '🎨', estimatedCost: '₹1,400' },
      { title: 'Street Food Circuit', description: 'Taste kachori, kulfi, and local sweets in old city lanes.', category: 'Food', icon: '🥟', estimatedCost: '₹1,000' },
      { title: 'Fort Sunset Drive', description: 'Scenic route across ridge forts and viewpoints.', category: 'Adventure', icon: '🚗', estimatedCost: '₹2,100' },
    ],
    hacks: [
      { title: 'Start forts early', description: 'Most forts feel crowded after 10 AM; sunrise slots are best.', icon: '🌄' },
      { title: 'Bundle monument tickets', description: 'Combined entry passes reduce total spend across major sites.', icon: '🎫' },
      { title: 'Negotiate market buys', description: 'In old bazaars, opening price can be 20-30% above fair rate.', icon: '🛍️' },
    ],
  },
  {
    id: 'manali-india',
    city: 'Manali',
    country: 'India',
    emoji: '🏔️',
    duration: 5,
    price: '₹68,000',
    origin: 'Chandigarh, India',
    budget: 'Moderate',
    traveler: 'Friends',
    travelerType: 'friends',
    travelMode: 'Car',
    departureDate: '2026-09-05',
    center: { latitude: 32.2396, longitude: 77.1887 },
    highlights: ['Snow valley routes', 'Riverside cafes', 'Adventure day rides'],
    places: ['Solang Valley', 'Hadimba Temple', 'Old Manali', 'Atal Tunnel Viewpoint', 'Vashisht Village', 'Mall Road Manali'],
    experiences: [
      { title: 'Riverside Bonfire', description: 'Evening chill with acoustic music near the river.', category: 'Nightlife', icon: '🔥', estimatedCost: '₹1,500' },
      { title: 'Paragliding Session', description: 'Guided tandem flights with valley views.', category: 'Adventure', icon: '🪂', estimatedCost: '₹3,500' },
      { title: 'Apple Orchard Walk', description: 'Local orchard tour with seasonal produce tasting.', category: 'Culture', icon: '🍎', estimatedCost: '₹800' },
    ],
    hacks: [
      { title: 'Carry layers always', description: 'Weather shifts fast after sunset even in summer months.', icon: '🧥' },
      { title: 'Buffer mountain drives', description: 'Keep extra 45-60 minutes around tunnels and narrow sections.', icon: '⏱️' },
      { title: 'Book adventure slots early', description: 'Paragliding and ATV tickets can sell out by late morning.', icon: '✅' },
    ],
  },
  {
    id: 'kerala-india',
    city: 'Munnar',
    country: 'India',
    emoji: '🌿',
    duration: 5,
    price: '₹74,000',
    origin: 'Chennai, India',
    budget: 'Moderate',
    traveler: 'Family',
    travelerType: 'family',
    travelMode: 'Flight',
    departureDate: '2026-11-01',
    center: { latitude: 10.0889, longitude: 77.0595 },
    highlights: ['Tea garden views', 'Misty hill mornings', 'Backwater add-on escape'],
    places: ['Tea Museum', 'Mattupetty Dam', 'Eravikulam Park', 'Top Station', 'Attukad Waterfalls', 'Echo Point'],
    experiences: [
      { title: 'Tea Estate Trail', description: 'Guided walk through scenic plantations and tasting room.', category: 'Culture', icon: '🍃', estimatedCost: '₹1,200' },
      { title: 'Spice Garden Tour', description: 'Learn regional spices and cooking traditions.', category: 'Food', icon: '🌶️', estimatedCost: '₹900' },
      { title: 'Jeep Mountain Circuit', description: 'Offbeat hill viewpoints with local drivers.', category: 'Adventure', icon: '🚙', estimatedCost: '₹2,300' },
    ],
    hacks: [
      { title: 'Morning cloud windows', description: 'Viewpoints are clearest before 9 AM in most seasons.', icon: '☁️' },
      { title: 'Book park permits online', description: 'Eravikulam entry slots can fill quickly on weekends.', icon: '🎟️' },
      { title: 'Keep rain backup', description: 'Carry umbrellas and quick-dry shoes for short bursts of rain.', icon: '🌧️' },
    ],
  },
  {
    id: 'varanasi-india',
    city: 'Varanasi',
    country: 'India',
    emoji: '🛶',
    duration: 4,
    price: '₹58,000',
    origin: 'Kolkata, India',
    budget: 'Cheap',
    traveler: 'Solo',
    travelerType: 'solo',
    travelMode: 'Train',
    departureDate: '2026-04-18',
    center: { latitude: 25.3176, longitude: 82.9739 },
    highlights: ['Ghat sunrise boat ride', 'Temple lane walks', 'Evening Ganga aarti'],
    places: ['Dashashwamedh Ghat', 'Kashi Vishwanath Corridor', 'Assi Ghat', 'Ramnagar Fort', 'Sarnath', 'Godowlia Market'],
    experiences: [
      { title: 'Sunrise Boat Session', description: 'Classic boat journey with old-city skyline views.', category: 'Culture', icon: '🌅', estimatedCost: '₹700' },
      { title: 'Banarasi Snack Walk', description: 'Street-side chaat and lassi stops in old lanes.', category: 'Food', icon: '🥤', estimatedCost: '₹600' },
      { title: 'Classical Music Evening', description: 'Small venue mehfil with local performers.', category: 'Nightlife', icon: '🎶', estimatedCost: '₹900' },
    ],
    hacks: [
      { title: 'Use ghat-side rickshaws', description: 'Small electric rickshaws are faster in narrow lanes than taxis.', icon: '🛺' },
      { title: 'Aarti timing buffer', description: 'Reach 40 minutes before evening aarti for better seating.', icon: '🕯️' },
      { title: 'Footwear planning', description: 'Temples and ghats involve frequent shoe removal; carry easy slip-ons.', icon: '👟' },
    ],
  },
]

const slotDetails = {
  morning: {
    suffix: 'Start your day here for lighter crowds and the best natural light.',
    pricing: '₹700 onwards',
    travelTime: '15-30 mins',
  },
  afternoon: {
    suffix: 'Ideal midday stop with enough time for guided exploration.',
    pricing: '₹900 onwards',
    travelTime: '20-35 mins',
  },
  evening: {
    suffix: 'Perfect for atmosphere, lights, and local evening experiences.',
    pricing: '₹600 onwards',
    travelTime: '20-40 mins',
  },
}

const curatedItineraryPlans = {
  'goa-india': [
    {
      theme: 'North Goa Coastline Kickoff',
      bestTimeToVisit: 'Morning to Late Evening',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Fort Aguada & Sinquerim Clifftop',
          placeDetails:
            'Start early at Fort Aguada for sea-facing ramparts and fewer crowds, then walk down to Sinquerim for calm shoreline views and coffee near the jetty.',
          ticketPricing: '₹50 onwards',
          travelTime: '25-35 mins',
          rating: 4.7,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Candolim to Calangute Water Sports Belt',
          placeDetails:
            'Use this block for parasailing or jet-ski sessions, followed by a relaxed beach shack lunch. Keep the afternoon light and activity-focused.',
          ticketPricing: '₹1,500 onwards',
          travelTime: '15-25 mins',
          rating: 4.5,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Baga Beach & Tito Lane',
          placeDetails:
            'Wrap day one with sunset at Baga, then move to Tito Lane for music, cafes, and easy late-evening options without long commutes.',
          ticketPricing: 'Free entry area',
          travelTime: '10-20 mins',
          rating: 4.4,
        },
      ],
    },
    {
      theme: 'Heritage Goa and Panjim Culture Day',
      bestTimeToVisit: 'Daytime to Sunset',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Basilica of Bom Jesus & Se Cathedral (Old Goa)',
          placeDetails:
            'Cover Old Goa churches in the morning window for cooler weather and clearer interiors. This gives strong cultural context before city exploration.',
          ticketPricing: 'Free / donation based',
          travelTime: '35-50 mins',
          rating: 4.8,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Fontainhas Latin Quarter & Panjim Cafes',
          placeDetails:
            'Do a slow photo walk through Fontainhas, then lunch at a local Goan-Portuguese cafe. Great zone for architecture and easy walking.',
          ticketPricing: '₹400 onwards',
          travelTime: '20-30 mins',
          rating: 4.6,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Mandovi River Sunset Cruise',
          placeDetails:
            'Take a sunset river cruise for live music and skyline views, then return to Panjim for seafood dinner around the riverfront.',
          ticketPricing: '₹600 onwards',
          travelTime: '10-20 mins',
          rating: 4.3,
        },
      ],
    },
    {
      theme: 'South Goa Scenic Escape',
      bestTimeToVisit: 'Sunrise to Evening',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Colva and Benaulim Beach Stretch',
          placeDetails:
            'Start in South Goa for quieter sands and slower pace. This morning is ideal for long beach walks and relaxed brunch at coastal cafes.',
          ticketPricing: 'Free',
          travelTime: '45-60 mins',
          rating: 4.5,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Cabo de Rama Fort Viewpoint',
          placeDetails:
            'Drive to Cabo de Rama for dramatic cliff views and fewer crowds than North Goa forts. Carry water and spend at least 60-90 minutes here.',
          ticketPricing: '₹50 onwards',
          travelTime: '40-55 mins',
          rating: 4.6,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Palolem Beach Sunset',
          placeDetails:
            'End the day at Palolem for one of Goa’s best sunset horizons, then pick a beachfront dinner spot before heading back.',
          ticketPricing: 'Free entry area',
          travelTime: '20-35 mins',
          rating: 4.7,
        },
      ],
    },
    {
      theme: 'Island Life, Markets, and Departure Ease',
      bestTimeToVisit: 'Morning to Night',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Divar Island Ferry Circuit',
          placeDetails:
            'Use a half-day island loop via ferry for village roads, old churches, and calm river views. It is one of the most underrated Goa experiences.',
          ticketPricing: '₹100 onwards',
          travelTime: '30-45 mins',
          rating: 4.5,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Anjuna Flea Market / Mapusa Market',
          placeDetails:
            'Shop for local spices, clothes, and crafts. Keep this slot flexible based on market day and your departure timeline.',
          ticketPricing: 'Shopping based',
          travelTime: '25-40 mins',
          rating: 4.2,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Dona Paula Jetty Farewell Sunset',
          placeDetails:
            'Take a final sunset stop at Dona Paula for sea breeze and panoramic views, then close with a short farewell dinner near Panjim.',
          ticketPricing: 'Free',
          travelTime: '15-25 mins',
          rating: 4.3,
        },
      ],
    },
  ],
  'kerala-india': [
    {
      theme: 'Munnar Arrival and Tea Country Orientation',
      bestTimeToVisit: 'Afternoon to Evening',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Munnar Town Arrival + Hotel Check-in',
          placeDetails:
            'Keep the first half light due to hill-road travel. Settle in, hydrate, and avoid stacking too many long-distance stops on arrival day.',
          ticketPricing: 'Included',
          travelTime: 'Variable by route',
          rating: 4.2,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'KDHP Tea Museum',
          placeDetails:
            'Use the museum session to understand tea processing and estate history, then continue to a nearby tasting room for fresh local blends.',
          ticketPricing: '₹125 onwards',
          travelTime: '15-25 mins',
          rating: 4.5,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Pothamedu View Point',
          placeDetails:
            'Catch your first Munnar sunset across tea valleys. This is a gentle evening plan without long travel, ideal after arrival fatigue.',
          ticketPricing: 'Free',
          travelTime: '20-30 mins',
          rating: 4.6,
        },
      ],
    },
    {
      theme: 'Eravikulam National Park and Rajamalai Slopes',
      bestTimeToVisit: 'Early Morning to Evening',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Eravikulam National Park (Rajamalai)',
          placeDetails:
            'Take the first entry slot for better visibility and lower crowd density. The shuttle route plus short trails offers iconic Munnar landscapes.',
          ticketPricing: '₹200 onwards',
          travelTime: '30-40 mins',
          rating: 4.8,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Lakkam Waterfalls and Forest Edge Picnic',
          placeDetails:
            'Move toward Lakkam for a cooler afternoon stop. Keep footwear grippy and plan a short riverside picnic before returning uphill.',
          ticketPricing: '₹50 onwards',
          travelTime: '35-50 mins',
          rating: 4.4,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Munnar Main Market and Handmade Chocolate Stores',
          placeDetails:
            'Use the evening for local shopping, tea packs, and spice purchases. It is practical and close to most central hotel zones.',
          ticketPricing: 'Shopping based',
          travelTime: '20-30 mins',
          rating: 4.3,
        },
      ],
    },
    {
      theme: 'High Range Views and Lake Leisure',
      bestTimeToVisit: 'Sunrise to Sunset',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Top Station Sunrise Window',
          placeDetails:
            'Leave very early for Top Station; sunrise visibility here can be spectacular before cloud cover settles over the valley ridges.',
          ticketPricing: '₹75 onwards',
          travelTime: '60-80 mins',
          rating: 4.7,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Kundala Lake Boating and Dam Road',
          placeDetails:
            'After Top Station, slow down with a boating session at Kundala. Keep this slot buffer-friendly as mountain roads can vary in pace.',
          ticketPricing: '₹200 onwards',
          travelTime: '20-30 mins',
          rating: 4.5,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Echo Point and Tea Stall Stop',
          placeDetails:
            'Finish with Echo Point for quick family-friendly fun and warm snacks. This route works well before heading back to your stay.',
          ticketPricing: '₹40 onwards',
          travelTime: '15-25 mins',
          rating: 4.4,
        },
      ],
    },
    {
      theme: 'Plantation Trails and Local Flavors',
      bestTimeToVisit: 'Morning to Evening',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Kolukkumalai / Jeep Mountain Circuit',
          placeDetails:
            'Take a guided jeep circuit for rugged hill routes and panoramic tea slopes. This is your strongest adventure day in Munnar.',
          ticketPricing: '₹2,000 onwards',
          travelTime: '50-70 mins',
          rating: 4.6,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Spice Garden and Cardamom Walk',
          placeDetails:
            'Use this slot for a plantation-guided walk to understand spices and regional produce. Good educational stop for family travelers.',
          ticketPricing: '₹200 onwards',
          travelTime: '25-35 mins',
          rating: 4.4,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Kathakali / Kalaripayattu Cultural Show',
          placeDetails:
            'Close the day with Kerala performance arts in town. Pre-book seats if traveling on weekends or holiday windows.',
          ticketPricing: '₹350 onwards',
          travelTime: '20-30 mins',
          rating: 4.5,
        },
      ],
    },
    {
      theme: 'Waterfall Finish and Departure Buffer Day',
      bestTimeToVisit: 'Morning to Afternoon',
      activities: [
        {
          timeOfDay: 'morning',
          placeName: 'Attukad Waterfalls Trail',
          placeDetails:
            'Spend your final morning at Attukad for a short nature walk and waterfall lookout. Best visited early before excursion traffic builds up.',
          ticketPricing: '₹50 onwards',
          travelTime: '25-40 mins',
          rating: 4.3,
        },
        {
          timeOfDay: 'afternoon',
          placeName: 'Blossom Hydel Park and Picnic Lawn',
          placeDetails:
            'Use this as a relaxed closing slot with light activities, short walks, and family-friendly downtime before departure transfers.',
          ticketPricing: '₹30 onwards',
          travelTime: '15-25 mins',
          rating: 4.2,
        },
        {
          timeOfDay: 'evening',
          placeName: 'Tea & Spice Packing + Checkout',
          placeDetails:
            'Keep the last block practical for checkout, souvenirs, and departure prep so the trip ends comfortably without rushed transitions.',
          ticketPricing: 'Variable',
          travelTime: 'Hotel dependent',
          rating: 4.1,
        },
      ],
    },
  ],
}

const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

const makePlaceImage = (place, city, day, index) =>
  `https://source.unsplash.com/1200x800/?${encodeURIComponent(`${place} ${city} travel`)}&sig=${day}${index}`

const offsetCoordinates = (center, index) => ({
  latitude: Number((center.latitude + ((index % 3) - 1) * 0.018).toFixed(6)),
  longitude: Number((center.longitude + ((index % 4) - 1.5) * 0.02).toFixed(6)),
})

const buildCuratedItinerary = (config, plans) => {
  const itinerary = {}

  plans.slice(0, config.duration).forEach((plan, dayIndex) => {
    const day = dayIndex + 1
    itinerary[`day${day}`] = {
      theme: plan.theme,
      bestTimeToVisit: plan.bestTimeToVisit || 'Morning to Evening',
      activities: plan.activities.map((activity, activityIndex) => {
        const fallbackDetail = slotDetails[activity.timeOfDay] || slotDetails.morning
        return {
          timeOfDay: activity.timeOfDay,
          placeName: activity.placeName,
          placeDetails: activity.placeDetails,
          placeImageUrl: activity.placeImageUrl || makePlaceImage(activity.placeName, config.city, day, activityIndex),
          geoCoordinates: activity.geoCoordinates || offsetCoordinates(config.center, (day * 11) + activityIndex),
          ticketPricing: activity.ticketPricing || fallbackDetail.pricing,
          rating: activity.rating || Number((4.3 + (activityIndex * 0.2)).toFixed(1)),
          travelTime: activity.travelTime || fallbackDetail.travelTime,
        }
      }),
    }
  })

  return itinerary
}

const buildItinerary = (config) => {
  const curatedPlans = curatedItineraryPlans[config.id]
  if (curatedPlans?.length) {
    return buildCuratedItinerary(config, curatedPlans)
  }

  const itinerary = {}

  for (let day = 1; day <= config.duration; day += 1) {
    const placeCount = config.places.length
    const dayTemplate = dayNarrativeTemplates[(day - 1) % dayNarrativeTemplates.length]
    const morningSpot = config.places[(day - 1) % placeCount]
    const afternoonSpot = config.places[day % placeCount]
    const eveningSpot = config.places[(day + 1) % placeCount]

    const activities = [
      { timeOfDay: 'morning', placeName: morningSpot, index: day * 3 },
      { timeOfDay: 'afternoon', placeName: afternoonSpot, index: day * 3 + 1 },
      { timeOfDay: 'evening', placeName: eveningSpot, index: day * 3 + 2 },
    ].map((entry, idx) => {
      const detail = slotDetails[entry.timeOfDay]
      const narrative = dayTemplate[entry.timeOfDay]
      const experience = config.experiences[(day + idx) % config.experiences.length]
      const hack = config.hacks[(day + idx) % config.hacks.length]
      const coords = offsetCoordinates(config.center, entry.index)

      return {
        timeOfDay: entry.timeOfDay,
        placeName: entry.placeName,
        placeDetails: `${narrative.replace('{place}', entry.placeName).replace('{city}', config.city)} ${detail.suffix} Suggested add-on: ${experience.title}. Local tip: ${hack.title}.`,
        placeImageUrl: makePlaceImage(entry.placeName, config.city, day, idx),
        geoCoordinates: coords,
        ticketPricing: detail.pricing,
        rating: Number((4.3 + (idx * 0.2)).toFixed(1)),
        travelTime: detail.travelTime,
      }
    })

    itinerary[`day${day}`] = {
      theme: dayTemplate.theme,
      bestTimeToVisit: day <= 2 ? 'Morning to Evening' : 'Flexible based on weather',
      activities,
    }
  }

  return itinerary
}

const buildHotels = (config) => [
  {
    hotelName: `${config.city} Grand Retreat`,
    hotelAddress: `${config.city} Central District`,
    price: config.budget === 'Luxury' ? '₹9,500/night' : '₹5,800/night',
    geoCoordinates: offsetCoordinates(config.center, 2),
    rating: 4.6,
    description: `Premium stay with quick access to major attractions in ${config.city}.`,
    amenities: ['WiFi', 'Breakfast', 'City View'],
  },
  {
    hotelName: `${config.city} Heritage Stay`,
    hotelAddress: `${config.city} Old Town`,
    price: config.budget === 'Luxury' ? '₹8,200/night' : '₹4,900/night',
    geoCoordinates: offsetCoordinates(config.center, 4),
    rating: 4.4,
    description: 'Comfortable rooms with local architecture and easy transport access.',
    amenities: ['Restaurant', 'Airport Pickup', 'Family Rooms'],
  },
  {
    hotelName: `${config.city} Riverside Suites`,
    hotelAddress: `${config.city} Scenic Belt`,
    price: config.budget === 'Luxury' ? '₹10,200/night' : '₹6,400/night',
    geoCoordinates: offsetCoordinates(config.center, 6),
    rating: 4.5,
    description: 'Relaxed ambience for evening downtime and nearby dining.',
    amenities: ['Pool', 'Parking', '24x7 Support'],
  },
]

const buildHostels = (config) => {
  if (!['solo', 'friends'].includes(config.travelerType)) return []

  return [
    {
      hostelName: `${config.city} Backpackers Hub`,
      hostelAddress: `${config.city} Transit Area`,
      price: '₹1,600/night',
      geoCoordinates: offsetCoordinates(config.center, 8),
      rating: 4.3,
      description: 'Clean dorms and social common areas for budget travelers.',
      amenities: ['Shared Kitchen', 'Locker', 'Community Desk'],
    },
    {
      hostelName: `${config.city} Nomad House`,
      hostelAddress: `${config.city} Market Side`,
      price: '₹1,900/night',
      geoCoordinates: offsetCoordinates(config.center, 10),
      rating: 4.4,
      description: 'Great for solo/friends with walkable access to nightlife and food.',
      amenities: ['WiFi', 'Cafe', 'Laundry'],
    },
  ]
}

const buildTransportOptions = (config) => {
  const journey = `${config.origin} to ${config.city}`

  if (config.travelMode === 'Train') {
    return [
      {
        name: `${config.city} Express`,
        number: '128-A',
        departureTime: '06:10',
        arrivalTime: '12:40',
        duration: '6h 30m',
        price: '₹1,450',
        bookingLink: `https://www.google.com/search?q=${encodeURIComponent(`${journey} train booking`)}`,
      },
      {
        name: 'Premium Chair Car',
        number: '224-B',
        departureTime: '15:20',
        arrivalTime: '22:10',
        duration: '6h 50m',
        price: '₹2,250',
        bookingLink: `https://www.google.com/search?q=${encodeURIComponent(`${journey} premium train`)}`,
      },
    ]
  }

  if (config.travelMode === 'Car') {
    return [
      {
        name: 'Self Drive SUV',
        number: 'Road Plan A',
        departureTime: '07:30',
        arrivalTime: '13:30',
        duration: '6h',
        price: '₹5,900',
        bookingLink: `https://www.google.com/search?q=${encodeURIComponent(`${journey} self drive car rental`)}`,
      },
      {
        name: 'Private Cab',
        number: 'Road Plan B',
        departureTime: '09:00',
        arrivalTime: '15:30',
        duration: '6h 30m',
        price: '₹7,500',
        bookingLink: `https://www.google.com/search?q=${encodeURIComponent(`${journey} private cab`)}`,
      },
    ]
  }

  return [
    {
      name: 'Morning Flight',
      number: 'AP-101',
      departureTime: '08:10',
      arrivalTime: '10:15',
      duration: '2h 05m',
      price: '₹8,900',
      bookingLink: `https://www.google.com/travel/flights?q=${encodeURIComponent(journey)}`,
    },
    {
      name: 'Evening Flight',
      number: 'AP-207',
      departureTime: '18:20',
      arrivalTime: '20:30',
      duration: '2h 10m',
      price: '₹9,400',
      bookingLink: `https://www.google.com/travel/flights?q=${encodeURIComponent(`${journey} evening`)}`,
    },
  ]
}

const buildCostBreakdown = (config) => {
  const budgetBase = config.budget === 'Luxury' ? 110000 : config.budget === 'Cheap' ? 38000 : 62000
  const durationFactor = clamp(config.duration, 3, 8)

  return {
    accommodation: `₹${Math.round((budgetBase * 0.32) + durationFactor * 1800).toLocaleString('en-IN')}`,
    transport: `₹${Math.round((budgetBase * 0.22) + durationFactor * 1100).toLocaleString('en-IN')}`,
    activities: `₹${Math.round((budgetBase * 0.2) + durationFactor * 900).toLocaleString('en-IN')}`,
    food: `₹${Math.round((budgetBase * 0.18) + durationFactor * 700).toLocaleString('en-IN')}`,
    miscellaneous: `₹${Math.round((budgetBase * 0.08) + durationFactor * 400).toLocaleString('en-IN')}`,
    total: config.price,
  }
}

const buildTrip = (config) => {
  const returnDate = new Date(config.departureDate)
  returnDate.setDate(returnDate.getDate() + config.duration)

  return {
    id: config.id,
    stage: 3,
    userSelection: {
      sourceLocation: { label: config.origin },
      location: { label: `${config.city}, ${config.country}` },
      noOfDays: String(config.duration),
      budget: config.budget,
      traveler: config.traveler,
      travelerType: config.travelerType,
      travelMode: config.travelMode,
      travelInterests: ['Culture', 'Food', 'Scenic Spots'],
      departureDate: config.departureDate,
      returnDate: returnDate.toISOString().split('T')[0],
    },
    tripData: {
      destination: `${config.city}, ${config.country}`,
      bannerImage: destinationBannerImages[config.id] || imagePool[0],
      packageTitle: packageTitlesByDestination[config.id] || 'Curated Explorer Package',
      totalDays: config.duration,
      travelMode: config.travelMode,
      tripHighlights: config.highlights,
      itinerary: buildItinerary(config),
      hotels: buildHotels(config),
      hostels: buildHostels(config),
      transportOptions: buildTransportOptions(config),
      costBreakdown: buildCostBreakdown(config),
      localExperiences: config.experiences,
      travelHacks: config.hacks,
    },
  }
}

const hardcodedTripsById = Object.fromEntries(destinationConfigs.map((config) => [config.id, buildTrip(config)]))

export const hardcodedDestinationCards = destinationConfigs.map((config) => ({
  tripId: config.id,
  emoji: config.emoji,
  city: config.city,
  country: config.country,
  isIndia: config.country === 'India',
  name: `${config.city}, ${config.country}`,
  info: `${config.duration} days · ${config.price}`,
  duration: config.duration,
  price: config.price,
  image: destinationBannerImages[config.id] || imagePool[0],
  packageTitle: packageTitlesByDestination[config.id] || 'Curated Explorer Package',
}))

export const getHardcodedTripById = (tripId) => {
  const trip = hardcodedTripsById[tripId]
  if (!trip) return null

  if (typeof structuredClone === 'function') return structuredClone(trip)
  return JSON.parse(JSON.stringify(trip))
}
