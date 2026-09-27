import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  PhoneCall, 
  ShieldAlert, 
  Plus, 
  Heart, 
  FileText, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { PackingCategory, EmergencyInfo } from '../types/travel';

interface PackingAndSOSProps {
  packingChecklist: PackingCategory[];
  emergencyInfo: EmergencyInfo;
  packedItems: string[];
  onTogglePackedItem: (item: string) => void;
  destination: string;
}

export const PackingAndSOS: React.FC<PackingAndSOSProps> = ({
  packingChecklist,
  emergencyInfo,
  packedItems,
  onTogglePackedItem,
  destination
}) => {
  const [activeTab, setActiveTab] = useState<'packing' | 'emergency'>('packing');

  // Emergency contact custom state
  const [contactName, setContactName] = useState('Mom / Family Guardian');
  const [contactPhone, setContactPhone] = useState('+91 94401 23456');
  const [contactRel, setContactRel] = useState('Parent / Guardian');
  const [isSavedContact, setIsSavedContact] = useState(true);

  // Pre-departure Document reminders checklist
  const [docsChecklist, setDocsChecklist] = useState<Record<string, boolean>>({
    'Government Photo ID (Aadhaar / Passport / DL)': true,
    'Confirmed Hotel Booking Voucher': true,
    'Transport / Train / Flight Boarding Pass': true,
    'Personal Health Insurance / Emergency Cash': false,
    'Prescribed Medicines & First-Aid': false
  });

  const toggleDoc = (docName: string) => {
    setDocsChecklist(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  // Calculate packed progress
  const allPackingItems = packingChecklist.flatMap(c => c.items);
  const totalItemsCount = allPackingItems.length;
  const packedCount = allPackingItems.filter(i => packedItems.includes(i)).length;
  const packedPercent = totalItemsCount > 0 ? Math.round((packedCount / totalItemsCount) * 100) : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            Smart Preparation & Safety
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Packing Checklist, Documents & SOS Assistance
          </h2>
          <p className="text-xs text-slate-500">
            Never forget luggage essentials, tick off travel documents, and access 24/7 destination emergency helplines.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('packing')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'packing'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Packing List ({packedPercent}%)
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'emergency'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Emergency & SOS Support
          </button>
        </div>
      </div>

      {activeTab === 'packing' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Packing Categories (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                  <span>Luggage & Bag Checklist for {destination}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any item to mark it packed in your suitcase.
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-indigo-600">{packedCount} / {totalItemsCount}</span>
                <span className="text-[10px] text-slate-400 block">items packed</span>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-1">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${packedPercent}%` }}
                  className="h-full bg-emerald-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Categorized Checklists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packingChecklist.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{cat.category}</span>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {cat.items.filter(i => packedItems.includes(i)).length} / {cat.items.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {cat.items.map((item, i) => {
                      const isChecked = packedItems.includes(item);
                      return (
                        <div
                          key={i}
                          onClick={() => onTogglePackedItem(item)}
                          className={`p-2 rounded-xl flex items-start gap-2.5 cursor-pointer text-xs transition-colors select-none ${
                            isChecked
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-medium'
                              : 'bg-white hover:bg-slate-100/80 text-slate-700 border border-slate-200/60'
                          }`}
                        >
                          <span className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300" />
                            )}
                          </span>
                          <span className={`leading-snug ${isChecked ? 'line-through opacity-80' : ''}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Departure Documents Checklist (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Pre-Departure Travel Pass</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify mandatory travel documents prior to leaving home.
              </p>
            </div>

            <div className="space-y-2.5">
              {Object.entries(docsChecklist).map(([docTitle, isChecked]) => (
                <div
                  key={docTitle}
                  onClick={() => toggleDoc(docTitle)}
                  className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 cursor-pointer select-none transition-colors ${
                    isChecked
                      ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </span>
                  <span className="leading-snug">{docTitle}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold">Security Advice: </span>
              Always store offline photos of your government IDs on your smartphone in case of poor mobile network coverage.
            </div>
          </div>
        </div>
      ) : (
        /* EMERGENCY & SOS TAB */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Emergency Helplines (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Verified Emergency Helpline Directory</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Immediate hotlines for {destination} ({emergencyInfo?.country || 'India'}).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Police */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-xs space-y-1">
                <span className="text-[10px] font-bold text-rose-700 uppercase">Police Hot-Dial</span>
                <div className="text-xl font-black text-rose-950">{emergencyInfo?.police || '112 / 100'}</div>
                <p className="text-[11px] text-rose-800">24x7 Unified Emergency Police Dispatch</p>
              </div>

              {/* Medical Ambulance */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Ambulance & Paramedics</span>
                <div className="text-xl font-black text-emerald-950">{emergencyInfo?.ambulance || '108 / 102'}</div>
                <p className="text-[11px] text-emerald-800">Immediate Medical Response & Trauma Care</p>
              </div>

              {/* Fire */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Fire Rescue Department</span>
                <div className="text-xl font-black text-amber-950">{emergencyInfo?.fire || '101'}</div>
                <p className="text-[11px] text-amber-800">National Fire & Safety Brigade</p>
              </div>

              {/* Tourist Helpline */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Official Tourist Support</span>
                <div className="text-xl font-black text-indigo-950">{emergencyInfo?.touristHelpline || '1363'}</div>
                <p className="text-[11px] text-indigo-800">Multi-lingual 24x7 Tourist Assistance</p>
              </div>
            </div>

            {/* Hospital Recommendation */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Recommended Nearby Multi-Specialty Hospital:</span>
              </div>
              <p className="text-slate-700 font-medium">
                {emergencyInfo?.localHospitalSuggestion || 'Apollo / Central District General Hospital'}
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                {emergencyInfo?.embassyOrSafetyNote || 'Emergency medical triage available 24/7 with English and regional speaking doctors.'}
              </p>
            </div>
          </div>

          {/* Personal Emergency Contact (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Personal Emergency SOS Contact</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved guardian or friend to alert during emergencies.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={contactRel}
                  onChange={(e) => setContactRel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Quick action button simulation */}
            <div className="pt-2 space-y-2">
              <a
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>One-Touch Call Emergency Contact</span>
              </a>

              <p className="text-[11px] text-center text-slate-400">
                Works instantly on mobile devices with default phone dialer.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
