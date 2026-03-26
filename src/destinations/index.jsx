import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, MapPin } from 'lucide-react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { hardcodedDestinationCards } from '@/constants/hardcodedTrips'

function DestinationGrid({ title, subtitle, cards }) {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy dark:text-white">{title}</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Link
            key={card.tripId}
            to={`/view-trip/${card.tripId}`}
            className="group bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-cream-dark/50 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full h-24 rounded-xl overflow-hidden mb-3">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <p className="font-serif text-xl font-bold text-navy dark:text-white group-hover:text-coral transition-colors">
              {card.city}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.country}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{card.duration} days · {card.price}</p>
            <p className="text-[11px] text-coral/90 mt-1 font-semibold">{card.packageTitle}</p>

            <div className="mt-4 inline-flex items-center gap-1.5 text-coral text-sm font-semibold">
              View Trip
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function DestinationsPage() {
  const indiaCards = hardcodedDestinationCards.filter((card) => card.isIndia)
  const globalCards = hardcodedDestinationCards.filter((card) => !card.isIndia)

  return (
    <>
      <Header />

      <div className="min-h-screen bg-cream dark:bg-[#0B1120] transition-colors duration-500 pt-28 pb-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral bg-white/70 dark:bg-white/10 border border-cream-dark dark:border-white/10 rounded-full px-4 py-2">
              <Globe className="w-4 h-4" />
              Destinations
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-navy dark:text-white mt-4 mb-4">
              Explore Curated Trips
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Pick a destination and open a ready-to-view itinerary instantly. These are curated samples and work even when live AI generation is unavailable.
            </p>
          </div>

          <DestinationGrid
            title="From India"
            subtitle="Quick getaways and iconic routes across India."
            cards={indiaCards}
          />

          <DestinationGrid
            title="International"
            subtitle="Global escapes curated for premium trip planning."
            cards={globalCards}
          />

          <div className="text-center mt-6">
            <Link to="/create-trip">
              <Button className="rounded-full px-8 py-6 text-base font-semibold bg-gradient-to-r from-coral to-amber text-white">
                Plan a Custom Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DestinationsPage
