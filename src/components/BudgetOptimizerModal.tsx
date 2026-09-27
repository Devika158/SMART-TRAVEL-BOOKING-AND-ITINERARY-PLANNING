import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  Sparkles, 
  ArrowDownRight, 
  CheckCircle2, 
  TrendingDown, 
  AlertCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BudgetBreakdown, TripItineraryData } from '../types/travel';

interface BudgetOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: TripItineraryData;
  onApplyOptimization: (newBudget: BudgetBreakdown) => void;
}

export const BudgetOptimizerModal: React.FC<BudgetOptimizerModalProps> = ({
  isOpen,
  onClose,
  itinerary,
  onApplyOptimization
}) => {
  const currentBudget = itinerary.budgetBreakdown;
  const currentTotal = currentBudget.totalEstimated;

  const [targetBudget, setTargetBudget] = useState(
    Math.max(5000, Math.round(currentTotal * 0.8 / 1000) * 1000)
  );
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/trip/optimize-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan: itinerary,
          targetBudget: targetBudget,
          currency: 'INR'
        })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setOptimizationResult(data.data);
      }
    } catch (e) {
      console.error('Error optimizing budget:', e);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApply = () => {
    if (optimizationResult?.optimizedBudget) {
      onApplyOptimization(optimizationResult.optimizedBudget);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                AI Budget Optimizer
              </h3>
              <p className="text-xs text-slate-500">
                Smart financial re-balancing to save money without ruining experiences.
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

        {/* Current Budget Breakdown Display */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>CURRENT ESTIMATED EXPENSE</span>
            <span className="text-base text-slate-900 font-extrabold">₹{currentTotal.toLocaleString()}</span>
          </div>

          {/* Progress bar split */}
          <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden flex">
            <div style={{ width: `${(currentBudget.accommodation / currentTotal) * 100}%` }} className="bg-indigo-600" title="Hotel" />
            <div style={{ width: `${(currentBudget.transport / currentTotal) * 100}%` }} className="bg-sky-500" title="Transport" />
            <div style={{ width: `${(currentBudget.food / currentTotal) * 100}%` }} className="bg-amber-500" title="Food" />
            <div style={{ width: `${(currentBudget.activities / currentTotal) * 100}%` }} className="bg-emerald-500" title="Activities" />
            <div style={{ width: `${(currentBudget.shopping / currentTotal) * 100}%` }} className="bg-pink-500" title="Shopping" />
            <div style={{ width: `${(currentBudget.emergency / currentTotal) * 100}%` }} className="bg-rose-500" title="Emergency" />
          </div>

          {/* Legend items */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[11px]">
            <div>
              <span className="text-indigo-600 font-bold block">Hotel</span>
              <span className="text-slate-600">₹{currentBudget.accommodation}</span>
            </div>
            <div>
              <span className="text-sky-600 font-bold block">Transport</span>
              <span className="text-slate-600">₹{currentBudget.transport}</span>
            </div>
            <div>
              <span className="text-amber-600 font-bold block">Food</span>
              <span className="text-slate-600">₹{currentBudget.food}</span>
            </div>
            <div>
              <span className="text-emerald-600 font-bold block">Activities</span>
              <span className="text-slate-600">₹{currentBudget.activities}</span>
            </div>
            <div>
              <span className="text-pink-600 font-bold block">Shopping</span>
              <span className="text-slate-600">₹{currentBudget.shopping}</span>
            </div>
            <div>
              <span className="text-rose-600 font-bold block">Emergency</span>
              <span className="text-slate-600">₹{currentBudget.emergency}</span>
            </div>
          </div>
        </div>

        {/* Optimizer Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>SET YOUR DESIRED LOWER BUDGET</span>
            <span className="text-base text-indigo-600 font-extrabold">₹{targetBudget.toLocaleString()}</span>
          </div>

          <input
            type="range"
            min={4000}
            max={currentTotal}
            step={500}
            value={targetBudget}
            onChange={(e) => setTargetBudget(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          <div className="flex gap-2">
            {[Math.round(currentTotal * 0.85), Math.round(currentTotal * 0.75), Math.round(currentTotal * 0.65)].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setTargetBudget(val)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
              >
                ₹{val.toLocaleString()}
              </button>
            ))}
          </div>

          <button
            onClick={handleRunOptimization}
            disabled={isOptimizing}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
          >
            {isOptimizing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>AI is calculating optimal cost reductions...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Analyze & Optimize for ₹{targetBudget.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>

        {/* Optimization Results */}
        {optimizationResult && (
          <div className="space-y-4 pt-2 border-t border-slate-100 animate-fade-in">
            {/* AI Advice Summary */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>AI Optimization Strategy</span>
              </div>
              <p className="leading-relaxed">{optimizationResult.aiAdvice}</p>
            </div>

            {/* Actionable Cutbacks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Itemized Savings & Recommendations
              </h4>
              <div className="space-y-2">
                {optimizationResult.actionableCutbacks?.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-800">{item.category}</div>
                      <div className="text-slate-600 mt-0.5">{item.recommendation}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md">
                        -₹{item.savings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Tips */}
            {optimizationResult.optimizedBudget?.savingsTips && (
              <div className="p-3 rounded-xl bg-sky-50 text-sky-950 text-xs space-y-1">
                <span className="font-bold">Pro-Tips:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-sky-900">
                  {optimizationResult.optimizedBudget.savingsTips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Optimized Budget to Itinerary</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
