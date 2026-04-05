import React from 'react';
import { Target, ShieldAlert, Zap } from 'lucide-react';

const InstructionCard: React.FC<{ title: string; items: string[]; type: 'focus' | 'avoid' | 'other' }> = ({ title, items, type }) => {
  if (items.length === 0) return null;
  const styles = {
    focus: { bg: "bg-emerald-50/50", border: "border-emerald-100", text: "text-emerald-900", iconContainer: "bg-emerald-500", icon: <Target className="w-4 h-4 text-white" /> },
    avoid: { bg: "bg-rose-50/50", border: "border-rose-100", text: "text-rose-900", iconContainer: "bg-rose-500", icon: <ShieldAlert className="w-4 h-4 text-white" /> },
    other: { bg: "bg-amber-50/50", border: "border-amber-100", text: "text-amber-900", iconContainer: "bg-amber-500", icon: <Zap className="w-4 h-4 text-white" /> }
  }[type];

  return (
    <div className={`p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border ${styles.bg} ${styles.border} shadow-sm group hover:shadow-xl transition-all duration-500`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${styles.iconContainer}`}>
          {styles.icon}
        </div>
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-700">{title}</h4>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className={`text-base font-bold ${styles.text} flex items-start gap-3`}>
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 opacity-40 ${styles.iconContainer}`}></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructionCard;
