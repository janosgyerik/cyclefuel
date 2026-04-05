import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CycleWheelProps {
  cycleDay: number;
  setCycleDay: (day: number) => void;
  setStartDate: (date: string) => void;
  cycleData: any;
  currentPhase: any;
  isDevMode: boolean;
  isDragging: boolean;
  setIsDragging: (val: boolean) => void;
}

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const CycleWheel: React.FC<CycleWheelProps> = ({
  cycleDay,
  setCycleDay,
  setStartDate,
  cycleData,
  currentPhase,
  isDevMode,
  isDragging,
  setIsDragging,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const getStrokeDash = (days: number) => (days / 28) * circumference;

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let angle = Math.atan2(clientY - centerY, clientX - centerX) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    const rawDay = (angle / (2 * Math.PI)) * 28 + 1;
    const newDay = Math.min(28, Math.max(1, Math.round(rawDay)));
    if (newDay !== cycleDay) {
      setCycleDay(newDay);
      const today = new Date();
      const newStart = new Date(today);
      newStart.setDate(today.getDate() - (newDay - 1));
      setStartDate(formatDate(newStart));
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging, cycleDay, handleMove, setIsDragging]);

  return (
    <>
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 transition-colors duration-1000"></div>
      <div className="relative w-80 h-80 flex items-center justify-center select-none" ref={svgRef as any}>
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="20" />
          <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.menstrual.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(5)} ${circumference}`} strokeLinecap="round" />
          <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.follicular.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(7)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(5)}`} strokeLinecap="round" />
          <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.ovulation.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(3)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(12)}`} strokeLinecap="round" />
          <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.luteal.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(13)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(15)}`} strokeLinecap="round" />
        </svg>
        <div className="absolute w-full h-full transform transition-transform duration-150 preserve-3d" style={{ transform: `rotate(${((Math.min(cycleDay, 28) - 1) / 28) * 360}deg)`, cursor: isDevMode ? (isDragging ? 'grabbing' : 'grab') : 'default' }} onMouseDown={(e) => {
          if (!isDevMode) return;
          e.preventDefault();
          setIsDragging(true);
        }} onTouchStart={() => {
          if (isDevMode) setIsDragging(true);
        }}>
          <div className={`absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 rounded-full border-4 border-white shadow-2xl z-20 transition-transform ${isDragging ? 'scale-125 ring-[12px] ring-slate-900/10' : (isDevMode ? 'hover:scale-110' : '')}`}><div className="w-full h-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div></div></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className={`w-40 h-40 rounded-full ${currentPhase.lightColor} flex flex-col items-center justify-center border-4 border-white shadow-inner transition-colors duration-700`}><span className="text-6xl font-black leading-none text-slate-900">{cycleDay}</span><span className="text-[11px] uppercase font-black tracking-[0.3em] text-slate-400 mt-2">Cycle Day</span></div>
        </div>
      </div>
      {isDevMode && (
        <div className="mt-8 text-center"><p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> Drag knob to adjust <ChevronRight className="w-3 h-3" /></p></div>
      )}
    </>
  );
};

export default CycleWheel;
