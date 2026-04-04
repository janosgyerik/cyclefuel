import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Calendar as CalendarIcon, Utensils, Info, ChevronRight, Apple, Droplet, Sun, Sparkles, Moon, ChevronLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('cycleStartDate');
    return saved || "2026-04-02";
  });
  
  const [cycleDay, setCycleDay] = useState(1);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const calendarRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (selectedPhase) setSelectedPhase(null);
        else if (isCalendarOpen) setIsCalendarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhase, isCalendarOpen]);

  const cycleData = {
    menstrual: {
      name: "Menstrual",
      days: [1, 5],
      color: "#f43f5e", 
      bgClass: "bg-rose-500",
      textColor: "text-rose-500",
      lightColor: "bg-rose-50",
      subtitle: "Rest & Restore",
      cardSummary: "Low energy, menstruation",
      focusOn: ["Iron-rich foods", "Vitamin C", "Warm liquids"],
      avoid: ["Caffeine", "Cold foods", "Excessive salt"],
      moodTitle: "Nourish your body with iron & comfort",
      moodTips: [
        "Focus on iron-rich foods such as red meat, poultry, fish, legumes, and leafy greens (spinach, kale) to replace what's lost.",
        "Pair iron-rich foods with Vitamin C (citrus fruits, peppers) to increase absorption.",
        "Incorporate Vitamin K-rich foods like leafy greens to help regulate heavy bleeding and support blood clotting.",
        "Magnesium-rich foods (dark chocolate, pumpkin seeds) can help alleviate menstrual cramps.",
        "Sip on warm herbal teas (ginger, raspberry leaf) to soothe the uterus and reduce bloating.",
        "Stay hydrated with water and avoid excessive salt to prevent water retention.",
        "Consume healthy fats like omega-3s found in fatty fish or flaxseeds to reduce inflammation."
      ],
      meals: {
        breakfast: "Iron-fortified breakfast cereal",
        lunch: "Watermelon, cucumber, feta, and avocado salad",
        dinner: "Bolognaise and lentil spaghetti served with fresh greens",
        snack: "Dark chocolate"
      }
    },
    follicular: {
      name: "Follicular",
      days: [6, 12],
      color: "#fbbf24", 
      bgClass: "bg-amber-400",
      textColor: "text-amber-600",
      lightColor: "bg-amber-50",
      subtitle: "Growth & Creativity",
      cardSummary: "Rising energy, preparing for ovulation",
      focusOn: ["Fiber-rich foods", "Nutrient-dense energy", "Probiotics"],
      avoid: ["Alcohol", "Xenoestrogens", "Heavy fats"],
      moodTitle: "Build energy & support estrogen metabolism",
      moodTips: [
        "Eat plenty of fiber-rich foods (berries, citrus, leafy greens) to help your body process and eliminate used hormones.",
        "Incorporate cruciferous vegetables like broccoli and cauliflower, which contain DIM to support estrogen balance.",
        "Focus on healthy fats (avocado, nuts) to support hormone production as estrogen rises.",
        "Include fermented foods (yogurt, sauerkraut) to support the gut microbiome responsible for hormone metabolism.",
        "Choose complex carbohydrates (quinoa, oats) for sustained energy as your activity levels increase.",
        "Zinc-rich foods support healthy egg development and follicle growth.",
        "Vitamin E protects developing follicles from oxidative stress."
      ],
      meals: {
        breakfast: "Overnight oats topped with fresh berries",
        lunch: "Salmon served with steamed greens",
        dinner: "Mexican buddha bowl with avocado, brown rice, and beans",
        snack: "Fresh fruit salad"
      }
    },
    ovulation: {
      name: "Ovulation",
      days: [13, 15],
      color: "#60a5fa", 
      bgClass: "bg-blue-400",
      textColor: "text-blue-600",
      lightColor: "bg-blue-50",
      subtitle: "High energy & Connection",
      cardSummary: "Peak fertility, high libido",
      focusOn: ["High-protein foods", "Antioxidants", "Hydrating fruits"],
      avoid: ["Heavy grains", "Processed sugar", "Excessive caffeine"],
      moodTitle: "Maximize vitality & support peak energy",
      moodTips: [
        "Fuel your high energy with high-quality, easily digestible proteins (eggs, lean meats, tofu).",
        "Eat antioxidant-rich fruits like berries and pomegranate to protect the egg during release.",
        "Incorporate zinc-rich foods (shellfish, seeds) to support the surge in Luteinizing Hormone.",
        "Focus on hydrating foods (cucumber, watermelon) to support cervical fluid quality.",
        "Vitamin C-rich foods support the health of the follicle after the egg is released.",
        "Magnesium supports the nervous system during this high-intensity phase.",
        "Limit inflammatory foods to keep skin clear during hormonal peaks."
      ],
      meals: {
        breakfast: "Scrambled eggs on whole grain toast",
        lunch: "Chicken and salad wrap with avocado",
        dinner: "Tofu Thai curry with rice",
        snack: "Apple slices with peanut butter"
      }
    },
    luteal: {
      name: "Luteal",
      days: [16, 28],
      color: "#a855f7", 
      bgClass: "bg-purple-500",
      textColor: "text-purple-600",
      lightColor: "bg-purple-50",
      subtitle: "Support your mood with nutrients",
      cardSummary: "Low energy, increased appetite",
      focusOn: ["High-fiber carbs", "Magnesium-rich foods", "Healthy fats"],
      avoid: ["Processed junk food", "High salt", "Refined sugar"],
      moodTitle: "Manage PMS & appetite naturally",
      moodTips: [
        "Include complex carbohydrates (sweet potato, brown rice) to help stabilize blood sugar and serotonin levels.",
        "Magnesium-rich foods (dark chocolate, pumpkin seeds, spinach) are critical for reducing PMS-related anxiety and cramps.",
        "Vitamin B6-rich foods (bananas, poultry, chickpeas) support progesterone production and calm the nervous system.",
        "Consume high-fiber foods to prevent constipation often associated with high progesterone levels.",
        "Limit salt intake to help reduce water retention and breast tenderness.",
        "Healthy fats (nuts, seeds, avocado) support hormone production and keep you feeling full longer.",
        "Calcium-rich foods (tahini, leafy greens) can help minimize mood swings."
      ],
      meals: {
        breakfast: "Peanut butter oatmeal topped with nuts and seeds",
        lunch: "Baked sweet potato with quinoa salad",
        dinner: "Chickpea and spinach curry served with rice",
        snack: "Guacamole with whole grain pita bread"
      }
    }
  };

  useEffect(() => {
    if (isDragging) return;
    localStorage.setItem('cycleStartDate', startDate);
    const start = new Date(startDate);
    const today = new Date();
    const normalizedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = normalizedToday - normalizedStart;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const day = ((diffDays % 28) + 28) % 28 + 1;
    setCycleDay(day);
  }, [startDate, isDragging]);

  const handleMove = (clientX, clientY) => {
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
      setStartDate(newStart.toISOString().split('T')[0]);
    }
  };

  useEffect(() => {
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (e) => { if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY); };
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
  }, [isDragging, cycleDay]);

  const currentPhaseKey = useMemo(() => {
    if (cycleDay >= 1 && cycleDay <= 5) return 'menstrual';
    if (cycleDay >= 6 && cycleDay <= 12) return 'follicular';
    if (cycleDay >= 13 && cycleDay <= 15) return 'ovulation';
    return 'luteal';
  }, [cycleDay]);

  const currentPhase = cycleData[currentPhaseKey];

  const CustomCalendar = ({ selectedDate, onSelect }) => {
    const [viewDate, setViewDate] = useState(new Date(selectedDate));
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    const changeMonth = (offset) => setViewDate(new Date(year, month + offset, 1));
    const isSelected = (day) => {
      const d = new Date(selectedDate);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    };
    const handleDateClick = (day) => {
      const newDate = new Date(year, month, day);
      onSelect(newDate.toISOString().split('T')[0]);
    };
    const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="p-4 w-64">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
          <span className="font-bold text-sm text-slate-700">{monthName} {year}</span>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekLabels.map((d, i) => <span key={`lbl-${i}`} className="text-[10px] font-black text-slate-400">{d[0]}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => (
            <div key={`day-cell-${idx}`} className="h-8 flex items-center justify-center">
              {day && (
                <button
                  onClick={() => handleDateClick(day)}
                  className={`w-7 h-7 text-xs font-bold rounded-full transition-colors ${isSelected(day) ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'}`}
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

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const getStrokeDash = (days) => (days / 28) * circumference;

  const PhaseCard = ({ phase, isActive }) => (
    <div 
      onClick={() => setSelectedPhase(phase)}
      className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
        isActive ? `${phase.bgClass} text-white shadow-lg scale-105` : 'bg-white border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-black text-sm leading-tight">{phase.name}</h3>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>Days {phase.days[0]}-{phase.days[1]}</span>
      </div>
      <p className={`text-[10px] font-bold leading-tight mb-3 ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{phase.cardSummary}</p>
      
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {phase.focusOn.slice(0, 2).map((item, i) => (
            <span key={i} className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${isActive ? 'bg-white/10' : 'bg-slate-50 text-slate-400'}`}>+ {item}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Cycle Fuel</h1>
            <p className="text-slate-500 mt-1">Full phase-by-phase nutritional guidance.</p>
          </div>
          <div className="relative" ref={calendarRef}>
            <button onClick={() => setIsCalendarOpen(!isCalendarOpen)} className={`bg-white p-4 px-6 rounded-3xl shadow-sm border transition-all flex items-center gap-4 group ${isCalendarOpen ? 'border-rose-500 ring-4 ring-rose-50' : 'border-slate-200 hover:border-rose-300'}`}>
              <CalendarIcon className={`w-5 h-5 transition-colors ${isCalendarOpen ? 'text-rose-500' : 'text-slate-400 group-hover:text-rose-400'}`} />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Cycle Start Date</span>
                <span className="text-sm font-bold text-slate-700">{new Date(startDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </button>
            {isCalendarOpen && (
              <div className="absolute right-0 mt-2 z-50 bg-white shadow-2xl rounded-3xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <CustomCalendar selectedDate={startDate} onSelect={(date) => { setStartDate(date); setIsCalendarOpen(false); }} />
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white p-10 py-12 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center relative">
              <div className="relative w-72 h-72 flex items-center justify-center select-none" ref={svgRef}>
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  <circle cx="100" cy="100" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="18" />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.menstrual.color} strokeWidth="18" strokeDasharray={`${getStrokeDash(5)} ${circumference}`} />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.follicular.color} strokeWidth="18" strokeDasharray={`${getStrokeDash(7)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(5)}`} />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.ovulation.color} strokeWidth="18" strokeDasharray={`${getStrokeDash(3)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(12)}`} />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.luteal.color} strokeWidth="18" strokeDasharray={`${getStrokeDash(13)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(15)}`} />
                </svg>
                <div className="absolute w-full h-full transform transition-transform duration-150" style={{ transform: `rotate(${((cycleDay - 1) / 28) * 360}deg)`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }} onTouchStart={() => setIsDragging(true)}>
                  <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-900 rounded-full border-4 border-white shadow-lg z-10 hover:scale-110 transition-transform ${isDragging ? 'scale-125 ring-8 ring-slate-900/10' : ''}`}></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className={`w-32 h-32 rounded-full ${currentPhase.lightColor} flex flex-col items-center justify-center border-4 border-white shadow-inner`}>
                    <span className="text-5xl font-black leading-none text-slate-900">{cycleDay}</span>
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Day</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Drag to manual adjust</p>
              <div className="mt-10 grid grid-cols-2 gap-4 w-full">
                {Object.values(cycleData).map(p => <PhaseCard key={p.name} phase={p} isActive={currentPhaseKey === p.name.toLowerCase()} />)}
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 min-h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">{currentPhase.name} Phase</h2>
                  <p className={`font-bold mt-1 text-lg ${currentPhase.textColor}`}>{currentPhase.subtitle}</p>
                </div>
                <div className={`${currentPhase.lightColor} w-16 h-16 rounded-2xl flex items-center justify-center border border-white shadow-sm`}>
                   {currentPhaseKey === 'menstrual' && <Droplet className="w-8 h-8 text-rose-500" />}
                   {currentPhaseKey === 'follicular' && <Sparkles className="w-8 h-8 text-amber-500" />}
                   {currentPhaseKey === 'ovulation' && <Sun className="w-8 h-8 text-blue-400" />}
                   {currentPhaseKey === 'luteal' && <Moon className="w-8 h-8 text-purple-500" />}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-3 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Focus On</span>
                  </div>
                  <ul className="space-y-1.5">
                    {currentPhase.focusOn.map((item, i) => <li key={i} className="text-sm font-bold text-emerald-800 truncate">· {item}</li>)}
                  </ul>
                </div>
                <div className="p-5 bg-rose-50 rounded-3xl border border-rose-100">
                  <div className="flex items-center gap-2 mb-3 text-rose-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Limit / Avoid</span>
                  </div>
                  <ul className="space-y-1.5">
                    {currentPhase.avoid.map((item, i) => <li key={i} className="text-sm font-bold text-rose-800 truncate">· {item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow mb-8">
                {Object.entries(currentPhase.meals).map(([type, desc]) => (
                  <div key={type} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                    <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">{type}</span>
                    <p className="text-slate-800 font-bold leading-tight mt-1">{desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedPhase(currentPhase)}
                className={`w-full py-5 rounded-3xl font-black text-white ${currentPhase.bgClass} shadow-lg hover:brightness-95 transition-all flex items-center justify-center gap-2`}
              >
                View Full Deep Dive <ChevronRight className="w-5 h-5" />
              </button>
            </section>
          </div>
        </div>

        {selectedPhase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setSelectedPhase(null)}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
            <div className="bg-white w-full max-w-2xl rounded-[3.5rem] p-10 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className={`text-4xl font-black ${selectedPhase.textColor}`}>{selectedPhase.name} Phase</h2>
                  <p className="text-slate-500 font-bold mt-1">{selectedPhase.subtitle}</p>
                </div>
                <button onClick={() => setSelectedPhase(null)} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-8">
                <div className={`p-8 rounded-[2.5rem] ${selectedPhase.lightColor} border border-white`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-1.5 h-6 rounded-full ${selectedPhase.bgClass}`}></div>
                    <h3 className="font-black text-xl text-slate-900">{selectedPhase.moodTitle}</h3>
                  </div>
                  <ul className="space-y-4">
                    {selectedPhase.moodTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-700 font-medium">
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${selectedPhase.bgClass} text-white mt-0.5`}>{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-slate-50 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Focus Foods</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPhase.focusOn.map((f, i) => <span key={i} className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">{f}</span>)}
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Limit Intake</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPhase.avoid.map((a, i) => <span key={i} className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">{a}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
