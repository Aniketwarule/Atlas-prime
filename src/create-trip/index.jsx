import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PROMPT_STAGE_1, SelectBudgetoptions, SelectTravelesList, SelectTravelModes, SelectTravelInterests } from '@/constants/options';
import { FaGoogle } from "react-icons/fa";
import React, { useState } from 'react';
import GooglePlacesAutoComplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/fireBaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { generateContent } from '@/service/AIModel';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/custom/Header';
import { useTheme } from '@/context/ThemeContext';
import { savePlannedTripToCache } from '@/lib/tripCache';
import { ArrowLeft, ArrowRight, Check, MapPin, Wallet, Plane, Sparkles, Calendar } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Destinations & Dates', icon: MapPin },
  { id: 2, title: 'Budget & Travelers', icon: Wallet },
  { id: 3, title: 'Travel Mode', icon: Plane },
];

const placesStyles = (accentHsl, isDark) => ({
  control: (base) => ({
    ...base, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", borderRadius: '1rem',
    background: isDark ? 'rgba(15,23,42,0.55)' : 'rgba(255,255,255,0.85)',
    borderColor: isDark ? 'rgba(148,163,184,0.22)' : `hsla(${accentHsl}, 0.3)`, padding: '6px 4px',
    backdropFilter: 'blur(12px)', color: isDark ? '#E2E8F0' : '#0B1120', boxShadow: '0 2px 12px rgba(11,17,32,0.05)',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    '&:hover': {
      borderColor: isDark ? 'rgba(148,163,184,0.4)' : `hsla(${accentHsl}, 0.55)`,
      boxShadow: `0 4px 24px hsla(${accentHsl}, 0.12)`
    },
  }),
  singleValue: (base) => ({ ...base, color: isDark ? '#E2E8F0' : '#0B1120', fontFamily: "'Plus Jakarta Sans'" }),
  input: (base) => ({ ...base, color: isDark ? '#E2E8F0' : '#0B1120', fontFamily: "'Plus Jakarta Sans'" }),
  placeholder: (base) => ({ ...base, color: isDark ? '#94A3B8' : '#94A3B8', fontFamily: "'Plus Jakarta Sans'" }),
  menu: (base) => ({
    ...base, fontFamily: "'Plus Jakarta Sans'",
    background: isDark ? 'rgba(15,23,42,0.98)' : 'rgba(255,248,240,0.98)',
    backdropFilter: 'blur(20px)', border: isDark ? '1px solid rgba(148,163,184,0.22)' : '1px solid rgba(245,237,227,0.6)', borderRadius: '1rem',
    overflow: 'hidden', boxShadow: '0 8px 32px rgba(11,17,32,0.12)',
  }),
  option: (base, state) => ({
    ...base, fontFamily: "'Plus Jakarta Sans'", background: state.isFocused ? `hsla(${accentHsl}, 0.12)` : 'transparent', color: isDark ? '#E2E8F0' : '#0B1120', cursor: 'pointer',
  }),
});

function CreateTrip() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [place, setPlace] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    sourceLocation: null, location: null, noOfDays: '', budget: '',
    traveler: '', travelerType: '', travelMode: '', travelInterests: [], departureDate: '', returnDate: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'departureDate' || name === 'noOfDays') {
        if (updated.departureDate && updated.noOfDays) {
          const d = new Date(updated.departureDate);
          d.setDate(d.getDate() + parseInt(updated.noOfDays, 10));
          updated.returnDate = d.toISOString().split('T')[0];
        } else { updated.returnDate = ''; }
      }
      return updated;
    });
  };

  const handleInterestChange = (interest) => {
    const current = formData.travelInterests || [];
    if (current.includes(interest)) {
      handleInputChange('travelInterests', current.filter((i) => i !== interest));
    } else {
      if (current.length >= 3) {
        toast("You can select up to 3 interests maximum.");
        return;
      }
      handleInputChange('travelInterests', [...current, interest]);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: () => toast.error("Failed to log in."),
  });

  const parseAIResponse = (text) => {
    let cleaned = text.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '');
    const s = cleaned.indexOf('{'), e = cleaned.lastIndexOf('}');
    if (s !== -1 && e !== -1) cleaned = cleaned.substring(s, e + 1);
    let parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) parsed = parsed[0];
    return parsed;
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) { setOpenDialog(true); return; }

    const required = ['sourceLocation', 'location', 'noOfDays', 'budget', 'traveler', 'travelMode', 'departureDate'];
    for (const key of required) {
      if (!formData[key]) { toast("Please fill all the details"); return; }
    }

    setLoading(true);
    try {
      const prompt = PROMPT_STAGE_1
        .replace('{sourceLocation}', formData.sourceLocation?.label)
        .replace('{location}', formData.location?.label)
        .replace('{totalDays}', formData.noOfDays)
        .replace('{traveler}', formData.traveler)
        .replace('{budget}', formData.budget)
        .replace('{travelMode}', formData.travelMode)
        .replace('{travelInterests}', formData.travelInterests?.join(', ') || 'general sightseeing')
        .replace('{departureDate}', formData.departureDate)
        .replace('{returnDate}', formData.returnDate);

      const responseText = await generateContent(prompt);
      const itineraryData = parseAIResponse(responseText);

      // Save Stage 1 to Firebase
      const docId = Date.now().toString();
      const userObj = JSON.parse(localStorage.getItem("user"));
      await setDoc(doc(db, "finaltrip", docId), {
        userSelection: formData,
        tripData: itineraryData,
        stage: 1,
        userEmail: userObj?.email,
        id: docId,
      });

      savePlannedTripToCache({
        tripId: docId,
        formData,
        tripData: itineraryData,
      });

      setLoading(false);
      navi(`/view-trip/${docId}`);
    } catch (error) {
      console.error("AI generation failed:", error);
      setLoading(false);
      toast.error("Failed to generate itinerary. Please try again.");
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: { Authorization: `Bearer ${tokenInfo?.access_token}`, Accept: 'Application/json' }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch(() => toast.error("Failed to fetch user profile."));
  };

  const canProceed = (step) => {
    if (step === 1) return formData.sourceLocation && formData.location && formData.departureDate && formData.noOfDays;
    if (step === 2) return formData.budget && formData.traveler;
    if (step === 3) return formData.travelMode && formData.travelInterests?.length > 0;
    return true;
  };

  const nextStep = () => {
    if (!canProceed(currentStep)) { toast("Please complete this step first."); return; }
    setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-cream dark:bg-[#0B1120] pt-28 pb-16 px-5 sm:px-10 md:px-20 lg:px-32 overflow-hidden font-sans transition-colors duration-500">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-coral/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-amber/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/75 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] shadow-xl border border-cream-dark/50 dark:border-white/10 p-8 md:p-12">

            {/* Stepper */}
            <div className="flex items-center justify-center mb-12">
              {STEPS.map((step, i) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      currentStep > step.id ? 'bg-gradient-to-br from-coral to-amber text-white shadow-lg shadow-coral/25'
                        : currentStep === step.id ? 'bg-gradient-to-br from-coral to-amber text-white shadow-lg shadow-coral/25 animate-glow-pulse'
                        : 'bg-cream-dark dark:bg-white/10 text-slate-400'}`}>
                      {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className={`mt-2 text-xs font-semibold hidden sm:block ${currentStep >= step.id ? 'text-navy dark:text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-4 h-[2px] rounded-full relative overflow-hidden bg-cream-dark dark:bg-white/10 self-start mt-6">
                      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-coral to-amber rounded-full transition-all duration-700 ease-out"
                        style={{ width: currentStep > step.id ? '100%' : '0%' }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-2">{STEPS[currentStep - 1].title}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {currentStep === 1 && 'Tell us where you want to go and when.'}
                {currentStep === 2 && 'Choose your budget and travel companions.'}
                {currentStep === 3 && 'How would you like to get there?'}
              </p>
            </div>

            {/* STEP 1 — Destinations & Dates */}
            <div className={`transition-all duration-500 ${currentStep === 1 ? 'block animate-fade-in-up' : 'hidden'}`}>
              <div className="flex flex-col gap-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-3"><span className="text-xl">🌍</span>Where to?</label>
                    <GooglePlacesAutoComplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                      selectProps={{ place, onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                        placeholder: 'Choose your destination', styles: placesStyles('8, 89%, 62%', isDark) }} />
                  </div>
                  <div>
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-3"><span className="text-xl">📍</span>Starting from?</label>
                    <GooglePlacesAutoComplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                      selectProps={{ placeholder: 'Select your origin', onChange: (v) => handleInputChange('sourceLocation', v),
                        styles: placesStyles('37, 90%, 51%', isDark) }} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-3"><span className="text-xl">🗓️</span>Departure Date</label>
                    <Input type="date" value={formData.departureDate}
                      className="bg-white/85 dark:bg-white/5 border border-cream-dark dark:border-white/10 text-navy dark:text-white rounded-2xl p-4 focus:border-coral focus:ring-2 focus:ring-coral/20 shadow-sm hover:shadow-md font-sans"
                      onChange={(e) => handleInputChange('departureDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-3"><span className="text-xl">⏱️</span>Trip Duration (days)</label>
                    <Input type="number" placeholder="e.g. 5" min="1" value={formData.noOfDays}
                      className="bg-white/85 dark:bg-white/5 border border-cream-dark dark:border-white/10 text-navy dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl p-4 focus:border-coral focus:ring-2 focus:ring-coral/20 shadow-sm hover:shadow-md font-sans"
                      onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
                  </div>
                </div>
                {formData.returnDate && (
                  <div className="bg-cream-dark/40 dark:bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-cream-dark/60 dark:border-white/10">
                    <Calendar className="w-5 h-5 text-coral" />
                    <span className="text-sm text-navy dark:text-white font-medium">Return Date: <span className="font-bold">{formData.returnDate}</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2 — Budget & Travelers */}
            <div className={`transition-all duration-500 ${currentStep === 2 ? 'block animate-fade-in-up' : 'hidden'}`}>
              <div className="flex flex-col gap-10">
                <div>
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-5"><span className="text-xl">💰</span>Budget Range</label>
                  <div className="grid sm:grid-cols-3 gap-5">
                    {SelectBudgetoptions.map((item, i) => (
                      <div key={i} onClick={() => handleInputChange('budget', item.title)}
                        className={`relative p-7 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
                          ${formData.budget === item.title ? 'border-coral bg-gradient-to-br from-coral/8 to-amber/8 shadow-xl shadow-coral/15 scale-[1.03]'
                            : 'border-cream-dark dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-coral/30 hover:bg-coral/5 hover:scale-[1.02] hover:shadow-lg'}`}>
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <h3 className="font-serif font-bold text-lg text-navy dark:text-white mb-1.5">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                        {formData.budget === item.title && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-5"><span className="text-xl">👥</span>Who's Traveling?</label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SelectTravelesList.map((item, i) => (
                      <div key={i} onClick={() => { handleInputChange('traveler', item.people); handleInputChange('travelerType', item.type); }}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group text-center
                          ${formData.traveler === item.people ? 'border-amber bg-gradient-to-br from-amber/8 to-coral/8 shadow-xl shadow-amber/15 scale-[1.03]'
                            : 'border-cream-dark dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-amber/30 hover:bg-amber/5 hover:scale-[1.02] hover:shadow-lg'}`}>
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <h3 className="font-serif font-bold text-base text-navy dark:text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        {formData.traveler === item.people && (
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-gradient-to-br from-amber to-coral rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 — Travel Mode & Generate */}
            <div className={`transition-all duration-500 ${currentStep === 3 ? 'block animate-fade-in-up' : 'hidden'}`}>
              <div className="flex flex-col gap-10">
                <div>
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-5"><span className="text-xl">🚀</span>Travel Mode</label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SelectTravelModes.map((item, i) => (
                      <div key={i} onClick={() => handleInputChange('travelMode', item.title)}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group text-center
                          ${formData.travelMode === item.title ? 'border-teal bg-gradient-to-br from-teal/10 to-coral/5 shadow-xl shadow-teal/15 scale-[1.03]'
                            : 'border-cream-dark dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-teal/30 hover:bg-teal/5 hover:scale-[1.02] hover:shadow-lg'}`}>
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                        <h3 className="font-serif font-bold text-base text-navy dark:text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        {formData.travelMode === item.title && (
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-gradient-to-br from-teal to-coral rounded-full flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Interests */}
                <div>
                  <label className="flex items-center gap-2.5 text-sm font-semibold text-navy dark:text-white mb-5"><span className="text-xl">🏕️</span>Travel Interests (Select up to 3)</label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SelectTravelInterests.map((item, i) => {
                      const isSelected = formData.travelInterests?.includes(item.title);
                      return (
                        <div key={i} onClick={() => handleInterestChange(item.title)}
                          className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group text-left
                            ${isSelected ? 'border-coral bg-gradient-to-br from-coral/10 to-amber/5 shadow-xl shadow-coral/15 scale-[1.02]'
                              : 'border-cream-dark dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-coral/30 hover:bg-coral/5 hover:scale-[1.01] hover:shadow-lg'}`}>
                          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                          <h3 className="font-serif font-bold text-sm text-navy dark:text-white mb-1">{item.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-gradient-to-br from-coral to-amber rounded-full flex items-center justify-center shadow-sm">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mini Summary */}
                <div className="bg-gradient-to-br from-navy/[0.03] to-coral/[0.03] dark:from-white/[0.03] dark:to-coral/[0.05] rounded-2xl p-6 border border-cream-dark/60 dark:border-white/10">
                  <h3 className="font-serif text-lg font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-coral" /> Trip Summary
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    {[
                      { l: 'Destination', v: formData.location?.label, i: '🌍' },
                      { l: 'From', v: formData.sourceLocation?.label, i: '📍' },
                      { l: 'Duration', v: formData.noOfDays ? `${formData.noOfDays} days` : '', i: '⏱️' },
                      { l: 'Dates', v: formData.departureDate && formData.returnDate ? `${formData.departureDate} → ${formData.returnDate}` : '', i: '🗓️' },
                      { l: 'Budget', v: formData.budget, i: '💰' },
                      { l: 'Travelers', v: formData.traveler, i: '👥' },
                      { l: 'Travel Mode', v: formData.travelMode, i: '🚀' },
                      { l: 'Interests', v: formData.travelInterests?.join(', '), i: '🏕️' },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/50 dark:bg-white/5">
                        <span>{r.i}</span>
                        <div>
                          <div className="text-xs text-slate-400 font-medium">{r.l}</div>
                          <div className="text-navy dark:text-white font-semibold truncate max-w-[200px]">
                            {r.v || <span className="text-slate-400 dark:text-slate-500 italic font-normal">—</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-cream-dark/40 dark:border-white/10">
              {currentStep > 1 ? (
                <Button onClick={prevStep} variant="ghost"
                  className="flex items-center gap-2 text-navy dark:text-white hover:text-coral rounded-full px-6 py-5 font-semibold hover:bg-coral/5">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                <Link to="/"><Button variant="ghost"
                  className="flex items-center gap-2 text-navy dark:text-white hover:text-coral rounded-full px-6 py-5 font-semibold hover:bg-coral/5">
                  <ArrowLeft className="w-4 h-4" /> Home
                </Button></Link>
              )}

              {currentStep < 3 ? (
                <Button onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-coral to-amber hover:from-coral-hover hover:to-amber text-white rounded-full px-8 py-5 font-bold shadow-lg hover:shadow-coral/25 transition-all hover:scale-105">
                  Next Step <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button disabled={loading || !formData.travelMode} onClick={onGenerateTrip}
                  className="flex items-center gap-3 bg-gradient-to-r from-coral via-amber to-coral hover:from-coral-hover text-white rounded-full px-10 py-5 font-bold shadow-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 bg-[length:200%] hover:bg-right">
                  {loading ? (
                    <><AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /><span>Generating Itinerary...</span></>
                  ) : (
                    <><Sparkles className="w-5 h-5" /><span>Generate My Trip</span></>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;