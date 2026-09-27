import React from 'react';
import { 
  Plane, 
  Calendar, 
  Wallet, 
  Hotel, 
  MapPin, 
  CheckSquare, 
  SplitSquareVertical, 
  Sparkles, 
  GraduationCap, 
  Globe,
  FileText
} from 'lucide-react';
import { LanguageCode } from '../types/travel';
import { TRANSLATIONS } from '../data/seedData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  hasActiveTrip: boolean;
  onOpenTechStack: () => void;
  onOpenPrint: () => void;
  savedTripsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  hasActiveTrip,
  onOpenTechStack,
  onOpenPrint,
  savedTripsCount
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: 'plan', label: t.planTrip, icon: Plane },
    { id: 'itinerary', label: 'Itinerary & Route', icon: Calendar, badge: hasActiveTrip ? 'Active' : undefined },
    { id: 'budget', label: 'Budget & AI Optimizer', icon: Wallet },
    { id: 'bookings', label: 'Hotels & Transit', icon: Hotel },
    { id: 'explore', label: t.explore, icon: MapPin },
    { id: 'packing', label: 'Packing & SOS', icon: CheckSquare },
    { id: 'expenses', label: 'Expenses & Splitter', icon: SplitSquareVertical },
    { id: 'chat', label: t.aiConcierge, icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('plan')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Plane className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  AI TravelMate
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/10 to-indigo-500/10 text-indigo-700 border border-indigo-200/60 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Smart
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">AI Booking & Smart Itinerary Planner</p>
            </div>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  language === 'hi' 
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  language === 'te' 
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Print/Save Travel Guide */}
            {hasActiveTrip && (
              <button
                onClick={onOpenPrint}
                title="Print or Save Travel Voucher & Guide"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Guide</span>
              </button>
            )}

            {/* Academic Presentation / Tech Stack Details */}
            <button
              onClick={onOpenTechStack}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-lg transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Project Tech Stack</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Bar */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-emerald-100 text-emerald-700 font-semibold'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
