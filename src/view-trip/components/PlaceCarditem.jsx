import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Ticket, ExternalLink } from 'lucide-react';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (place?.placeName) fetchPhoto();
  }, [place]);

  const fetchPhoto = async () => {
    try {
      const resp = await GetPlaceDetails({ textQuery: `${place.placeName} ${place.geoCoordinates || ''}`.trim() });
      if (resp?.places?.[0]?.photos?.[0]?.name) {
        setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', resp.places[0].photos[0].name));
      }
    } catch (e) { console.error(e); }
  };

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
      target="_blank" rel="noopener noreferrer">
      <div className="bg-cream/50 dark:bg-white/[0.03] border border-cream-dark/40 dark:border-white/5 rounded-xl p-4 flex gap-4 hover:bg-cream dark:hover:bg-white/[0.06] hover:border-coral/20 dark:hover:border-white/10 transition-all duration-300 group cursor-pointer">
        {/* Image */}
        <div className="flex-shrink-0 relative">
          <img src={photoUrl || place?.placeImageUrl || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80'}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
            alt={place?.placeName} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80'; }} />
          {place?.rating && (
            <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 bg-white dark:bg-[#0B1120] border border-amber-500/30 rounded-full px-2 py-0.5 shadow-sm">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">{place.rating}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-base text-navy dark:text-white mb-1.5 group-hover:text-coral transition-colors line-clamp-1">
            {place?.placeName}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">{place?.placeDetails}</p>
          <div className="flex flex-wrap gap-2">
            {place?.ticketPricing && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full">
                <Ticket className="w-3 h-3" />{place.ticketPricing}
              </span>
            )}
            {place?.travelTime && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3" />{place.travelTime}
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;