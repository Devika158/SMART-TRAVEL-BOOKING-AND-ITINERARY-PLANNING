export type TravelerType = 'solo' | 'couple' | 'family' | 'friends';
export type HotelPreference = 'budget' | 'standard' | 'luxury' | 'boutique';
export type TransportPreference = 'public_transit' | 'cab_rental' | 'train_flight' | 'flexible';
export type DietPreference = 'all' | 'veg' | 'non-veg' | 'vegan';
export type TravelPace = 'relaxed' | 'balanced' | 'packed';
export type LanguageCode = 'en' | 'hi' | 'te';

export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  days: number;
  travelers: number;
  travelerType: TravelerType;
  budget: number;
  currency: 'INR' | 'USD' | 'EUR';
  interests: string[];
  hotelPreference: HotelPreference;
  transportPreference: TransportPreference;
  dietPreference: DietPreference;
  travelPace: TravelPace;
  language: LanguageCode;
}

export interface ActivitySlot {
  time: string;
  title: string;
  description: string;
  locationName: string;
  category: string;
  duration: string;
  estimatedCost: number;
  whyIncluded: string;
  travelTransitToNext?: {
    mode: string;
    duration: string;
    distance: string;
    tip: string;
  };
}

export interface MealSlot {
  dish: string;
  restaurantOrSpot: string;
  type: 'veg' | 'non-veg' | 'both';
  estimatedCost: number;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  weatherNotice?: string;
  morning: ActivitySlot;
  afternoon: ActivitySlot;
  evening: ActivitySlot;
  night?: ActivitySlot;
  meals: {
    breakfast: MealSlot;
    lunch: MealSlot;
    dinner: MealSlot;
    mustTrySnack: string;
  };
  replanningSummary?: string;
}

export interface HotelOption {
  id: string;
  name: string;
  category: 'budget' | 'standard' | 'luxury';
  starRating: number;
  pricePerNight: number;
  distanceToCenter: string;
  amenities: string[];
  imageUrl: string;
  description: string;
  rating: number;
  reviewsCount: number;
}

export interface TransportOption {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'cab_rental';
  provider: string;
  route: string;
  duration: string;
  departureTime: string;
  pricePerPerson: number;
  features: string[];
}

export interface PlaceToExplore {
  id: string;
  name: string;
  category: string;
  duration: string;
  approxCost: number;
  bestTime: string;
  highlights: string;
  imageUrl: string;
  isFavorite?: boolean;
}

export interface PackingCategory {
  category: 'Clothes' | 'Electronics' | 'Essentials & Meds' | 'Documents' | 'Trip Specific' | string;
  items: string[];
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  shopping: number;
  emergency: number;
  totalEstimated: number;
  status: 'within_budget' | 'exceeds_budget';
  savingsTips: string[];
}

export interface TripSummary {
  title: string;
  overview: string;
  bestTimeToVisit: string;
  localCultureTips: string;
  weatherForecast: {
    condition: string;
    temp: string;
    advisory: string;
    indoorFallbackTip: string;
  };
}

export interface EmergencyInfo {
  country: string;
  police: string;
  ambulance: string;
  fire: string;
  touristHelpline: string;
  localHospitalSuggestion: string;
  embassyOrSafetyNote: string;
}

export interface TripItineraryData {
  tripSummary: TripSummary;
  budgetBreakdown: BudgetBreakdown;
  days: DayItinerary[];
  recommendedHotels: HotelOption[];
  transportOptions: TransportOption[];
  placesToExplore: PlaceToExplore[];
  packingChecklist: PackingCategory[];
  emergencyInfo: EmergencyInfo;
}

export interface BookingRecord {
  id: string;
  tripId?: string;
  type: 'hotel' | 'flight' | 'train' | 'cab';
  title: string;
  provider: string;
  details: string;
  dates: string;
  travelersCount: number;
  totalAmount: number;
  status: 'confirmed' | 'cancelled';
  pnrCode: string;
  bookedAt: string;
}

export interface ExpenseRecord {
  id: string;
  tripId?: string;
  title: string;
  amount: number;
  category: 'transport' | 'accommodation' | 'food' | 'activities' | 'shopping' | 'emergency';
  paidBy: string;
  date: string;
}

export interface GroupMember {
  id: string;
  name: string;
  paidAmount: number;
}

export interface SavedTrip {
  id: string;
  destination: string;
  title: string;
  dates: string;
  travelers: number;
  budget: number;
  currency: string;
  data: TripItineraryData;
  createdAt: string;
  bookings: BookingRecord[];
  expenses: ExpenseRecord[];
  packedItems: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
}
