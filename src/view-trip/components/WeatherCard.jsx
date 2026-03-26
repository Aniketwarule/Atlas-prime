import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Droplets } from 'lucide-react';

const codeMap = {
  0: { l: 'Clear', I: Sun, c: 'text-amber-400' }, 1: { l: 'Clear', I: Sun, c: 'text-amber-400' },
  2: { l: 'Partly Cloudy', I: Cloud, c: 'text-slate-400' }, 3: { l: 'Overcast', I: Cloud, c: 'text-slate-500' },
  45: { l: 'Foggy', I: Cloud, c: 'text-slate-400' }, 48: { l: 'Fog', I: Cloud, c: 'text-slate-400' },
  51: { l: 'Drizzle', I: CloudDrizzle, c: 'text-blue-400' }, 53: { l: 'Drizzle', I: CloudDrizzle, c: 'text-blue-400' },
  55: { l: 'Drizzle', I: CloudDrizzle, c: 'text-blue-500' },
  61: { l: 'Rain', I: CloudRain, c: 'text-blue-400' }, 63: { l: 'Rain', I: CloudRain, c: 'text-blue-500' },
  65: { l: 'Heavy Rain', I: CloudRain, c: 'text-blue-600' },
  71: { l: 'Snow', I: CloudSnow, c: 'text-cyan-300' }, 73: { l: 'Snow', I: CloudSnow, c: 'text-cyan-400' },
  75: { l: 'Heavy Snow', I: CloudSnow, c: 'text-cyan-500' },
  80: { l: 'Showers', I: CloudRain, c: 'text-blue-500' }, 81: { l: 'Showers', I: CloudRain, c: 'text-blue-500' },
  82: { l: 'Heavy Showers', I: CloudRain, c: 'text-blue-600' },
  95: { l: 'Storm', I: CloudLightning, c: 'text-purple-500' },
  96: { l: 'Storm+Hail', I: CloudLightning, c: 'text-purple-600' },
  99: { l: 'Severe Storm', I: CloudLightning, c: 'text-purple-700' },
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeatherCard({ trip }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (trip) fetchWeather(); }, [trip]);

  const fetchWeather = async () => {
    try {
      let lat, lon;
      const hotels = trip?.tripData?.hotels;
      const itinerary = trip?.tripData?.itinerary;
      if (hotels?.[0]?.geoCoordinates) { lat = hotels[0].geoCoordinates.latitude; lon = hotels[0].geoCoordinates.longitude; }
      else if (itinerary) {
        const entries = Array.isArray(itinerary) ? itinerary : Object.values(itinerary);
        for (const day of entries) {
          if (day?.activities?.[0]?.geoCoordinates) { lat = day.activities[0].geoCoordinates.latitude; lon = day.activities[0].geoCoordinates.longitude; break; }
        }
      }
      if (!lat || !lon) { setLoading(false); return; }

      const dep = trip?.userSelection?.departureDate;
      const n = parseInt(trip?.userSelection?.noOfDays || trip?.tripData?.totalDays || 5);
      let s, e;
      if (dep) { s = dep; const d = new Date(dep); d.setDate(d.getDate() + n - 1); e = d.toISOString().split('T')[0]; }
      else { const t = new Date(); s = t.toISOString().split('T')[0]; const d = new Date(t); d.setDate(d.getDate() + n - 1); e = d.toISOString().split('T')[0]; }

      const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto&start_date=${s}&end_date=${e}`);
      const data = await resp.json();
      if (data?.daily) setWeather(data.daily);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading || !weather) return null;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-cream-dark/40 dark:border-white/5 p-6 shadow-sm">
      <div className="flex justify-between items-end mb-5">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌤️</span>
          <div>
            <h3 className="font-serif text-xl font-bold text-navy dark:text-white">Weather Forecast</h3>
            <p className="text-xs text-slate-400">During your trip</p>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold animate-pulse pb-1">
          Scroll ➔
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 snap-x">
        {weather.time?.map((date, i) => {
          const info = codeMap[weather.weathercode[i]] || { l: '—', I: Cloud, c: 'text-slate-400' };
          const Ic = info.I;
          const d = new Date(date + 'T00:00:00');
          return (
            <div key={date} className="flex-shrink-0 bg-cream/50 dark:bg-white/[0.03] border border-cream-dark/40 dark:border-white/5 rounded-xl p-3 min-w-[100px] text-center hover:bg-cream dark:hover:bg-white/[0.05] transition-all group snap-start">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{days[d.getDay()]}</p>
              <p className="text-[10px] text-slate-400 mb-2">{d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
              <Ic className={`w-7 h-7 mx-auto mb-2 ${info.c} group-hover:scale-110 transition-transform`} />
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-sm font-bold text-navy dark:text-white">{Math.round(weather.temperature_2m_max[i])}°</span>
                <span className="text-xs text-slate-400">{Math.round(weather.temperature_2m_min[i])}°</span>
              </div>
              {weather.precipitation_sum[i] > 0 && (
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span className="text-[9px] text-blue-400">{weather.precipitation_sum[i]}mm</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherCard;
