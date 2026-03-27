import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { generateContent } from '@/service/AIModel';
import { PROMPT_STAGE_2, PROMPT_STAGE_3 } from '@/constants/options';
import { getHardcodedTripById } from '@/constants/hardcodedTrips';
import { getTripDocumentFromCache, upsertTripDocumentInCache } from '@/lib/tripCache';
import Header from '@/components/custom/Header';
import InformationSection from '../components/InformationSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import TransportOptions from '../components/TransportOptions';
import WeatherCard from '../components/WeatherCard';
import CostBreakdown from '../components/CostBreakdown';
import LocalExperiences from '../components/LocalExperiences';
import TravelHacks from '../components/TravelHacks';
import Footer from '../components/Footer';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stageLoading, setStageLoading] = useState(null);
  const stage2Triggered = useRef(false);
  const stage3Triggered = useRef(false);

  const GetTripData = async () => {
    const hardcodedTrip = getHardcodedTripById(tripId);
    const cachedTrip = getTripDocumentFromCache(tripId);

    if (cachedTrip) {
      setTrip(cachedTrip);
    } else if (hardcodedTrip) {
      setTrip(hardcodedTrip);
      toast('Loaded curated destination itinerary.');
    } else {
      toast('No trip found');
    }

    setLoading(false);
  };

  useEffect(() => { tripId && GetTripData(); }, [tripId]);

  useEffect(() => {
    if (trip && trip.stage === 1 && !stage2Triggered.current) {
      stage2Triggered.current = true;
      runStage2();
    }
  }, [trip]);

  useEffect(() => {
    if (trip && trip.stage === 2 && !stage3Triggered.current) {
      stage3Triggered.current = true;
      runStage3();
    }
  }, [trip]);

  const parseAIResponse = (text) => {
    let c = text.trim();
    c = c.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');
    const s = c.indexOf('{'), e = c.lastIndexOf('}');
    if (s !== -1 && e !== -1) c = c.substring(s, e + 1);
    let p = JSON.parse(c);
    if (Array.isArray(p)) p = p[0];
    return p;
  };

  const runStage2 = async () => {
    setStageLoading(2);
    try {
      const sel = trip.userSelection;
      const prompt = PROMPT_STAGE_2
        .replace('{location}', sel?.location?.label)
        .replace('{totalDays}', sel?.noOfDays)
        .replace('{traveler}', sel?.traveler)
        .replace('{budget}', sel?.budget)
        .replace('{travelMode}', sel?.travelMode)
        .replace('{sourceLocation}', sel?.sourceLocation?.label);
      const text = await generateContent(prompt);
      const data = parseAIResponse(text);
      setTrip((prev) => {
        if (!prev) return prev;

        const updated = {
          ...prev,
          stage: 2,
          tripData: {
            ...prev.tripData,
            hotels: data.hotels || [],
            hostels: data.hostels || [],
            transportOptions: data.transportOptions || [],
          },
        };

        upsertTripDocumentInCache(updated);
        return updated;
      });
    } catch (err) {
      console.error("Stage 2 failed:", err);
      toast.error("Failed to load hotel recommendations. Refresh to retry.");
    }
    setStageLoading(null);
  };

  const runStage3 = async () => {
    setStageLoading(3);
    try {
      const sel = trip.userSelection;
      const prompt = PROMPT_STAGE_3
        .replace('{location}', sel?.location?.label)
        .replace('{totalDays}', sel?.noOfDays)
        .replace('{traveler}', sel?.traveler)
        .replace('{budget}', sel?.budget)
        .replace('{travelMode}', sel?.travelMode)
        .replace('{travelInterests}', sel?.travelInterests?.join(', ') || 'general sightseeing');
      const text = await generateContent(prompt);
      const data = parseAIResponse(text);
      setTrip((prev) => {
        if (!prev) return prev;

        const updated = {
          ...prev,
          stage: 3,
          tripData: {
            ...prev.tripData,
            costBreakdown: data.costBreakdown || {},
            localExperiences: data.localExperiences || [],
            travelHacks: data.travelHacks || [],
          },
        };

        upsertTripDocumentInCache(updated);
        return updated;
      });
    } catch (err) {
      console.error("Stage 3 failed:", err);
      toast.error("Failed to load extras. Refresh to retry.");
    }
    setStageLoading(null);
  };

  const StageLoader = ({ label }) => (
    <div className="bg-white dark:bg-[#111827] border border-cream-dark/40 dark:border-white/5 rounded-2xl p-8 flex flex-col items-center gap-3">
      <AiOutlineLoading3Quarters className="w-7 h-7 text-coral animate-spin" />
      <p className="text-base text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-coral/40 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-cream dark:bg-[#0B1120] pt-28 flex items-center justify-center transition-colors">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-coral/30 border-t-coral rounded-full animate-spin" />
            <p className="text-slate-500 text-lg font-medium animate-pulse">Loading your itinerary...</p>
          </div>
        </div>
      </>
    );
  }

  const currentStage = trip?.stage || 1;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cream dark:bg-[#0B1120] pt-24 pb-16 font-sans transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

          {/* ═══ HERO ═══ */}
          <InformationSection trip={trip} />

          {/* ═══ SECTION A: Itinerary (left 60%) + Sidebar (right 40%) ═══ */}
          <div className="mt-10 grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <PlacesToVisit trip={trip} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              {currentStage >= 3 ? (
                <CostBreakdown trip={trip} />
              ) : stageLoading === 3 ? (
                <StageLoader label="Calculating costs..." />
              ) : stageLoading === 2 ? (
                <div className="bg-white dark:bg-[#111827] border border-cream-dark/40 dark:border-white/5 rounded-2xl p-6">
                  <div className="h-5 bg-cream-dark dark:bg-white/5 rounded w-2/3 mb-4 animate-pulse" />
                  <div className="space-y-3">
                    {[1,2,3].map(i => <div key={i} className="h-4 bg-cream-dark dark:bg-white/5 rounded animate-pulse" />)}
                  </div>
                </div>
              ) : null}
              <WeatherCard trip={trip} />
            </div>
          </div>

          {/* ═══ SECTION B: Hotels/Hostels ═══ */}
          {currentStage >= 2 ? (
            <div className="mt-12 animate-fade-in-up">
              <Hotels trip={trip} />
            </div>
          ) : stageLoading === 2 && (
            <div className="mt-12">
              <StageLoader label="Finding the best stays for you..." />
            </div>
          )}

          {/* ═══ SECTION C: Transport Options ═══ */}
          {currentStage >= 2 && (
            <div className="mt-10 animate-fade-in-up">
              <TransportOptions trip={trip} />
            </div>
          )}

          {/* ═══ SECTION D: Experiences + Hacks ═══ */}
          {currentStage >= 3 ? (
            <div className="mt-12 grid lg:grid-cols-5 gap-8 animate-fade-in-up">
              <div className="lg:col-span-3">
                <LocalExperiences trip={trip} />
              </div>
              <div className="lg:col-span-2">
                <TravelHacks trip={trip} />
              </div>
            </div>
          ) : stageLoading === 3 && (
            <div className="mt-12">
              <StageLoader label="Discovering local secrets & hacks..." />
            </div>
          )}

          <Footer />
        </div>
      </div>
    </>
  );
}

export default ViewTrip;