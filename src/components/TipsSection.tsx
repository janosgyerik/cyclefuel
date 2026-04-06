import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { tips } from '../texts';

const TipsSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-0"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">General Tips & Extras</h2>
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 md:px-12 pb-8 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">{tips.generalTips.name}</h3>
              <ul className="space-y-3">
                {tips.generalTips.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">{tips.extras.name}</h3>
              <ul className="space-y-3">
                {tips.extras.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipsSection;
