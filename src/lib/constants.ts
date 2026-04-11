/* ─── App Links ──────────────────────────────────────────────── */
export const APP_LINKS = {
  appStore: "#",      // replace with real iOS link
  playStore: "#",     // replace with real Android link
  instagram: "#",
  twitter: "#",
};

/* ─── Nav Items ──────────────────────────────────────────────── */
export const NAV_ITEMS = [
  { name: "الرئيسية", href: "#hero" },
  { name: "ما هو تمرات؟", href: "#what" },
  { name: "داخل التطبيق", href: "#screenshots" },
  { name: "المميزات", href: "#features" },
  { name: "لمن التطبيق؟", href: "#audience" },
  { name: "كيف يعمل", href: "#how-it-works" },
  { name: "تحميل", href: "#download" },
];

/* ─── Core Features ──────────────────────────────────────────── */
export const FEATURES = [
  {
    icon: "CalendarDays",
    title: "Hijri-Aware Calendar",
    description:
      "Every day mapped to the Islamic year with suhoor, iftar times, and weather context.",
  },
  {
    icon: "Target",
    title: "Qada Planner",
    description:
      "Set your missed fasting count. Tamrat builds your recovery plan day by day.",
  },
  {
    icon: "Sparkles",
    title: "Smart Suggestions",
    description:
      "Ranked fasting opportunities so you never miss a blessed occasion.",
  },
  {
    icon: "Moon",
    title: "Fasting Occasions",
    description:
      "Ashura, Arafah, White Days, Shawwal — all guided and reminder-ready.",
  },
  {
    icon: "Heart",
    title: "Cycle-Aware Support",
    description:
      "Built with women in mind. Safe, private, and medically aware guidance.",
  },
  {
    icon: "Bell",
    title: "Smart Reminders",
    description:
      "Suhoor, Iftar, Adhan — timed precisely around your location every day.",
  },
];

/* ─── Screenshot Scroll Stops ───────────────────────────────── */
export const SCREENSHOT_STOPS = [
  {
    title: "Plan Screen",
    subtitle: "Your fasting dashboard",
    description:
      "Set your Qada targets, track every fast, and browse upcoming occasions — all in one clean view.",
    screenshot: "plan_page.jpg",
  },
  {
    title: "Smart Suggestions",
    subtitle: "Never miss a blessed day",
    description:
      "Tamrat ranks your best upcoming fasting days. Qada first, then Nafelah — with full context on each.",
    screenshot: "suggested_days.jpg",
  },
  {
    title: "Islamic Calendar",
    subtitle: "Hijri + Gregorian, unified",
    description:
      "Switch between Hijri and Gregorian views. Check suhoor, iftar, fasting duration, and weather for any day.",
    screenshot: "calendar_page.jpg",
  },
  {
    title: "Mark & Tag",
    subtitle: "Log every fast with purpose",
    description:
      "Mark each fasted day as Qada or Nafelah. Your progress is always visible and accurate.",
    screenshot: "cards_and markers in calendar.jpg",
  },
  {
    title: "All Occasions",
    subtitle: "Every blessed window",
    description:
      "Monday fasts, White Days, Ashura, Arafah, Shawwal — all explained, timed, and reminder-ready.",
    screenshot: "fasts_all days nafelah and sunnah.jpg",
  },
  {
    title: "Shawwal Fasts",
    subtitle: "Complete your six",
    description:
      "Track your Shawwal fasts with precision. Know exactly how many remain and when to fast them.",
    screenshot: "fast_shawwal.jpg",
  },
  {
    title: "Cycle-Aware Guidance",
    subtitle: "Built for her, privately",
    description:
      "Know when fasting is safe, recommended, or not advised — based on cycle, pregnancy, or postpartum status.",
    screenshot: "cycle_page.jpg",
  },
  {
    title: "Your Profile",
    subtitle: "Everything personalized",
    description:
      "Set your location, prayer calculation method, language, and appearance. It's your app, your way.",
    screenshot: "profile_page.jpg",
  },
];

/* ─── Target Audience ────────────────────────────────────────── */
export const AUDIENCE = [
  {
    label: "women",
    tooltip:
      "Cycle-aware fasting support. Know when fasting is allowed, recommended, or not — private and judgment-free.",
    icon: "Heart",
  },
  {
    label: "the ill & elderly",
    tooltip:
      "Missed fasts pile up. Tamrat calculates your Qada backlog and builds a gentle, sustainable recovery plan.",
    icon: "HeartPulse",
  },
  {
    label: "travelers",
    tooltip:
      "Travel disrupts routine. Tamrat adjusts prayer times, fasting windows, and reminders to your current location.",
    icon: "Plane",
  },
  {
    label: "Bab Al-Rayyan seekers",
    tooltip:
      "The door of Jannah reserved for those who fast. Let Tamrat light every step of your path toward it.",
    icon: "DoorOpen",
    isHighlight: true,
  },
];
