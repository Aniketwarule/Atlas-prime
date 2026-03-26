import React, { useState } from 'react';
import PlaceCardItem from './PlaceCarditem';
import { ChevronDown, Sun, Sunset, Moon } from 'lucide-react';

const timeConfig = {
  morning: { icon: Sun, label: 'Morning', dotColor: 'bg-amber-400', lineColor: 'from-amber-400/40' },
  afternoon: { icon: Sunset, label: 'Afternoon', dotColor: 'bg-orange-400', lineColor: 'from-orange-400/40' },
  evening: { icon: Moon, label: 'Evening', dotColor: 'bg-indigo-400', lineColor: 'from-indigo-400/40' },
};

function PlacesToVisit({ trip }) {
  const [openDays, setOpenDays] = useState({ 0: true });

  const getItineraryDays = () => {
    if (!trip?.tripData?.itinerary) return [];
    if (Array.isArray(trip.tripData.itinerary)) return trip.tripData.itinerary;
    return Object.entries(trip.tripData.itinerary).map(([day, data]) => ({
      day: day.replace('day', ''), ...data
    }));
  };

  const itineraryDays = getItineraryDays();
  if (!itineraryDays.length) return null;

  const toggleDay = (i) => setOpenDays(prev => ({ ...prev, [i]: !prev[i] }));

  const getDayDate = (dayIndex) => {
    const dep = trip?.userSelection?.departureDate;
    if (!dep) return null;
    const d = new Date(dep);
    d.setDate(d.getDate() + dayIndex);
    return d;
  };

  const groupByTime = (activities) => {
    const groups = { morning: [], afternoon: [], evening: [] };
    if (!activities) return groups;
    activities.forEach((act) => {
      const t = act.timeOfDay?.toLowerCase() || 'morning';
      (groups[t] || groups.morning).push(act);
    });
    return groups;
  };

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold text-navy dark:text-white mb-6">Daily Itinerary</h2>
      <div className="space-y-4">
        {itineraryDays.map((dayData, index) => {
          const isOpen = openDays[index];
          const d = getDayDate(index);
          const timeGroups = groupByTime(dayData.activities);

          return (
            <div key={`day-${index}`} className="bg-white dark:bg-[#111827] rounded-2xl border border-cream-dark/40 dark:border-white/5 overflow-hidden transition-all duration-300 shadow-sm">
              <button onClick={() => toggleDay(index)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-cream/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-coral to-amber rounded-xl flex items-center justify-center shadow-lg shadow-coral/20 flex-shrink-0">
                  <span className="text-white font-bold text-base">{dayData.day || index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  {d && (
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-coral/70 mb-0.5">
                      {d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                  )}
                  <h4 className="font-serif text-lg font-bold text-navy dark:text-white truncate">
                    {dayData.theme || `Day ${dayData.day || index + 1}`}
                  </h4>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2">
                  {Object.entries(timeGroups).map(([slot, activities]) => {
                    if (!activities.length) return null;
                    const cfg = timeConfig[slot] || timeConfig.morning;
                    const TimeIcon = cfg.icon;
                    return (
                      <div key={slot} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-2.5 h-2.5 rounded-full ${cfg.dotColor}`} />
                          <TimeIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                            {cfg.label}
                          </span>
                        </div>
                        <div className="ml-5 pl-5 border-l-2 border-cream-dark dark:border-white/5 space-y-4">
                          {activities.map((act, i) => <PlaceCardItem key={i} place={act} />)}
                        </div>
                      </div>
                    );
                  })}
                  {Object.values(timeGroups).every(g => !g.length) && dayData.activities && (
                    <div className="space-y-4">
                      {dayData.activities.map((a, i) => <PlaceCardItem key={i} place={a} />)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlacesToVisit;