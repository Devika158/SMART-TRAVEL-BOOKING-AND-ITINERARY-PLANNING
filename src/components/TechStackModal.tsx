import React from 'react';
import { 
  X, 
  GraduationCap, 
  Cpu, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Server,
  ArrowRight
} from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackModal: React.FC<TechStackModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Project Architecture & Academic Subjects Mapping
              </h3>
              <p className="text-xs text-slate-500">
                Detailed design specifications, system flow, and technologies used for college project presentation.
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

        {/* Subjects Used Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Core Subjects Mapping (For Academic Record & Viva)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject 1: Programming */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-sm text-slate-900">1. Software Engineering & Programming</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Backend route handling, financial debt-settlement algorithms (minimized multi-party debt transfers), booking PNR generators, and component state management.
              </p>
            </div>

            {/* Subject 2: DBMS */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-sm text-slate-900">2. Database Management Systems (DBMS)</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Relational entity structuring for Users, Trips, Bookings, Day Schedules, Expenses, and Offline LocalStorage caching to maintain persistent state.
              </p>
            </div>

            {/* Subject 3: AI & GenAI */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-sm text-slate-900">3. Artificial Intelligence & GenAI</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini 3.8 Flash model integration for dynamic day re-planning, weather-aware indoor fallback generation, zero-backtrack transit routing, and financial budget cutback analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Processing - How It Works Flow */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Server className="w-4 h-4 text-indigo-600" />
            <span>Processing Pipeline ("How It Works")</span>
          </h4>

          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2 overflow-x-auto">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span>[1. User Input]</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Destination + Budget + Travelers + Days + Diet & Pace</span>
            </div>
            <div className="flex items-center gap-2 text-sky-400">
              <span>[2. Validation & Processing]</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Express API validates budget & filters criteria</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-300">
              <span>[3. AI Generation]</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Gemini constructs day-wise schedule, transit & meals</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[4. Budget & Bookings]</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Split categories, simulated PNR ticket generation</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span>[5. Dynamic Operations]</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Budget optimizer, day replanning, & group bill split settlements</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Technology Specifications
          </h4>

          <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Component</th>
                  <th className="p-3">Technology Used</th>
                  <th className="p-3">Role / Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Frontend UI</td>
                  <td className="p-3">React 19 + TypeScript + Tailwind CSS</td>
                  <td className="p-3">Interactive responsive dashboards, timelines, modals, and confetti animations</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Backend Server</td>
                  <td className="p-3">Node.js Express + TSX</td>
                  <td className="p-3">REST API endpoints for itinerary generation, budget optimizer, and chat</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">AI / LLM Model</td>
                  <td className="p-3">Google Gemini 3.8 Flash (@google/genai)</td>
                  <td className="p-3">Personalized travel plan reasoning, route optimization, dynamic replanning</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Data Persistence</td>
                  <td className="p-3">Browser LocalStorage + In-Memory Store</td>
                  <td className="p-3">Persistent trips, confirmed bookings, expenses, and packing checklists</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
