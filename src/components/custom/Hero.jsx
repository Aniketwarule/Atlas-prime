import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { hardcodedDestinationCards } from '@/constants/hardcodedTrips'
import {
  Sparkles, Map, Plane, Globe, Star, ArrowRight, MapPin,
  Brain, Wallet, Compass, ChevronRight, Users, Clock, Shield,
  Twitter, Instagram, Github, Linkedin, Heart, Zap
} from 'lucide-react'

function Hero() {
  return (
    <div className="font-sans bg-cream dark:bg-[#0B1120] transition-colors duration-500">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-cream-dark dark:from-[#0B1120] dark:via-[#0f172a] dark:to-[#0B1120]" />
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-coral/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber/10 rounded-full blur-[100px]" />
          <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-teal/8 rounded-full blur-[80px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{ backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-full shadow-sm border border-cream-dark/60 dark:border-white/10 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-navy dark:text-white tracking-wide">AI-Powered Trip Planning</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 animate-fade-in-up">
            <span className="text-navy dark:text-white">Discover Your</span><br />
            <span className="bg-gradient-to-r from-coral via-amber to-coral bg-clip-text text-transparent bg-[length:200%] animate-shimmer">
              Perfect Journey
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
            Your personal AI travel curator crafts{' '}
            <span className="font-semibold text-navy dark:text-white">bespoke itineraries</span>{' '}
            tailored to your interests, budget, and travel style — in seconds.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up delay-300">
            <Link to="/create-trip">
              <Button className="group px-8 py-6 text-base font-bold bg-gradient-to-r from-coral to-amber hover:from-coral-hover hover:to-amber text-white rounded-full shadow-xl hover:shadow-coral/30 hover:scale-105 transition-all duration-300">
                <span className="flex items-center gap-2.5">
                  Plan My Trip
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="ghost"
                className="px-8 py-6 text-base font-semibold text-navy dark:text-white hover:text-coral border-2 border-cream-dark dark:border-white/20 hover:border-coral/20 rounded-full transition-all hover:bg-coral/5">
                I Don&apos;t Have a Destination
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="ghost"
                className="px-8 py-6 text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-coral border-2 border-cream-dark dark:border-white/20 hover:border-coral/20 rounded-full transition-all hover:bg-coral/5">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400 animate-fade-in delay-500 mb-16">
            {[
              { icon: Shield, text: 'No credit card required' },
              { icon: Zap, text: 'Instant AI results' },
              { icon: Heart, text: '100% personalised' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-teal" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Destination Cards — Clickable curated samples */}
          <div id="destinations" className="max-w-6xl mx-auto animate-fade-in-up delay-500">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-sm uppercase tracking-[0.2em] text-coral/80 font-semibold">Featured Destinations</p>
              <Link to="/destinations" className="text-sm font-semibold text-coral hover:text-coral-hover transition-colors">
                View All Destinations →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hardcodedDestinationCards.slice(0, 3).map((card, i) => (
                <Link
                  key={card.tripId}
                  to={`/view-trip/${card.tripId}`}
                  className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-cream-dark/40 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="relative w-full h-24 rounded-xl overflow-hidden mb-3">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                  <p className="font-semibold text-sm text-navy dark:text-white">{card.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{card.info}</p>
                  <p className="text-[11px] text-coral/90 mt-1 font-semibold">{card.packageTitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 border-y border-cream-dark dark:border-white/5 bg-white/50 dark:bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Trips Planned', icon: Map },
              { value: '50+', label: 'Countries', icon: Globe },
              { value: '4.9', label: 'User Rating', icon: Star },
              { value: '30s', label: 'Avg. Plan Time', icon: Clock },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon className="w-6 h-6 text-coral mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-navy dark:text-white font-serif">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-coral font-semibold text-sm tracking-widest uppercase mb-4">Why Atlas Prime</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy dark:text-white mb-5">
              Travel planning,{' '}
              <span className="bg-gradient-to-r from-coral to-amber bg-clip-text text-transparent">reimagined</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
              Powered by advanced AI to give you a premium, end-to-end trip planning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI-Crafted Itineraries', desc: 'Our AI analyses thousands of travel data points to build perfect day-by-day plans tailored just for you.', gradient: 'from-coral/10 to-amber/10', iconColor: 'text-coral' },
              { icon: Wallet, title: 'Smart Budget Planning', desc: 'Get accurate cost breakdowns across flights, hotels, and activities — optimised for your budget tier.', gradient: 'from-amber/10 to-teal/10', iconColor: 'text-amber' },
              { icon: Compass, title: 'Local Secrets', desc: 'Discover hidden gems, authentic restaurants, and cultural experiences only locals know about.', gradient: 'from-teal/10 to-coral/10', iconColor: 'text-teal' },
            ].map((f, i) => (
              <div key={i} className="group relative bg-white dark:bg-white/5 rounded-3xl p-8 border border-cream-dark/60 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-coral/20 transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-7 h-7 ${f.iconColor}`} />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-3">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-cream-dark/40 dark:from-white/[0.02] to-cream dark:to-[#0B1120]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-amber font-semibold text-sm tracking-widest uppercase mb-4">Simple Process</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy dark:text-white mb-5">
              Three steps to your{' '}
              <span className="bg-gradient-to-r from-amber to-coral bg-clip-text text-transparent">dream trip</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-coral/30 via-amber/30 to-teal/30" />
            {[
              { step: '01', title: 'Tell Us Your Dream', desc: 'Enter your destination, dates, budget, and travel preferences.', emoji: '🌍', color: 'from-coral to-coral-hover' },
              { step: '02', title: 'AI Works Its Magic', desc: 'Our AI crafts a personalised itinerary with hotels, activities, and travel bookings.', emoji: '✨', color: 'from-amber to-amber-light' },
              { step: '03', title: 'Pack & Explore', desc: 'Review your detailed plan, make adjustments, and embark on your adventure.', emoji: '🚀', color: 'from-teal to-emerald-400' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg mb-6 relative z-10`}>
                  <span className="text-3xl">{item.emoji}</span>
                </div>
                <div className="text-xs font-bold text-coral/60 tracking-widest mb-2">{item.step}</div>
                <h3 className="font-serif text-xl font-bold text-navy dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-teal font-semibold text-sm tracking-widest uppercase mb-4">Testimonials</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-navy dark:text-white mb-5">
              Loved by{' '}
              <span className="bg-gradient-to-r from-teal to-coral bg-clip-text text-transparent">travellers</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', role: 'Solo Traveller', text: 'Atlas Prime planned my entire Rajasthan trip in 30 seconds. The hotel recommendations were spot-on!', avatar: '👩🏽', rating: 5 },
              { name: 'Arjun Mehta', role: 'Family Vacationer', text: 'The AI understood that travelling with kids means slower pace. It suggested family-friendly restaurants.', avatar: '👨🏽', rating: 5 },
              { name: 'Sneha Reddy', role: 'Adventure Seeker', text: 'The luxury Bali itinerary included hidden waterfalls and local warungs I never would have found!', avatar: '👩🏻', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-cream-dark/60 dark:border-white/10 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber fill-amber" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-[15px] italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cream-dark to-cream dark:from-white/10 dark:to-white/5 flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-navy dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gradient-to-r from-navy to-navy-light rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] bg-coral/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-50%] left-[-20%] w-[300px] h-[300px] bg-amber/20 rounded-full blur-[60px]" />
            <div className="relative z-10">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
                Ready to plan your next{' '}
                <span className="bg-gradient-to-r from-coral to-amber bg-clip-text text-transparent">adventure?</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
                Join thousands of travellers who trust Atlas Prime to create unforgettable journeys.
              </p>
              <Link to="/create-trip">
                <Button className="px-10 py-6 text-base font-bold bg-gradient-to-r from-coral to-amber text-white rounded-full shadow-2xl shadow-coral/20 hover:scale-105 transition-all">
                  <span className="flex items-center gap-2.5">
                    Start Planning — It's Free <Sparkles className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy text-white/70 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-coral to-amber flex items-center justify-center">
                  <span className="text-white font-bold text-xs">A</span>
                </div>
                <span className="font-serif text-xl font-bold text-white">Atlas Prime</span>
              </div>
              <p className="text-sm leading-relaxed text-white/50">AI-powered travel planning for the modern explorer.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'How It Works', 'Pricing', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-sm text-white/50 hover:text-coral transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© 2026 Atlas Prime. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-coral/20 flex items-center justify-center transition-all hover:scale-110">
                  <Icon className="w-4 h-4 text-white/50 hover:text-coral" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Hero