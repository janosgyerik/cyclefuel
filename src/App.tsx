import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import { phaseTexts, PhaseContent } from './texts';
import CustomCalendar from './components/CustomCalendar';
import DetailView from './components/DetailView';
import PhaseCard from './components/PhaseCard';
import CycleWheel from './components/CycleWheel';
import TipsSection from './components/TipsSection';

const App: React.FC = () => {
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const [startDate, setStartDate] = useState<string>(() => {
    const saved = localStorage.getItem('cycleStartDate');
    return saved || formatDate(new Date());
  });

  const [cycleDay, setCycleDay] = useState(1);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDevMode, setIsDevMode] = useState(window.location.hash.includes('viewmode=dev'));

  useEffect(() => {
    const handleHashChange = () => setIsDevMode(window.location.hash.includes('viewmode=dev'));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedPhase) setSelectedPhase(null);
        else if (isCalendarOpen) setIsCalendarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhase, isCalendarOpen]);

  const cycleData = useMemo(() => {
    const visualData: Record<string, any> = {
      menstrual: { days: [1, 5], color: "#B37455", bgClass: "bg-[#B37455]", textColor: "text-[#B37455]", lightColor: "bg-[#B37455]/10", accentColor: "border-[#B37455]/20" },
      follicular: { days: [6, 12], color: "#CEAF4E", bgClass: "bg-[#CEAF4E]", textColor: "text-[#CEAF4E]", lightColor: "bg-[#CEAF4E]/10", accentColor: "border-[#CEAF4E]/20" },
      ovulation: { days: [13, 15], color: "#8AA773", bgClass: "bg-[#8AA773]", textColor: "text-[#8AA773]", lightColor: "bg-[#8AA773]/10", accentColor: "border-[#8AA773]/20" },
      luteal: { days: [16, 28], color: "#7C9FC3", bgClass: "bg-[#7C9FC3]", textColor: "text-[#7C9FC3]", lightColor: "bg-[#7C9FC3]/10", accentColor: "border-[#7C9FC3]/20" }
    };

    const generateSummary = (content: PhaseContent) => {
      const parts = [];
      if (content.summaryText) parts.push(content.summaryText);
      if (content.focusItems.length > 0) parts.push(`Focus on: ${content.focusItems.join(". ")}.`);
      if (content.avoidItems.length > 0) parts.push(`Avoid: ${content.avoidItems.join(", ")}.`);
      if (content.otherItems.length > 0) parts.push(`Other: ${content.otherItems.join(", ")}.`);
      return parts.join("\n\n");
    };

    const combined: any = {};
    Object.keys(phaseTexts).forEach(key => {
      const text = phaseTexts[key];
      const visual = visualData[key];
      combined[key] = {
        ...text,
        ...visual,
        cardSummary: generateSummary(text)
      };
    });
    return combined;
  }, []);

  useEffect(() => {
    if (isDragging) return;
    localStorage.setItem('cycleStartDate', startDate);
    const [y, m, d] = startDate.split('-').map(Number);
    const start = new Date(y, m - 1, d);
    const today = new Date();
    const normalizedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = Math.max(0, normalizedToday.getTime() - normalizedStart.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const day = diffDays + 1;
    setCycleDay(day);
  }, [startDate, isDragging]);



  const currentPhaseKey = useMemo(() => {
    if (cycleDay >= 1 && cycleDay <= 5) return 'menstrual';
    if (cycleDay >= 6 && cycleDay <= 12) return 'follicular';
    if (cycleDay >= 13 && cycleDay <= 15) return 'ovulation';
    return 'luteal';
  }, [cycleDay]);

  const currentPhase = cycleData[currentPhaseKey as keyof typeof cycleData];

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-[1.75rem] flex items-center justify-center shadow-md border border-slate-50 hover:scale-105 transition-transform duration-500">
                <img src="logo.png" alt="Cycle Fuel Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 group">Cycle Fuel</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Phase-by-phase wellness and nutrition tracker.</p>
          </div>
          <div className="relative" ref={calendarRef}>
            <button onClick={() => setIsCalendarOpen(!isCalendarOpen)} className={`bg-white p-5 px-7 rounded-[2.5rem] shadow-sm border transition-all flex items-center gap-5 group ${isCalendarOpen ? 'border-slate-900 ring-8 ring-slate-900/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}`}>
              <div className={`p-2 rounded-xl transition-colors ${isCalendarOpen ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}><CalendarIcon className="w-5 h-5" /></div>
              <div className="flex flex-col items-start"><span className="text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] mb-0.5">Start Date</span><span className="text-sm font-bold text-slate-700">{new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
            </button>
            {isCalendarOpen && <div className="absolute left-0 md:left-auto md:right-0 mt-3 z-50 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-[3rem] border border-slate-100 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-300 origin-top-left md:origin-top-right"><CustomCalendar selectedDate={startDate} onSelect={(date) => { setStartDate(date); setIsCalendarOpen(false); }} /></div>}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[4rem] shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden group">
              <CycleWheel 
                cycleDay={cycleDay}
                setCycleDay={setCycleDay}
                setStartDate={setStartDate}
                cycleData={cycleData}
                currentPhase={currentPhase}
                isDevMode={isDevMode}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
              />
              <div className="mt-12 grid grid-cols-1 gap-5 w-full">
                {(() => {
                  const keys = ['menstrual', 'follicular', 'ovulation', 'luteal'];
                  const currentIndex = keys.indexOf(currentPhaseKey);
                  const orderedKeys = [
                    ...keys.slice(currentIndex),
                    ...keys.slice(0, currentIndex)
                  ];
                  return orderedKeys.map((key) => (
                    <PhaseCard key={key} phase={(cycleData as any)[key]} isActive={currentPhaseKey === key} onClick={() => setSelectedPhase({ phase: (cycleData as any)[key], key })} />
                  ));
                })()}
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[4rem] shadow-sm border border-slate-100 min-h-full flex flex-col relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-96 h-96 ${currentPhase.lightColor} blur-[120px] -mr-48 -mt-48 transition-colors duration-1000`}></div>
              <div className="relative flex-grow">
                <DetailView phase={currentPhase} phaseKey={currentPhaseKey} />
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12">
          <TipsSection />
        </div>

        {selectedPhase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedPhase(null)}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500"></div>
            <div className="bg-white w-full max-w-4xl rounded-[4rem] p-10 md:p-14 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] animate-in zoom-in slide-in-from-bottom-10 duration-500" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 flex justify-end z-50 pointer-events-none -mb-12">
                <button onClick={() => setSelectedPhase(null)} className="pointer-events-auto p-4 bg-white/90 backdrop-blur-md hover:bg-slate-100 rounded-full shadow-xl border border-slate-100 transition-all group transform hover:scale-110 active:scale-95">
                  <X className="w-6 h-6 text-slate-500 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
              <DetailView phase={selectedPhase.phase} phaseKey={selectedPhase.key} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
