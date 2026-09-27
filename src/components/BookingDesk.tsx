import React, { useState } from 'react';
import { 
  Hotel, 
  Plane, 
  Train, 
  Car, 
  Star, 
  MapPin, 
  Check, 
  ShieldCheck, 
  Ticket, 
  CheckCircle2, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { HotelOption, TransportOption, BookingRecord } from '../types/travel';
import { BookingConfirmationModal } from './BookingConfirmationModal';

interface BookingDeskProps {
  hotels: HotelOption[];
  transportOptions: TransportOption[];
  confirmedBookings: BookingRecord[];
  destination: string;
  travelersCount: number;
  onAddBooking: (record: BookingRecord) => void;
}

export const BookingDesk: React.FC<BookingDeskProps> = ({
  hotels,
  transportOptions,
  confirmedBookings,
  destination,
  travelersCount,
  onAddBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'budget' | 'standard' | 'luxury'>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<any>(null);
  const [selectedTypeForModal, setSelectedTypeForModal] = useState<'hotel' | 'flight' | 'train' | 'cab'>('hotel');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredHotels = activeCategory === 'all' 
    ? hotels 
    : hotels.filter(h => h.category === activeCategory);

  const handleOpenBooking = (item: any, type: 'hotel' | 'flight' | 'train' | 'cab') => {
    setSelectedItemForModal(item);
    setSelectedTypeForModal(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-2.5 py-0.5 rounded-full">
            Simulated Travel Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
            Hotels & Transportation in {destination}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Choose accommodations and transit tailored to your budget. Reserve instantly to receive digital PNR vouchers and track spending.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs shrink-0 space-y-1">
          <div className="text-slate-300">Active Confirmed Vouchers:</div>
          <div className="text-2xl font-black text-amber-400">
            {confirmedBookings.length}
          </div>
        </div>
      </div>

      {/* Confirmed Bookings Dashboard Strip */}
      {confirmedBookings.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Ticket className="w-4 h-4 text-emerald-600" />
            <span>Your Confirmed Bookings ({confirmedBookings.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {confirmedBookings.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-emerald-950 truncate">{b.title}</span>
                  <span className="text-emerald-700 shrink-0 font-extrabold">₹{b.totalAmount.toLocaleString()}</span>
                </div>
                <div className="text-slate-600 text-[11px] truncate">{b.details}</div>
                <div className="flex items-center justify-between text-[10px] text-emerald-800 pt-1 border-t border-emerald-200/60">
                  <span className="font-mono font-bold">PNR: {b.pnrCode}</span>
                  <span className="bg-emerald-600 text-white px-2 py-0.2 rounded-full font-bold">Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotel Recommendations Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Hotel className="w-5 h-5 text-indigo-600" />
              <span>Recommended Accommodations</span>
            </h3>
            <p className="text-xs text-slate-500">Curated according to proximity to attractions and verified ratings</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['all', 'budget', 'standard', 'luxury'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveCategory(tier)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  activeCategory === tier
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full capitalize">
                  {hotel.category} Class
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{hotel.rating}</span>
                  <span className="text-[10px] text-slate-500 font-normal">({hotel.reviewsCount})</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-base leading-tight">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate">{hotel.distanceToCenter}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.slice(0, 3).map((am, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900">
                      ₹{hotel.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ night (approx)</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(hotel, 'hotel')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation Options Section */}
      <div className="space-y-4 pt-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Car className="w-5 h-5 text-indigo-600" />
            <span>Transit & Intercity Transportation</span>
          </h3>
          <p className="text-xs text-slate-500">High speed trains, direct flights, and private chauffeur options</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {transportOptions.map((transit) => {
            const Icon = transit.type === 'flight' ? Plane : transit.type === 'train' ? Train : Car;
            return (
              <div
                key={transit.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {transit.type.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">
                      {transit.provider}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      {transit.route}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="font-bold">{transit.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timing:</span>
                      <span className="font-bold">{transit.departureTime}</span>
                    </div>
                  </div>

                  <ul className="text-[11px] text-slate-500 space-y-1">
                    {transit.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{transit.pricePerPerson.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ person</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(
                      transit, 
                      transit.type === 'flight' ? 'flight' : transit.type === 'train' ? 'train' : 'cab'
                    )}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Book Ticket</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingItem={selectedItemForModal}
        bookingType={selectedTypeForModal}
        travelersCount={travelersCount}
        destination={destination}
        onConfirmBooking={(rec) => {
          onAddBooking(rec);
        }}
      />
    </div>
  );
};
