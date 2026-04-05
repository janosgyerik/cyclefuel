export interface PhaseContent {
  name: string;
  subtitle: string;
  summaryText: string;
  focusItems: string[];
  avoidItems: string[];
  otherItems: string[];
  focusOn: string[];
  avoid: string[];
  moodTitle: string;
  moodTips: string[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
}

export const phaseTexts: Record<string, PhaseContent> = {
  menstrual: {
    name: "Menstrual",
    subtitle: "Iron-rich foods",
    summaryText: "",
    focusItems: ["Iron-rich foods + Vitamin C", "Nutrient-dense lean proteins and whole grains", "Leafy greens", "Warming food"],
    avoidItems: ["Processed food", "Alcohol", "Fizzy drinks", "Spicy food", "Sugar"],
    otherItems: [],
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
    subtitle: "Estrogen-progesterone balance",
    summaryText: "",
    focusItems: ["Fiber-rich foods", "Nutrient-dense foods", "Energy-boosting foods"],
    avoidItems: [],
    otherItems: ["Manage stress", "Reduces xenoestrogens (BPA)", "Reduce body fat", "Limit alcohol", "Sleep"],
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
    subtitle: "Boost protein for vitality",
    summaryText: "",
    focusItems: ["High-protein foods (lean meat and tofu)", "Fresh vegetables and greens to boost fiber intake", "Zinc-rich foods"],
    avoidItems: [],
    otherItems: ["Ideal for high-intensity workouts"],
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
    subtitle: "Support your mood with nutrients",
    summaryText: "Low energy, increased appetite.",
    focusItems: ["High-fiber carbs", "High-protein breakfasts", "Magnesium-rich foods (dark chocolate, nuts, whole grains, fresh fruits, veggies)"],
    avoidItems: ["Processed junk food (especially before periods)"],
    otherItems: [],
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
