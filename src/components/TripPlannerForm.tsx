import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Wallet, 
  Users, 
  Sparkles, 
  Compass, 
  Hotel, 
  Utensils, 
  Car, 
  Clock, 
  Check, 
  ArrowRight,
  Flame,
  Search
} from 'lucide-react';
import { 
  TripPreferences, 
  TravelerType, 
  HotelPreference, 
  TransportPreference, 
  DietPreference, 
  TravelPace, 
  LanguageCode 
} from '../types/travel';
import { POPULAR_DESTINATIONS, INTEREST_TAGS, TRANSLATIONS } from '../data/seedData';

interface TripPlannerFormProps {
  onGenerate: (preferences: TripPreferences) => void;
  onLoadSeed: () => void;
  isLoading: boolean;
  language: LanguageCode;
}

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  onGenerate,
  onLoadSeed,
  isLoading,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [destination, setDestination] = useState('Hyderabad');
  const [days, setDays] = useState(3);
  const [startDate, setStartDate] = useState('2026-10-15');
  const [budget, setBudget] = useState(12000);
  const [travelers, setTravelers] = useState(2);
  const [travelerType, setTravelerType] = useState<TravelerType>('friends');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Historical & Forts',
    'Local Food & Street Dining'
  ]);
  const [hotelPreference, setHotelPreference] = useState<HotelPreference>('standard');
  const [transportPreference, setTransportPreference] = useState<TransportPreference>('cab_rental');
  const [dietPreference, setDietPreference] = useState<DietPreference>('all');
  const [travelPace, setTravelPace] = useState<TravelPace>('balanced');

  const toggleInterest = (interestLabel: string) => {
    if (selectedInterests.includes(interestLabel)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestLabel));
    } else {
      setSelectedInterests([...selectedInterests, interestLabel]);
    }
  };

  const handleSelectPopular = (dest: typeof POPULAR_DESTINATIONS[0]) => {
    setDestination(dest.name);
    setBudget(dest.avgBudget);
    setDays(dest.idealDays);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      destination: destination.trim() || 'Goa',
      startDate,
      endDate: '',
      days,
      travelers,
      travelerType,
      budget,
      currency: 'INR',
      interests: selectedInterests.length > 0 ? selectedInterests : ['Sightseeing', 'Food'],
      hotelPreference,
      transportPreference,
      dietPreference,
      travelPace,
      language
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl shadow-indigo-950/20">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Dynamic Trip Optimizer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Plan, Book & Optimize Your Perfect Trip with AI.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tell AI TravelMate where you want to go, your budget, and what you love. We calculate realistic budgets, craft hour-by-hour route itineraries, recommend hotels, and track split expenses for friends!
          </p>

          {/* Quick Demo Action for Academic / Showcase */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onLoadSeed}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-102"
            >
              <Flame className="w-4 h-4 text-amber-950 fill-amber-950" />
              <span>Load Ready Demo: Hyderabad Heritage (₹12,000)</span>
            </button>
            <span className="text-xs text-slate-400">or configure your custom trip below 👇</span>
          </div>
        </div>
      </div>

      {/* Popular Destination Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Popular Destinations</span>
          </h2>
          <span className="text-xs text-slate-500">Click any card to auto-fill trip parameters</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POPULAR_DESTINATIONS.map((dest) => {
            const isSelected = destination.toLowerCase().includes(dest.name.toLowerCase());
            return (
              <div
                key={dest.name}
                onClick={() => handleSelectPopular(dest)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-200 ${
                  isSelected 
                    ? 'border-indigo-600 ring-2 ring-indigo-500/40 shadow-md' 
                    : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="font-bold text-xs sm:text-sm leading-tight flex items-center justify-between">
                      <span>{dest.name}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-200 mt-0.5 truncate">
                      ₹{dest.avgBudget.toLocaleString()} • {dest.idealDays} Days
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Planning Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-900">Custom Trip Parameters</h3>
          <p className="text-xs text-slate-500">Provide your travel constraints so AI can balance transit times, attractions, and budget.</p>
        </div>

        {/* Row 1: Destination & Dates & Days */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Destination */}
          <div className="md:col-span-6 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.destinationLabel}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Hyderabad, Goa, Manali, Ooty, Tokyo, Paris..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm font-medium text-slate-900 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Number of Days */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.daysLabel}
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm font-medium text-slate-900 bg-slate-50/50"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((d) => (
                  <option key={d} value={d}>
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Travel Start Date */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Starting Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm font-medium text-slate-900 bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Budget & Travelers & Group Type */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
          {/* Budget */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.budgetLabel}
              </label>
              <span className="text-sm font-extrabold text-indigo-600">
                ₹{budget.toLocaleString()}
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                type="range"
                min={3000}
                max={100000}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span onClick={() => setBudget(8000)} className="cursor-pointer hover:text-indigo-600">₹8,000</span>
              <span onClick={() => setBudget(15000)} className="cursor-pointer hover:text-indigo-600">₹15,000</span>
              <span onClick={() => setBudget(30000)} className="cursor-pointer hover:text-indigo-600">₹30,000</span>
              <span onClick={() => setBudget(60000)} className="cursor-pointer hover:text-indigo-600">₹60,000+</span>
            </div>
          </div>

          {/* Travelers Count */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.travelersLabel}
            </label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm font-medium text-slate-900 bg-slate-50/50"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Group Style */}
          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.travelerTypeLabel}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['solo', 'couple', 'family', 'friends'] as TravelerType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTravelerType(type)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold capitalize transition-all ${
                    travelerType === type
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Interests Tags */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t.interestsLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map((tag) => {
              const isSelected = selectedInterests.includes(tag.label);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleInterest(tag.label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 font-semibold shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Hotel, Transport, Diet, Pace preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Hotel Preference */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.hotelPrefLabel}</span>
            </label>
            <select
              value={hotelPreference}
              onChange={(e) => setHotelPreference(e.target.value as HotelPreference)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="budget">Pocket Budget / Hostels (₹800 - ₹1,500/nt)</option>
              <option value="standard">Standard Boutique 3-4★ (₹2,000 - ₹3,500/nt)</option>
              <option value="luxury">Luxury Heritage 5★ Resort (₹4,500+/nt)</option>
            </select>
          </div>

          {/* Transport Preference */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.transportPrefLabel}</span>
            </label>
            <select
              value={transportPreference}
              onChange={(e) => setTransportPreference(e.target.value as TransportPreference)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="cab_rental">Private Chauffeur / Dedicated Cab</option>
              <option value="public_transit">Metro + Auto Rickshaws (Budget)</option>
              <option value="train_flight">Intercity Express Trains & Flights</option>
              <option value="flexible">Mixed & Flexible Transit</option>
            </select>
          </div>

          {/* Diet Preference */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.dietPrefLabel}</span>
            </label>
            <select
              value={dietPreference}
              onChange={(e) => setDietPreference(e.target.value as DietPreference)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="all">All (Veg & Non-Veg Specialties)</option>
              <option value="veg">Pure Vegetarian Only</option>
              <option value="non-veg">Non-Veg Lover (Biryanis & Kebabs)</option>
              <option value="vegan">Vegan / Plant-based</option>
            </select>
          </div>

          {/* Pace */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.paceLabel}</span>
            </label>
            <select
              value={travelPace}
              onChange={(e) => setTravelPace(e.target.value as TravelPace)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="balanced">Balanced (Key landmarks + time to relax)</option>
              <option value="relaxed">Relaxed & Leisure (Late mornings, cafes)</option>
              <option value="packed">Adventure Packed (Maximum attractions/day)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>AI calculates zero-backtrack routes, real expenses, and local food spots.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all ${
              isLoading ? 'opacity-80 cursor-wait' : 'hover:scale-102 cursor-pointer'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t.regenerating}</span>
              </>
            ) : (
              <>
                <span>{t.generateButton}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
