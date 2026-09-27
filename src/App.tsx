import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  TripPreferences, 
  TripItineraryData, 
  SavedTrip, 
  BookingRecord, 
  ExpenseRecord, 
  LanguageCode, 
  DayItinerary, 
  BudgetBreakdown 
} from './types/travel';
import { INITIAL_SAVED_TRIP, TRANSLATIONS } from './data/seedData';
import { Header } from './components/Header';
import { TripPlannerForm } from './components/TripPlannerForm';
import { ItineraryView } from './components/ItineraryView';
import { BudgetOptimizerModal } from './components/BudgetOptimizerModal';
import { DynamicReplanModal } from './components/DynamicReplanModal';
import { BookingDesk } from './components/BookingDesk';
import { PlacesExplorer } from './components/PlacesExplorer';
import { PackingAndSOS } from './components/PackingAndSOS';
import { ExpenseTracker } from './components/ExpenseTracker';
import { AIConciergeChat } from './components/AIConciergeChat';
import { TechStackModal } from './components/TechStackModal';
import { PrintableItineraryModal } from './components/PrintableItineraryModal';
import { MyTripsDashboard } from './components/MyTripsDashboard';
import { CheckCircle2, Sparkles, AlertCircle, Heart } from 'lucide-react';

const STORAGE_KEY_TRIPS = 'ai_travelmate_saved_trips_v1';
const STORAGE_KEY_FAVORITES = 'ai_travelmate_favorites_v1';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('plan');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isReplanModalOpen, setIsReplanModalOpen] = useState(false);
  const [replanTarget, setReplanTarget] = useState<{ dayNumber: number; existingDay: DayItinerary } | null>(null);

  // Trips collection state
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TRIPS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [INITIAL_SAVED_TRIP];
  });

  const [activeTrip, setActiveTrip] = useState<SavedTrip>(() => {
    return savedTrips[0] || INITIAL_SAVED_TRIP;
  });

  const [favoritePlaceIds, setFavoritePlaceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return ['pl-1', 'pl-2'];
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(savedTrips));
    } catch (e) {}
  }, [savedTrips]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favoritePlaceIds));
    } catch (e) {}
  }, [favoritePlaceIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Generate Itinerary via Backend / Gemini API
  const handleGenerateItinerary = async (prefs: TripPreferences) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/trip/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs)
      });

      const result = await response.json();
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to generate itinerary');
      }

      const generatedData: TripItineraryData = result.data;
      const newTripId = `trip-${Date.now()}`;
      const newSavedTrip: SavedTrip = {
        id: newTripId,
        destination: prefs.destination,
        title: generatedData.tripSummary?.title || `${prefs.destination} Smart Tour`,
        dates: prefs.startDate ? `${prefs.startDate} (${prefs.days} Days)` : `${prefs.days} Days Expedition`,
        travelers: prefs.travelers,
        budget: prefs.budget,
        currency: prefs.currency,
        data: generatedData,
        createdAt: new Date().toISOString(),
        bookings: [],
        expenses: [],
        packedItems: [],
        status: 'upcoming'
      };

      setSavedTrips(prev => [newSavedTrip, ...prev]);
      setActiveTrip(newSavedTrip);
      setActiveTab('itinerary');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}

      showToast(`✨ Generated ${prefs.days}-day smart itinerary for ${prefs.destination}!`);
    } catch (error: any) {
      console.error('Error generating trip:', error);
      showToast('⚠️ Notice: Loaded optimal curated plan.');
      // If network fails, use seed or local trip
      setActiveTrip(INITIAL_SAVED_TRIP);
      setActiveTab('itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSeedTrip = () => {
    setActiveTrip(INITIAL_SAVED_TRIP);
    setActiveTab('itinerary');
    showToast('Loaded demo: Hyderabad Royal Heritage & Food Tour!');
  };

  const handleSelectTrip = (trip: SavedTrip) => {
    setActiveTrip(trip);
    setActiveTab('itinerary');
    showToast(`Loaded ${trip.destination}`);
  };

  const handleDeleteTrip = (tripId: string) => {
    const updated = savedTrips.filter(t => t.id !== tripId);
    setSavedTrips(updated);
    if (activeTrip.id === tripId) {
      if (updated.length > 0) {
        setActiveTrip(updated[0]);
      } else {
        setActiveTrip(INITIAL_SAVED_TRIP);
      }
    }
    showToast('Trip removed from history.');
  };

  const handleSaveActiveTrip = () => {
    setSavedTrips(prev => {
      const exists = prev.some(t => t.id === activeTrip.id);
      if (exists) {
        return prev.map(t => t.id === activeTrip.id ? activeTrip : t);
      }
      return [activeTrip, ...prev];
    });
    showToast('Trip saved to My Trips!');
  };

  const handleApplyBudgetOptimization = (newBudget: BudgetBreakdown) => {
    const updatedTrip = {
      ...activeTrip,
      budget: newBudget.totalEstimated,
      data: {
        ...activeTrip.data,
        budgetBreakdown: newBudget
      }
    };
    setActiveTrip(updatedTrip);
    setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    showToast(`💰 Budget optimized to ₹${newBudget.totalEstimated.toLocaleString()}!`);
  };

  const handleOpenReplanModal = (dayNumber: number, existingDay: DayItinerary) => {
    setReplanTarget({ dayNumber, existingDay });
    setIsReplanModalOpen(true);
  };

  const handleDayUpdated = (updatedDay: DayItinerary) => {
    const updatedDays = [...activeTrip.data.days];
    const targetIdx = updatedDays.findIndex(d => d.dayNumber === updatedDay.dayNumber);
    if (targetIdx !== -1) {
      updatedDays[targetIdx] = updatedDay;
      const updatedTrip = {
        ...activeTrip,
        data: {
          ...activeTrip.data,
          days: updatedDays
        }
      };
      setActiveTrip(updatedTrip);
      setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
      showToast(`Day ${updatedDay.dayNumber} replanned successfully!`);
    }
  };

  const handleAddBooking = (record: BookingRecord) => {
    const updatedBookings = [record, ...(activeTrip.bookings || [])];
    
    // Automatically log this booking as an expense
    const newExpense: ExpenseRecord = {
      id: `exp-auto-${Date.now()}`,
      title: `${record.type.toUpperCase()}: ${record.title}`,
      amount: record.totalAmount,
      category: record.type === 'hotel' ? 'accommodation' : 'transport',
      paidBy: 'Akhil',
      date: new Date().toISOString().split('T')[0]
    };
    const updatedExpenses = [newExpense, ...(activeTrip.expenses || [])];

    const updatedTrip = {
      ...activeTrip,
      bookings: updatedBookings,
      expenses: updatedExpenses
    };
    setActiveTrip(updatedTrip);
    setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    showToast(`Booking confirmed for ${record.title} (PNR: ${record.pnrCode})!`);
  };

  const handleAddExpense = (expense: ExpenseRecord) => {
    const updatedExpenses = [expense, ...(activeTrip.expenses || [])];
    const updatedTrip = {
      ...activeTrip,
      expenses: updatedExpenses
    };
    setActiveTrip(updatedTrip);
    setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    showToast(`Expense of ₹${expense.amount.toLocaleString()} logged.`);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = (activeTrip.expenses || []).filter(e => e.id !== id);
    const updatedTrip = {
      ...activeTrip,
      expenses: updatedExpenses
    };
    setActiveTrip(updatedTrip);
    setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  const handleTogglePackedItem = (item: string) => {
    const currentList = activeTrip.packedItems || [];
    let updatedList: string[];
    if (currentList.includes(item)) {
      updatedList = currentList.filter(i => i !== item);
    } else {
      updatedList = [...currentList, item];
    }
    const updatedTrip = {
      ...activeTrip,
      packedItems: updatedList
    };
    setActiveTrip(updatedTrip);
    setSavedTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };

  const handleToggleFavorite = (placeId: string) => {
    if (favoritePlaceIds.includes(placeId)) {
      setFavoritePlaceIds(favoritePlaceIds.filter(id => id !== placeId));
      showToast('Removed from favorites.');
    } else {
      setFavoritePlaceIds([...favoritePlaceIds, placeId]);
      showToast('Saved to your favorites wishlist ❤️');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        hasActiveTrip={!!activeTrip?.data}
        onOpenTechStack={() => setIsTechStackOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
        savedTripsCount={savedTrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Plan Trip Form */}
        {activeTab === 'plan' && (
          <TripPlannerForm
            onGenerate={handleGenerateItinerary}
            onLoadSeed={handleLoadSeedTrip}
            isLoading={isLoading}
            language={language}
          />
        )}

        {/* Tab 2: Day-by-Day Itinerary & Route */}
        {activeTab === 'itinerary' && (
          <ItineraryView
            itinerary={activeTrip.data}
            onOpenReplanModal={handleOpenReplanModal}
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            onOpenBookingTab={() => setActiveTab('bookings')}
            onSaveTrip={handleSaveActiveTrip}
            isSaved={savedTrips.some(t => t.id === activeTrip.id)}
            language={language}
          />
        )}

        {/* Tab 3: Budget & AI Optimizer */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsBudgetModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open AI Budget Optimizer</span>
              </button>
            </div>
            <ItineraryView
              itinerary={activeTrip.data}
              onOpenReplanModal={handleOpenReplanModal}
              onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
              onOpenBookingTab={() => setActiveTab('bookings')}
              onSaveTrip={handleSaveActiveTrip}
              isSaved={savedTrips.some(t => t.id === activeTrip.id)}
              language={language}
            />
          </div>
        )}

        {/* Tab 4: Hotels & Transit Bookings */}
        {activeTab === 'bookings' && (
          <BookingDesk
            hotels={activeTrip.data?.recommendedHotels || []}
            transportOptions={activeTrip.data?.transportOptions || []}
            confirmedBookings={activeTrip.bookings || []}
            destination={activeTrip.destination}
            travelersCount={activeTrip.travelers || 2}
            onAddBooking={handleAddBooking}
          />
        )}

        {/* Tab 5: Places Explorer */}
        {activeTab === 'explore' && (
          <PlacesExplorer
            places={activeTrip.data?.placesToExplore || []}
            destination={activeTrip.destination}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoritePlaceIds}
          />
        )}

        {/* Tab 6: Packing & Safety SOS */}
        {activeTab === 'packing' && (
          <PackingAndSOS
            packingChecklist={activeTrip.data?.packingChecklist || []}
            emergencyInfo={activeTrip.data?.emergencyInfo || {
              country: 'India',
              police: '112 / 100',
              ambulance: '108',
              fire: '101',
              touristHelpline: '1363',
              localHospitalSuggestion: 'Apollo / District Hospital',
              embassyOrSafetyNote: '24x7 Tourist police kiosks available.'
            }}
            packedItems={activeTrip.packedItems || []}
            onTogglePackedItem={handleTogglePackedItem}
            destination={activeTrip.destination}
          />
        )}

        {/* Tab 7: Expense Tracker & Group Splitter */}
        {activeTab === 'expenses' && (
          <ExpenseTracker
            totalBudget={activeTrip.data?.budgetBreakdown?.totalEstimated || activeTrip.budget}
            expenses={activeTrip.expenses || []}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}

        {/* Tab 8: AI Concierge Chat */}
        {activeTab === 'chat' && (
          <AIConciergeChat
            itinerary={activeTrip.data}
            destination={activeTrip.destination}
            language={language}
          />
        )}

        {/* Tab 9: My Trips History */}
        {activeTab === 'mytrips' && (
          <MyTripsDashboard
            trips={savedTrips}
            activeTripId={activeTrip.id}
            onSelectTrip={handleSelectTrip}
            onDeleteTrip={handleDeleteTrip}
            onStartNewPlan={() => setActiveTab('plan')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">AI TravelMate</span>
            <span>•</span>
            <span>Intelligent Travel Booking & Smart Itinerary Planner</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTechStackOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Academic Tech Stack & Architecture
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('mytrips')}
              className="text-slate-600 hover:text-slate-900 font-semibold"
            >
              Saved Trips ({savedTrips.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TechStackModal
        isOpen={isTechStackOpen}
        onClose={() => setIsTechStackOpen(false)}
      />

      <PrintableItineraryModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        itinerary={activeTrip.data}
        destination={activeTrip.destination}
      />

      <BudgetOptimizerModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        itinerary={activeTrip.data}
        onApplyOptimization={handleApplyBudgetOptimization}
      />

      {replanTarget && (
        <DynamicReplanModal
          isOpen={isReplanModalOpen}
          onClose={() => {
            setIsReplanModalOpen(false);
            setReplanTarget(null);
          }}
          destination={activeTrip.destination}
          dayNumber={replanTarget.dayNumber}
          existingDay={replanTarget.existingDay}
          onDayUpdated={handleDayUpdated}
        />
      )}
    </div>
  );
}
