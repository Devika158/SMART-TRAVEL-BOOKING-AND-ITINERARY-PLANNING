import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Heart, 
  Compass, 
  Sparkles, 
  Search, 
  Filter,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { PlaceToExplore } from '../types/travel';

interface PlacesExplorerProps {
  places: PlaceToExplore[];
  destination: string;
  onToggleFavorite: (placeId: string) => void;
  favoriteIds: string[];
}

export const PlacesExplorer: React.FC<PlacesExplorerProps> = ({
  places,
  destination,
  onToggleFavorite,
  favoriteIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(places.map(p => p.category)))];

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          place.highlights.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-2.5 py-0.5 rounded-full">
            Must-Visit Destinations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5">
            Discover Landmark Attractions in {destination}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Curated monuments, viewpoints, cultural quarters, and bazaars with ideal visit times and ticket costs. Tap ❤️ to save to your personal bucket list!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs shrink-0 space-y-1">
          <div className="text-slate-300">Saved Wishlist Spots:</div>
          <div className="text-2xl font-black text-rose-400">
            {favoriteIds.length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search attractions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => {
          const isFavorited = favoriteIds.includes(place.id);
          return (
            <div
              key={place.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {place.category}
                </div>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(place.id)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 ${
                    isFavorited
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-white/80 hover:bg-white text-slate-700'
                  }`}
                  title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-base leading-tight">
                    {place.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {place.highlights}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Best Time:</span>
                    </span>
                    <span className="font-semibold text-slate-800">{place.bestTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration & Cost:</span>
                    <span className="font-bold text-indigo-700">
                      {place.duration} • {place.approxCost === 0 ? 'Free Entry' : `₹${place.approxCost}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
