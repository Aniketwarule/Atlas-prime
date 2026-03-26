import {
  discoverActivityOptions,
  discoverCompanionOptions,
  discoverMoodOptions,
} from '@/constants/discoverOptions'
import { generateContent } from '@/service/AIModel'

const energyScale = {
  chill: 0,
  balanced: 1,
  adrenaline: 2,
}

const companionLabelMap = discoverCompanionOptions.reduce((acc, item) => {
  acc[item.id] = item.label.toLowerCase()
  return acc
}, {})

const moodLabelMap = discoverMoodOptions.reduce((acc, item) => {
  acc[item.id] = item.label
  return acc
}, {})

const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

const formatDuration = (minHours, maxHours) =>
  minHours === maxHours ? `${minHours}h` : `${minHours}-${maxHours}h`

const getDistanceHint = (radiusKm, index) => {
  const min = clamp(Math.round((radiusKm * 0.2) + index * 2), 3, radiusKm)
  const max = clamp(Math.round(min + radiusKm * 0.35), min + 2, radiusKm)
  return `${min}-${max} km`
}

const parseAIResponse = (text) => {
  let cleaned = text.trim()
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '')

  const objectStart = cleaned.indexOf('{')
  const objectEnd = cleaned.lastIndexOf('}')
  if (objectStart !== -1 && objectEnd !== -1) {
    cleaned = cleaned.slice(objectStart, objectEnd + 1)
  }

  const parsed = JSON.parse(cleaned)
  if (Array.isArray(parsed)) return parsed[0]
  return parsed
}

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const normalizeRecommendation = (item, index, input) => {
  const matchedActivity = discoverActivityOptions.find(
    (activity) => activity.label.toLowerCase() === String(item.activity || '').toLowerCase() || activity.id === String(item.activityId || '')
  )

  const fallbackTitle = matchedActivity?.label || `Idea ${index + 1}`
  const fallbackEmoji = matchedActivity?.emoji || '📍'
  const fallbackDuration = matchedActivity
    ? `${matchedActivity.durationRange[0]}-${matchedActivity.durationRange[1]}h`
    : '2-4h'
  const duration = item.duration || item.recommendedDuration || fallbackDuration

  const spots = Array.isArray(item.nearbySpots)
    ? item.nearbySpots
    : Array.isArray(item.places)
      ? item.places.map((place) => place.name || place.placeName).filter(Boolean)
      : []

  const plan = Array.isArray(item.quickPlan)
    ? item.quickPlan
    : [item.planStep1, item.planStep2, item.planStep3].filter(Boolean)

  return {
    id: item.id || toSlug(`${fallbackTitle}-${index + 1}`),
    title: item.title || fallbackTitle,
    emoji: item.emoji || fallbackEmoji,
    description: item.description || matchedActivity?.description || 'Recommended nearby activity based on your preferences.',
    matchScore: clamp(Number(item.matchScore) || 78, 55, 99),
    bestTime: Array.isArray(item.bestTime)
      ? item.bestTime
      : Array.isArray(item.bestTimes)
        ? item.bestTimes
        : matchedActivity?.bestTime || ['day'],
    duration,
    distanceHint: item.distanceHint || getDistanceHint(input.radiusKm, index),
    reason: item.reason || 'Strong fit for your selected mood, companion, and available time.',
    nearbySpots: spots.length > 0 ? spots : (matchedActivity?.nearbyHints || []).map((hint) => `${hint} near ${input.location}`),
    quickPlan: plan.length > 0 ? plan : buildQuickPlan(matchedActivity || discoverActivityOptions[0], input.location, input.maxHours, input.preferredTime),
  }
}

const buildDiscoverPrompt = (input) => {
  const selectedActivityLabels = discoverActivityOptions
    .filter((activity) => input.activities.includes(activity.id))
    .map((activity) => activity.label)

  const catalog = discoverActivityOptions
    .map((activity) => `${activity.label} (id: ${activity.id})`)
    .join(', ')

  return `
You are a premium local activity discovery assistant.

Task:
Generate nearby activity recommendations for:
- Location: ${input.location}
- Radius: ${input.radiusKm} km
- Mood: ${input.mood}
- Companion: ${input.companion}
- Energy: ${input.energy}
- Preferred time: ${input.preferredTime}
- Free hours available: ${input.maxHours}
- User selected activities (must prioritize): ${selectedActivityLabels.join(', ') || 'none'}

Activity catalog (use these labels when possible): ${catalog}

Rules:
1. Return only valid JSON.
2. Give 6 recommendations.
3. Each recommendation must include nearby place names relevant to the activity and location.
4. Keep advice practical and local-feeling.
5. Ensure options match user mood, companion style, and available time.

JSON schema:
{
  "headline": "string",
  "subline": "string",
  "recommendations": [
    {
      "id": "string",
      "activityId": "string",
      "title": "string",
      "emoji": "string",
      "description": "string",
      "matchScore": number,
      "bestTime": ["string"],
      "duration": "string",
      "distanceHint": "string",
      "reason": "string",
      "nearbySpots": ["string", "string", "string"],
      "quickPlan": ["string", "string", "string"]
    }
  ]
}
`
}

const buildQuickPlan = (activity, location, maxHours, preferredTime) => {
  const plannedHours = clamp(Math.max(activity.durationRange[0], Math.min(maxHours, activity.durationRange[1])), activity.durationRange[0], activity.durationRange[1])
  const timing = preferredTime === 'anytime' ? activity.bestTime[0] : preferredTime

  return [
    `Start at ${activity.nearbyHints[0]} around ${location}.`,
    `Spend about ${plannedHours} hours on ${activity.label.toLowerCase()} with short breaks.`,
    `Wrap up near ${activity.nearbyHints[1]} for food, photos, and a smooth finish in the ${timing}.`,
  ]
}

const scoreActivity = (activity, input) => {
  let score = 0
  const reasons = []

  if (input.activities.includes(activity.id)) {
    score += 45
    reasons.push(`You explicitly picked ${activity.label.toLowerCase()}.`)
  }

  if (activity.moods.includes(input.mood)) {
    score += 22
    reasons.push(`${moodLabelMap[input.mood]} mood aligns strongly.`)
  }

  if (activity.companions.includes(input.companion)) {
    score += 15
    reasons.push(`Great fit for ${companionLabelMap[input.companion]} outings.`)
  }

  const energyDiff = Math.abs(energyScale[activity.energy] - energyScale[input.energy])
  if (energyDiff === 0) {
    score += 12
  } else if (energyDiff === 1) {
    score += 6
  }

  if (input.preferredTime === 'anytime' || activity.bestTime.includes(input.preferredTime)) {
    score += 8
  }

  if (input.maxHours >= activity.durationRange[0]) {
    score += 10
  } else {
    score -= 8
    reasons.push('May feel rushed unless you increase available time.')
  }

  if (input.radiusKm <= 12 && activity.energy === 'chill') {
    score += 4
  }

  if (input.radiusKm >= 25 && activity.energy !== 'chill') {
    score += 4
  }

  return { score, reasons }
}

export function generateDiscoverRecommendations(input) {
  return generateDiscoverRecommendationsFallback(input)
}

export function generateDiscoverRecommendationsFallback(input) {
  const ranked = discoverActivityOptions
    .map((activity) => {
      const { score, reasons } = scoreActivity(activity, input)

      const matchScore = clamp(Math.round((score / 108) * 100), 55, 98)

      return {
        ...activity,
        matchScore,
        score,
        reasons,
      }
    })
    .sort((a, b) => b.score - a.score)

  const selectedPriority = ranked.filter((item) => input.activities.includes(item.id))
  const highConfidence = ranked.filter((item) => item.score >= 45)

  const combined = [...selectedPriority]
  highConfidence.forEach((item) => {
    if (!combined.find((existing) => existing.id === item.id)) {
      combined.push(item)
    }
  })
  ranked.forEach((item) => {
    if (!combined.find((existing) => existing.id === item.id)) {
      combined.push(item)
    }
  })

  const recommendations = combined.slice(0, 6).map((activity, index) => ({
    id: activity.id,
    title: activity.label,
    emoji: activity.emoji,
    description: activity.description,
    matchScore: activity.matchScore,
    bestTime: activity.bestTime,
    duration: formatDuration(activity.durationRange[0], activity.durationRange[1]),
    distanceHint: getDistanceHint(input.radiusKm, index),
    reason: activity.reasons.join(' ') || 'This option fits your current vibe and availability.',
    nearbySpots: activity.nearbyHints.map((hint) => `${hint} near ${input.location}`),
    quickPlan: buildQuickPlan(activity, input.location, input.maxHours, input.preferredTime),
  }))

  const headline = `Discover near ${input.location}`
  const subline = `Personalized for a ${moodLabelMap[input.mood]?.toLowerCase() || 'balanced'} mood with ${companionLabelMap[input.companion] || 'your group'}.`

  return {
    headline,
    subline,
    recommendations,
  }
}

export async function generateDiscoverRecommendationsAI(input) {
  try {
    const prompt = buildDiscoverPrompt(input)
    const text = await generateContent(prompt)
    const parsed = parseAIResponse(text)

    const aiRecommendations = Array.isArray(parsed?.recommendations)
      ? parsed.recommendations
      : []

    if (aiRecommendations.length === 0) {
      return generateDiscoverRecommendationsFallback(input)
    }

    const normalizedRecommendations = aiRecommendations
      .slice(0, 6)
      .map((item, index) => normalizeRecommendation(item, index, input))

    return {
      headline: parsed.headline || `Discover near ${input.location}`,
      subline:
        parsed.subline ||
        `Personalized for a ${moodLabelMap[input.mood]?.toLowerCase() || 'balanced'} mood with ${companionLabelMap[input.companion] || 'your group'}.`,
      recommendations: normalizedRecommendations,
    }
  } catch (error) {
    console.error('Gemini Discover failed, using fallback:', error)
    return generateDiscoverRecommendationsFallback(input)
  }
}
