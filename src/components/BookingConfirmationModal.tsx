import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Ticket, Download, Printer, QrCode, Plane, Hotel, Car, Train } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingRecord } from '../types/travel';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItem: any;
  bookingType: 'hotel' | 'flight' | 'train' | 'cab';
  travelersCount: number;
  destination: string;
  onConfirmBooking: (record: BookingRecord) => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingItem,
  bookingType,
  travelersCount,
  destination,
  onConfirmBooking
}) => {
  const [leadTraveler, setLeadTraveler] = useState('Akhil Kumar');
  const [travelerPhone, setTravelerPhone] = useState('+91 98765 43210');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);

  if (!isOpen || !bookingItem) return null;

  const calculateTotal = () => {
    if (bookingType === 'hotel') {
      return (bookingItem.pricePerNight || 2500) * 3; // 3 nights estimate
    }
    return (bookingItem.pricePerPerson || 1500) * travelersCount;
  };

  const handleSimulateBooking = () => {
    const pnr = `${bookingType.toUpperCase().slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: BookingRecord = {
      id: `bk-${Date.now()}`,
      type: bookingType,
      title: bookingItem.name || bookingItem.provider || `${destination} Travel`,
      provider: bookingItem.provider || 'TravelMate Certified Partner',
      details: bookingType === 'hotel' 
        ? `${bookingItem.category?.toUpperCase()} Room • ${bookingItem.starRating || 4}★ Rating • Free Wi-Fi & Breakfast`
        : `${bookingItem.route || destination} • ${bookingItem.duration || 'Direct'}`,
      dates: 'Oct 15 - Oct 18, 2026',
      travelersCount,
      totalAmount: calculateTotal(),
      status: 'confirmed',
      pnrCode: pnr,
      bookedAt: new Date().toISOString()
    };

    setCreatedBooking(newRecord);
    setIsSuccess(true);
    onConfirmBooking(newRecord);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Simulated Instant Booking
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {isSuccess ? 'Booking Voucher Confirmed!' : `Reserve: ${bookingItem.name || bookingItem.provider}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isSuccess ? (
          /* Step 1: Review & Confirm details */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-slate-900">
                <span>{bookingItem.name || bookingItem.provider}</span>
                <span className="text-indigo-600 text-sm">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                {bookingItem.description || bookingItem.route || 'Instant confirmation with zero cancellation fee up to 24 hrs prior.'}
              </p>
              <div className="flex items-center gap-4 text-slate-500 pt-1 text-[11px]">
                <span>Travelers: <strong>{travelersCount}</strong></span>
                <span>Type: <strong className="capitalize">{bookingType}</strong></span>
              </div>
            </div>

            {/* Traveler info inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Traveler Name
                </label>
                <input
                  type="text"
                  value={leadTraveler}
                  onChange={(e) => setLeadTraveler(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Mobile Number
                </label>
                <input
                  type="text"
                  value={travelerPhone}
                  onChange={(e) => setTravelerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulated Booking Sandbox: No real credit card or payment required.</span>
            </div>

            <button
              onClick={handleSimulateBooking}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Confirm & Generate Digital E-Ticket</span>
            </button>
          </div>
        ) : (
          /* Step 2: Digital Boarding Pass / Voucher */
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs tracking-wider uppercase text-amber-300">
                      Confirmed Voucher
                    </div>
                    <div className="text-[10px] text-slate-300">PNR: {createdBooking?.pnrCode}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-300">Amount Paid</div>
                  <div className="font-extrabold text-sm text-white">₹{createdBooking?.totalAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-base font-bold text-white">{createdBooking?.title}</div>
                <div className="text-slate-300 text-[11px]">{createdBooking?.details}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/10">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Passenger / Guest</span>
                  <span className="font-bold">{leadTraveler}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Status</span>
                  <span className="text-emerald-400 font-bold">Guaranteed Active</span>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="pt-2 flex items-center justify-between text-slate-400 text-[9px] font-mono border-t border-white/5">
                <div className="tracking-widest">||||||| | ||||| |||| || |||||||</div>
                <span>AUTO-VERIFIED</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Ticket</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
