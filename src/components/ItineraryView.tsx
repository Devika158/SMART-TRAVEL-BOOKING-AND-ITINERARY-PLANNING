import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  Utensils, 
  CloudSun, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw, 
  ChevronRight, 
  Wallet, 
  Share2, 
  CheckCircle2, 
  Heart,
  Car,
  Footprints,
  Info
} from 'lucide-react';
import { TripItineraryData, DayItinerary, LanguageCode } from '../types/travel';
import { TRANSLATIONS } from '../data/seedData';

interface ItineraryViewProps {
  itinerary: TripItineraryData;
  onOpenReplanModal: (dayNumber: number, existingDay: DayItinerary) => void;
  onOpenBudgetModal: () => void;
  onOpenBookingTab: () => void;
  onSaveTrip: () => void;
  isSaved: boolean;
  language: LanguageCode;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  itinerary,
  onOpenReplanModal,
  onOpenBudgetModal,
  onOpenBookingTab,
  onSaveTrip,
  isSaved,
  language
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const currentDay = itinerary.days[selectedDayIndex] || itinerary.days[0];
  const summary = itinerary.tripSummary;
  const budget = itinerary.budgetBreakdown;

  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 text-sm">No itinerary generated yet. Please enter travel parameters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner / Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                {itinerary.days.length}-Day AI Optimized Plan
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                budget.status === 'within_budget'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <CheckCircle2 className="w-3 h-3" />
                <span>{budget.status === 'within_budget' ? 'Within Target Budget' : 'Slightly Exceeds Budget'}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {summary.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
              {summary.overview}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onSaveTrip}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSaved 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
              <span>{isSaved ? 'Saved in My Trips' : t.saveTrip}</span>
            </button>

            <button
              onClick={onOpenBudgetModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.budgetOptimization}</span>
            </button>
          </div>
        </div>

        {/* Quick Insights Grid: Weather, Culture & Transit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Weather Card */}
          <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-sky-950">
                <span>{summary.weatherForecast?.condition || 'Pleasant Weather'}</span>
                <span className="text-sky-700 font-extrabold">{summary.weatherForecast?.temp || '28°C'}</span>
              </div>
              <p className="text-sky-800 leading-snug">
                {summary.weatherForecast?.advisory || 'Great conditions for full-day sightseeing.'}
              </p>
              {summary.weatherForecast?.indoorFallbackTip && (
                <p className="text-[11px] text-sky-900 font-medium pt-1 border-t border-sky-200/50">
                  ☔ Rain Alternative: {summary.weatherForecast.indoorFallbackTip}
                </p>
              )}
            </div>
          </div>

          {/* Local Culture & Insider Tips */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Info className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <div className="font-bold text-amber-950">Insider Local Etiquette</div>
              <p className="text-amber-800 leading-snug">
                {summary.localCultureTips || 'Modest clothing recommended in religious shrines. Keep cash for local rickshaws.'}
              </p>
            </div>
          </div>

          {/* Quick Booking CTA */}
          <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-100 flex items-center justify-between gap-3">
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-indigo-950">Ready to Confirm Stays & Cabs?</div>
              <p className="text-indigo-700 text-[11px]">
                Generate simulated confirmed tickets & PNR vouchers.
              </p>
            </div>
            <button
              onClick={onOpenBookingTab}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs & Replanning Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Tabs for Days */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {itinerary.days.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>Day {day.dayNumber}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Replanning for this Day */}
        <button
          onClick={() => onOpenReplanModal(currentDay.dayNumber, currentDay)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-indigo-700 shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Optimize / Re-plan Day {currentDay.dayNumber}</span>
        </button>
      </div>

      {/* Current Day Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-wider font-extrabold text-amber-400">
            Day {currentDay.dayNumber} • {currentDay.theme}
          </span>
          {currentDay.weatherNotice && (
            <span className="text-xs text-slate-300 flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full">
              <CloudSun className="w-3 h-3 text-amber-300" />
              <span>{currentDay.weatherNotice}</span>
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          {currentDay.title}
        </h2>
        {currentDay.replanningSummary && (
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{currentDay.replanningSummary}</span>
          </div>
        )}
      </div>

      {/* Route & Schedule Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline Activities Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Hour-by-Hour Timeline</span>
          </h3>

          {/* Morning Slot */}
          {currentDay.morning && (
            <ActivityCard
              period="Morning"
              slot={currentDay.morning}
              colorClass="from-amber-500 to-orange-500"
              badgeBg="bg-amber-100 text-amber-800"
            />
          )}

          {/* Afternoon Slot */}
          {currentDay.afternoon && (
            <ActivityCard
              period="Afternoon"
              slot={currentDay.afternoon}
              colorClass="from-sky-500 to-indigo-600"
              badgeBg="bg-sky-100 text-sky-800"
            />
          )}

          {/* Evening Slot */}
          {currentDay.evening && (
            <ActivityCard
              period="Evening"
              slot={currentDay.evening}
              colorClass="from-indigo-600 to-purple-600"
              badgeBg="bg-indigo-100 text-indigo-800"
            />
          )}

          {/* Night Slot */}
          {currentDay.night && (
            <ActivityCard
              period="Night"
              slot={currentDay.night}
              colorClass="from-slate-800 to-slate-950"
              badgeBg="bg-slate-100 text-slate-800"
            />
          )}
        </div>

        {/* Local Cuisine & Route Sequence Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Day Route Sequence Mini-Map Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-indigo-600" />
              <span>Zero-Backtrack Transit Route</span>
            </h4>

            <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-indigo-200 text-xs">
              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold">
                  H
                </span>
                <span className="font-bold text-slate-800">Hotel / Base</span>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
                  1
                </span>
                <span className="font-bold text-slate-800">{currentDay.morning?.locationName || 'Morning Stop'}</span>
                <div className="text-[10px] text-slate-500">
                  {currentDay.morning?.travelTransitToNext?.mode || 'Metro / Cab'} • {currentDay.morning?.travelTransitToNext?.distance || '2.5 km'}
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
                  2
                </span>
                <span className="font-bold text-slate-800">{currentDay.afternoon?.locationName || 'Afternoon Stop'}</span>
                <div className="text-[10px] text-slate-500">
                  {currentDay.afternoon?.travelTransitToNext?.mode || 'Tuk-Tuk / Walk'} • {currentDay.afternoon?.travelTransitToNext?.distance || '1.8 km'}
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
                  3
                </span>
                <span className="font-bold text-slate-800">{currentDay.evening?.locationName || 'Evening Sunset'}</span>
                <div className="text-[10px] text-slate-500">
                  {currentDay.evening?.travelTransitToNext?.mode || 'Scenic Promenade Walk'}
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold">
                  H
                </span>
                <span className="font-bold text-slate-800">Return to Hotel / Dining</span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[11px] text-slate-600 flex items-center gap-2">
              <Footprints className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Optimized linear path reduces traffic delays by approx 40 minutes!</span>
            </div>
          </div>

          {/* Local Food Recommendations for this Day */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-amber-500" />
                <span>Local Culinary Picks</span>
              </h4>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Chef Curated
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Breakfast */}
              <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100/80 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-950">
                  <span>🍳 Breakfast</span>
                  <span className="text-amber-700 font-semibold">₹{currentDay.meals?.breakfast?.estimatedCost || 150}</span>
                </div>
                <div className="font-medium text-slate-800">{currentDay.meals?.breakfast?.dish}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{currentDay.meals?.breakfast?.restaurantOrSpot}</span>
                </div>
              </div>

              {/* Lunch */}
              <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span>🍛 Authentic Lunch</span>
                  <span className="text-emerald-700 font-semibold">₹{currentDay.meals?.lunch?.estimatedCost || 350}</span>
                </div>
                <div className="font-medium text-slate-800">{currentDay.meals?.lunch?.dish}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{currentDay.meals?.lunch?.restaurantOrSpot}</span>
                </div>
              </div>

              {/* Dinner */}
              <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 space-y-1">
                <div className="flex items-center justify-between font-bold text-indigo-950">
                  <span>🍽️ Dinner Experience</span>
                  <span className="text-indigo-700 font-semibold">₹{currentDay.meals?.dinner?.estimatedCost || 550}</span>
                </div>
                <div className="font-medium text-slate-800">{currentDay.meals?.dinner?.dish}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-600" />
                  <span>{currentDay.meals?.dinner?.restaurantOrSpot}</span>
                </div>
              </div>

              {/* Must-Try Snack */}
              {currentDay.meals?.mustTrySnack && (
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] flex items-start gap-2">
                  <span className="text-base">☕</span>
                  <div>
                    <span className="font-bold text-slate-900">Iconic Street Snack: </span>
                    <span>{currentDay.meals.mustTrySnack}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Slot Card
interface ActivityCardProps {
  period: string;
  slot: any;
  colorClass: string;
  badgeBg: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ period, slot, colorClass, badgeBg }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeBg}`}>
            {period}
          </span>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{slot.time}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
            ₹{slot.estimatedCost} approx
          </span>
          <span className="text-xs text-slate-400">Duration: {slot.duration}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base font-bold text-slate-900">
          {slot.title}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{slot.locationName}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-normal">{slot.category}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed pt-1">
          {slot.description}
        </p>
      </div>

      {/* Why AI Included This */}
      {slot.whyIncluded && (
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900">Why recommended: </span>
            <span>{slot.whyIncluded}</span>
          </div>
        </div>
      )}

      {/* Transit to next stop */}
      {slot.travelTransitToNext && (
        <div className="mt-2 p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-[11px] text-sky-950 flex items-start gap-2">
          <Car className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Next Transit: </span>
            <span>{slot.travelTransitToNext.mode} ({slot.travelTransitToNext.distance} • ~{slot.travelTransitToNext.duration}) — </span>
            <span className="text-sky-800">{slot.travelTransitToNext.tip}</span>
          </div>
        </div>
      )}
    </div>
  );
};
