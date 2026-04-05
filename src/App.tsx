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
  Activity,
  Target,
  ShieldAlert,
  Zap,
  Brain,
  X
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
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      summaryText: "",
      focusItems: ["Iron-rich foods + Vitamin C", "Nutrient-dense lean proteins and whole grains", "Leafy greens", "Warming food"],
      avoidItems: ["Processed food", "Alcohol", "Fizzy drinks", "Spicy food", "Sugar"],
      otherItems: [],
      cardSummary: "Focus on: Iron-rich foods + vitamin C. Nutrient-dense foods (lean proteins, and whole grains) + leafy greens. Warming food.\n\nAvoid: Processed food, alcohol, fizzy drinks, spicy food and sugar.",
      focusOn: ["Iron", "Vitamin C", "Magnesium"],
      avoid: ["Processed food", "Alcohol", "Fizzy drinks", "Spicy food", "Sugar"],
      moodTitle: "Nourish your body with iron & comfort",
      moodTips: [
        "Red meat: Beef, lamb (high in heme iron, which is more easily absorbed by the body)",
        "Poultry: Chicken and turkey (good source of iron)",
        "Fish: Fatty fish like salmon and tuna, shellfish (iron + omega-3 fatty acids).",
        "Legumes: Lentils, chickpeas, and beans (excellent plant-based sources of iron).",
        "Leafy greens: Spinach, kale, and Swiss chard (rich in non-heme iron).",
        "Tofu: A versatile source of iron (for a plant-based diet).",
        "Nuts and seeds: Pumpkin seeds, almonds, and cashews are (great snacks that also provide iron).",
        "Whole grains: Quinoa, brown rice, and oats (good sources of iron and fiber)."
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
      summaryText: "",
      focusItems: ["Fiber-reach foods", "Nutrient-dense foods", "Energy-boosting foods"],
      avoidItems: [],
      otherItems: ["Manage stress", "Reduces xenoestrogens (BPA)", "Reduce body fat", "Limit alcohol", "Sleep"],
      cardSummary: "Focus on: Fiber-reach foods, Nutrient-dense foods, Energy-boosting foods.\n\nOther: Manage stress, Reduces xenoestrogens (BPA), Reduce body fat, Limit alcohol, Sleep.",
      focusOn: ["Vitamin C", "Vitamin K", "Vitamin E"],
      avoid: ["Stress", "Xenoestrogens (BPA)", "Excessive body fat", "Alcohol", "Lack of sleep"],
      moodTitle: "Build energy & support estrogen metabolism",
      moodTips: [
        "Fresh fruits: Berries (strawberries, blueberries, raspberries): High in antioxidants and vitamin C, which support immune function and collagen production. Citrus fruits (oranges, grapefruits, lemons): Packed with vitamin C to enhance iron absorption and boost energy.",
        "Vegetables: Leafy greens (spinach, kale, arugula): Rich in iron, calcium, and vitamins A and K, supporting overall health. Cruciferous vegetables (broccoli, cauliflower, Brussels sprouts): Provide fiber, vitamins C and K, and support estrogen metabolism.",
        "Nuts and seeds: Almonds and walnuts: High in healthy fats, protein, and vitamin E, which is important for hormone regulation. Chia seeds and flaxseeds: Excellent sources of omega-3 fatty acids and fiber, promoting heart health and digestion.",
        "Whole grains: Quinoa and brown rice: Provide complex carbohydrates for sustained energy, along with B vitamins that support metabolic processes. Oats: A great source of fiber, vitamins, and minerals that can help regulate energy levels.",
        "Lean proteins: Chicken and turkey: Good sources of protein and iron to support muscle health and energy levels. Fish (especially fatty fish like salmon): Rich in omega-3 fatty acids, which can help reduce inflammation and support hormone production.",
        "Healthy fats: Avocado: Contains healthy monounsaturated fats, potassium, and fiber, which can help with satiety and hormone balance. Olive oil: A great source of healthy fats that supports heart health and can help balance hormones.",
        "Herbs and spices: Ginger and turmeric: Known for their anti-inflammatory properties and can support digestion and overall health."
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
      summaryText: "",
      focusItems: ["High-protein foods (lean meat and tofu)", "Fresh vegetables and greens to boost fiber intake", "Zinc-reach foods"],
      avoidItems: [],
      otherItems: ["Ideal for high-intensity workouts"],
      cardSummary: "Focus on: High-protein foods (lean meat and tofu), plenty of fresh vegetables and greens to boost fiber intake, zinc-reach foods.\n\nIdeal for high-intensity workouts.",
      focusOn: ["Zinc"],
      avoid: ["Heavy grains", "Processed sugar", "Excessive caffeine"],
      moodTitle: "Maximize vitality & support peak energy",
      moodTips: [
        "High-protein foods: Lean meats (chicken, turkey), Fish (salmon, tuna), Tofu and tempeh",
        "Eggs: Packed with protein and essential vitamins.",
        "Avocados: High in healthy fats and fiber.",
        "Nuts and seeds: Pumpkin seeds, almonds, and walnuts for protein and zinc.",
        "Fruits and vegetables: Leafy greens (spinach, kale) and berries (strawberries, blueberries) for vitamins and antioxidants.",
        "Whole grains: Quinoa and brown rice for complex carbohydrates.",
        "Zinc-rich foods: Shellfish (oysters, shrimp) and legumes (chickpeas, lentils)."
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
      summaryText: "Low energy, increased appetite.",
      focusItems: ["High-fiber carbs", "High-protein breakfasts", "Magnesium-reach foods (dark chocolate, nuts, whole grains, fresh fruits, veggies)"],
      avoidItems: ["Processed junk food (especially before periods)"],
      otherItems: [],
      cardSummary: "Low energy, increased appetite.\n\nFocus on: High-fiber carbs, High-protein breakfasts, Magnesium-reach foods. Avoid: Processed junk food (especially before periods).",
      focusOn: ["Vitamin D", "Calcium", "Zinc", "Curcumin", "Magnesium"],
      avoid: ["Processed junk food", "High salt", "Refined sugar"],
      moodTitle: "Manage appetite & mood naturally",
      moodTips: [
        "Healthy proteins: Lean meats (chicken, turkey), Fish (salmon, sardines), Tofu and legumes (chickpeas, lentils)",
        "Magnesium-rich foods: Dark chocolate, Nuts and seeds (almonds, pumpkin seeds)",
        "Whole grains: Oats, quinoa, and brown rice",
        "Fresh fruits: Bananas, apples, and berries",
        "Vegetables: Leafy greens (spinach, kale) and cruciferous veggies (broccoli, cauliflower)",
        "Vitamin D and calcium sources: Fortified dairy alternatives and leafy greens",
        "Zinc-rich foods: Shellfish, legumes, and whole grains"
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


  const InstructionCard: React.FC<{ title: string; items: string[]; type: 'focus' | 'avoid' | 'other' }> = ({ title, items, type }) => {
    if (items.length === 0) return null;
    const styles = {
      focus: { bg: "bg-emerald-50/50", border: "border-emerald-100", text: "text-emerald-900", iconContainer: "bg-emerald-500", icon: <Target className="w-4 h-4 text-white" /> },
      avoid: { bg: "bg-rose-50/50", border: "border-rose-100", text: "text-rose-900", iconContainer: "bg-rose-500", icon: <ShieldAlert className="w-4 h-4 text-white" /> },
      other: { bg: "bg-amber-50/50", border: "border-amber-100", text: "text-amber-900", iconContainer: "bg-amber-500", icon: <Zap className="w-4 h-4 text-white" /> }
    }[type];

    return (
      <div className={`p-8 rounded-[2.5rem] border ${styles.bg} ${styles.border} shadow-sm group hover:shadow-xl transition-all duration-500`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform ${styles.iconContainer}`}>
            {styles.icon}
          </div>
          <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-700">{title}</h4>
        </div>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className={`text-[14px] font-bold ${styles.text} flex items-start gap-3`}>
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 opacity-40 ${styles.iconContainer}`}></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const DetailView: React.FC<{ phase: any; phaseKey: string }> = ({ phase, phaseKey }) => (
    <div className="flex flex-col space-y-8">
      <div className="flex items-start justify-between mb-4 gap-6">
        <div className="flex-1">
          <h2 className="text-5xl font-black text-slate-900 mb-2">{phase.name} Phase</h2>
          <p className={`font-bold text-xl ${phase.textColor} transition-colors duration-700 mb-4`}>{phase.subtitle}</p>
          {phase.summaryText && (
            <p className="text-slate-600 font-bold leading-relaxed max-w-xl mb-6">{phase.summaryText}</p>
          )}
          <div className="flex flex-wrap gap-2">
             {phase.focusOn.map((item: string, i: number) => (
               <span key={i} className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border ${phase.lightColor} ${phase.textColor} ${phase.accentColor}`}>+ {item}</span>
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
          <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800`}>Mind & Body Guidance</h3>
        </div>
        <div className={`p-12 rounded-[4rem] ${phase.lightColor} border-4 border-white shadow-inner`}>
          <h4 className="font-black text-2xl text-slate-900 mb-8">{phase.moodTitle}</h4>
          <ul className="space-y-8">
            {phase.moodTips.map((tip: string, i: number) => (
              <li key={i} className="flex items-start gap-6 text-slate-700 font-bold leading-relaxed text-xl">
                <span className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black ${phase.bgClass} text-white mt-1 shadow-lg`}>{i + 1}</span>
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
          <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800`}>Example Meal Plan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(phase.meals).map(([type, desc]) => (
            <div key={type} className="p-10 bg-slate-50/50 shadow-sm rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <span className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase mb-4 block group-hover:text-slate-500 transition-colors">{type}</span>
              <p className="text-slate-800 font-extrabold leading-tight text-2xl">{desc as string}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const getStrokeDash = (days: number) => (days / 28) * circumference;

  const PhaseCard: React.FC<{ phase: any; phaseKey: string; isActive: boolean }> = ({ phase, phaseKey, isActive }) => (
    <div 
      onClick={() => setSelectedPhase({ phase, key: phaseKey })}
      className={`p-5 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${
        isActive ? `${phase.bgClass} text-white shadow-2xl scale-[1.02] border-white/20` : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
      }`}
    >
      <div className="mb-3">
        <h3 className="font-black text-sm uppercase tracking-wider mb-1">{phase.name}</h3>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-block ${isActive ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>DAYS {phase.days[0]}-{phase.days[1]}</span>
      </div>
      <p className={`text-[11px] font-medium leading-relaxed mb-4 whitespace-pre-line ${isActive ? 'text-white/90' : 'text-slate-500'}`}>{phase.cardSummary}</p>
      <div className="flex flex-wrap gap-1.5">
        {phase.focusOn.map((item: string, i: number) => (
          <span key={i} className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${isActive ? 'bg-white/10' : 'bg-slate-50 text-slate-400'}`}>+ {item}</span>
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
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg"><Activity className="w-6 h-6 text-white" /></div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Cycle Fuel</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Phase-by-phase wellness and nutrition tracker.</p>
          </div>
          <div className="relative" ref={calendarRef}>
            <button onClick={() => setIsCalendarOpen(!isCalendarOpen)} className={`bg-white p-5 px-7 rounded-[2.5rem] shadow-sm border transition-all flex items-center gap-5 group ${isCalendarOpen ? 'border-slate-900 ring-8 ring-slate-900/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}`}>
              <div className={`p-2 rounded-xl transition-colors ${isCalendarOpen ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'}`}><CalendarIcon className="w-5 h-5" /></div>
              <div className="flex flex-col items-start"><span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-0.5">Start Date</span><span className="text-sm font-bold text-slate-700">{new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
            </button>
            {isCalendarOpen && <div className="absolute right-0 mt-3 z-50 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.15)] rounded-[3rem] border border-slate-100 overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-300 origin-top-right"><CustomCalendar selectedDate={startDate} onSelect={(date) => { setStartDate(date); setIsCalendarOpen(false); }} /></div>}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 transition-colors duration-1000"></div>
              <div className="relative w-80 h-80 flex items-center justify-center select-none" ref={svgRef as any}>
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  <circle cx="100" cy="100" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="20" />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.menstrual.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(5)} ${circumference}`} strokeLinecap="round" />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.follicular.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(7)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(5)}`} strokeLinecap="round" />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.ovulation.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(3)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(12)}`} strokeLinecap="round" />
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={cycleData.luteal.color} strokeWidth="20" strokeDasharray={`${getStrokeDash(13)} ${circumference}`} strokeDashoffset={`-${getStrokeDash(15)}`} strokeLinecap="round" />
                </svg>
                <div className="absolute w-full h-full transform transition-transform duration-150 preserve-3d" style={{ transform: `rotate(${((cycleDay - 1) / 28) * 360}deg)`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }} onTouchStart={() => { setIsDragging(true); }}>
                  <div className={`absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 rounded-full border-4 border-white shadow-2xl z-20 hover:scale-110 transition-transform ${isDragging ? 'scale-125 ring-[12px] ring-slate-900/10' : ''}`}><div className="w-full h-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div></div></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className={`w-40 h-40 rounded-full ${currentPhase.lightColor} flex flex-col items-center justify-center border-4 border-white shadow-inner transition-colors duration-700`}><span className="text-6xl font-black leading-none text-slate-900">{cycleDay}</span><span className="text-[11px] uppercase font-black tracking-[0.3em] text-slate-400 mt-2">Cycle Day</span></div>
                </div>
              </div>
              <div className="mt-8 text-center"><p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> Drag knob to adjust <ChevronRight className="w-3 h-3" /></p></div>
              <div className="mt-12 grid grid-cols-2 gap-5 w-full">
                {Object.entries(cycleData).map(([key, p]) => (
                  <PhaseCard key={key} phase={p} phaseKey={key} isActive={currentPhaseKey === key} />
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 min-h-full flex flex-col relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-96 h-96 ${currentPhase.lightColor} blur-[120px] -mr-48 -mt-48 transition-colors duration-1000`}></div>
              <div className="relative flex-grow">
                <DetailView phase={currentPhase} phaseKey={currentPhaseKey} />
              </div>
            </section>
          </div>
        </div>

        {selectedPhase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedPhase(null)}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500"></div>
            <div className="bg-white w-full max-w-4xl rounded-[4rem] p-10 md:p-14 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] animate-in zoom-in slide-in-from-bottom-10 duration-500" onClick={e => e.stopPropagation()}>
               <button onClick={() => setSelectedPhase(null)} className="absolute top-10 right-10 p-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors group z-20"><X className="w-6 h-6 text-slate-500 group-hover:rotate-90 transition-transform" /></button>
               <DetailView phase={selectedPhase.phase} phaseKey={selectedPhase.key} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
