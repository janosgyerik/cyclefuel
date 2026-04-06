import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomCalendar: React.FC<{ selectedDate: string; onSelect: (d: string) => void }> = ({ selectedDate, onSelect }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const changeMonth = (offset: number) => setViewDate(new Date(year, month + offset, 1));
  const isSelected = (day: number) => {
    const d = new Date(selectedDate);
    return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
  };

  const todayLocal = new Date();
  todayLocal.setHours(0, 0, 0, 0);
  const minDateLocal = new Date(todayLocal);
  minDateLocal.setMonth(todayLocal.getMonth() - 2);

  const isDateDisabled = (day: number) => {
    const d = new Date(year, month, day);
    return d > todayLocal || d < minDateLocal;
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const hasNextMonth = new Date(year, month + 1, 1) <= todayLocal;
  const hasPrevMonth = new Date(year, month, 0) >= minDateLocal;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe && hasNextMonth) changeMonth(1);
    if (isRightSwipe && hasPrevMonth) changeMonth(-1);
  };

  return (
    <div className="p-5 w-72" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler}>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => changeMonth(-1)} className={`p-2 hover:bg-slate-100 rounded-xl transition-colors ${!hasPrevMonth ? 'invisible' : ''}`}><ChevronLeft className="w-5 h-5 text-slate-500" /></button>
        <span className="font-bold text-slate-800">{monthName} {year}</span>
        <button onClick={() => changeMonth(1)} className={`p-2 hover:bg-slate-100 rounded-xl transition-colors ${!hasNextMonth ? 'invisible' : ''}`}><ChevronRight className="w-5 h-5 text-slate-500" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div key={idx} className="h-9 flex items-center justify-center">
            {day && (
              <button
                disabled={isDateDisabled(day)}
                onClick={() => onSelect(formatDate(new Date(year, month, day)))}
                className={`w-8 h-8 text-sm font-bold rounded-full transition-all ${isSelected(day)
                  ? 'bg-slate-900 text-white shadow-md'
                  : isDateDisabled(day)
                    ? 'text-slate-200 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
