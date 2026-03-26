import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

function Hotels({ trip }) {
  const [tab, setTab] = useState('hotels');
  const [hotelPhotos, setHotelPhotos] = useState({});

  const hotels = trip?.tripData?.hotels || [];
  const hostels = trip?.tripData?.hostels || [];
  const showTabs = hostels.length > 0;

  useEffect(() => {
    const items = tab === 'hotels' ? hotels : hostels;
    items.forEach((h) => fetchPhoto(h));
  }, [trip, tab]);

  const fetchPhoto = async (hotel) => {
    const name = hotel.hotelName || hotel.hostelName;
    const addr = hotel.hotelAddress || hotel.hostelAddress;
    if (hotelPhotos[name]) return;
    try {
      const resp = await GetPlaceDetails({ textQuery: `${name} ${addr}` });
      if (resp?.places?.[0]?.photos?.length) {
        setHotelPhotos(prev => ({ ...prev, [name]: PHOTO_REF_URL.replace('{NAME}', resp.places[0].photos[0].name) }));
      }
    } catch (e) { console.error(e); }
  };

  const currentItems = tab === 'hotels' ? hotels : hostels;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-3xl font-bold text-navy dark:text-white">
          {showTabs ? 'Where to Stay' : 'Hotel Recommendations'}
        </h2>
        {showTabs && (
          <div className="flex bg-cream-dark dark:bg-white/5 border border-cream-dark dark:border-white/10 rounded-full p-1">
            <button onClick={() => setTab('hotels')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tab === 'hotels' ? 'bg-coral text-white shadow-lg shadow-coral/30' : 'text-slate-500 hover:text-navy dark:hover:text-white'}`}>
              🏨 Hotels
            </button>
            <button onClick={() => setTab('hostels')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tab === 'hostels' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'text-slate-500 hover:text-navy dark:hover:text-white'}`}>
              🎒 Hostels
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {currentItems.map((item, i) => {
          const name = item.hotelName || item.hostelName;
          const addr = item.hotelAddress || item.hostelAddress;
          return (
            <Link key={i}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ', ' + addr)}`}
              target="_blank" className="flex-shrink-0 w-[300px] snap-start">
              <div className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden border border-cream-dark/40 dark:border-white/5 hover:border-coral/20 dark:hover:border-white/10 transition-all duration-500 hover:-translate-y-1 group h-full shadow-sm hover:shadow-xl">
                <div className="relative h-44 overflow-hidden">
                  <img src={hotelPhotos[name] || 'https://images.unsplash.com/photo-1542314831-c6a4d14fff67?auto=format&fit=crop&w=400&q=80'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d14fff67?auto=format&fit=crop&w=400&q=80'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111827] to-transparent" />
                  <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <span className="text-sm font-bold text-green-600 dark:text-green-300">{item.price}</span>
                  </div>
                  {item.rating && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-white">{item.rating}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-base text-navy dark:text-white mb-1.5 group-hover:text-coral transition-colors line-clamp-1">{name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-start gap-1.5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />{addr}
                  </p>
                  {item.description && <p className="text-xs text-slate-400 line-clamp-2 mb-3">{item.description}</p>}
                  {item.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.amenities.slice(0, 3).map((a, j) => (
                        <span key={j} className="text-[10px] bg-cream dark:bg-white/5 text-slate-500 px-2 py-1 rounded-lg">{a}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;