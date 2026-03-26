import React from 'react';
import { Lightbulb } from 'lucide-react';

function TravelHacks({ trip }) {
  const hacks = trip?.tripData?.travelHacks;
  if (!hacks || !hacks.length) return null;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/5 rounded-2xl border border-amber-500/20 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-navy dark:text-white">Insider Travel Hacks</h3>
          <p className="text-xs text-amber-600/60 dark:text-amber-400/60">Local secrets & money-saving tricks</p>
        </div>
      </div>

      <div className="space-y-3">
        {hacks.map((hack, i) => (
          <div key={i} className="bg-white/60 dark:bg-white/[0.03] border border-amber-200/40 dark:border-white/5 rounded-xl p-4 hover:bg-white dark:hover:bg-white/[0.05] transition-colors group">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{hack.icon || '💡'}</span>
              <div>
                <h4 className="text-base font-bold text-amber-700 dark:text-amber-300 mb-1">{hack.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{hack.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelHacks;
