import React from 'react';
import { 
  FolderKanban, 
  Calendar, 
  MapPin, 
  Users, 
  Wallet, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye, 
  Plus,
  ArrowRight,
  Ticket
} from 'lucide-react';
import { SavedTrip } from '../types/travel';

interface MyTripsDashboardProps {
  trips: SavedTrip[];
  activeTripId: string;
  onSelectTrip: (trip: SavedTrip) => void;
  onDeleteTrip: (tripId: string) => void;
  onStartNewPlan: () => void;
}

export const MyTripsDashboard: React.FC<MyTripsDashboardProps> = ({
  trips,
  activeTripId,
  onSelectTrip,
  onDeleteTrip,
  onStartNewPlan
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-2.5 py-0.5 rounded-full">
            Travel History & Bookings
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
            My Saved Trips ({trips.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Switch between ongoing, upcoming, and past travel itineraries. Review confirmed vouchers and logged expenses.
          </p>
        </div>

        <button
          onClick={onStartNewPlan}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Plan Another Trip</span>
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <FolderKanban className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No Saved Trips Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Plan your first vacation with AI TravelMate or load our ready-made Hyderabad demo tour!
          </p>
          <button
            onClick={onStartNewPlan}
            className="mt-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Start Planning
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((t) => {
            const isActive = t.id === activeTripId;
            return (
              <div
                key={t.id}
                className={`bg-white rounded-3xl border overflow-hidden flex flex-col justify-between transition-all ${
                  isActive
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                    : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      t.status === 'upcoming' 
                        ? 'bg-sky-100 text-sky-800' 
                        : t.status === 'ongoing' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.status}
                    </span>

                    {isActive && (
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active in View</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 leading-tight">
                      {t.title || t.destination}
                    </h4>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{t.destination}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Travelers</span>
                      <span className="font-bold text-slate-800">{t.travelers} Persons</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Total Budget</span>
                      <span className="font-bold text-indigo-600">₹{t.budget.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Days</span>
                      <span className="font-bold text-slate-800">{t.data?.days?.length || 3} Days</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Bookings</span>
                      <span className="font-bold text-emerald-700">{t.bookings?.length || 0} Confirmed</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onDeleteTrip(t.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg"
                    title="Delete trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectTrip(t)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Itinerary</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
