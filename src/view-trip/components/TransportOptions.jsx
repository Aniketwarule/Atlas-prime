import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plane, Train, Bus, Car } from 'lucide-react';

const modeIcons = { Flight: Plane, Train: Train, Bus: Bus, Car: Car };

function TransportOptions({ trip }) {
  const transportOptions = trip?.tripData?.transportOptions || trip?.tripData?.travelDetails?.options;
  const mode = trip?.userSelection?.travelMode || trip?.tripData?.travelDetails?.suggestedMode;
  if (!transportOptions?.length) return null;

  const ModeIcon = modeIcons[mode] || Plane;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <ModeIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-navy dark:text-white">{mode} Options</h3>
          <p className="text-xs text-slate-400">
            {trip?.userSelection?.sourceLocation?.label} → {trip?.userSelection?.location?.label}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {transportOptions.map((opt, i) => (
          <div key={i} className="bg-white dark:bg-[#111827] border border-cream-dark/40 dark:border-white/5 rounded-2xl p-5 hover:border-coral/20 dark:hover:border-white/10 transition-all flex items-center gap-4 shadow-sm">
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Name</p>
                <p className="font-semibold text-base text-navy dark:text-white">{opt.name || opt.trainName || opt.airline || opt.busName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Duration</p>
                <p className="text-base text-slate-600 dark:text-slate-300">{opt.duration}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Price</p>
                <p className="text-base font-bold text-green-600 dark:text-green-400">{opt.price}</p>
              </div>
              <div className="flex items-end">
                <Button size="sm" onClick={() => opt.bookingLink && window.open(opt.bookingLink, '_blank')}
                  className="bg-coral/10 border border-coral/20 text-coral hover:bg-coral/20 rounded-xl text-sm px-4 py-2">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Book
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransportOptions;
