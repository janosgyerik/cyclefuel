import React from 'react';
import { Droplet, Sparkles, Sun, Moon, Utensils, Brain } from 'lucide-react';
import InstructionCard from './InstructionCard';

const DetailView: React.FC<{ phase: any; phaseKey: string }> = ({ phase, phaseKey }) => (
  <div className="flex flex-col space-y-8">
    <div className="flex items-start justify-between mb-4 gap-6">
      <div className="flex-1">
        <h2 className="text-4xl font-black text-slate-900 mb-2">{phase.name} Phase</h2>
        <p className={`font-bold text-xl ${phase.textColor} transition-colors duration-700 mb-4`}>{phase.subtitle}</p>
        {phase.summaryText && (
          <p className="text-slate-600 font-bold leading-relaxed max-w-xl mb-6 text-base">{phase.summaryText}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {phase.focusOn.map((item: string, i: number) => (
            <span key={i} className={`text-[11px] font-black uppercase px-3 py-1.5 rounded-xl border ${phase.lightColor} ${phase.textColor} ${phase.accentColor}`}>+ {item}</span>
          ))}
        </div>
      </div>
      <div className={`${phase.lightColor} w-24 h-24 rounded-[3rem] flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-700 shrink-0`}>
        {phaseKey === 'menstrual' && <Droplet className="w-12 h-12 text-[#B37455]" />}
        {phaseKey === 'follicular' && <Sparkles className="w-12 h-12 text-[#CEAF4E]" />}
        {phaseKey === 'ovulation' && <Sun className="w-12 h-12 text-[#8AA773]" />}
        {phaseKey === 'luteal' && <Moon className="w-12 h-12 text-[#7C9FC3]" />}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InstructionCard title="Focus On" items={phase.focusItems} type="focus" />
      <InstructionCard title="Limit / Avoid" items={phase.avoidItems} type="avoid" />
      <InstructionCard title="Daily Habits" items={phase.otherItems} type="other" />
    </div>

    <div className="pt-20 border-t border-slate-100/60">
      <div className="flex items-center gap-6 mb-12">
        <div className={`w-14 h-14 rounded-[1.5rem] ${phase.lightColor} ${phase.textColor} flex items-center justify-center shadow-sm border border-white`}>
          <Brain className="w-7 h-7" />
        </div>
        <h3 className={`text-4xl font-extrabold tracking-tight text-slate-800`}>Mind & Body Guidance</h3>
      </div>
      <div className={`p-6 md:p-12 rounded-3xl md:rounded-[4rem] ${phase.lightColor} border-0 md:border-4 border-white shadow-inner`}>
        <h4 className="font-black text-2xl text-slate-900 mb-8">{phase.moodTitle}</h4>
        <ul className="space-y-8">
          {phase.moodTips.map((tip: string, i: number) => (
            <li key={i} className="text-slate-700 font-bold leading-relaxed text-xl mb-10 overflow-hidden">
              <span className={`float-left w-10 h-10 rounded-2xl flex items-center justify-center text-[11px] font-black ${phase.bgClass} text-white mr-5 mb-2 shadow-lg`}>{i + 1}</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="pt-20 border-t border-slate-100/60">
      <div className="flex items-center gap-6 mb-12">
        <div className={`w-14 h-14 rounded-[1.5rem] ${phase.lightColor} ${phase.textColor} flex items-center justify-center shadow-sm border border-white`}>
          <Utensils className="w-7 h-7" />
        </div>
        <h3 className={`text-4xl font-extrabold tracking-tight text-slate-800`}>Example Meal Plan</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(phase.meals).map(([type, desc]) => (
          <div key={type} className="p-6 md:p-10 bg-slate-50/50 shadow-sm rounded-3xl md:rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
            <span className="text-[11px] font-black tracking-[0.3em] text-slate-400 uppercase mb-4 block group-hover:text-slate-500 transition-colors">{type}</span>
            <p className="text-slate-800 font-extrabold leading-tight text-2xl">{desc as string}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DetailView;
