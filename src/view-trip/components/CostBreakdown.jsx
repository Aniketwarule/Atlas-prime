import React from 'react';

function CostBreakdown({ trip }) {
  const cost = trip?.tripData?.costBreakdown;
  const total = cost?.total || trip?.tripData?.totalEstimatedPrice;
  if (!cost && !total) return null;

  const rows = cost ? Object.entries(cost).filter(([k]) => k !== 'total') : [];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-cream-dark/40 dark:border-white/5 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">💰</span>
        <div>
          <h3 className="font-serif text-xl font-bold text-navy dark:text-white">Estimated Costs</h3>
          <p className="text-xs text-slate-400">Based on {trip?.userSelection?.budget?.toLowerCase() || 'moderate'} tier</p>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="border-t border-cream-dark dark:border-white/5 pt-4">
          <div className="flex justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimate</span>
          </div>
          {rows.map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1.5 py-4 px-1 border-b border-cream-dark/30 dark:border-white/[0.03] last:border-0">
              <span className="text-sm font-bold text-navy dark:text-slate-300 capitalize">{key}</span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-coral/20">
        <span className="text-base font-bold text-coral">Total Est.</span>
        <span className="text-xl font-bold text-coral">{total || '—'}</span>
      </div>
    </div>
  );
}

export default CostBreakdown;
