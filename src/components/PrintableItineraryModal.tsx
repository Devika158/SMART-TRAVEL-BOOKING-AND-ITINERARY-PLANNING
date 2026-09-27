import React from 'react';
import { X, Printer, Download, MapPin, Calendar, Clock, DollarSign, ShieldAlert, Phone } from 'lucide-react';
import { TripItineraryData } from '../types/travel';

interface PrintableItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: TripItineraryData;
  destination: string;
}

export const PrintableItineraryModal: React.FC<PrintableItineraryModalProps> = ({
  isOpen,
  onClose,
  itinerary,
  destination
}) => {
  if (!isOpen || !itinerary) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-slate-900">
              Printable Trip Guide & Voucher
            </span>
            <span className="text-xs text-slate-500">({destination})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 text-slate-800 p-2 print:p-0">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-indigo-700">
                  AI TRAVELMATE CONFIRMED GUIDE
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {itinerary.tripSummary.title}
                </h1>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  {itinerary.tripSummary.overview}
                </p>
              </div>

              <div className="text-right text-xs shrink-0">
                <div className="font-mono font-bold text-slate-900">DATE: {new Date().toLocaleDateString()}</div>
                <div className="text-indigo-600 font-bold mt-1">
                  Budget: ₹{itinerary.budgetBreakdown.totalEstimated.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Weather Outlook</span>
              <span className="font-bold text-slate-800">{itinerary.tripSummary.weatherForecast?.condition} ({itinerary.tripSummary.weatherForecast?.temp})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Best Season</span>
              <span className="font-bold text-slate-800">{itinerary.tripSummary.bestTimeToVisit}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Tourist Helpline</span>
              <span className="font-bold text-slate-800">{itinerary.emergencyInfo.touristHelpline}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Emergency Police</span>
              <span className="font-bold text-slate-800">{itinerary.emergencyInfo.police}</span>
            </div>
          </div>

          {/* Day-by-Day Schedule */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Detailed Day-by-Day Schedule
            </h3>

            <div className="space-y-4">
              {itinerary.days.map((day) => (
                <div key={day.dayNumber} className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center bg-slate-100 p-2 rounded-lg">
                    <span className="font-bold text-xs text-slate-900">Day {day.dayNumber}: {day.title}</span>
                    <span className="text-[11px] text-slate-500">{day.theme}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                      <span className="font-bold text-slate-900 block">Morning ({day.morning?.time})</span>
                      <div className="font-medium text-indigo-700">{day.morning?.locationName}</div>
                      <p className="text-slate-600 text-[11px]">{day.morning?.description}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                      <span className="font-bold text-slate-900 block">Afternoon ({day.afternoon?.time})</span>
                      <div className="font-medium text-indigo-700">{day.afternoon?.locationName}</div>
                      <p className="text-slate-600 text-[11px]">{day.afternoon?.description}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                      <span className="font-bold text-slate-900 block">Evening & Sunset ({day.evening?.time})</span>
                      <div className="font-medium text-indigo-700">{day.evening?.locationName}</div>
                      <p className="text-slate-600 text-[11px]">{day.evening?.description}</p>
                    </div>
                  </div>

                  <div className="text-[11px] bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 text-amber-900 flex justify-between items-center">
                    <span><strong>Culinary Highlights: </strong> Breakfast at {day.meals?.breakfast?.restaurantOrSpot} • Lunch: {day.meals?.lunch?.dish} • Dinner: {day.meals?.dinner?.restaurantOrSpot}</span>
                    <span className="font-bold shrink-0 ml-2">Snack: {day.meals?.mustTrySnack}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency and Hospital Footer */}
          <div className="pt-2 border-t border-slate-200 text-xs flex justify-between items-center text-slate-500">
            <div>
              <span>Hospital: <strong>{itinerary.emergencyInfo.localHospitalSuggestion}</strong></span>
              <span className="mx-2">•</span>
              <span>Ambulance: <strong>{itinerary.emergencyInfo.ambulance}</strong></span>
            </div>
            <div className="font-bold text-slate-800">
              Generated by AI TravelMate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
