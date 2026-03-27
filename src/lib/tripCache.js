const CACHE_KEY = 'atlasprime:planned-trips-cache'
const TRIP_DOCS_CACHE_KEY = 'atlasprime:trip-documents-cache'
const CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000
const MAX_CACHE_ITEMS = 24
const MAX_TRIP_DOCS = 48

const normalizeString = (value, fallback = '') => {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || fallback
}

const parseDestination = (destinationLabel) => {
  const raw = normalizeString(destinationLabel, 'Unknown destination')
  const parts = raw.split(',').map((part) => part.trim()).filter(Boolean)

  return {
    destination: raw,
    city: parts[0] || raw,
    country: parts[parts.length - 1] || 'Custom',
  }
}

const toTimestamp = (value) => {
  const date = new Date(value)
  const time = date.getTime()
  return Number.isFinite(time) ? time : 0
}

const buildImage = (city, fallbackImage) => {
  if (normalizeString(fallbackImage)) return fallbackImage
  return `https://source.unsplash.com/1200x800/?${encodeURIComponent(`${city} travel`)}`
}

const readCache = () => {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to parse trip cache:', error)
    return []
  }
}

const writeCache = (items) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to write trip cache:', error)
  }
}

const readTripDocsCache = () => {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(TRIP_DOCS_CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to parse trip documents cache:', error)
    return []
  }
}

const writeTripDocsCache = (items) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(TRIP_DOCS_CACHE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Failed to write trip documents cache:', error)
  }
}

const cloneValue = (value) => JSON.parse(JSON.stringify(value))

const getCleanTripDocs = () => {
  const now = Date.now()
  const cleaned = readTripDocsCache()
    .filter((item) => item && item.id)
    .filter((item) => now - toTimestamp(item.updatedAt || item.createdAt) <= CACHE_TTL_MS)
    .sort((a, b) => toTimestamp(b.updatedAt || b.createdAt) - toTimestamp(a.updatedAt || a.createdAt))

  writeTripDocsCache(cleaned)
  return cleaned
}

export const getCachedPlannedTrips = () => {
  const now = Date.now()
  const cleaned = readCache()
    .filter((item) => item && item.tripId)
    .filter((item) => now - toTimestamp(item.cachedAt) <= CACHE_TTL_MS)
    .sort((a, b) => toTimestamp(b.cachedAt) - toTimestamp(a.cachedAt))

  // Keep storage clean as a side effect when stale entries are found.
  writeCache(cleaned)
  return cleaned
}

export const savePlannedTripToCache = ({ tripId, formData, tripData }) => {
  if (!tripId || !formData) return

  const destinationLabel = formData?.location?.label || tripData?.destination || 'Unknown destination'
  const { destination, city, country } = parseDestination(destinationLabel)

  const entry = {
    tripId: String(tripId),
    destination,
    city,
    country,
    source: normalizeString(formData?.sourceLocation?.label, 'Unknown source'),
    duration: Number.parseInt(formData?.noOfDays, 10) || Number.parseInt(tripData?.totalDays, 10) || 0,
    budget: normalizeString(formData?.budget, 'Not set'),
    travelMode: normalizeString(formData?.travelMode || tripData?.travelMode, 'Not set'),
    departureDate: normalizeString(formData?.departureDate),
    returnDate: normalizeString(formData?.returnDate),
    cachedAt: new Date().toISOString(),
    image: buildImage(city, tripData?.bannerImage),
    packageTitle: normalizeString(tripData?.packageTitle, 'Previously Planned Trip'),
    isCached: true,
  }

  const current = getCachedPlannedTrips()
  const withoutSameTrip = current.filter((item) => item.tripId !== entry.tripId)
  const dedupedByPlan = withoutSameTrip.filter(
    (item) => !(item.destination === entry.destination && item.departureDate === entry.departureDate)
  )

  const next = [entry, ...dedupedByPlan].slice(0, MAX_CACHE_ITEMS)
  writeCache(next)
}

export const upsertTripDocumentInCache = (tripDocument) => {
  const id = normalizeString(tripDocument?.id || tripDocument?.tripId)
  if (!id) return

  const current = getCleanTripDocs()
  const nextDoc = {
    ...tripDocument,
    id,
    updatedAt: new Date().toISOString(),
    createdAt: normalizeString(tripDocument?.createdAt, new Date().toISOString()),
  }

  const withoutCurrent = current.filter((item) => item.id !== id)
  const next = [nextDoc, ...withoutCurrent].slice(0, MAX_TRIP_DOCS)
  writeTripDocsCache(next)
}

export const getTripDocumentFromCache = (tripId) => {
  const id = normalizeString(tripId)
  if (!id) return null

  const docs = getCleanTripDocs()
  const found = docs.find((item) => item.id === id)
  return found ? cloneValue(found) : null
}
