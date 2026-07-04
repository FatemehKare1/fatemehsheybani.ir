/* ============================================================
   Structured content — expertise, experience, projects, certs,
   testimonials. Each item carries { en, fa } text.
   Edit this file to update the site's content.
   ============================================================ */
window.CONTENT = {

  /* ---- Expertise: three pillars ---- */
  pillars: [
    {
      icon: "search",
      en: { title: "Market Research",
            body: "Understanding a market before betting on it — sizing opportunities, mapping competitors, and listening to what people actually say and need." },
      fa: { title: "پژوهش بازار",
            body: "شناختِ بازار پیش از شرط‌بستن روی آن — برآورد فرصت‌ها، ترسیمِ نقشه‌ی رقبا، و گوش‌سپردن به آنچه مردم واقعاً می‌گویند و می‌خواهند." },
      tags: ["Competitor analysis", "Market sizing", "Trend analysis", "Google Trends", "Voice of Customer", "Social & news analysis"]
    },
    {
      icon: "chart",
      en: { title: "Data Analysis",
            body: "Turning raw, messy data into something you can trust and see — cleaning it, questioning it, and letting it speak through clear visuals." },
      fa: { title: "تحلیل داده",
            body: "تبدیلِ داده‌ی خام و درهم به چیزی که بشود به آن اعتماد کرد و دیدش — پاک‌سازی، پرسشگری، و اجازه‌دادن به داده که با تصویری روشن سخن بگوید." },
      tags: ["Python", "R", "SQL / MySQL", "Power BI", "Tableau", "Excel", "Jupyter", "Web scraping"]
    },
    {
      icon: "compass",
      en: { title: "Product Management",
            body: "Carrying insight into what gets built — framing the problem, shaping the roadmap, and telling the story that moves a decision forward." },
      fa: { title: "مدیریت محصول",
            body: "بردنِ بینش به دلِ آنچه ساخته می‌شود — صورت‌بندیِ مسئله، شکل‌دادن به نقشه‌ی راه، و روایتی که یک تصمیم را پیش می‌بَرَد." },
      tags: ["Business Model Canvas", "Pitch decks", "Roadmapping", "Jira", "Product-Led Growth", "GA4", "User research"]
    }
  ],

  /* ---- Experience timeline (most recent first) ---- */
  experience: [
    {
      badge: { en: "Full-time", fa: "تمام‌وقت" },
      when: { en: "Oct 2025 — Present", fa: "مهر ۱۴۰۴ — اکنون" },
      en: { role: "Product Analyst", org: "Kareone",
            desc: "Research, data, and product decisions, end to end." },
      fa: { role: "تحلیل‌گر محصول", org: "کاروان (Kareone)",
            desc: "از پژوهش و داده تا تصمیم‌های محصول، سرتاسر." }
    },
    {
      badge: { en: "Full-time · On-site", fa: "تمام‌وقت · حضوری" },
      when: { en: "Apr 2025 — Oct 2025", fa: "فروردین — مهر ۱۴۰۴" },
      en: { role: "Market Research Analyst", org: "Pars Iranian AI Technologists",
            desc: "Market and data research supporting AI-driven products." },
      fa: { role: "تحلیل‌گر پژوهش بازار", org: "فناوران هوش مصنوعی پارس ایرانیان",
            desc: "پژوهش بازار و داده در پشتیبانی از محصولات مبتنی بر هوش مصنوعی." }
    },
    {
      badge: { en: "Internship", fa: "کارآموزی" },
      when: { en: "Jun 2023 — Aug 2023", fa: "خرداد — مرداد ۱۴۰۲" },
      en: { role: "Associate Product Manager", org: "Kanoon Sarrafan Iranian",
            desc: "Bug reporting and task tracking in Trello; authored a business plan with a financial model in Excel; built a Business Model Canvas and an investor pitch deck." },
      fa: { role: "دستیار مدیر محصول", org: "کانون صرافان ایرانیان",
            desc: "گزارش باگ و پیگیری وظایف در Trello؛ نگارشِ طرح کسب‌وکار همراه با مدل مالی در اکسل؛ ساختِ بوم مدل کسب‌وکار و پیچ‌دکِ سرمایه‌گذاری." }
    },
    {
      badge: { en: "Part-time · Remote", fa: "پاره‌وقت · دورکاری" },
      when: { en: "Aug 2020 — Jan 2021", fa: "مرداد ۱۳۹۹ — دی ۱۳۹۹" },
      en: { role: "Content Specialist", org: "momino.ir",
            desc: "SEO content in WordPress; keyword research and prioritization; content strategy; market and competitor analysis via Google Trends." },
      fa: { role: "کارشناس محتوا", org: "momino.ir",
            desc: "تولید محتوای سئو در وردپرس؛ پژوهش و اولویت‌بندی کلیدواژه؛ راهبرد محتوا؛ تحلیل بازار و رقبا با Google Trends." }
    }
  ],

  /* ---- Selected projects ---- */
  projects: [
    {
      en: { eyebrow: "Python · Machine Learning",
            title: "Waze — Predicting User Churn",
            desc: "A capstone from Google's Advanced Data Analytics certificate: quantifying and modeling why users stop using the Waze app, from a synthetic Waze dataset. Written in Python, shared on Kaggle." },
      fa: { eyebrow: "پایتون · یادگیری ماشین",
            title: "ویز — پیش‌بینی ریزش کاربر",
            desc: "پروژه‌ی پایانیِ گواهیِ Google Advanced Data Analytics: کمی‌سازی و مدل‌سازیِ اینکه چرا کاربران استفاده از اپلیکیشن Waze را متوقف می‌کنند، روی داده‌ای سنتتیک. با پایتون نوشته و در Kaggle منتشر شد." },
      tags: ["Python", "Jupyter", "Churn modeling", "Kaggle"]
    },
    {
      en: { eyebrow: "R · Case study",
            title: "Cyclistic Bike-Share Analysis",
            desc: "The capstone of Google's Data Analytics certificate: analyzing a year of Chicago bike-share trips to see how casual riders and members differ — and how to turn one into the other. Written in R, with extra analysis in Excel PivotTables." },
      fa: { eyebrow: "R · مطالعه‌ی موردی",
            title: "تحلیل بایک‌شرینگِ Cyclistic",
            desc: "پروژه‌ی پایانیِ گواهیِ Google Data Analytics: تحلیلِ یک‌سال سفرِ دوچرخه‌های اشتراکیِ شیکاگو برای دیدنِ تفاوتِ کاربران گاه‌به‌گاه و اعضا — و راهِ تبدیل یکی به دیگری. با زبان R، به‌همراه تحلیلِ تکمیلی در Excel PivotTable." },
      tags: ["R", "Data cleaning", "Excel", "Kaggle"]
    },
    {
      en: { eyebrow: "Python · Web scraping",
            title: "Jabama — Review Analysis",
            desc: "A self-driven project analyzing customer reviews on Iran's Jabama accommodation site — moving from web scraping to an API, and using keyword extraction to understand what travelers really need. Shared as a walkthrough video." },
      fa: { eyebrow: "پایتون · وب‌اسکریپینگ",
            title: "جاباما — تحلیل نظرات",
            desc: "پروژه‌ای شخصی برای تحلیلِ نظراتِ کاربرانِ سایت اقامتگاهیِ جاباما — گذار از وب‌اسکریپینگ به API، و استفاده از استخراجِ کلیدواژه برای فهمِ نیازِ واقعیِ مسافران. در قالب ویدیوی آموزشی منتشر شد." },
      tags: ["Python", "BeautifulSoup", "Selenium", "API", "Review analysis"]
    }
  ],

  /* ---- Certifications (curated highlights of 18 total) ---- */
  certsNote: { en: "A selection from 18 certifications.", fa: "گزیده‌ای از ۱۸ گواهی‌نامه." },
  education: {
    en: { name: "B.Sc. Industrial Engineering", by: "Iran University of Science and Technology · 2019–2023 · GPA 18.21 / 20" },
    fa: { name: "کارشناسی مهندسی صنایع", by: "دانشگاه علم و صنعت ایران · ۱۳۹۸–۱۴۰۲ · معدل ۱۸٫۲۱ از ۲۰" }
  },
  certs: [
    { en: { name: "IELTS — Overall Band 8.0", by: "IDP Education" },
      fa: { name: "آیلتس — نمره‌ی کل ۸٫۰", by: "IDP Education" } },
    { en: { name: "Google Advanced Data Analytics", by: "Google Career Certificates" },
      fa: { name: "Google Advanced Data Analytics", by: "Google Career Certificates" } },
    { en: { name: "Google Data Analytics Professional Certificate", by: "Google Career Certificates" },
      fa: { name: "گواهیِ حرفه‌ای Google Data Analytics", by: "Google Career Certificates" } },
    { en: { name: "Data Analysis & Visualization with Power BI", by: "Microsoft · Coursera" },
      fa: { name: "تحلیل و مصورسازی داده با Power BI", by: "Microsoft · Coursera" } },
    { en: { name: "MySQL for Data Analytics & Business Intelligence", by: "Udemy" },
      fa: { name: "MySQL برای تحلیل داده و هوش تجاری", by: "Udemy" } },
    { en: { name: "Product-Led Growth Micro-Certification (PLGC)", by: "Product School" },
      fa: { name: "گواهیِ Product-Led Growth (PLGC)", by: "Product School" } },
    { en: { name: "Digital Product Management: Modern Fundamentals", by: "Coursera" },
      fa: { name: "مدیریت محصول دیجیتال: مبانی نوین", by: "Coursera" } },
    { en: { name: "Fundamentals of Digital Marketing", by: "Google Digital Garage" },
      fa: { name: "مبانیِ بازاریابی دیجیتال", by: "Google Digital Garage" } }
  ],

  /* ---- Testimonials (empty until real quotes are added) ---- */
  testimonials: []
};
