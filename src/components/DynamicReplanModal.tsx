import React, { useState } from 'react';
import { X, RefreshCw, Sparkles, CloudRain, Compass, Clock, CheckCircle2 } from 'lucide-react';
import { DayItinerary } from '../types/travel';

interface DynamicReplanModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  dayNumber: number;
  existingDay: DayItinerary;
  onDayUpdated: (updatedDay: DayItinerary) => void;
}

export const DynamicReplanModal: React.FC<DynamicReplanModalProps> = ({
  isOpen,
  onClose,
  destination,
  dayNumber,
  existingDay,
  onDayUpdated
}) => {
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '🌧️ Rain Forecast — Replace with Indoor Museums & Bazaars', text: 'Rain forecast: replace outdoor locations with top indoor cultural venues, museums, and covered heritage bazaars.' },
    { label: '⚡ More Adventure & Thrills', text: 'Less historic walking, add high-adrenaline outdoor adventure activities or water sports.' },
    { label: '☕ Relaxed & Cozy Pace', text: 'Make the day less tiring, start later at 10 AM, include cozy cafes, scenic sunset viewpoint, and leisure walk.' },
    { label: '🛣️ Optimize Sequence to Minimize Travel Time', text: 'Rearrange all stops into the most efficient linear transit order to avoid traffic backtracking.' },
    { label: '🥗 Pure Vegetarian Street Food Trail', text: 'Focus exclusively on famous vegetarian culinary heritage and street dessert stalls.' }
  ];

  const handleReplan = async (customText?: string) => {
    const textToSend = customText || instruction;
    if (!textToSend.trim()) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/trip/dynamic-replan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          dayNumber,
          changeRequest: textToSend,
          existingDay
        })
      });

      const data = await response.json();
      if (data.success && data.data) {
        onDayUpdated(data.data);
        onClose();
      } else {
        setErrorMessage(data.error || 'Could not re-plan. Please try again.');
      }
    } catch (e: any) {
      setErrorMessage(e.message || 'Replanning failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Re-plan Day {dayNumber} ({destination})
              </h3>
              <p className="text-xs text-slate-500">
                Adapt this day based on weather, energy, or personal mood.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick prompt presets */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Quick Optimization Presets
          </label>
          <div className="space-y-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInstruction(p.text);
                  handleReplan(p.text);
                }}
                disabled={isLoading}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-xs font-medium text-slate-800 transition-colors flex items-center justify-between"
              >
                <span>{p.label}</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Custom prompt text area */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Or describe your own change:
          </label>
          <textarea
            rows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g. 'I want to skip museums and spend the afternoon at a local lake, followed by live music at night...'"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-xs text-slate-900 bg-slate-50/50"
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleReplan()}
            disabled={isLoading || !instruction.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>AI Re-planning Day {dayNumber}...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Apply AI Day Update</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
