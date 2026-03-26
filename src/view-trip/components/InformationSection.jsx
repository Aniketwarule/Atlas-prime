import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Calendar, Clock, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { generateTripPdf } from '@/lib/tripPdf';

function InformationSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (trip) {
      const loc = trip?.userSelection?.location?.label || trip?.tripData?.destination;
      if (loc) fetchPhoto(loc);
    }
  }, [trip]);

  const fetchPhoto = async (loc) => {
    try {
      const resp = await GetPlaceDetails({ textQuery: loc });
      if (resp?.places?.[0]?.photos?.length) {
        setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', resp.places[0].photos[0].name));
      }
    } catch (e) { console.error(e); }
  };

  const sel = trip?.userSelection;
  const td = trip?.tripData;
  const destination = sel?.location?.label || td?.destination || 'Your Destination';
  const days = sel?.noOfDays || td?.totalDays || '—';
  const depDate = sel?.departureDate;
  const retDate = sel?.returnDate;
  const highlights = td?.tripHighlights || [];
  const bannerImage = photoUrl || td?.bannerImage;

  const formatDateRange = () => {
    if (!depDate) return '';
    const d1 = new Date(depDate);
    const d2 = retDate ? new Date(retDate) : null;
    const opts = { month: 'short', day: 'numeric', year: 'numeric' };
    if (d2) return `${d1.toLocaleDateString('en-US', opts)} – ${d2.toLocaleDateString('en-US', opts)}`;
    return d1.toLocaleDateString('en-US', opts);
  };

  const handleExportPdf = () => {
    try {
      generateTripPdf(trip);
      toast.success('Your detailed AtlasPrime itinerary PDF is downloading.');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Unable to generate PDF right now. Please try again.');
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/create-trip">
          <Button variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-coral rounded-full px-4 py-2 text-sm font-medium gap-2">
            <ArrowLeft className="w-4 h-4" /> Edit Preferences
          </Button>
        </Link>
        <Button onClick={handleExportPdf} variant="outline"
          className="border-coral/40 text-coral hover:bg-coral/10 rounded-full px-5 py-2 text-sm font-medium gap-2 print:hidden">
          <Download className="w-4 h-4" /> Export PDF
        </Button>
      </div>

      {/* Hero Banner with Real Destination Image */}
      <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: '280px' }}>
        {/* Background Image */}
        {bannerImage ? (
          <img src={bannerImage} alt={destination}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800" />
        )}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative p-8 md:p-12 flex flex-col justify-end min-h-[280px]">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sel?.budget && (
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-400/25 text-blue-200 border border-blue-400/40 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                {sel.budget} tier
              </span>
            )}
            {sel?.traveler && (
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-400/25 text-blue-200 border border-blue-400/40 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                {sel.travelerType || sel.traveler} trip
              </span>
            )}
            {sel?.travelMode && (
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-400/25 text-blue-200 border border-blue-400/40 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                via {sel.travelMode}
              </span>
            )}
          </div>

          {/* Destination Name */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-xl">
            {destination.split(',')[0]}
          </h1>

          {/* Date & Duration */}
          <div className="flex items-center gap-5 text-white/80 text-base">
            {depDate && (
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" /> {formatDateRange()}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> {days} Days
            </span>
          </div>
        </div>
      </div>

      {/* Trip Highlights */}
      {highlights.length > 0 && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl mt-5 p-6 border border-cream-dark/40 dark:border-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-3">Trip Highlights</p>
          <div className="flex flex-wrap gap-3">
            {highlights.map((h, i) => (
              <span key={i} className="text-sm font-medium text-navy dark:text-slate-300 bg-cream dark:bg-white/5 border border-cream-dark dark:border-white/10 rounded-full px-5 py-2.5">
                ✓ {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InformationSection;