import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  RefreshCcw,
  Route,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/context/ThemeContext'
import {
  discoverActivityOptions,
  discoverCompanionOptions,
  discoverEnergyOptions,
  discoverHourOptions,
  discoverMoodOptions,
  discoverTimeOptions,
} from '@/constants/discoverOptions'
import { generateDiscoverRecommendationsAI } from '@/service/discoverEngine'

const steps = [
  { id: 1, title: 'Mood & Companion' },
  { id: 2, title: 'Activities' },
  { id: 3, title: 'Nearby Filters' },
]

const defaultDiscoverForm = {
  location: '',
  mood: '',
  companion: '',
  activities: [],
  energy: 'balanced',
  preferredTime: 'anytime',
  radiusKm: 20,
  maxHours: 4,
}

const MAX_ACTIVITY_SELECTION = 10

const discoverPlacesStyles = (accentHsl, isDark) => ({
  control: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    background: isDark ? 'rgba(15, 23, 42, 0.55)' : 'rgba(255, 255, 255, 0.84)',
    borderColor: isDark ? 'rgba(148, 163, 184, 0.25)' : `hsla(${accentHsl}, 0.25)`,
    padding: '2px 2px',
    minHeight: '48px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 10px rgba(11,17,32,0.06)',
    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
  }),
  input: (base) => ({ ...base, color: isDark ? '#E2E8F0' : '#0B1120' }),
  singleValue: (base) => ({ ...base, color: isDark ? '#E2E8F0' : '#0B1120' }),
  placeholder: (base) => ({ ...base, color: '#94A3B8' }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    border: isDark ? '1px solid rgba(148, 163, 184, 0.22)' : '1px solid rgba(245,237,227,0.7)',
    boxShadow: '0 10px 34px rgba(11,17,32,0.12)',
    background: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255,248,240,0.98)',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? `hsla(${accentHsl}, 0.1)` : 'transparent',
    color: isDark ? '#E2E8F0' : '#0B1120',
    cursor: 'pointer',
  }),
})

function Discover() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(defaultDiscoverForm)
  const [locationPlace, setLocationPlace] = useState(null)
  const [viewState, setViewState] = useState('questions')
  const [discoverOutput, setDiscoverOutput] = useState(null)
  const [activityQuery, setActivityQuery] = useState('')

  const hasPlacesApiKey = Boolean(import.meta.env.VITE_GOOGLE_PLACE_API_KEY)

  const selectedCount = formData.activities.length

  const selectedActivityDetails = useMemo(
    () => discoverActivityOptions.filter((activity) => formData.activities.includes(activity.id)),
    [formData.activities]
  )

  const quickActivityPicks = useMemo(() => {
    return discoverActivityOptions
      .filter((activity) => (formData.mood ? activity.moods.includes(formData.mood) : true))
      .filter((activity) => !formData.activities.includes(activity.id))
      .slice(0, 12)
  }, [formData.activities, formData.mood])

  const activitySuggestions = useMemo(() => {
    const query = activityQuery.trim().toLowerCase()

    const base = discoverActivityOptions
      .filter((activity) => !formData.activities.includes(activity.id))
      .map((activity) => {
        let score = 0

        if (!query) {
          if (formData.mood && activity.moods.includes(formData.mood)) score += 2
          if (formData.companion && activity.companions.includes(formData.companion)) score += 1
          return { activity, score }
        }

        const label = activity.label.toLowerCase()
        const description = activity.description.toLowerCase()
        if (label.startsWith(query)) score += 5
        if (label.includes(query)) score += 3
        if (description.includes(query)) score += 2
        if (activity.id.includes(query)) score += 1

        return { activity, score }
      })
      .filter((item) => (query ? item.score > 0 : true))
      .sort((a, b) => b.score - a.score)

    return base.slice(0, query ? 8 : 10).map((item) => item.activity)
  }, [activityQuery, formData.activities, formData.companion, formData.mood])

  const canProceed = useMemo(() => {
    if (currentStep === 1) return Boolean(formData.mood && formData.companion)
    if (currentStep === 2) return selectedCount > 0
    if (currentStep === 3) return Boolean(formData.location.trim())
    return false
  }, [currentStep, formData.mood, formData.companion, selectedCount, formData.location])

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const addActivity = (activityId) => {
    if (formData.activities.includes(activityId)) return

    if (formData.activities.length >= MAX_ACTIVITY_SELECTION) {
      toast(`Choose up to ${MAX_ACTIVITY_SELECTION} activities for best recommendations.`)
      return
    }

    updateFormData({ activities: [...formData.activities, activityId] })
    setActivityQuery('')
  }

  const removeActivity = (activityId) => {
    updateFormData({
      activities: formData.activities.filter((id) => id !== activityId),
    })
  }

  const handleActivityInputKeyDown = (event) => {
    if (event.key === 'Backspace' && !activityQuery && formData.activities.length > 0) {
      removeActivity(formData.activities[formData.activities.length - 1])
      return
    }

    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      const topSuggestion = activitySuggestions[0]
      if (topSuggestion) {
        addActivity(topSuggestion.id)
      }
    }
  }

  const nextStep = () => {
    if (!canProceed) {
      toast('Please complete this step first.')
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleGenerate = async () => {
    if (!formData.location.trim()) {
      toast('Please enter your city or nearby area.')
      return
    }

    if (formData.activities.length === 0) {
      toast('Pick at least one activity to personalize your Discover feed.')
      return
    }

    setViewState('loading')

    try {
      const output = await generateDiscoverRecommendationsAI({
        ...formData,
        location: formData.location.trim(),
      })

      setDiscoverOutput(output)
      setViewState('results')
    } catch (error) {
      console.error('Discover generation failed:', error)
      toast.error('Unable to generate Discover suggestions right now. Please retry.')
      setViewState('questions')
    }
  }

  const resetDiscover = () => {
    setViewState('questions')
    setCurrentStep(1)
    setLocationPlace(null)
  }

  return (
    <>
      <Header />

      <div className="relative min-h-screen bg-cream dark:bg-[#0B1120] pt-28 pb-16 px-5 sm:px-10 md:px-16 lg:px-24 overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-[-10%] w-[460px] h-[460px] rounded-full bg-coral/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full bg-teal/10 blur-[110px]" />
          <div className="absolute top-[40%] left-[30%] w-[360px] h-[360px] rounded-full bg-amber/10 blur-[110px]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide bg-white/70 dark:bg-white/10 text-navy dark:text-white border border-cream-dark/70 dark:border-white/10">
              <Sparkles className="w-4 h-4 text-coral" />
              Discover Activities Nearby
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-navy dark:text-white mt-4 mb-4">
              Don&apos;t know the destination yet?
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Tell us your mood and activity style. We&apos;ll suggest what to do around your area, whether you&apos;re solo, with friends, or with your partner.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {viewState === 'questions' && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-cream-dark/60 dark:border-white/10 p-6 md:p-10 shadow-xl"
              >
                <div className="mb-10">
                  <div className="flex items-center gap-4">
                    {steps.map((step, idx) => (
                      <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              currentStep >= step.id
                                ? 'bg-gradient-to-br from-coral to-amber text-white shadow-lg shadow-coral/25'
                                : 'bg-cream-dark dark:bg-white/10 text-slate-400'
                            }`}
                          >
                            {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                          </div>
                          <span className={`text-xs font-semibold hidden sm:block ${currentStep >= step.id ? 'text-navy dark:text-white' : 'text-slate-400'}`}>
                            {step.title}
                          </span>
                        </div>
                        {idx < steps.length - 1 && (
                          <div className="flex-1 h-[2px] rounded-full bg-cream-dark dark:bg-white/10 mb-6" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-2">How are you feeling today?</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Pick a mood to tune your discover feed.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                          {discoverMoodOptions.map((mood) => {
                            const selected = formData.mood === mood.id
                            return (
                              <button
                                key={mood.id}
                                type="button"
                                onClick={() => updateFormData({ mood: mood.id })}
                                className={`text-left rounded-2xl border-2 p-5 transition-all duration-300 ${
                                  selected
                                    ? 'border-coral bg-gradient-to-br from-coral/10 to-amber/10 shadow-lg shadow-coral/15 scale-[1.01]'
                                    : 'border-cream-dark dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-coral/40'
                                }`}
                              >
                                <div className="text-2xl mb-2">{mood.emoji}</div>
                                <h3 className="font-serif text-lg font-bold text-navy dark:text-white">{mood.label}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{mood.description}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-3">Who are you going with?</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {discoverCompanionOptions.map((companion) => {
                            const selected = formData.companion === companion.id
                            return (
                              <button
                                key={companion.id}
                                type="button"
                                onClick={() => updateFormData({ companion: companion.id })}
                                className={`rounded-2xl border-2 p-4 text-center transition-all duration-300 ${
                                  selected
                                    ? 'border-amber bg-gradient-to-br from-amber/10 to-coral/10 shadow-lg shadow-amber/15'
                                    : 'border-cream-dark dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-amber/35'
                                }`}
                              >
                                <div className="text-2xl mb-2">{companion.emoji}</div>
                                <p className="font-semibold text-navy dark:text-white text-sm">{companion.label}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-2">What do you want to do?</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Add activities like skills on LinkedIn. Search from 60 options, click to append, and build your ideal mix.
                        </p>
                      </div>

                      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
                        <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-4 md:p-5 bg-white/70 dark:bg-white/5">
                          <p className="text-sm font-semibold text-navy dark:text-white mb-3">Search and add activities</p>
                          <div className="rounded-xl border border-cream-dark dark:border-white/10 bg-white/80 dark:bg-[#0F172A]/40">
                            <div className="flex flex-wrap items-center gap-2 p-3">
                              {selectedActivityDetails.map((activity) => (
                                <span
                                  key={activity.id}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-coral/25 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-navy dark:text-white"
                                >
                                  <span>{activity.emoji}</span>
                                  {activity.label}
                                  <button
                                    type="button"
                                    onClick={() => removeActivity(activity.id)}
                                    className="rounded-full p-0.5 text-slate-500 hover:text-coral"
                                    aria-label={`Remove ${activity.label}`}
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}

                              <div className="relative flex-1 min-w-[220px]">
                                <Search className="w-4 h-4 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
                                <input
                                  value={activityQuery}
                                  onChange={(event) => setActivityQuery(event.target.value)}
                                  onKeyDown={handleActivityInputKeyDown}
                                  placeholder="Type an activity (e.g. pottery, ziplining, wine tasting)"
                                  className="w-full bg-transparent pl-8 pr-2 py-2 text-sm text-navy dark:text-white placeholder:text-slate-400 outline-none"
                                />
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                            Press Enter to add top suggestion. Backspace removes the last chip when input is empty.
                          </p>

                          <div className="mt-4 rounded-xl border border-cream-dark dark:border-white/10 divide-y divide-cream-dark/70 dark:divide-white/10 bg-white/70 dark:bg-[#0F172A]/30 max-h-[320px] overflow-y-auto">
                            {activitySuggestions.length > 0 ? (
                              activitySuggestions.map((activity) => (
                                <button
                                  key={activity.id}
                                  type="button"
                                  onClick={() => addActivity(activity.id)}
                                  className="w-full text-left px-4 py-3 hover:bg-coral/5 dark:hover:bg-white/5 transition-colors"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="font-semibold text-sm text-navy dark:text-white flex items-center gap-2">
                                        <span>{activity.emoji}</span>
                                        {activity.label}
                                      </p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.description}</p>
                                    </div>
                                    <span className="text-[11px] rounded-full border border-coral/25 bg-coral/10 px-2 py-1 font-semibold text-coral">
                                      Add
                                    </span>
                                  </div>
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                No matching activities. Try another keyword.
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-4 bg-white/70 dark:bg-white/5">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-sm font-semibold text-navy dark:text-white">Selected Activities</p>
                              <span className="text-xs font-bold text-coral">
                                {selectedCount}/{MAX_ACTIVITY_SELECTION}
                              </span>
                            </div>

                            {selectedActivityDetails.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {selectedActivityDetails.map((activity) => (
                                  <span
                                    key={activity.id}
                                    className="inline-flex items-center gap-1 rounded-full border border-teal/25 bg-teal/10 px-2.5 py-1 text-xs font-semibold text-navy dark:text-white"
                                  >
                                    {activity.emoji} {activity.label}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500 dark:text-slate-400">Start typing to add activities to your list.</p>
                            )}
                          </div>

                          <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-4 bg-white/70 dark:bg-white/5">
                            <p className="text-sm font-semibold text-navy dark:text-white mb-3">Popular For Your Mood</p>
                            <div className="flex flex-wrap gap-2">
                              {quickActivityPicks.map((activity) => (
                                <button
                                  key={activity.id}
                                  type="button"
                                  onClick={() => addActivity(activity.id)}
                                  className="rounded-full border border-cream-dark dark:border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-coral/40 hover:text-coral transition-colors"
                                >
                                  + {activity.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-7"
                    >
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-navy dark:text-white mb-2">Filter nearby suggestions</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Set your area, time window, and energy level.</p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-navy dark:text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-coral" />
                          City / Area
                        </label>

                        {hasPlacesApiKey ? (
                          <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                              value: locationPlace,
                              onChange: (value) => {
                                setLocationPlace(value)
                                updateFormData({ location: value?.label || '' })
                              },
                              onInputChange: (value, actionMeta) => {
                                if (actionMeta.action === 'input-change') {
                                  updateFormData({ location: value })
                                }
                              },
                              placeholder: 'Search your city or locality',
                              styles: discoverPlacesStyles('8, 89%, 62%', isDark),
                              isClearable: true,
                            }}
                          />
                        ) : (
                          <>
                            <Input
                              value={formData.location}
                              onChange={(e) => updateFormData({ location: e.target.value })}
                              placeholder="e.g. Bangalore, Koramangala"
                              className="h-12 rounded-xl bg-white/80 dark:bg-white/5 border-cream-dark dark:border-white/10"
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Add VITE_GOOGLE_PLACE_API_KEY in your .env to enable Places autocomplete.
                            </p>
                          </>
                        )}
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-5 bg-white/60 dark:bg-white/5">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-navy dark:text-white flex items-center gap-2">
                              <Route className="w-4 h-4 text-teal" /> Radius
                            </span>
                            <span className="text-sm font-bold text-coral">{formData.radiusKm} km</span>
                          </div>
                          <input
                            type="range"
                            min={5}
                            max={60}
                            step={1}
                            value={formData.radiusKm}
                            onChange={(e) => updateFormData({ radiusKm: Number(e.target.value) })}
                            className="w-full accent-coral"
                          />
                          <div className="mt-2 flex justify-between text-xs text-slate-400">
                            <span>5 km</span>
                            <span>60 km</span>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-5 bg-white/60 dark:bg-white/5">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-navy dark:text-white flex items-center gap-2">
                              <Clock3 className="w-4 h-4 text-amber" /> Free Hours
                            </span>
                            <span className="text-sm font-bold text-coral">{formData.maxHours}h</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {discoverHourOptions.map((hours) => (
                              <button
                                type="button"
                                key={hours}
                                onClick={() => updateFormData({ maxHours: hours })}
                                className={`rounded-xl border px-2 py-2 text-sm font-medium transition-colors ${
                                  formData.maxHours === hours
                                    ? 'border-coral bg-coral/10 text-coral'
                                    : 'border-cream-dark dark:border-white/10 text-slate-500 dark:text-slate-300 hover:border-coral/35'
                                }`}
                              >
                                {hours}h
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-5 bg-white/60 dark:bg-white/5">
                          <label className="text-sm font-semibold text-navy dark:text-white mb-3 flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-coral" /> Energy
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {discoverEnergyOptions.map((energy) => (
                              <button
                                type="button"
                                key={energy.id}
                                onClick={() => updateFormData({ energy: energy.id })}
                                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                                  formData.energy === energy.id
                                    ? 'border-coral bg-coral/10 text-coral'
                                    : 'border-cream-dark dark:border-white/10 text-slate-500 dark:text-slate-300 hover:border-coral/35'
                                }`}
                              >
                                {energy.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-cream-dark dark:border-white/10 p-5 bg-white/60 dark:bg-white/5">
                          <label className="text-sm font-semibold text-navy dark:text-white mb-3 block">Preferred Time</label>
                          <div className="flex flex-wrap gap-2">
                            {discoverTimeOptions.map((slot) => (
                              <button
                                type="button"
                                key={slot.id}
                                onClick={() => updateFormData({ preferredTime: slot.id })}
                                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                                  formData.preferredTime === slot.id
                                    ? 'border-coral bg-coral/10 text-coral'
                                    : 'border-cream-dark dark:border-white/10 text-slate-500 dark:text-slate-300 hover:border-coral/35'
                                }`}
                              >
                                {slot.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-10 pt-6 border-t border-cream-dark/60 dark:border-white/10 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={currentStep === 1 ? undefined : prevStep}
                    disabled={currentStep === 1}
                    className="rounded-full px-6 py-5 text-navy dark:text-white hover:text-coral hover:bg-coral/5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      onClick={nextStep}
                      className="rounded-full px-7 py-5 font-semibold text-white bg-gradient-to-r from-coral to-amber hover:from-coral-hover"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleGenerate}
                      className="rounded-full px-8 py-5 font-bold text-white bg-gradient-to-r from-coral via-amber to-coral bg-[length:200%] hover:bg-right"
                    >
                      <Sparkles className="w-4 h-4" /> Discover Nearby
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {viewState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-cream-dark/60 dark:border-white/10 p-12 shadow-xl text-center"
              >
                <div className="w-14 h-14 border-4 border-coral/30 border-t-coral rounded-full animate-spin mx-auto mb-5" />
                <h2 className="font-serif text-3xl font-bold text-navy dark:text-white mb-2">Curating your Discover feed</h2>
                <p className="text-slate-500 dark:text-slate-400">Atlas Prime is finding nearby places and activities based on your mood, time, and companion style...</p>
              </motion.div>
            )}

            {viewState === 'results' && discoverOutput && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-cream-dark/60 dark:border-white/10 p-6 md:p-8 shadow-xl">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy dark:text-white mb-2">{discoverOutput.headline}</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">{discoverOutput.subline}</p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="rounded-xl bg-white/70 dark:bg-white/5 border border-cream-dark dark:border-white/10 p-3">
                      <span className="text-slate-400 text-xs">Mood</span>
                      <p className="font-semibold text-navy dark:text-white capitalize">{formData.mood}</p>
                    </div>
                    <div className="rounded-xl bg-white/70 dark:bg-white/5 border border-cream-dark dark:border-white/10 p-3">
                      <span className="text-slate-400 text-xs">Companion</span>
                      <p className="font-semibold text-navy dark:text-white capitalize">{formData.companion}</p>
                    </div>
                    <div className="rounded-xl bg-white/70 dark:bg-white/5 border border-cream-dark dark:border-white/10 p-3">
                      <span className="text-slate-400 text-xs">Radius</span>
                      <p className="font-semibold text-navy dark:text-white">{formData.radiusKm} km</p>
                    </div>
                    <div className="rounded-xl bg-white/70 dark:bg-white/5 border border-cream-dark dark:border-white/10 p-3">
                      <span className="text-slate-400 text-xs">Free Time</span>
                      <p className="font-semibold text-navy dark:text-white">{formData.maxHours}h</p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {discoverOutput.recommendations.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-cream-dark/70 dark:border-white/10 bg-white/85 dark:bg-white/5 p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-2xl mb-2">{item.emoji}</p>
                          <h3 className="font-serif text-2xl font-bold text-navy dark:text-white">{item.title}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.description}</p>
                        </div>
                        <div className="rounded-full px-3 py-1 text-xs font-bold bg-gradient-to-r from-coral to-amber text-white shadow-md shrink-0">
                          {item.matchScore}% match
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{item.reason}</p>

                      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                        <div className="rounded-lg border border-cream-dark dark:border-white/10 p-2 bg-cream/60 dark:bg-white/5">
                          <span className="text-slate-400">Distance</span>
                          <p className="font-semibold text-navy dark:text-white mt-0.5">{item.distanceHint}</p>
                        </div>
                        <div className="rounded-lg border border-cream-dark dark:border-white/10 p-2 bg-cream/60 dark:bg-white/5">
                          <span className="text-slate-400">Duration</span>
                          <p className="font-semibold text-navy dark:text-white mt-0.5">{item.duration}</p>
                        </div>
                        <div className="rounded-lg border border-cream-dark dark:border-white/10 p-2 bg-cream/60 dark:bg-white/5">
                          <span className="text-slate-400">Best Time</span>
                          <p className="font-semibold text-navy dark:text-white mt-0.5 capitalize">{item.bestTime[0]}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Where to look nearby</p>
                        <div className="flex flex-wrap gap-2">
                          {item.nearbySpots.slice(0, 2).map((spot) => (
                            <span
                              key={spot}
                              className="inline-block rounded-full px-3 py-1 text-xs bg-coral/10 text-coral"
                            >
                              {spot}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-cream-dark dark:border-white/10 p-3 bg-white/70 dark:bg-white/[0.03]">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Quick plan</p>
                        <ul className="space-y-1.5">
                          {item.quickPlan.map((line) => (
                            <li key={line} className="text-sm text-slate-600 dark:text-slate-300">• {line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-cream-dark/60 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                  <Button variant="ghost" onClick={resetDiscover} className="rounded-full px-6 py-5 text-navy dark:text-white hover:text-coral hover:bg-coral/5">
                    <RefreshCcw className="w-4 h-4" /> Refine Answers
                  </Button>

                  <Link to="/create-trip">
                    <Button className="rounded-full px-7 py-5 font-semibold bg-gradient-to-r from-coral to-amber text-white">
                      Plan Full Trip <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Discover
