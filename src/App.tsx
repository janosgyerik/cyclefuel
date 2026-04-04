import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  Utensils, 
  ChevronRight, 
  Droplet, 
  Sun, 
  Sparkles, 
  Moon, 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle2,
  Activity
} from 'lucide-react';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(() => {
    const saved = localStorage.getItem('cycleStartDate');
    return saved || new Date().toISOString().split('T')[0];
  });
  
  const [cycleDay, setCycleDay] = useState(1);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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
    return () => window.addEventListener('keydown', handleKeyDown);
  }, [selectedPhase, isCalendarOpen]);

  const cycleData = {
    menstrual: {
      name: "Menstrual",
      days: [1, 5] as [number, number],
      color: "#B37455", 
      bgClass: "bg-[#B37455]",
      textColor: "text-[#B37455]",
      lightColor: "bg-[#B37455]/10",
      accentColor: "border-[#B37455]/20",
      subtitle: "Iron-rich foods",
      cardSummary: "Lower energy, focus on inward reflection and deep nourishment.",
      focusOn: ["Iron", "Vitamin C", "Magnesium"],
      avoid: ["Caffeine", "Cold foods", "Excessive salt"],
      moodTitle: "Nourish your body with iron & comfort",
      moodTips: [
        "Focus on iron-rich foods such as red meat, poultry, fish, legumes, and leafy greens to replenish minerals.",
        "Pair iron-rich foods with Vitamin C (citrus, peppers) to significantly increase absorption.",
        "Incorporate Vitamin K-rich foods like leafy greens to support healthy blood clotting.",
        "Magnesium-rich foods (dark chocolate, pumpkin seeds) can help alleviate menstrual cramps.",
        "Sip on warm herbal teas (ginger, raspberry leaf) to soothe the uterus and reduce bloating.",
        "Stay hydrated with room-temperature water and avoid excessive salt to prevent water retention.",
        "Consume healthy fats like omega-3s found in fatty fish or flaxseeds to manage inflammation."
      ],
      meals: {
        breakfast: "Iron-fortified breakfast cereal with berries",
        lunch: "Warm quinoa and lentil salad with spinach",
        dinner: "Slow-cooked beef or bean stew with root vegetables",
        snack: "Dark chocolate (70%+ cacao)"
      }
    },
    follicular: {
      name: "Follicular",
      days: [6, 12] as [number, number],
      color: "#CEAF4E", 
      bgClass: "bg-[#CEAF4E]",
      textColor: "text-[#CEAF4E]",
      lightColor: "bg-[#CEAF4E]/10",
      accentColor: "border-[#CEAF4E]/20",
      subtitle: "Estrogen-progesterone balance",
      cardSummary: "Rising energy, preparing for ovulation with fresh, vibrant inputs.",
      focusOn: ["Vitamin C", "Vitamin K", "Vitamin E"],
      avoid: ["Alcohol", "Xenoestrogens", "Heavy fats"],
      moodTitle: "Build energy & support estrogen metabolism",
      moodTips: [
        "Eat plenty of fiber-rich foods (berries, citrus, greens) to process and eliminate used hormones.",
        "Incorporate cruciferous vegetables like broccoli and cauliflower to support estrogen balance.",
        "Focus on healthy fats (avocado, nuts) to support hormone production as levels rise.",
        "Include fermented foods (yogurt, sauerkraut) to support the gut microbiome.",
        "Choose complex carbohydrates (quinoa, oats) for sustained energy as activity levels increase.",
        "Zinc-rich foods support healthy egg development and follicle growth.",
        "Vitamin E protects developing follicles from oxidative stress."
      ],
      meals: {
        breakfast: "Overnight oats topped with fresh berries and seeds",
        lunch: "Salmon poke bowl with avocado and edamame",
        dinner: "Mexican bowl with avocado, brown rice, and black beans",
        snack: "Fresh fruit salad with a handful of walnuts"
      }
    },
    ovulation: {
      name: "Ovulation",
      days: [13, 15] as [number, number],
      color: "#8AA773", 
      bgClass: "bg-[#8AA773]",
      textColor: "text-[#8AA773]",
      lightColor: "bg-[#8AA773]/10",
      accentColor: "border-[#8AA773]/20",
      subtitle: "Boost protein for vitality",
      cardSummary: "Peak fertility and maximum social energy. Stay light and active.",
      focusOn: ["Zinc"],
      avoid: ["Heavy grains", "Processed sugar", "Excessive caffeine"],
      moodTitle: "Maximize vitality & support peak energy",
      moodTips: [
        "Fuel your high energy with high-quality, easily digestible proteins (eggs, lean meats, tofu).",
        "Eat antioxidant-rich fruits like berries and pomegranate to protect the egg during release.",
        "Incorporate zinc-rich foods (shellfish, seeds) to support the surge in surge surge hormones.",
        "Focus on hydrating foods (cucumber, watermelon) to support cervical fluid quality.",
        "Vitamin C-rich foods support the health of the follicle post-release.",
        "Magnesium supports the nervous system during this high-intensity phase.",
        "Limit inflammatory foods to keep skin clear during hormonal peaks."
      ],
      meals: {
        breakfast: "Soft-scrambled eggs with chives on sourdough",
        lunch: "Grilled chicken or chickpeas over a massive spring salad",
        dinner: "Steamed white fish or tofu with ginger and bok choy",
        snack: "Apple slices with almond butter"
      }
    },
    luteal: {
      name: "Luteal",
      days: [16, 28] as [number, number],
      color: "#7C9FC3", 
      bgClass: "bg-[#7C9FC3]",
      textColor: "text-[#7C9FC3]",
      lightColor: "bg-[#7C9FC3]/10",
      accentColor: "border-[#7C9FC3]/20",
      subtitle: "Support your mood with nutrients",
      cardSummary: "Metabolic rate increases. Focus on stabilizing blood sugar.",
      focusOn: ["Vitamin D", "Calcium", "Zinc", "Curcumin", "Magnesium"],
      avoid: ["Processed junk food", "High salt", "Refined sugar"],
      moodTitle: "Manage appetite & mood naturally",
      moodTips: [
        "Include complex carbohydrates (sweet potato, brown rice) to stabilize blood sugar and serotonin.",
        "Magnesium-rich foods (dark chocolate, spinach) are critical for reducing anxiety and cramps.",
        "Vitamin B6-rich foods (bananas, poultry, chickpeas) support progesterone production.",
        "Consume high-fiber foods to prevent the sluggish digestion often associated with this phase.",
        "Limit salt intake to help reduce water retention and breast tenderness.",
        "Healthy fats (nuts, seeds, avocado) support hormone production and satiety.",
        "Calcium-rich foods (tahini, leafy greens) can help minimize mood swings."
      ],
      meals: {
        breakfast: "Peanut butter oatmeal topped with toasted seeds",
        lunch: "Roasted sweet potato with quinoa and kale",
        dinner: "Chickpea and spinach coconut curry with brown rice",
        snack: "Guacamole with whole grain crackers"
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
    const diffTime = Math.max(0, normalizedToday.getTime() - normalizedStart.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const day = ((diffDays % 28) + 1);
    setCycleDay(day);
  }, [startDate, isDragging]);

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
      setStartDate(newStart.toISOString().split('T')[0]);
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
  }, [isDragging, cycleDay]);

  const currentPhaseKey = useMemo(() => {
    if (cycleDay >= 1 && cycleDay <= 5) return 'menstrual';
    if (cycleDay >= 6 && cycleDay <= 12) return 'follicular';
    if (cycleDay >= 13 && cycleDay <= 15) return 'ovulation';
    return 'luteal';
  }, [cycleDay]);

  const currentPhase = cycleData[currentPhaseKey as keyof typeof cycleData];

  const CustomCalendar: React.FC<{ selectedDate: string; onSelect: (d: string) => void }> = ({ selectedDate, onSelect }) => {
    const [viewDate, setViewDate] = useState(new Date(selectedDate));
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
    
    return (
      <div className="p-5 w-72">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5 text-slate-500" /></button>
          <span className="font-bold text-slate-800">{monthName} {year}</span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronRight className="w-5 h-5 text-slate-500" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-3">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => (
            <div key={idx} className="h-9 flex items-center justify-center">
              {day && (
                <button
                  onClick={() => onSelect(new Date(year, month, day).toISOString().split('T')[0])}
                  className={`w-8 h-8 text-xs font-bold rounded-full transition-all ${
                    isSelected(day) 
                      ? 'bg-slate-900 text-white shadow-md' 
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

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const getStrokeDash = (days: number) => (days / 28) * circumference;

  const PhaseCard: React.FC<{ phase: any; isActive: boolean }> = ({ phase, isActive }) => (
    <div 
      onClick={() => setSelectedPhase(phase)}
      className={`p-5 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${
        isActive 
          ? `${phase.bgClass} text-white shadow-2xl scale-[1.02] border-white/20` 
          : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
      }`}
    >
      <div className="mb-3">
        <h3 className="font-black text-sm uppercase tracking-wider mb-1">{phase.name}</h3>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-block ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
          DAYS {phase.days[0]}-{phase.days[1]}
        </span>
      </div>
      <p className={`text-[11px] font-medium leading-relaxed mb-4 ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
        {phase.cardSummary}
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {phase.focusOn.map((item: string, i: number) => (
          <span key={i} className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${isActive ? 'bg-white/10' : 'bg-slate-50 text-slate-400'}`}>
            + {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Cycle Fuel</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Phase-by-phase wellness and nutrition tracker.</p>
          </div>
          
          <div className="relative" ref={calendarRef}>
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)} 
              className={`bg-white p-5 px-7 rounded-[2.5rem] shadow-sm border transition-all flex items-center gap-5 group ${
                isCalendarOpen ? 'border-slate-900 ring-8 ring-slate-900/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isCalendarOpen ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}>
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-0.5">Start Date</span>
                <span className="text-sm font-bold text-slate-700">
                  {new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </button>
            {isCalendarOpen && (
              <div className="absolute right-0 mt-3 z-50 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-[3rem] border border-slate-100 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-300 origin-top-right">
                <CustomCalendar selectedDate={startDate} onSelect={(date) => { setStartDate(date); setIsCalendarOpen(false); }} />
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Wheel Section */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:bg-slate-100 transition-colors duration-1000"></div>
              
              <div className="relative w-80 h-80 flex items-center justify-center select-none" ref={svgRef as any}>
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  <circle cx="100" cy="100" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="20" />
                  {/* Menstrual */}
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.menstrual.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(5)} ${circumference}`} strokeLinecap="round" />
                  {/* Follicular */}
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.follicular.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(7)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(5)}`} strokeLinecap="round" />
                  {/* Ovulation */}
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.ovulation.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(3)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(12)}`} strokeLinecap="round" />
                  {/* Luteal */}
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.luteal.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(13)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(15)}`} strokeLinecap="round" />
                </svg>
                
                {/* Drag Handle */}
                <div 
                  className="absolute w-full h-full transform transition-transform duration-150 preserve-3d" 
                  style={{ 
                    transform: `rotate(${((cycleDay - 1) / 28) * 360}deg)`, 
                    cursor: isDragging ? 'grabbing' : 'grab' 
                  }} 
                  onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }} 
                  onTouchStart={() => { setIsDragging(true); }}
                >
                  <div className={`absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 rounded-full border-4 border-white shadow-2xl z-20 hover:scale-110 transition-transform ${isDragging ? 'scale-125 ring-[12px] ring-slate-900/10' : ''}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className={`w-40 h-40 rounded-full ${currentPhase.lightColor} flex flex-col items-center justify-center border-4 border-white shadow-inner transition-colors duration-700`}>
                    <span className="text-6xl font-black leading-none text-slate-900">{cycleDay}</span>
                    <span className="text-[11px] uppercase font-black tracking-[0.3em] text-slate-400 mt-2">Cycle Day</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                  <ChevronLeft className="w-3 h-3" /> Drag knob to adjust <ChevronRight className="w-3 h-3" />
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-5 w-full">
                {Object.entries(cycleData).map(([key, p]) => (
                  <PhaseCard key={key} phase={p} isActive={currentPhaseKey === key} />
                ))}
              </div>
            </section>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 min-h-full flex flex-col relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-96 h-96 ${currentPhase.lightColor} blur-[120px] -mr-48 -mt-48 transition-colors duration-1000`}></div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className={`text-4xl font-black text-slate-900 mb-1`}>{currentPhase.name} Phase</h2>
                    <p className={`font-bold text-xl ${currentPhase.textColor} transition-colors duration-700`}>{currentPhase.subtitle}</p>
                  </div>
                  <div className={`${currentPhase.lightColor} w-20 h-20 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-700`}>
                     {currentPhaseKey === 'menstrual' && <Droplet className="w-10 h-10 text-[#B37455]" />}
                     {currentPhaseKey === 'follicular' && <Sparkles className="w-10 h-10 text-[#CEAF4E]" />}
                     {currentPhaseKey === 'ovulation' && <Sun className="w-10 h-10 text-[#8AA773]" />}
                     {currentPhaseKey === 'luteal' && <Moon className="w-10 h-10 text-[#7C9FC3]" />}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="p-7 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-5 text-emerald-600">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm"><CheckCircle2 className="w-4 h-4" /></div>
                      <span className="text-xs font-black uppercase tracking-[0.2em]">Key Focus</span>
                    </div>
                    <ul className="space-y-2.5">
                      {currentPhase.focusOn.map((item: string, i: number) => (
                        <li key={i} className="text-[13px] font-bold text-emerald-900 flex items-center gap-2">
                          <div className="w-1 h-1 bg-emerald-300 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-7 bg-rose-50/50 rounded-[2.5rem] border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-5 text-rose-600">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm"><AlertCircle className="w-4 h-4" /></div>
                      <span className="text-xs font-black uppercase tracking-[0.2em]">Minimize</span>
                    </div>
                    <ul className="space-y-2.5">
                      {currentPhase.avoid.map((item: string, i: number) => (
                        <li key={i} className="text-[13px] font-bold text-rose-900 flex items-center gap-2">
                          <div className="w-1 h-1 bg-rose-300 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-10">
                   <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                     <Utensils className="w-3 h-3" /> Suggested Daily Menu
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Object.entries(currentPhase.meals).map(([type, desc]) => (
                      <div key={type} className="p-8 bg-slate-50/80 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-2 block">{type}</span>
                        <p className="text-slate-800 font-bold leading-tight text-lg">{desc as string}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPhase(currentPhase)}
                  className={`w-full py-7 rounded-[2.5rem] font-black text-white ${currentPhase.bgClass} shadow-2xl hover:brightness-105 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg mb-4`}
                >
                  Full Phase Deep Dive <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Modal */}
        {selectedPhase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedPhase(null)}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500"></div>
            <div 
              className="bg-white w-full max-w-3xl rounded-[4rem] p-10 md:p-14 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] animate-in zoom-in slide-in-from-bottom-10 duration-500" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className={`text-5xl font-black ${selectedPhase.textColor} mb-2`}>{selectedPhase.name} Phase</h2>
                  <p className="text-slate-500 font-bold text-xl">{selectedPhase.subtitle}</p>
                </div>
                <button 
                  onClick={() => setSelectedPhase(null)} 
                  className="p-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors group"
                >
                  <svg className="w-6 h-6 text-slate-500 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-12">
                <div className={`p-10 rounded-[3.5rem] ${selectedPhase.lightColor} border-4 border-white shadow-sm`}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-2 h-8 rounded-full ${selectedPhase.bgClass}`}></div>
                    <h3 className="font-black text-2xl text-slate-900">{selectedPhase.moodTitle}</h3>
                  </div>
                  <ul className="space-y-6">
                    {selectedPhase.moodTips.map((tip: string, i: number) => (
                      <li key={i} className="flex items-start gap-5 text-slate-700 font-bold leading-relaxed text-lg">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center text-[11px] font-black ${selectedPhase.bgClass} text-white mt-0.5 shadow-lg`}>
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-slate-50 rounded-[3rem]">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Optimized Foods</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedPhase.focusOn.map((f: string, i: number) => (
                        <span key={i} className="bg-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm border border-slate-100">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[3rem]">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Mindful Intake</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedPhase.avoid.map((a: string, i: number) => (
                        <span key={i} className="bg-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm border border-slate-100">{a}</span>
                      ))}
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
