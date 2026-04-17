import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "ar" | "en";

const LANGUAGE_STORAGE_KEY = "tamrat-language";

export const translations = {
  ar: {
    common: {
      appName: "تمرات",
      logoAlt: "تمرات",
      languageButton: "EN",
      languageButtonLabel: "تغيير اللغة إلى الإنجليزية",
      previous: "السابق",
      next: "التالي",
      featureLabel: "ميزة",
    },
    nav: {
      links: [
        { label: "المميزات", href: "#features" },
        { label: "كيف يعمل", href: "#how-it-works" },
        { label: "الفئات المستهدفة", href: "#audience" },
        { label: "داخل التطبيق", href: "#screenshots" },
      ],
      download: "تحميل",
      toggleMenu: "فتح القائمة",
    },
    footer: {
      tagline: "رفيقك الذكي لصيام أسهل وثبات أجمل.",
      contact: "تواصل معنا",
      productLinks: [
        { label: "المميزات", href: "#features" },
        { label: "كيف يعمل", href: "#how-it-works" },
        { label: "التحميل", href: "#download" },
      ],
      legalLinks: [
        { label: "سياسة الخصوصية", href: "#/privacy-policy" },
        { label: "حذف الحساب", href: "#/privacy-policy" },
      ],
      copyright: "© 2026 تمرات. كل الحقوق محفوظة.",
    },
    hero: {
      tagline: "رفيقك الذكي لصيامٍ أسهل وثباتٍ أجمل",
    },
    valueProp: {
      badge: "ما هو تطبيق تمرات؟",
      headline: "رفيقك الذكي في رحلة الصيام",
      body:
        "تطبيق مصمم بعناية لصيام القضاء والنوافل، نظم أيامك، تابع تقدمك، وابق على المسار بهدوء تام.",
      arrow: "←",
      phoneAlt: "شاشة الخطة في تمرات",
      features: [
        {
          label: "تخطيط ذكي",
          desc: "اقتراحات مخصصة لأفضل أيام الصيام",
        },
        {
          label: "متابعة سهلة",
          desc: "تتبع تقدمك وإنجازاتك بوضوح",
        },
        {
          label: "تقويم هجري",
          desc: "تذكيرات دقيقة بالمناسبات الدينية",
        },
      ],
    },
    screenshots: {
      badge: "داخل التطبيق",
      title: "شاشات توضح ما الذي ستفعله بالضبط",
      body:
        "كل لقطة من التطبيق توضح قرارًا فعليًا: متى تصوم، لماذا، وما الذي تغير في خطتك.",
      benefitLabel: "ماذا تستفيد؟",
      screens: [
        {
          title: "تقويم يربط التاريخ بحكم الصيام",
          desc:
            "بدّل بين الميلادي والهجري، وافتح أي يوم لترى المناسبة، حالة الصيام، الفجر والمغرب، مدة الصوم والطقس.",
          value:
            "قرار اليوم أمامك: هل أصوم؟ لماذا؟ وكم ستطول ساعات الصيام؟",
        },
        {
          title: "خطة قضاء ونافلة بالأرقام",
          desc:
            "حدّد هدف القضاء والنافلة، وتمرات يحسب المجموع والمتبقي وما أنجزته من الأيام التي علّمتها في التقويم.",
          value:
            "بدل عدّ الأيام يدويًا، تعرف كم بقي عليك وما الذي تحقق فعليًا.",
        },
        {
          title: "اقتراحات مرتبة لا عشوائية",
          desc:
            "القضاء يرتّب حسب طول النهار والطقس حتى رمضان القادم، والنافلة تقدم الأيام السنية أولًا ثم أسهل الأيام.",
          value:
            "كل بطاقة تشرح سبب الترشيح: المناسبة، ساعات الصوم، الحرارة، ونسبة الراحة.",
        },
        {
          title: "متابعة الدورة والحمل والنفاس",
          desc:
            "تسجلين بداية الدورة أو الحمل أو النفاس، فيتضح إن كان الصيام مناسبًا اليوم، وتظهر تفاصيل الدورة نفسها.",
          value:
            "الأيام غير المناسبة تُحجب من الاقتراحات، وأيام رمضان الفائتة تُضاف للقضاء عند اللزوم.",
        },
        {
          title: "تفاصيل لكل مناسبة صيام",
          desc:
            "لكل مناسبة صفحة توضح سبب الصيام، تفاصيل التاريخ والمدة والنوع، مع إمكانية تفعيل تذكير خاص بها.",
          value:
            "عرفة، الاثنين والخميس، شوال، الأيام البيض وغيرها تظهر كفرص صيام مشروحة وليست مجرد أسماء.",
        },
        {
          title: "كل أنواع الصيام في مكان واحد",
          desc:
            "تتنقل بين الكل والفرض والسنة، وتفتح بطاقة المناسبة لتفاصيل التاريخ والمدة والتنبيه.",
          value:
            "القضاء، رمضان، شوال، الأيام البيض، والاثنين والخميس مرتبة بدون بحث منفصل.",
        },
        {
          title: "إعدادات تؤثر على الحساب",
          desc:
            "تضبط طريقة الحساب والمدينة والجنس، وتفعل ميزة الدورة عند الحاجة ليبقى التقويم والتنبيهات مناسبين لك.",
          value:
            "هذه الخيارات تغير أوقات الصلاة، الطقس، والحالات التي تظهر في الخطة.",
        },
        {
          title: "علامات التقويم تشرح السبب",
          desc:
            "ترى معنى كل لون ونقطة: ممنوع أو مكروه، طقس جيد، يوم قصير، صمت هذا اليوم، ودورة متوقعة أو حيض/نفاس.",
          value:
            "لا يظهر الحكم كرمز غامض؛ كل علامة لها شرح داخل الشاشة.",
        },
      ],
    },
    features: {
      badge: "مميزات تمرات",
      title: "مزايا واضحة تساعدك على الاستمرار",
      body:
        "خطة الصيام، التقدم، والاقتراحات اليومية في تجربة واحدة بسيطة بدون تعقيد.",
      items: [
        {
          id: "plan",
          title: "خطة القضاء والنافلة",
          short: "حدّد الهدف واترك الحساب لتمرات",
          summary:
            "تختار عدد أيام القضاء والنافلة، وتمرات يتابع المنجز والمتبقي تلقائيًا من الأيام التي تسجلها فعليًا.",
          pillars: [
            "تحديد هدف القضاء والنافلة يدويًا",
            "تحديث المتبقي تلقائيًا من التقويم",
            "مزامنة الحالة مع حسابك",
          ],
          evidence:
            "العدادات تُحسب من الأيام المعلّمة (قضاء/نافلة) وليس من تقدير نظري.",
        },
        {
          id: "track",
          title: "تقدم يومي واضح بلا تعقيد",
          short: "كل يوم تسجله يظهر فورًا",
          summary:
            "عند تعليم يومك في التقويم، تتحدث نسبة الإنجاز وعدادات القضاء والنافلة مباشرة داخل الخطة.",
          pillars: [
            "نسبة إنجاز من إجمالي الهدف",
            "عداد منفصل للقضاء والنافلة",
            "تعديل نوع الصيام لكل يوم",
          ],
          evidence:
            "بطاقة التقدم مرتبطة مباشرة بعدد الأيام التي تحددها في التقويم.",
        },
        {
          id: "calendar",
          title: "تقويم هجري/ميلادي يوجّه قرارك",
          short: "المناسبات والأحكام في واجهة واحدة",
          summary:
            "التقويم يعرض المواسم السنية، الأيام الممنوعة أو المكروهة، والحالة اليومية بشكل بصري واضح وسهل.",
          pillars: [
            "الأيام البيض والاثنين والخميس والمواسم",
            "تمييز الأيام غير المناسبة للصيام",
            "إرشاد شرعي مرتبط بكل يوم",
          ],
          evidence:
            "يوجد تبديل هجري/ميلادي مع بطاقات معلومات وعلامات يومية للحالة.",
        },
        {
          id: "suggestions",
          title: "اقتراحات صيام مبنية على معايير واضحة",
          short: "الاختيار حسب طول النهار والطقس",
          summary:
            "تمرات يرتّب الأيام بوزن 60٪ لطول النهار و40٪ للطقس، ويقدّم النوافل السنية أولًا قبل بقية الأيام.",
          pillars: [
            "القضاء حتى رمضان القادم",
            "النافلة: الأيام السنية أولًا",
            "فلترة تلقائية للأيام غير المناسبة",
          ],
          evidence:
            "الاقتراحات تستبعد العيد والتشريق والجمعة المنفردة والأيام المحجوبة حسب الحالة.",
        },
        {
          id: "women",
          title: "مسار نسائي متكامل",
          short: "الدورة والحمل والنفاس ضمن نفس الرحلة",
          summary:
            "يوثق الحيض والحمل والنفاس، ويمنع الاقتراحات في الأيام غير المناسبة، ويضبط الخطة تلقائيًا عند الحاجة.",
          pillars: [
            "تسجيل فعلي للدورة والحمل والنفاس",
            "حجب التوصيات في الأيام غير المناسبة",
            "إضافة قضاء رمضان تلقائيًا عند اللزوم",
          ],
          evidence:
            "أيام الحيض/النفاس في رمضان تُزامن تلقائيًا كأيام قضاء متبقية.",
        },
        {
          id: "reminders",
          title: "تنبيهات قابلة للتحكم",
          short: "قبل الفجر والمغرب وموعد الدورة",
          summary:
            "التنبيهات تعمل بحسب اختيارك: تذكير صيام اليوم عند الفجر، وتذكير صيام الغد بعد المغرب، مع إعدادات كتم وتشغيل دقيقة.",
          pillars: [
            "تذكير صيام اليوم عند الفجر",
            "تذكير صيام الغد بعد المغرب",
            "تشغيل/إيقاف عام وكتم كامل",
          ],
          evidence:
            "يمكنك تفعيل كل نوع تنبيه بشكل مستقل من الإعدادات.",
        },
      ],
    },
    audience: {
      intro: "تمرات مخصص لـ",
      conjunction: "و",
      detailsPrefix: "تفاصيل",
      words: [
        {
          id: "women",
          word: "النساء",
          desc:
            "يساعد النساء على تسهيل قضاء أيام رمضان الفائتة بسبب حمل أو نفاس أو دورة شهرية، عن طريق اختيار أفضل أيام للقضاء من الوقت الحالي إلى رمضان القادم.",
        },
        {
          id: "elderly",
          word: "كبار السن",
          desc:
            "لو كنت مريضًا أو كبير سن، ستستفيد من تمرات عن طريق اختيار أيام للقضاء سهلة ومريحة وقصيرة النهار.",
        },
        {
          id: "travelers",
          word: "المسافرين",
          desc:
            "لو كنت مسافرًا وأفطرت في رمضان بسبب الترحال، يساعدك تمرات على اختيار أيام قضاء سهلة ومريحة وقصيرة النهار.",
        },
        {
          id: "everyone",
          word: "كل مسلم",
          desc:
            "تمرات مفتاح لك لدخول باب الريان؛ فيه تذكيرات لكل يوم سنة صيامه، مع منبهات للمناسبات الدينية مثل عرفة ورمضان وغيرها.",
        },
      ],
    },
    howItWorks: {
      badge: "كيف يعمل",
      title: "أربع خطوات تجعلك أقرب لباب الريّان",
      body:
        "من أول مرة تفتح التطبيق، إلى يوم تُكمل آخر يوم في قضائك.",
      scrollHint: "↓   مرّر للأسفل",
      steps: [
        {
          n: 1,
          title: "سجّل بياناتك",
          desc:
            "أضف أيام قضائك أو نوافلك مرة واحدة ليبدأ التطبيق معك من واقعك الحقيقي.",
        },
        {
          n: 2,
          title: "احصل على خطة ذكية",
          desc:
            "تمرات تقترح مسارًا عمليًا يناسب وقتك وطاقتك بدل التخطيط اليدوي المرهق.",
        },
        {
          n: 3,
          title: "تابع تقدمك يومًا بعد يوم",
          desc:
            "كل صيام تسجله يتحول إلى تقدم واضح يحفزك أن تكمل بثبات واطمئنان.",
        },
        {
          n: 4,
          title: "استمر بتذكيرات لطيفة",
          desc:
            "تنبيهات هادئة تبقيك على المسار حتى تُكمل آخر يوم في خطتك بإذن الله.",
        },
      ],
    },
    download: {
      logoAlt: "تمرات",
      title: "حمّل تمرات وابدأ اليوم",
      body:
        "كل يوم تصومه يُقرّبك، ابدأ منظمًا وابق على المسار.",
      appStoreLabel: "تحميل من App Store",
      playStoreLabel: "تحميل من Google Play",
      availability: "متوفر قريبًا على iOS و Android",
    },
    privacy: {
      backHome: "العودة للرئيسية",
      updated: "آخر تحديث: 17 نيسان 2026",
      title: "سياسة الخصوصية",
      intro:
        "توضح هذه الصفحة كيف يتعامل تطبيق تمرات مع البيانات التي تختارها داخل التطبيق، وكيف تستخدمها تمرات لتقديم التقويم، خطة الصوم، التذكيرات، ومزامنة الحساب.",
      summaryTitle: "ملخص سريع",
      contactTitle: "تواصل معنا",
      quickFacts: [
        "لا نبيع بياناتك الشخصية",
        "حذف الحساب متاح من التطبيق أو البريد",
        "بيانات الدورة والحمل اختيارية",
      ],
      rows: [
        {
          title: "ما البيانات التي تستخدمها تمرات؟",
          body:
            "نستخدم المعلومات التي تدخلها أو تختارها داخل التطبيق: الاسم، البريد الإلكتروني، تاريخ الميلاد، المدينة، طريقة حساب الصلاة، الجنس، أهداف خطة الصوم، سجل الأيام التي صمتها، أيام رمضان الفائتة، تفضيلات الإشعارات، اللغة، المظهر، وسجلات الدورة أو الحمل أو النفاس الاختيارية.",
        },
        {
          title: "أين تبقى البيانات؟",
          body:
            "تبقى أغلب البيانات على جهازك. عند تسجيل الدخول، تتم مزامنة بيانات الحساب والصوم والدورة مع Supabase حتى تستطيع استعادتها ومتابعة خطتك من الحساب نفسه.",
        },
        {
          title: "الموقع والمواقيت",
          body:
            "إذا اخترت استخدام موقعك، يطلب التطبيق موقعًا حديثًا أو منخفض الدقة لاختيار أقرب مدينة مدعومة وطريقة حساب الصلاة. نخزن اسم المدينة أو الإحداثيات التقريبية اللازمة للمواقيت، ولا نخزن مسارًا مباشرًا لتحركاتك.",
        },
        {
          title: "الخدمات الخارجية",
          body:
            "تعتمد تمرات على Supabase للحساب والمزامنة وإعادة تعيين كلمة المرور وحذف الحساب، وGoogle Sign-In إذا اخترت الدخول بجوجل، وAladhan لبيانات الصلاة والتقويم الهجري، وOpen-Meteo للطقس، وFirebase Cloud Messaging لإيصال الإشعارات.",
        },
        {
          title: "الإشعارات والمنبهات الدقيقة",
          body:
            "تطلب تمرات أذونات الإشعارات والمنبهات الدقيقة حتى تصل تذكيرات الصوم والسحور والإفطار والأذان والدورة في وقتها. يمكنك إيقاف التذكيرات من تمرات أو من إعدادات النظام في أي وقت.",
        },
        {
          title: "الدورة والحمل والنفاس",
          body:
            "هذه البيانات اختيارية وتستخدم فقط لتخصيص تجربة الصيام والتقويم داخل تمرات. لا تقدم تمرات تشخيصًا طبيًا، ولا تغني المعلومات داخل التطبيق عن استشارة الطبيب.",
        },
        {
          title: "الأمان والمشاركة",
          body:
            "لا نبيع بياناتك الشخصية. نستخدم رموز الدخول والتخزين الآمن داخل التطبيق لحماية الجلسة قدر الإمكان، ونستخدم البيانات فقط لتقديم وظائف التطبيق وتحسين تجربة الصيام والتنبيهات.",
        },
      ],
      deleteSubject: "حذف حساب تمرات",
      deleteBody:
        "السلام عليكم فريق تمرات،\n\nأرغب بحذف حسابي في تمرات والبيانات المتزامنة المرتبطة به.\n\nالبريد المسجل في الحساب:\nسبب الطلب، اختياري:\n\nشكرًا لكم.",
      accountDeletionTitle: "حذف الحساب والبيانات",
      accountDeletionBody:
        "يمكنك حذف حساب تمرات والبيانات المتزامنة من داخل التطبيق عبر الملف الشخصي ثم حذف الحساب. إذا لم تستطع الوصول إلى التطبيق، أرسل طلبًا من بريد حسابك المسجل وسنساعدك في التحقق من الحساب وحذف البيانات المتزامنة المرتبطة به.",
      requestDeletion: "طلب حذف الحساب",
      contactUs: "تواصل معنا",
    },
  },
  en: {
    common: {
      appName: "Tamrat",
      logoAlt: "Tamrat",
      languageButton: "ع",
      languageButtonLabel: "Switch language to Arabic",
      previous: "Previous",
      next: "Next",
      featureLabel: "Feature",
    },
    nav: {
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Who it helps", href: "#audience" },
        { label: "Inside the app", href: "#screenshots" },
      ],
      download: "Download",
      toggleMenu: "Toggle menu",
    },
    footer: {
      tagline: "Your smart companion for easier, steadier fasting.",
      contact: "Contact us",
      productLinks: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Download", href: "#download" },
      ],
      legalLinks: [
        { label: "Privacy Policy", href: "#/privacy-policy" },
        { label: "Delete account", href: "#/privacy-policy" },
      ],
      copyright: "© 2026 Tamrat. All rights reserved.",
    },
    hero: {
      tagline: "Your smart companion for easier, steadier fasting",
    },
    valueProp: {
      badge: "What is Tamrat?",
      headline: "Your smart companion for the fasting journey",
      body:
        "A carefully designed app for Qada and Nafl fasting. Organize your days, track your progress, and stay calmly on course.",
      arrow: "→",
      phoneAlt: "Tamrat plan screen",
      features: [
        {
          label: "Smart planning",
          desc: "Personalized suggestions for the best fasting days",
        },
        {
          label: "Easy tracking",
          desc: "Track your progress and achievements clearly",
        },
        {
          label: "Hijri calendar",
          desc: "Accurate reminders for religious occasions",
        },
      ],
    },
    screenshots: {
      badge: "Inside the app",
      title: "Screens that show exactly what you will do",
      body:
        "Each screen answers a real decision: when to fast, why this day, and what changed in your plan.",
      benefitLabel: "What you gain",
      screens: [
        {
          title: "A calendar that connects dates with fasting rulings",
          desc:
            "Switch between Gregorian and Hijri, open any day, and see the occasion, fasting status, Fajr, Maghrib, fasting duration, and weather.",
          value:
            "Today’s decision is clear: should I fast, why, and how long will the fast be?",
        },
        {
          title: "A Qada and Nafl plan in numbers",
          desc:
            "Set your Qada and Nafl goals, and Tamrat calculates totals, remaining days, and completed fasts from what you mark on the calendar.",
          value:
            "Instead of counting manually, you know what remains and what you have truly completed.",
        },
        {
          title: "Ordered suggestions, not random picks",
          desc:
            "Qada days are ranked by day length and weather until next Ramadan, while Nafl suggestions prioritize Sunnah days first.",
          value:
            "Every card explains the reason: occasion, fasting hours, temperature, and comfort score.",
        },
        {
          title: "Cycle, pregnancy, and postpartum tracking",
          desc:
            "Log cycle, pregnancy, or postpartum status, and Tamrat clarifies whether fasting is suitable today while showing relevant details.",
          value:
            "Unsuitable days are removed from suggestions, and missed Ramadan days can be added to Qada when needed.",
        },
        {
          title: "Details for every fasting occasion",
          desc:
            "Each occasion has a page explaining why to fast, the date, duration, type, and a dedicated reminder option.",
          value:
            "Arafah, Mondays and Thursdays, Shawwal, White Days, and more become explained opportunities, not just names.",
        },
        {
          title: "All fasting types in one place",
          desc:
            "Move between all, obligatory, and Sunnah fasts, and open each occasion for timing, duration, and reminders.",
          value:
            "Qada, Ramadan, Shawwal, White Days, Mondays, and Thursdays are organized without extra searching.",
        },
        {
          title: "Settings that affect calculations",
          desc:
            "Set calculation method, city, gender, and cycle support so the calendar and reminders stay relevant to you.",
          value:
            "These choices affect prayer times, weather, and the states shown in your plan.",
        },
        {
          title: "Calendar markers explain the reason",
          desc:
            "Understand each color and dot: prohibited, disliked, good weather, short day, completed fast, expected cycle, or period/postpartum.",
          value:
            "Nothing appears as a mystery symbol; every marker has an explanation in the screen.",
        },
      ],
    },
    features: {
      badge: "Tamrat features",
      title: "Clear tools that help you keep going",
      body:
        "Your fasting plan, progress, and daily suggestions in one simple experience.",
      items: [
        {
          id: "plan",
          title: "Qada and Nafl plan",
          short: "Set the goal and let Tamrat do the math",
          summary:
            "Choose your Qada and Nafl targets, and Tamrat tracks completed and remaining days automatically from what you actually log.",
          pillars: [
            "Set Qada and Nafl goals manually",
            "Update remaining days from the calendar",
            "Sync progress with your account",
          ],
          evidence:
            "Counters are based on days marked as Qada or Nafl, not an estimate.",
        },
        {
          id: "track",
          title: "Clear daily progress",
          short: "Every logged day appears instantly",
          summary:
            "When you mark a day on the calendar, completion percentage and Qada/Nafl counters update directly in the plan.",
          pillars: [
            "Completion percentage from your goal",
            "Separate counters for Qada and Nafl",
            "Edit fasting type for each day",
          ],
          evidence:
            "The progress card is tied directly to the days you select in the calendar.",
        },
        {
          id: "calendar",
          title: "Hijri/Gregorian calendar that guides decisions",
          short: "Occasions and rulings in one view",
          summary:
            "The calendar shows Sunnah seasons, prohibited or disliked days, and daily status in a clear visual way.",
          pillars: [
            "White Days, Mondays, Thursdays, and seasons",
            "Highlight days unsuitable for fasting",
            "Guidance connected to each day",
          ],
          evidence:
            "Hijri/Gregorian switching appears with info cards and daily status markers.",
        },
        {
          id: "suggestions",
          title: "Fasting suggestions based on clear criteria",
          short: "Ranked by day length and weather",
          summary:
            "Tamrat ranks days with 60% weight for day length and 40% for weather, while Nafl suggestions prioritize Sunnah days.",
          pillars: [
            "Qada planning until next Ramadan",
            "Nafl: Sunnah days first",
            "Automatic filtering of unsuitable days",
          ],
          evidence:
            "Suggestions exclude Eid, Tashreeq, single Fridays, and blocked days according to your status.",
        },
        {
          id: "women",
          title: "Integrated women’s path",
          short: "Cycle, pregnancy, and postpartum in the same journey",
          summary:
            "Log cycle, pregnancy, or postpartum status, block unsuitable suggestions, and adjust the plan automatically when needed.",
          pillars: [
            "Actual cycle, pregnancy, and postpartum logging",
            "Hide recommendations on unsuitable days",
            "Add missed Ramadan Qada automatically when needed",
          ],
          evidence:
            "Period/postpartum days in Ramadan can sync automatically as remaining Qada days.",
        },
        {
          id: "reminders",
          title: "Controllable reminders",
          short: "Before Fajr, after Maghrib, and cycle timing",
          summary:
            "Reminders work based on your choices: today’s fast at Fajr, tomorrow’s fast after Maghrib, with precise mute and enable settings.",
          pillars: [
            "Today’s fast reminder at Fajr",
            "Tomorrow’s fast reminder after Maghrib",
            "Global enable/disable and full mute",
          ],
          evidence:
            "Each reminder type can be enabled independently from settings.",
        },
      ],
    },
    audience: {
      intro: "Tamrat is made for",
      conjunction: "and",
      detailsPrefix: "Details for",
      words: [
        {
          id: "women",
          word: "women",
          desc:
            "Tamrat helps women organize missed Ramadan fasts due to pregnancy, postpartum, or menstrual cycles by choosing suitable Qada days until next Ramadan.",
        },
        {
          id: "elderly",
          word: "older adults",
          desc:
            "If illness or age makes fasting harder, Tamrat helps choose easier, more comfortable, shorter days for Qada.",
        },
        {
          id: "travelers",
          word: "travelers",
          desc:
            "If travel caused missed Ramadan fasts, Tamrat helps you pick easier and more comfortable Qada days.",
        },
        {
          id: "everyone",
          word: "every Muslim",
          desc:
            "Tamrat helps you pursue the gate of Ar-Rayyan with reminders for Sunnah fasting days and religious occasions such as Arafah, Ramadan, and more.",
        },
      ],
    },
    howItWorks: {
      badge: "How it works",
      title: "Four steps that bring you closer to Ar-Rayyan",
      body:
        "From the first time you open the app to the day you complete the last fast in your plan.",
      scrollHint: "↓   Scroll down",
      steps: [
        {
          n: 1,
          title: "Enter your details",
          desc:
            "Add your Qada or Nafl days once, so the app starts from your real situation.",
        },
        {
          n: 2,
          title: "Get a smart plan",
          desc:
            "Tamrat suggests a practical path that fits your time and energy instead of tiring manual planning.",
        },
        {
          n: 3,
          title: "Track progress day by day",
          desc:
            "Every fast you log becomes visible progress that encourages steady, calm consistency.",
        },
        {
          n: 4,
          title: "Keep going with gentle reminders",
          desc:
            "Quiet reminders keep you on track until you complete the last day in your plan, God willing.",
        },
      ],
    },
    download: {
      logoAlt: "Tamrat",
      title: "Download Tamrat and start today",
      body:
        "Every fast brings you closer. Start organized and stay on track.",
      appStoreLabel: "Download from the App Store",
      playStoreLabel: "Download from Google Play",
      availability: "Coming soon on iOS and Android",
    },
    privacy: {
      backHome: "Back to home",
      updated: "Last updated: April 17, 2026",
      title: "Privacy Policy",
      intro:
        "This page explains how Tamrat handles the data you choose inside the app, and how Tamrat uses it to provide the calendar, fasting plan, reminders, and account sync.",
      summaryTitle: "Quick summary",
      contactTitle: "Contact us",
      quickFacts: [
        "We do not sell your personal data",
        "Account deletion is available from the app or by email",
        "Cycle and pregnancy data is optional",
      ],
      rows: [
        {
          title: "What data does Tamrat use?",
          body:
            "We use information you enter or choose inside the app: name, email, date of birth, city, prayer calculation method, gender, fasting plan goals, logged fasting days, missed Ramadan days, notification preferences, language, appearance, and optional cycle, pregnancy, or postpartum records.",
        },
        {
          title: "Where does the data stay?",
          body:
            "Most data stays on your device. When you sign in, account, fasting, and cycle data sync with Supabase so you can restore it and continue your plan from the same account.",
        },
        {
          title: "Location and timings",
          body:
            "If you choose to use your location, the app requests a recent or low-accuracy location to select the nearest supported city and prayer calculation method. We store the city name or approximate coordinates needed for timings, not a direct movement history.",
        },
        {
          title: "External services",
          body:
            "Tamrat uses Supabase for accounts, sync, password reset, and account deletion; Google Sign-In if you choose it; Aladhan for prayer and Hijri calendar data; Open-Meteo for weather; and Firebase Cloud Messaging for notifications.",
        },
        {
          title: "Notifications and exact alarms",
          body:
            "Tamrat requests notification and exact alarm permissions so fasting, suhoor, iftar, adhan, and cycle reminders arrive on time. You can turn reminders off from Tamrat or system settings at any time.",
        },
        {
          title: "Cycle, pregnancy, and postpartum",
          body:
            "This data is optional and used only to personalize fasting and calendar experiences inside Tamrat. Tamrat does not provide medical diagnosis, and in-app information does not replace medical advice.",
        },
        {
          title: "Security and sharing",
          body:
            "We do not sell your personal data. We use login tokens and secure storage inside the app to protect your session where possible, and we use data only to provide app features and improve fasting and reminder experiences.",
        },
      ],
      deleteSubject: "Delete Tamrat account",
      deleteBody:
        "Hello Tamrat team,\n\nI would like to delete my Tamrat account and the synced data connected to it.\n\nEmail registered on the account:\nReason for request, optional:\n\nThank you.",
      accountDeletionTitle: "Account and data deletion",
      accountDeletionBody:
        "You can delete your Tamrat account and synced data from inside the app through Profile, then Delete account. If you cannot access the app, send a request from your registered account email and we will help verify the account and delete the synced data connected to it.",
      requestDeletion: "Request account deletion",
      contactUs: "Contact us",
    },
  },
} as const;

type Translation = (typeof translations)[Language];

interface LanguageContextValue {
  language: Language;
  dir: "rtl" | "ltr";
  isArabic: boolean;
  t: Translation;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "ar";
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [dir, language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir,
      isArabic: language === "ar",
      t: translations[language],
      setLanguage: setLanguageState,
      toggleLanguage: () => setLanguageState((current) => (current === "ar" ? "en" : "ar")),
    }),
    [dir, language],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
