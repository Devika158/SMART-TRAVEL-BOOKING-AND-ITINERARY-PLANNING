import React, { useState } from 'react';
import { 
  SplitSquareVertical, 
  Plus, 
  Wallet, 
  PieChart, 
  ArrowRight, 
  Users, 
  DollarSign, 
  Trash2, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ExpenseRecord, GroupMember } from '../types/travel';

interface ExpenseTrackerProps {
  totalBudget: number;
  expenses: ExpenseRecord[];
  onAddExpense: (expense: ExpenseRecord) => void;
  onDeleteExpense: (id: string) => void;
}

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  totalBudget,
  expenses,
  onAddExpense,
  onDeleteExpense
}) => {
  const [activeTab, setActiveTab] = useState<'log' | 'splitter'>('log');

  // New Expense form state
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseRecord['category']>('food');
  const [newPaidBy, setNewPaidBy] = useState('Akhil');

  // Group members state
  const [members, setMembers] = useState<string[]>(['Akhil', 'Praveen', 'Rahul', 'Sneha']);
  const [newMemberName, setNewMemberName] = useState('');

  // Calculations
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Category totals
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(newAmount);
    if (!newTitle.trim() || isNaN(amountNum) || amountNum <= 0) return;

    const newRec: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      title: newTitle.trim(),
      amount: amountNum,
      category: newCategory,
      paidBy: newPaidBy,
      date: new Date().toISOString().split('T')[0]
    };

    onAddExpense(newRec);
    setNewTitle('');
    setNewAmount('');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemberName.trim() && !members.includes(newMemberName.trim())) {
      setMembers([...members, newMemberName.trim()]);
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (name: string) => {
    if (members.length > 1) {
      setMembers(members.filter(m => m !== name));
    }
  };

  // Group Split Settlement Algorithm
  const calculateSettlements = () => {
    if (members.length === 0) return [];
    
    // Calculate how much each member paid
    const memberPaid: Record<string, number> = {};
    members.forEach(m => { memberPaid[m] = 0; });
    expenses.forEach(e => {
      if (memberPaid[e.paidBy] !== undefined) {
        memberPaid[e.paidBy] += e.amount;
      } else {
        // If paidBy is not in members list, assign to first member or add
        memberPaid[members[0]] = (memberPaid[members[0]] || 0) + e.amount;
      }
    });

    const equalShare = totalSpent / members.length;
    
    // Net balances: positive means they are owed money, negative means they owe money
    const balances = members.map(m => ({
      name: m,
      net: (memberPaid[m] || 0) - equalShare
    }));

    const debtors = balances.filter(b => b.net < -0.01).map(b => ({ ...b, net: Math.abs(b.net) }));
    const creditors = balances.filter(b => b.net > 0.01).map(b => ({ ...b }));

    debtors.sort((a, b) => b.net - a.net);
    creditors.sort((a, b) => b.net - a.net);

    const settlements: Array<{ from: string; to: string; amount: number }> = [];

    let d = 0;
    let c = 0;
    while (d < debtors.length && c < creditors.length) {
      const settleAmount = Math.min(debtors[d].net, creditors[c].net);
      if (settleAmount > 0.5) {
        settlements.push({
          from: debtors[d].name,
          to: creditors[c].name,
          amount: Math.round(settleAmount)
        });
      }

      debtors[d].net -= settleAmount;
      creditors[c].net -= settleAmount;

      if (debtors[d].net < 0.01) d++;
      if (creditors[c].net < 0.01) c++;
    }

    return settlements;
  };

  const settlements = calculateSettlements();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Spending Meter */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Live Budget & Spending Tracker
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Trip Expenses & Group Bill Splitter
            </h2>
            <p className="text-xs text-slate-500">
              Log expenditures in real-time, view remaining budget, and calculate who owes whom effortlessly.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('log')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'log'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Expense Logger
            </button>
            <button
              onClick={() => setActiveTab('splitter')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'splitter'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Group Bill Splitter
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Target Budget</span>
            <div className="text-2xl font-black text-slate-900">₹{totalBudget.toLocaleString()}</div>
            <span className="text-[10px] text-slate-400">Total planned cap</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
            <span className="text-[11px] font-bold text-amber-700 uppercase">Total Spent</span>
            <div className="text-2xl font-black text-amber-900">₹{totalSpent.toLocaleString()}</div>
            <span className="text-[10px] text-amber-700 font-semibold">{spentPercentage}% of total budget</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${
            remainingBudget >= 0 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}>
            <span className="text-[11px] font-bold uppercase opacity-75">
              {remainingBudget >= 0 ? 'Remaining Balance' : 'Budget Exceeded By'}
            </span>
            <div className="text-2xl font-black">
              ₹{Math.abs(remainingBudget).toLocaleString()}
            </div>
            <span className="text-[10px] font-medium opacity-90">
              {remainingBudget >= 0 ? 'Safe & On Track ✅' : 'Exceeded Planned Cap ⚠️'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>Budget Utilization</span>
            <span>{spentPercentage}%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.min(100, spentPercentage)}%` }}
              className={`h-full transition-all duration-500 ${
                spentPercentage > 90 ? 'bg-rose-500' : spentPercentage > 75 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
          </div>
        </div>
      </div>

      {activeTab === 'log' ? (
        /* EXPENSE LOGGER TAB */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Add Expense Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Log New Expense</span>
            </h3>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Item Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Biryani Dinner, Metro Card, Fort Tickets..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="e.g. 850"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  >
                    <option value="food">Food & Dining</option>
                    <option value="transport">Transport</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="activities">Activities & Entry</option>
                    <option value="shopping">Shopping & Souvenirs</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Paid By (Traveler)
                </label>
                <select
                  value={newPaidBy}
                  onChange={(e) => setNewPaidBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  {members.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Expense Sheet</span>
              </button>
            </form>
          </div>

          {/* Expenses Table / List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                Logged Expenses ({expenses.length})
              </h3>
              <span className="text-xs text-slate-400">Total: ₹{totalSpent.toLocaleString()}</span>
            </div>

            {expenses.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No expenses logged yet. Add your first spending on the left.
              </div>
            ) : (
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {expenses.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span className="capitalize font-semibold text-indigo-600">{item.category}</span>
                        <span>•</span>
                        <span>Paid by: <strong>{item.paidBy}</strong></span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm text-slate-900">
                        ₹{item.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => onDeleteExpense(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Delete expense"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* GROUP BILL SPLITTER TAB */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Group members manager (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Group Travel Companions</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Each member's share is calculated equally across total trip spends.
              </p>
            </div>

            <form onSubmit={handleAddMember} className="flex gap-2">
              <input
                type="text"
                placeholder="Add friend's name..."
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50/50 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Add
              </button>
            </form>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 uppercase">
                Active Group Members ({members.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
                  >
                    <span>{m}</span>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(m)}
                        className="text-slate-400 hover:text-rose-600 text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs space-y-2">
              <div className="flex justify-between text-indigo-950 font-bold">
                <span>Total Group Spend:</span>
                <span>₹{totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-indigo-900 font-extrabold text-sm border-t border-indigo-200/60 pt-2">
                <span>Equal Share per Person:</span>
                <span>₹{members.length > 0 ? Math.round(totalSpent / members.length).toLocaleString() : 0}</span>
              </div>
            </div>
          </div>

          {/* Settlement Matrix (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Smart Debt Settlement ("Who Owes Whom")</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                AI simplifies multi-party debts into minimal single transfers!
              </p>
            </div>

            {settlements.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl text-xs text-slate-500 space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                <div className="font-bold text-slate-800">All Balances Settled Evenly!</div>
                <p>Either zero expenses have been logged, or all members paid their exact equal shares.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {settlements.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{s.from}</span>
                      <span className="text-slate-400">pays</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-extrabold text-indigo-900 text-sm">{s.to}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                        ₹{s.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
