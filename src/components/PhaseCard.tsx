import React from 'react';

const PhaseCard: React.FC<{ phase: any; isActive: boolean; onClick: () => void }> = ({ phase, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`p-6 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${isActive ? `${phase.bgClass} text-white shadow-2xl scale-[1.02] border-white/20` : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
      }`}
  >
    <div className="mb-3">
      <h3 className="font-black text-sm uppercase tracking-wider mb-1">{phase.name}</h3>
      <span className={`text-[11px] font-black px-2 py-0.5 rounded-full inline-block ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>DAYS {phase.days[0]}-{phase.days[1]}</span>
    </div>
    <p className={`text-sm font-medium leading-relaxed mb-4 whitespace-pre-line ${isActive ? 'text-white/90' : 'text-slate-500'}`}>{phase.cardSummary}</p>
    <div className="flex flex-wrap gap-1.5">
      {phase.focusOn.map((item: string, i: number) => (
        <span key={i} className={`text-[11px] font-black uppercase px-2 py-1 rounded-lg ${isActive ? 'bg-white/10' : 'bg-slate-50 text-slate-400'}`}>+ {item}</span>
      ))}
    </div>
  </div>
);

export default PhaseCard;
