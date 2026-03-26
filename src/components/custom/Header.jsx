import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '#features' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden ${
        scrolled
          ? isDark
            ? 'py-3 bg-[#0B1120]/90 backdrop-blur-xl shadow-md border-b border-white/5'
            : 'py-3 bg-white/80 backdrop-blur-xl shadow-md border-b border-cream-dark/60'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coral to-amber flex items-center justify-center shadow-lg group-hover:shadow-coral/30 transition-shadow duration-300">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className={`font-serif text-2xl font-bold tracking-tight group-hover:text-coral transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-navy'
          }`}>
            Atlas Prime
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium hover:text-coral transition-colors duration-200 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-amber-300'
                : 'bg-navy/5 hover:bg-navy/10 text-navy'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          <Link to="/create-trip">
            <Button className="text-sm font-semibold bg-gradient-to-r from-coral to-amber hover:from-coral-hover hover:to-amber text-white rounded-full px-6 py-2.5 shadow-lg hover:shadow-coral/25 transition-all duration-300 hover:scale-105">
              Plan My Trip
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isDark ? 'bg-white/10 text-amber-300' : 'bg-navy/5 text-navy'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-cream-dark'}`}
          >
            {mobileOpen
              ? <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />
              : <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-lg animate-slide-up ${
          isDark ? 'bg-[#0B1120]/95 border-white/5' : 'bg-white/95 border-cream-dark'
        }`}>
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium py-2 transition-colors hover:text-coral ${isDark ? 'text-white' : 'text-navy'}`}
              >
                {link.label}
              </Link>
            ))}
            <hr className={isDark ? 'border-white/10' : 'border-cream-dark'} />
            <Link to="/create-trip" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-coral to-amber text-white rounded-xl py-3 font-semibold">
                Plan My Trip
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header