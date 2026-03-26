import React from 'react';
import { Compass } from 'lucide-react';

const catColors = {
  Food: 'border-orange-500/20 text-orange-500 dark:text-orange-400 bg-orange-500/10',
  Culture: 'border-purple-500/20 text-purple-500 dark:text-purple-400 bg-purple-500/10',
  Adventure: 'border-green-500/20 text-green-500 dark:text-green-400 bg-green-500/10',
  Nightlife: 'border-indigo-500/20 text-indigo-500 dark:text-indigo-400 bg-indigo-500/10',
  Shopping: 'border-pink-500/20 text-pink-500 dark:text-pink-400 bg-pink-500/10',
};

function LocalExperiences({ trip }) {
  const exp = trip?.tripData?.localExperiences;
  if (!exp?.length) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Compass className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-navy dark:text-white">Local Experiences</h3>
          <p className="text-xs text-slate-400">Unique things to try</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exp.map((e, i) => (
          <div key={i} className="bg-white dark:bg-[#111827] border border-cream-dark/40 dark:border-white/5 rounded-2xl p-5 hover:border-coral/20 dark:hover:border-white/10 transition-all group shadow-sm hover:shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{e.icon || '✨'}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${catColors[e.category] || 'border-slate-500/20 text-slate-400 bg-slate-500/10'}`}>
                {e.category}
              </span>
            </div>
            <h4 className="font-semibold text-base text-navy dark:text-white mb-2 group-hover:text-teal transition-colors">{e.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-3">{e.description}</p>
            {e.estimatedCost && <p className="text-sm font-semibold text-green-600 dark:text-green-400">💰 {e.estimatedCost}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocalExperiences;
