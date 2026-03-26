export const discoverMoodOptions = [
  {
    id: 'adventurous',
    label: 'Adventurous',
    emoji: '⚡',
    description: 'Thrill, challenge, and high-energy outings.',
  },
  {
    id: 'chill',
    label: 'Chill',
    emoji: '🌿',
    description: 'Slow, easy, and low-pressure plans.',
  },
  {
    id: 'social',
    label: 'Social',
    emoji: '🎉',
    description: 'Fun group vibes and shared moments.',
  },
  {
    id: 'romantic',
    label: 'Romantic',
    emoji: '❤️',
    description: 'Cozy, scenic, and partner-friendly ideas.',
  },
  {
    id: 'mindful',
    label: 'Mindful',
    emoji: '🧘',
    description: 'Calming and intentional experiences.',
  },
  {
    id: 'curious',
    label: 'Curious',
    emoji: '🧭',
    description: 'Local culture, hidden gems, and stories.',
  },
]

export const discoverCompanionOptions = [
  { id: 'solo', label: 'Solo', emoji: '🧍' },
  { id: 'partner', label: 'Partner', emoji: '💑' },
  { id: 'friends', label: 'Friends', emoji: '🧑‍🤝‍🧑' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
]

export const discoverEnergyOptions = [
  { id: 'chill', label: 'Chill' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'adrenaline', label: 'Adrenaline' },
]

export const discoverTimeOptions = [
  { id: 'sunrise', label: 'Sunrise' },
  { id: 'day', label: 'Daytime' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'night', label: 'Night' },
  { id: 'anytime', label: 'Anytime' },
]

export const discoverHourOptions = [2, 3, 4, 6, 8, 10]

const createActivity = ({
  id,
  label,
  emoji,
  description,
  moods,
  companions,
  energy,
  durationRange,
  bestTime,
  nearbyHints,
}) => ({
  id,
  label,
  emoji,
  description,
  moods,
  companions,
  energy,
  durationRange,
  bestTime,
  nearbyHints,
})

const allCompanions = ['solo', 'partner', 'friends', 'family']
const socialCompanions = ['partner', 'friends', 'family']
const adultCompanions = ['solo', 'partner', 'friends']

export const discoverActivityOptions = [
  createActivity({ id: 'trekking', label: 'Trekking', emoji: '🥾', description: 'Trail climbs, ridge walks, and mountain views.', moods: ['adventurous', 'mindful'], companions: adultCompanions, energy: 'adrenaline', durationRange: [4, 8], bestTime: ['sunrise', 'day'], nearbyHints: ['forest trailheads', 'ridge viewpoints', 'eco camps'] }),
  createActivity({ id: 'hiking', label: 'Hiking', emoji: '🥾', description: 'Nature walks with easy-to-moderate routes.', moods: ['adventurous', 'mindful', 'curious'], companions: allCompanions, energy: 'balanced', durationRange: [3, 6], bestTime: ['sunrise', 'day', 'sunset'], nearbyHints: ['city nature parks', 'lakeside loops', 'hill paths'] }),
  createActivity({ id: 'rock-climbing', label: 'Rock Climbing', emoji: '🧗', description: 'Indoor walls or natural crags for technical climbs.', moods: ['adventurous'], companions: ['solo', 'friends', 'partner'], energy: 'adrenaline', durationRange: [2, 5], bestTime: ['day'], nearbyHints: ['climbing gyms', 'granite sectors', 'belay schools'] }),
  createActivity({ id: 'bouldering', label: 'Bouldering', emoji: '🪨', description: 'Short, powerful climbs with puzzle-like routes.', moods: ['adventurous', 'social'], companions: ['solo', 'friends', 'partner'], energy: 'adrenaline', durationRange: [2, 4], bestTime: ['day', 'night'], nearbyHints: ['bouldering studios', 'training boards', 'urban crags'] }),
  createActivity({ id: 'camping', label: 'Camping', emoji: '🏕️', description: 'Overnight nature stays with bonfire and stars.', moods: ['adventurous', 'mindful', 'social'], companions: allCompanions, energy: 'balanced', durationRange: [6, 10], bestTime: ['sunset', 'night'], nearbyHints: ['lakeside camps', 'forest clearings', 'hill campsites'] }),
  createActivity({ id: 'paragliding', label: 'Paragliding', emoji: '🪂', description: 'Soar over valleys with trained tandem pilots.', moods: ['adventurous'], companions: ['solo', 'partner', 'friends'], energy: 'adrenaline', durationRange: [2, 4], bestTime: ['sunrise', 'day'], nearbyHints: ['launch points', 'adventure schools', 'valley viewpoints'] }),
  createActivity({ id: 'ziplining', label: 'Ziplining', emoji: '🪢', description: 'Fast cable rides across forests and canyons.', moods: ['adventurous', 'social'], companions: socialCompanions, energy: 'adrenaline', durationRange: [2, 4], bestTime: ['day'], nearbyHints: ['adventure parks', 'tree-top courses', 'canyon lines'] }),
  createActivity({ id: 'bungee-jumping', label: 'Bungee Jumping', emoji: '🪂', description: 'Pure adrenaline at certified jump points.', moods: ['adventurous', 'social'], companions: ['solo', 'partner', 'friends'], energy: 'adrenaline', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['adventure parks', 'canyon platforms', 'bridge jump sites'] }),
  createActivity({ id: 'skydiving', label: 'Skydiving', emoji: '🛩️', description: 'Tandem freefall with panoramic aerial views.', moods: ['adventurous'], companions: ['solo', 'partner', 'friends'], energy: 'adrenaline', durationRange: [3, 5], bestTime: ['sunrise', 'day'], nearbyHints: ['drop zones', 'airstrips', 'sky schools'] }),
  createActivity({ id: 'mountain-biking', label: 'Mountain Biking', emoji: '🚵', description: 'Off-road cycling on dirt tracks and descents.', moods: ['adventurous', 'mindful'], companions: ['solo', 'friends', 'partner'], energy: 'adrenaline', durationRange: [3, 6], bestTime: ['sunrise', 'day'], nearbyHints: ['single tracks', 'bike parks', 'forest loops'] }),
  createActivity({ id: 'cycling', label: 'Cycling', emoji: '🚴', description: 'Scenic routes and neighborhood exploration.', moods: ['adventurous', 'social', 'curious'], companions: allCompanions, energy: 'balanced', durationRange: [2, 5], bestTime: ['sunrise', 'day', 'sunset'], nearbyHints: ['greenway tracks', 'waterfront loops', 'heritage lanes'] }),
  createActivity({ id: 'trail-running', label: 'Trail Running', emoji: '🏃', description: 'Cardio-rich runs on natural terrain routes.', moods: ['adventurous', 'mindful'], companions: ['solo', 'friends'], energy: 'adrenaline', durationRange: [2, 4], bestTime: ['sunrise', 'day'], nearbyHints: ['forest tracks', 'river embankments', 'hilly loops'] }),
  createActivity({ id: 'river-rafting', label: 'River Rafting', emoji: '🌊', description: 'Guided rapids for team adventure fun.', moods: ['adventurous', 'social'], companions: ['friends', 'partner'], energy: 'adrenaline', durationRange: [3, 6], bestTime: ['day'], nearbyHints: ['rafting camps', 'river bases', 'rapid stretches'] }),
  createActivity({ id: 'kayaking', label: 'Kayaking', emoji: '🛶', description: 'Water trails for calm or active paddling.', moods: ['adventurous', 'mindful', 'romantic'], companions: adultCompanions, energy: 'balanced', durationRange: [2, 5], bestTime: ['sunrise', 'day', 'sunset'], nearbyHints: ['riverfront clubs', 'backwater points', 'lake marinas'] }),
  createActivity({ id: 'canoeing', label: 'Canoeing', emoji: '🛶', description: 'Leisurely paddling in lakes and gentle rivers.', moods: ['chill', 'mindful', 'romantic'], companions: allCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['sunrise', 'day'], nearbyHints: ['lake docks', 'wetland routes', 'canoe houses'] }),
  createActivity({ id: 'sailing', label: 'Sailing', emoji: '⛵', description: 'Wind-powered rides on lakes or sea bays.', moods: ['romantic', 'curious', 'mindful'], companions: socialCompanions, energy: 'balanced', durationRange: [2, 5], bestTime: ['day', 'sunset'], nearbyHints: ['yacht clubs', 'harbor fronts', 'sailing schools'] }),
  createActivity({ id: 'surfing', label: 'Surfing', emoji: '🏄', description: 'Catch ocean waves with board coaching support.', moods: ['adventurous'], companions: ['solo', 'friends', 'partner'], energy: 'adrenaline', durationRange: [2, 5], bestTime: ['sunrise', 'day'], nearbyHints: ['surf beaches', 'board rental spots', 'wave points'] }),
  createActivity({ id: 'snorkeling', label: 'Snorkeling', emoji: '🤿', description: 'Shallow-water marine spotting for all levels.', moods: ['adventurous', 'curious', 'mindful'], companions: allCompanions, energy: 'balanced', durationRange: [2, 4], bestTime: ['day'], nearbyHints: ['coral bays', 'lagoon entries', 'reef edges'] }),
  createActivity({ id: 'scuba-diving', label: 'Scuba Diving', emoji: '🤿', description: 'Underwater exploration with certified operators.', moods: ['adventurous', 'curious'], companions: adultCompanions, energy: 'adrenaline', durationRange: [4, 6], bestTime: ['day'], nearbyHints: ['dive centers', 'coastal harbors', 'reef zones'] }),
  createActivity({ id: 'paddle-boarding', label: 'Paddle Boarding', emoji: '🏄', description: 'Stand-up paddling sessions on calm waters.', moods: ['mindful', 'romantic', 'adventurous'], companions: ['solo', 'partner', 'friends'], energy: 'balanced', durationRange: [2, 4], bestTime: ['sunrise', 'day', 'sunset'], nearbyHints: ['calm lakes', 'river inlets', 'beach clubs'] }),
  createActivity({ id: 'offroad-atv', label: 'ATV Off-Road Ride', emoji: '🏍️', description: 'Dusty trails and rugged off-road circuits.', moods: ['adventurous', 'social'], companions: ['partner', 'friends'], energy: 'adrenaline', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['ATV tracks', 'mud trails', 'adventure grounds'] }),
  createActivity({ id: 'hot-air-balloon', label: 'Hot Air Balloon', emoji: '🎈', description: 'Slow sky glides with sunrise valley views.', moods: ['romantic', 'curious', 'mindful'], companions: ['partner', 'friends', 'family'], energy: 'chill', durationRange: [2, 3], bestTime: ['sunrise'], nearbyHints: ['balloon launch fields', 'open plains', 'view decks'] }),
  createActivity({ id: 'safari-drive', label: 'Safari Drive', emoji: '🦌', description: 'Wildlife spotting with guided jeep routes.', moods: ['curious', 'mindful', 'adventurous'], companions: allCompanions, energy: 'balanced', durationRange: [3, 6], bestTime: ['sunrise', 'sunset'], nearbyHints: ['reserve gates', 'forest circuits', 'watch towers'] }),
  createActivity({ id: 'birdwatching', label: 'Birdwatching', emoji: '🦜', description: 'Binocular-friendly mornings in natural habitats.', moods: ['mindful', 'curious', 'chill'], companions: allCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['sunrise', 'day'], nearbyHints: ['wetland parks', 'mangrove walks', 'nature reserves'] }),
  createActivity({ id: 'stargazing', label: 'Stargazing', emoji: '✨', description: 'Quiet night sky sessions outside city glare.', moods: ['romantic', 'mindful', 'curious'], companions: allCompanions, energy: 'chill', durationRange: [2, 3], bestTime: ['night'], nearbyHints: ['hill viewpoints', 'open meadows', 'observatory decks'] }),
  createActivity({ id: 'sunrise-viewpoint', label: 'Sunrise Viewpoint', emoji: '🌅', description: 'Early scenic viewpoints for fresh starts.', moods: ['mindful', 'romantic', 'adventurous'], companions: allCompanions, energy: 'balanced', durationRange: [2, 4], bestTime: ['sunrise'], nearbyHints: ['hill lookouts', 'cliff edges', 'lake viewpoints'] }),
  createActivity({ id: 'sunset-cruise', label: 'Sunset Cruise', emoji: '🚤', description: 'Golden-hour boat rides with skyline views.', moods: ['romantic', 'social', 'chill'], companions: socialCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['sunset', 'night'], nearbyHints: ['river docks', 'harbor quays', 'cruise piers'] }),
  createActivity({ id: 'picnic-park', label: 'Picnic In The Park', emoji: '🧺', description: 'Low-stress open-air meal with relaxed vibes.', moods: ['chill', 'romantic', 'social'], companions: allCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['city lawns', 'botanical gardens', 'lakeside parks'] }),
  createActivity({ id: 'photowalk', label: 'Photo Walk', emoji: '📸', description: 'Casual camera walks through photogenic zones.', moods: ['curious', 'mindful', 'chill'], companions: allCompanions, energy: 'balanced', durationRange: [2, 4], bestTime: ['sunrise', 'day', 'sunset'], nearbyHints: ['old streets', 'river promenades', 'mural districts'] }),
  createActivity({ id: 'street-photography', label: 'Street Photography', emoji: '📷', description: 'Capture city life, motion, and candid moments.', moods: ['curious', 'social'], companions: ['solo', 'friends', 'partner'], energy: 'balanced', durationRange: [2, 5], bestTime: ['day', 'sunset', 'night'], nearbyHints: ['market lanes', 'historic bazaars', 'metro hubs'] }),
  createActivity({ id: 'heritage-walk', label: 'Heritage Walk', emoji: '🏘️', description: 'Story-led walks through old neighborhoods.', moods: ['curious', 'mindful', 'chill'], companions: allCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['heritage districts', 'old bazaars', 'monument trails'] }),
  createActivity({ id: 'museum-culture', label: 'Museum & Culture', emoji: '🏛️', description: 'History, art, and local storytelling spots.', moods: ['curious', 'mindful', 'chill'], companions: allCompanions, energy: 'chill', durationRange: [2, 5], bestTime: ['day'], nearbyHints: ['city museums', 'heritage quarters', 'art galleries'] }),
  createActivity({ id: 'art-gallery-hop', label: 'Art Gallery Hop', emoji: '🖼️', description: 'Contemporary exhibits and independent art spaces.', moods: ['curious', 'romantic', 'mindful'], companions: ['solo', 'partner', 'friends'], energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['gallery streets', 'design hubs', 'creative districts'] }),
  createActivity({ id: 'architectural-tour', label: 'Architectural Tour', emoji: '🏙️', description: 'Explore iconic facades, courtyards, and landmarks.', moods: ['curious', 'mindful'], companions: allCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['civic centers', 'historic boulevards', 'riverfront skylines'] }),
  createActivity({ id: 'temple-trail', label: 'Temple Trail', emoji: '🛕', description: 'Spiritual and architectural heritage circuits.', moods: ['mindful', 'curious', 'chill'], companions: allCompanions, energy: 'chill', durationRange: [2, 5], bestTime: ['sunrise', 'day'], nearbyHints: ['old temple streets', 'river ghats', 'sacred precincts'] }),
  createActivity({ id: 'bookstore-crawl', label: 'Bookstore Crawl', emoji: '📚', description: 'Cozy browsing through indie bookstores and cafes.', moods: ['chill', 'mindful', 'curious'], companions: ['solo', 'partner', 'friends'], energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['book lanes', 'literary cafes', 'campus districts'] }),
  createActivity({ id: 'cafe-hopping', label: 'Cafe Hopping', emoji: '☕', description: 'A relaxed route of aesthetic cafes and bakeries.', moods: ['chill', 'romantic', 'social'], companions: adultCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['arts districts', 'bookstore cafes', 'roastery hubs'] }),
  createActivity({ id: 'food-trail', label: 'Food Trail', emoji: '🍜', description: 'Street food circuits and local specialties.', moods: ['social', 'curious', 'chill'], companions: allCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'night'], nearbyHints: ['night markets', 'old-town streets', 'chef-led popups'] }),
  createActivity({ id: 'cooking-class', label: 'Cooking Class', emoji: '👨‍🍳', description: 'Hands-on sessions to cook regional dishes.', moods: ['curious', 'social', 'mindful'], companions: ['solo', 'partner', 'friends', 'family'], energy: 'balanced', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['studio kitchens', 'chef schools', 'farm kitchens'] }),
  createActivity({ id: 'wine-tasting', label: 'Wine Tasting', emoji: '🍷', description: 'Guided tasting flights with pairing notes.', moods: ['romantic', 'curious', 'social'], companions: ['partner', 'friends'], energy: 'chill', durationRange: [2, 4], bestTime: ['sunset', 'night'], nearbyHints: ['vineyards', 'tasting rooms', 'wine bars'] }),
  createActivity({ id: 'farm-stay', label: 'Farm Stay Day', emoji: '🌾', description: 'Slow rural activities with local farm life.', moods: ['mindful', 'chill', 'curious'], companions: allCompanions, energy: 'chill', durationRange: [4, 8], bestTime: ['sunrise', 'day'], nearbyHints: ['organic farms', 'village stays', 'orchard trails'] }),
  createActivity({ id: 'pottery-workshop', label: 'Pottery Workshop', emoji: '🏺', description: 'Craft sessions on wheel-throwing and glazing.', moods: ['mindful', 'curious', 'chill'], companions: ['solo', 'partner', 'friends', 'family'], energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['craft studios', 'artisan hubs', 'maker spaces'] }),
  createActivity({ id: 'dance-class', label: 'Dance Class', emoji: '💃', description: 'Beginner-friendly salsa, bachata, or freestyle.', moods: ['social', 'adventurous', 'romantic'], companions: ['solo', 'partner', 'friends'], energy: 'adrenaline', durationRange: [2, 3], bestTime: ['sunset', 'night'], nearbyHints: ['dance studios', 'community halls', 'social clubs'] }),
  createActivity({ id: 'live-music', label: 'Live Music', emoji: '🎵', description: 'Acoustic nights, indie gigs, and jazz bars.', moods: ['social', 'romantic', 'curious'], companions: ['partner', 'friends', 'solo'], energy: 'balanced', durationRange: [2, 4], bestTime: ['sunset', 'night'], nearbyHints: ['music bars', 'open-air stages', 'cultural cafes'] }),
  createActivity({ id: 'theater-show', label: 'Theater Show', emoji: '🎭', description: 'Stage performances, drama, and local productions.', moods: ['curious', 'romantic', 'social'], companions: socialCompanions, energy: 'chill', durationRange: [2, 4], bestTime: ['sunset', 'night'], nearbyHints: ['performing arts centers', 'black box theaters', 'cultural halls'] }),
  createActivity({ id: 'standup-comedy', label: 'Stand-up Comedy', emoji: '🎤', description: 'Laughter-filled evenings at comedy rooms.', moods: ['social', 'chill'], companions: ['partner', 'friends', 'solo'], energy: 'balanced', durationRange: [2, 3], bestTime: ['night'], nearbyHints: ['comedy clubs', 'pub stages', 'open venues'] }),
  createActivity({ id: 'open-mic', label: 'Open Mic Night', emoji: '🎙️', description: 'Poetry, music, and spontaneous live performances.', moods: ['social', 'curious'], companions: ['solo', 'partner', 'friends'], energy: 'balanced', durationRange: [2, 4], bestTime: ['sunset', 'night'], nearbyHints: ['artist cafes', 'creative lounges', 'community stages'] }),
  createActivity({ id: 'night-market', label: 'Night Market', emoji: '🏮', description: 'Street eats, crafts, and local after-dark buzz.', moods: ['social', 'curious', 'chill'], companions: allCompanions, energy: 'balanced', durationRange: [2, 4], bestTime: ['night'], nearbyHints: ['bazaar lanes', 'food streets', 'waterfront markets'] }),
  createActivity({ id: 'shopping-district', label: 'Shopping District Walk', emoji: '🛍️', description: 'Browse flagship stores and local boutiques.', moods: ['social', 'chill'], companions: ['partner', 'friends', 'family'], energy: 'balanced', durationRange: [2, 5], bestTime: ['day', 'sunset', 'night'], nearbyHints: ['high streets', 'mall promenades', 'fashion quarters'] }),
  createActivity({ id: 'flea-market', label: 'Flea Market Hunt', emoji: '🧵', description: 'Vintage finds, antiques, and handmade goods.', moods: ['curious', 'social', 'chill'], companions: allCompanions, energy: 'balanced', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['flea bazaars', 'weekend markets', 'artisan lanes'] }),
  createActivity({ id: 'board-game-cafe', label: 'Board Game Cafe', emoji: '♟️', description: 'Strategy games and group-friendly table sessions.', moods: ['social', 'chill'], companions: ['partner', 'friends', 'family'], energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'night'], nearbyHints: ['game cafes', 'community clubs', 'hobby lounges'] }),
  createActivity({ id: 'escape-room', label: 'Escape Room', emoji: '🧩', description: 'Timed puzzles and teamwork challenge rooms.', moods: ['social', 'adventurous', 'curious'], companions: ['partner', 'friends', 'family'], energy: 'adrenaline', durationRange: [2, 3], bestTime: ['day', 'night'], nearbyHints: ['escape studios', 'puzzle arenas', 'gaming centers'] }),
  createActivity({ id: 'laser-tag', label: 'Laser Tag', emoji: '🔫', description: 'Fast-paced arena games with tactical fun.', moods: ['social', 'adventurous'], companions: ['friends', 'family', 'partner'], energy: 'adrenaline', durationRange: [2, 3], bestTime: ['day', 'night'], nearbyHints: ['indoor arenas', 'arcade centers', 'entertainment zones'] }),
  createActivity({ id: 'bowling', label: 'Bowling', emoji: '🎳', description: 'Classic lane games for relaxed group hangs.', moods: ['social', 'chill'], companions: ['partner', 'friends', 'family'], energy: 'balanced', durationRange: [2, 3], bestTime: ['day', 'night'], nearbyHints: ['bowling alleys', 'sports clubs', 'recreation hubs'] }),
  createActivity({ id: 'go-karting', label: 'Go Karting', emoji: '🏎️', description: 'Competitive laps on safe kart circuits.', moods: ['adventurous', 'social'], companions: ['partner', 'friends'], energy: 'adrenaline', durationRange: [2, 3], bestTime: ['day', 'sunset'], nearbyHints: ['kart tracks', 'motorsport parks', 'speed zones'] }),
  createActivity({ id: 'amusement-park', label: 'Amusement Park', emoji: '🎢', description: 'Roller coasters and family-friendly rides.', moods: ['social', 'adventurous'], companions: ['partner', 'friends', 'family'], energy: 'adrenaline', durationRange: [4, 8], bestTime: ['day', 'sunset'], nearbyHints: ['theme parks', 'ride zones', 'waterfront parks'] }),
  createActivity({ id: 'water-park', label: 'Water Park', emoji: '🏊', description: 'Slides, wave pools, and splash circuits.', moods: ['social', 'adventurous', 'chill'], companions: ['partner', 'friends', 'family'], energy: 'balanced', durationRange: [4, 8], bestTime: ['day'], nearbyHints: ['water resorts', 'slide parks', 'family parks'] }),
  createActivity({ id: 'wellness-spa', label: 'Wellness & Spa', emoji: '🧖', description: 'Relaxing treatments and mindful reset sessions.', moods: ['chill', 'mindful', 'romantic'], companions: ['solo', 'partner', 'friends'], energy: 'chill', durationRange: [2, 4], bestTime: ['day', 'sunset'], nearbyHints: ['wellness studios', 'spa resorts', 'yoga decks'] }),
  createActivity({ id: 'yoga-session', label: 'Yoga Session', emoji: '🧘', description: 'Guided movement classes for calm and focus.', moods: ['mindful', 'chill'], companions: ['solo', 'partner', 'friends', 'family'], energy: 'chill', durationRange: [2, 3], bestTime: ['sunrise', 'day', 'sunset'], nearbyHints: ['yoga studios', 'rooftop decks', 'park lawns'] }),
  createActivity({ id: 'meditation-retreat', label: 'Meditation Retreat', emoji: '🕊️', description: 'Silent or guided practices for deep reset.', moods: ['mindful', 'chill'], companions: ['solo', 'partner'], energy: 'chill', durationRange: [3, 8], bestTime: ['sunrise', 'day'], nearbyHints: ['retreat centers', 'ashram spaces', 'quiet gardens'] }),
]
