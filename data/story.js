/* Public summaries grounded in the supplied repository report.
   Describes artifacts without inferring individual ownership or outcomes.
   Private source documents and datasets are not bundled with this site. */
window.WORK_STORY = {
  en: {
    illustrated: "Illustrated summary",
    intro: "A market report, a data pipeline, and a product interface can look like separate kinds of work. For me, they belong to the same question: how do we turn something uncertain into something a person can use? Follow the thread.",
    nav: "Follow the thread", navHint: "Four chapters · one connected approach",
    chapter: "Chapter", explore: "Explore the approach", evidence: "The work behind this chapter",
    question: "The question", approach: "The approach", output: "The artifact",
    private: "Private project · overview", foundations: "Earlier questions that shaped the practice",
    foundationIntro: "The same curiosity runs through these earlier analyses: why people leave, how behavior differs, and what people are trying to tell us.",
    closing: "The thread I keep coming back to",
    closingBody: "Understand the context. Question the evidence. Connect it to a decision. Make it usable. That is the space I want to work in: where research, analytics, and product meet.",
    contact: "Let’s work on the next question", next: "Continue to", end: "Back to the beginning",
    chapters: [
      {
        id: "context", label: "Read the context", word: "Context", visual: "map",
        artifact: {
          title: "An opportunity, in context",
          caption: "Sector maps, sources, and scenarios connect the landscape to a question worth investigating.",
          labels: [
            { title: "Sector map", detail: "Energy and industrial technology in Oman" },
            { title: "Source register", detail: "A traceable basis for each claim" },
            { title: "Scenarios", detail: "Explore assumptions before narrowing the opportunity" }
          ]
        },
        title: "Before the answer, understand the landscape.",
        body: ["My starting point is the situation around a question: the market, the people in it, and the constraints that make one opportunity different from another.",
          "The Oman energy research and insurance investment work bring that thinking into view. Sector maps, source registers, and scenarios connect a broad landscape to specific questions worth investigating."],
        bridge: "A landscape gives direction. The next question is whether the evidence beneath it holds together.",
        center: "The opportunity",
        states: [
          { title: "Landscape", text: "Map sectors, technologies, and competitors before narrowing the opportunity. The Oman research brings these perspectives together in analytical chapters and an opportunity map." },
          { title: "Sources", text: "Keep the trail back to the evidence visible. Source registers in the research reports let a reader inspect the basis for a claim." },
          { title: "Scenarios", text: "Explore how assumptions change the picture. Payback tools and editable investment scenarios make the questions concrete while keeping forecasts distinct from observed results." }
        ],
        projects: [
          { title: "Oman · energy & industrial technology", subtitle: "Market intelligence → an explorable research workspace", tags: ["Market research", "English / Arabic", "Scenario analysis"],
            question: "Where do energy and industrial technology opportunities fit within Oman’s market?",
            approach: "Connect sector research, company profiles, sources, and opportunity comparisons. Use interactive heatmaps and a payback calculator to explore the assumptions.",
            output: "An English–Arabic research application with analytical chapters, a company explorer, a source register, and scenario tools." },
          { title: "Insurance · investment research", subtitle: "Sector evidence → an executive decision brief", tags: ["Investment research", "English / Persian", "Evidence synthesis"],
            question: "How can insurance and technology research support an investment discussion?",
            approach: "Bring industry evidence, comparable businesses, financial scenarios, and diligence questions into a connected report.",
            output: "A bilingual executive report with a source register, investment themes, editable scenarios, and diligence priorities." }
        ]
      },
      {
        id: "evidence", label: "Question the evidence", word: "Evidence", visual: "trace",
        artifact: {
          title: "From records to reviewable matches",
          caption: "Inspect data quality, normalize records, and review fit before trusting a shortlist.",
          labels: [
            { title: "Inspect", detail: "Quality gaps and identity collisions" },
            { title: "Normalize", detail: "Reusable records with explicit unknowns" },
            { title: "Review matches", detail: "Sector, stage, geography, and independent signals" }
          ]
        },
        title: "A useful pattern needs a trustworthy foundation.",
        body: ["Once there is a direction, I want to understand what the data can actually support. An apparent match means little if identities collide, fields are missing, or a ranking hides its assumptions.",
          "The investor work connects two layers: normalization and validation underneath; an explorable matching dashboard above. The link between them matters as much as either layer."],
        bridge: "When the evidence is structured, it can travel further: into strategy, priorities, and a decision.",
        center: "From records to a shortlist",
        states: [
          { title: "Structure", text: "Normalize messy investor and company records into reusable datasets, keeping the original source tables unchanged. Quality reports make gaps and duplicate identities visible." },
          { title: "Match", text: "Compare sector, stage, and geography against an investment thesis. Investor Radar supports different views, including a custom thesis and portfolio overlap." },
          { title: "Question", text: "Separate a signal from a consequence of the search. A sector chart that echoes the matching criteria differs from an independent co-investor or activity signal. Machine-screened matches still need review." }
        ],
        projects: [
          { title: "Investor matching · data foundation", subtitle: "Messy records → normalized, reviewable evidence", tags: ["Python", "SQL / SQLite", "Data quality"],
            question: "What needs to be true about the data before an investor match can be useful?",
            approach: "Inspect quality and identity, normalize records, and produce validation artifacts. The research service retains explicit unknowns alongside its results.",
            output: "A normalization and analysis pipeline, quality reports, and a reusable investor-research API/worker service." },
          { title: "Investor Radar · exploring fit", subtitle: "An investment thesis → an inspectable ranking", tags: ["Python", "JavaScript", "Interactive analytics"],
            question: "How can someone explore investor fit rather than accept a single opaque list?",
            approach: "Re-rank investors using sector, stage, geography, and activity or portfolio overlap. Show chart distributions and distinguish matching criteria from independent market signals.",
            output: "An investor-intelligence dashboard with multiple matching modes, interactive charts, and optional AI-assisted commentary grounded in aggregate chart data." }
        ]
      },
      {
        id: "decisions", label: "Connect to a decision", word: "Decisions", visual: "pipeline",
        artifact: {
          title: "One evidence trail, three outputs",
          caption: "Research feeds GTM strategy, then pitch materials; shared values stay connected to their source.",
          labels: [
            { title: "Insights", detail: "Market Navigator Insights · research synthesis" },
            { title: "GTM strategy", detail: "GTM Report Engine · priorities and positioning" },
            { title: "Pitch", detail: "Pitch Deck Engine · a coherent narrative" }
          ]
        },
        title: "Let the research carry through to the next decision.",
        body: ["An insight becomes more useful when it survives the handoff. The market analysis, the go-to-market plan, and the pitch should tell a coherent story from the same evidence.",
          "That connection is explicit in the Market Navigator engines: research feeds strategy, and strategy feeds communication. Shared values come from one producer so that the story stays consistent as its form changes."],
        bridge: "A connected decision is still only part of the work. Someone has to be able to read it, explore it, and act on it.",
        center: "One evidence trail, three outputs",
        states: [
          { title: "Insights", text: "Market Navigator Insights brings together competitive, social, news, and investment-readiness research in a bilingual report bundle and decision synthesis." },
          { title: "GTM strategy", text: "The GTM Report Engine consumes the research bundle to frame market entry, customer priorities, positioning, channels, and a roadmap in English and Persian." },
          { title: "Pitch", text: "The Pitch Deck Engine consumes the insights and GTM outputs alongside financial and market-sizing inputs, changing the presentation while preserving the evidence thread." }
        ],
        projects: [
          { title: "Market Navigator · a connected report system", subtitle: "Insights → go-to-market strategy → pitch", tags: ["Research synthesis", "Python / JavaScript", "Bilingual reports"],
            question: "How can research remain coherent as it becomes strategy and an investor narrative?",
            approach: "Connect the Insights, GTM, and Pitch Deck engines through structured outputs. Project shared values from their source instead of reconstructing them from prose.",
            output: "A three-stage report pipeline with bilingual outputs and a documented consistency contract for shared counts and the decision verdict." },
          { title: "Market Navigator · investor communication", subtitle: "Research and planning → a focused narrative", tags: ["Market sizing", "Pitch development", "Research communication"],
            question: "How can market analysis and planning be communicated to an investor audience?",
            approach: "Bring Oman/GCC market sizing, acquisition assumptions, and funding scenarios into pitch materials, with outreach planning and research communication alongside them.",
            output: "Pitch-deck materials, planning documents, and editorial publication packages." }
        ]
      },
      {
        id: "delivery", label: "Make it usable", word: "Delivery", visual: "product",
        artifact: {
          title: "An interface shaped around people",
          caption: "Across product and research interfaces, local context, human review, and exploration make information usable.",
          labels: [
            { title: "Local context", detail: "Persian, Jalali dates, and familiar foods" },
            { title: "Confirm estimates", detail: "Review AI quantities before food logging" },
            { title: "Explore information", detail: "Chapters, sources, languages, and scenario controls" }
          ]
        },
        title: "The work is complete when someone can use it.",
        body: ["I care about the last mile between analysis and a person. Language, navigation, and the ability to check an assumption shape how useful an output becomes.",
          "The bilingual research interfaces make dense material explorable. CalorieYar brings a different version of the same concern into everyday use: familiar foods, a Persian interface, and a chance to confirm an AI estimate before recording it."],
        bridge: "Different subjects, the same thread: making complex information easier to question and use.",
        center: "Designed around the reader",
        states: [
          { title: "Local context", text: "CalorieYar uses Persian right-to-left screens, Jalali dates, and an Iranian food catalog alongside barcode lookup. The details of daily use shape the experience." },
          { title: "Human review", text: "Photo-based meal estimation leads to a confirmation step. People can review and edit quantities before an estimate enters the food diary." },
          { title: "Exploration", text: "The research interfaces offer chapter navigation, source search, language switching, and scenario controls. A reader can choose a route through the material." }
        ],
        projects: [
          { title: "CalorieYar · a localized nutrition experience", subtitle: "Daily food choices → a reviewable personal diary", tags: ["React Native / Expo", "Supabase", "Persian / RTL"],
            question: "How can food logging fit the language and habits of Iranian users?",
            approach: "Combine a curated Iranian dish catalog, barcode lookup, and AI-assisted photo logging with a confirmation step. Use Persian screens and Jalali dates.",
            output: "A mobile app project with a food diary, water tracking, and weight/calorie progress views." },
          { title: "Bilingual research · an interface to the evidence", subtitle: "A dense report → a reader’s own path", tags: ["Information design", "English / Persian / Arabic", "Interactive reporting"],
            question: "How can different readers navigate the same research on their own terms?",
            approach: "Use chapter navigation, linked sources, interactive comparisons, and language-aware layouts across the research reports.",
            output: "Bilingual web reports and research applications, including the Oman, insurance, and Market Navigator work." }
        ]
      }
    ]
  },
  fa: {
    illustrated: "خلاصهٔ تصویری",
    intro: "گزارش بازار، خط پردازش داده و رابط محصول شاید کارهایی جدا به نظر برسند. برای من، همگی به یک پرسش وصل‌اند: چطور چیزی نامطمئن را به چیزی تبدیل کنیم که یک نفر بتواند از آن استفاده کند؟ این رشته را دنبال کنید.",
    nav: "رشته را دنبال کنید", navHint: "چهار فصل · یک مسیر پیوسته",
    chapter: "فصل", explore: "کاوش در رویکرد", evidence: "کارهایی پشت این فصل",
    question: "پرسش", approach: "رویکرد", output: "خروجی",
    private: "پروژه خصوصی · مرور کلی", foundations: "پرسش‌های قبلی که این مسیر را شکل دادند",
    foundationIntro: "همان کنجکاوی در این تحلیل‌های قبلی هم هست: چرا آدم‌ها می‌روند، رفتارها چه تفاوتی دارند و مردم چه چیزی می‌خواهند به ما بگویند؟",
    closing: "رشته‌ای که دوباره به آن برمی‌گردم",
    closingBody: "شناخت زمینه. پرسش از شواهد. پیوند با تصمیم. و قابل‌استفاده کردن نتیجه. می‌خواهم در همین فضا کار کنم؛ جایی که پژوهش، تحلیل و محصول به هم می‌رسند.",
    contact: "روی پرسش بعدی با هم کار کنیم", next: "ادامه به", end: "بازگشت به آغاز",
    chapters: [
      {
        id: "context", label: "شناخت زمینه", word: "زمینه", visual: "map",
        artifact: {
          title: "فرصت، در بستر خودش",
          caption: "نقشهٔ صنعت، منابع و سناریوها، چشم‌انداز بازار را به پرسشی برای بررسی وصل می‌کنند.",
          labels: [
            { title: "نقشهٔ صنعت", detail: "انرژی و فناوری صنعتی در عمان" },
            { title: "فهرست منابع", detail: "مبنای هر ادعا قابل پیگیری است" },
            { title: "سناریوها", detail: "بررسی فرض‌ها پیش از محدود کردن فرصت" }
          ]
        },
        title: "پیش از پاسخ، چشم‌انداز را بشناسیم.",
        body: ["نقطه شروع من، موقعیت پیرامون یک پرسش است: بازار، آدم‌های آن و محدودیت‌هایی که یک فرصت را از فرصت دیگر متمایز می‌کنند.",
          "پژوهش انرژی عمان و کار پژوهشی سرمایه‌گذاری بیمه، این نگاه را نشان می‌دهند. نقشه‌های صنعت، فهرست منابع و سناریوها، چشم‌اندازی گسترده را به پرسش‌هایی مشخص برای بررسی وصل می‌کنند."],
        bridge: "شناخت زمینه، جهت می‌دهد. پرسش بعدی این است که شواهد زیر آن چقدر به هم متصل و قابل‌اتکا هستند.", center: "فرصت",
        states: [
          { title: "چشم‌انداز", text: "پیش از محدود کردن فرصت، صنایع، فناوری‌ها و رقبا را روی نقشه بیاوریم. پژوهش عمان این زاویه‌ها را در فصل‌های تحلیلی و نقشه فرصت کنار هم قرار می‌دهد." },
          { title: "منابع", text: "مسیر بازگشت به شواهد را روشن نگه داریم. فهرست منابع در گزارش‌ها به خواننده کمک می‌کند مبنای یک ادعا را بررسی کند." },
          { title: "سناریوها", text: "ببینیم تغییر فرض‌ها چگونه تصویر را عوض می‌کند. ابزار بازگشت سرمایه و سناریوهای قابل‌ویرایش، پرسش‌ها را ملموس می‌کنند؛ پیش‌بینی‌ها همچنان فرض‌اند." }
        ],
        projects: [
          { title: "عمان · انرژی و فناوری صنعتی", subtitle: "شناخت بازار ← فضای پژوهشی قابل‌کاوش", tags: ["پژوهش بازار", "انگلیسی / عربی", "تحلیل سناریو"],
            question: "فرصت‌های انرژی و فناوری صنعتی در کجای بازار عمان قرار می‌گیرند؟", approach: "پژوهش صنعت، معرفی شرکت‌ها، منابع و مقایسه فرصت‌ها را به هم وصل کنیم. نقشه‌های حرارتی و محاسبه‌گر بازگشت سرمایه امکان بررسی فرض‌ها را می‌دهند.",
            output: "یک برنامه پژوهشی انگلیسی–عربی، با فصل‌های تحلیلی، کاوشگر شرکت‌ها، فهرست منابع و ابزارهای سناریو." },
          { title: "بیمه · پژوهش سرمایه‌گذاری", subtitle: "شواهد صنعت ← گزارش تصمیم‌گیری مدیریتی", tags: ["پژوهش سرمایه‌گذاری", "انگلیسی / فارسی", "ترکیب شواهد"],
            question: "پژوهش بیمه و فناوری چگونه می‌تواند به گفت‌وگوی سرمایه‌گذاری کمک کند؟", approach: "شواهد صنعت، کسب‌وکارهای قابل‌مقایسه، سناریوهای مالی و پرسش‌های ارزیابی را در گزارشی پیوسته کنار هم بیاوریم.",
            output: "گزارش مدیریتی دوزبانه با فهرست منابع، محورهای سرمایه‌گذاری، سناریوهای قابل‌ویرایش و اولویت‌های بررسی دقیق." }
        ]
      },
      {
        id: "evidence", label: "پرسش از شواهد", word: "شواهد", visual: "trace",
        artifact: {
          title: "از رکورد تا تطبیق قابل‌بررسی",
          caption: "بررسی کیفیت، یکدست‌سازی رکوردها و بازبینی تناسب، مبنای ارزیابی یک فهرست پیشنهادی‌اند.",
          labels: [
            { title: "بررسی", detail: "نقص‌های کیفیت و برخورد هویت‌ها" },
            { title: "یکدست‌سازی", detail: "رکوردهای قابل‌استفاده با موارد نامعلوم مشخص" },
            { title: "بازبینی تطبیق", detail: "صنعت، مرحله، جغرافیا و نشانه‌های مستقل" }
          ]
        },
        title: "یک الگوی مفید، پایه‌ای قابل‌اتکا می‌خواهد.",
        body: ["وقتی جهت روشن شد، می‌خواهم بدانم داده واقعاً چه چیزی را پشتیبانی می‌کند. اگر هویت‌ها تداخل داشته باشند، فیلدها ناقص باشند یا رتبه‌بندی فرض‌هایش را پنهان کند، یک تطبیق ظاهری معنای زیادی ندارد.",
          "کارهای سرمایه‌گذار دو لایه را وصل می‌کنند: نرمال‌سازی و اعتبارسنجی در پایه، و داشبورد قابل‌کاوش تطبیق در سطح. ارتباط میان این دو به اندازه خودشان مهم است."],
        bridge: "وقتی شواهد ساختار پیدا کنند، می‌توانند جلوتر بروند: به راهبرد، اولویت‌ها و تصمیم.", center: "از رکوردها تا فهرست بررسی",
        states: [
          { title: "ساختار", text: "رکوردهای نامنظم سرمایه‌گذار و شرکت را به داده‌های قابل‌استفاده مجدد تبدیل کنیم و جدول‌های اصلی را دست‌نخورده نگه داریم. گزارش‌های کیفیت، نقص‌ها و هویت‌های تکراری را آشکار می‌کنند." },
          { title: "تطبیق", text: "صنعت، مرحله و جغرافیا را با یک رویکرد سرمایه‌گذاری مقایسه کنیم. Investor Radar نماهای متفاوتی، از معیارهای سفارشی تا هم‌پوشانی سبد، دارد." },
          { title: "پرسش", text: "یک نشانه مستقل را از نتیجه طبیعی جست‌وجو جدا کنیم. نموداری که معیار صنعت را بازتاب می‌دهد با شبکه هم‌سرمایه‌گذاران فرق دارد. تطبیق ماشینی همچنان نیازمند بررسی است." }
        ],
        projects: [
          { title: "تطبیق سرمایه‌گذار · پایه داده", subtitle: "رکوردهای نامنظم ← شواهد قابل‌بررسی", tags: ["Python", "SQL / SQLite", "کیفیت داده"],
            question: "پیش از مفید بودن یک تطبیق سرمایه‌گذار، چه چیزی باید درباره داده روشن باشد؟", approach: "کیفیت و هویت را بررسی کنیم، رکوردها را نرمال کنیم و خروجی‌های اعتبارسنجی بسازیم. سرویس پژوهشی، موارد نامعلوم را صریح نگه می‌دارد.",
            output: "خط پردازش نرمال‌سازی و تحلیل، گزارش‌های کیفیت و سرویس API/worker پژوهش سرمایه‌گذار." },
          { title: "Investor Radar · کاوش در تناسب", subtitle: "رویکرد سرمایه‌گذاری ← رتبه‌بندی قابل‌بررسی", tags: ["Python", "JavaScript", "تحلیل تعاملی"],
            question: "چطور می‌توان تناسب سرمایه‌گذار را کاوش کرد، به جای پذیرش یک فهرست مبهم؟", approach: "رتبه‌بندی بر اساس صنعت، مرحله، جغرافیا و فعالیت یا هم‌پوشانی سبد؛ نمایش توزیع‌ها و تفکیک معیارهای تطبیق از نشانه‌های مستقل بازار.",
            output: "داشبورد شناخت سرمایه‌گذار با حالت‌های مختلف تطبیق، نمودارهای تعاملی و تفسیر اختیاری هوش مصنوعی بر پایه داده‌های تجمیعی نمودارها." }
        ]
      },
      {
        id: "decisions", label: "پیوند با تصمیم", word: "تصمیم", visual: "pipeline",
        artifact: {
          title: "یک مسیر شواهد، سه خروجی",
          caption: "پژوهش به راهبرد ورود به بازار و سپس ارائه می‌رسد؛ مقادیر مشترک به منبع خود متصل می‌مانند.",
          labels: [
            { title: "بینش‌ها", detail: "Market Navigator Insights · ترکیب پژوهش" },
            { title: "راهبرد GTM", detail: "GTM Report Engine · اولویت‌ها و جایگاه‌یابی" },
            { title: "ارائه", detail: "Pitch Deck Engine · روایت منسجم" }
          ]
        },
        title: "بگذاریم پژوهش در تصمیم بعدی هم حضور داشته باشد.",
        body: ["بینش وقتی مفیدتر می‌شود که در انتقال میان خروجی‌ها باقی بماند. تحلیل بازار، برنامه ورود به بازار و ارائه باید از شواهد یکسان، روایتی منسجم بسازند.",
          "این پیوند در موتورهای مارکت نویگیتور مشخص است: پژوهش به راهبرد می‌رسد و راهبرد به ارتباط. مقادیر مشترک از یک تولیدکننده می‌آیند تا با تغییر شکل ارائه، روایت یکپارچه بماند."],
        bridge: "تصمیم منسجم، هنوز بخشی از کار است. یک نفر باید بتواند آن را بخواند، کاوش کند و به کار بگیرد.", center: "یک مسیر شواهد، سه خروجی",
        states: [
          { title: "بینش‌ها", text: "موتور Market Navigator Insights پژوهش رقبا، شبکه‌های اجتماعی، خبرها و آمادگی سرمایه‌گذاری را در مجموعه گزارشی دوزبانه و جمع‌بندی تصمیم کنار هم می‌آورد." },
          { title: "راهبرد GTM", text: "موتور گزارش GTM، مجموعه پژوهش را برای تعریف ورود به بازار، اولویت مشتریان، جایگاه‌یابی، کانال‌ها و نقشه راه به انگلیسی و فارسی استفاده می‌کند." },
          { title: "ارائه", text: "موتور Pitch Deck خروجی بینش‌ها و GTM را کنار ورودی‌های مالی و اندازه بازار مصرف می‌کند؛ شکل ارائه عوض می‌شود و رشته شواهد ادامه دارد." }
        ],
        projects: [
          { title: "مارکت نویگیتور · سیستم گزارش پیوسته", subtitle: "بینش‌ها ← راهبرد ورود به بازار ← ارائه", tags: ["ترکیب پژوهش", "Python / JavaScript", "گزارش دوزبانه"],
            question: "پژوهش چگونه می‌تواند هنگام تبدیل شدن به راهبرد و روایت سرمایه‌گذار، منسجم بماند؟", approach: "اتصال موتورهای Insights، GTM و Pitch Deck با خروجی‌های ساختاریافته؛ دریافت مقادیر مشترک از منبعشان به جای بازسازی از متن.",
            output: "خط تولید گزارش سه‌مرحله‌ای با خروجی‌های دوزبانه و قرارداد مستند سازگاری برای شمارش‌های مشترک و جمع‌بندی تصمیم." },
          { title: "مارکت نویگیتور · ارتباط با سرمایه‌گذار", subtitle: "پژوهش و برنامه‌ریزی ← روایت متمرکز", tags: ["اندازه بازار", "توسعه ارائه", "ارتباط پژوهشی"],
            question: "تحلیل بازار و برنامه‌ریزی چگونه به مخاطب سرمایه‌گذار منتقل می‌شوند؟", approach: "اندازه بازار عمان و شورای همکاری خلیج فارس، فرض‌های جذب و سناریوهای تأمین مالی را در ارائه کنار هم بیاوریم؛ همراه با برنامه‌ریزی ارتباط و انتشار پژوهش.",
            output: "ارائه‌ها، اسناد برنامه‌ریزی و بسته‌های انتشار محتوای پژوهشی." }
        ]
      },
      {
        id: "delivery", label: "قابل‌استفاده کردن", word: "کاربرد", visual: "product",
        artifact: {
          title: "رابطی با توجه به آدم‌ها",
          caption: "در رابط‌های محصول و پژوهش، زمینهٔ محلی، بازبینی انسانی و امکان کاوش، اطلاعات را کاربردی می‌کنند.",
          labels: [
            { title: "زمینهٔ محلی", detail: "فارسی، تاریخ جلالی و غذاهای آشنا" },
            { title: "تأیید تخمین", detail: "بازبینی مقدار پیشنهادی هوش مصنوعی پیش از ثبت" },
            { title: "کاوش اطلاعات", detail: "فصل‌ها، منابع، زبان‌ها و کنترل سناریو" }
          ]
        },
        title: "کار وقتی کامل می‌شود که کسی بتواند از آن استفاده کند.",
        body: ["فاصله آخر میان تحلیل و آدم‌ها برایم مهم است. زبان، مسیر حرکت و امکان بررسی یک فرض، میزان کاربردی بودن خروجی را شکل می‌دهند.",
          "رابط‌های پژوهشی دوزبانه، محتوای پیچیده را قابل‌کاوش می‌کنند. کالری‌یار شکل دیگری از همین توجه را به زندگی روزمره می‌آورد: غذاهای آشنا، رابط فارسی و امکان تأیید تخمین هوش مصنوعی پیش از ثبت آن."],
        bridge: "موضوع‌های متفاوت، یک رشته مشترک: اطلاعات پیچیده را آسان‌تر بتوان پرسید و به کار گرفت.", center: "با توجه به خواننده",
        states: [
          { title: "زمینه محلی", text: "کالری‌یار صفحه‌های فارسی راست‌به‌چپ، تاریخ جلالی و فهرست غذای ایرانی را کنار جست‌وجوی بارکد دارد. جزئیات استفاده روزانه به تجربه شکل می‌دهند." },
          { title: "بررسی انسانی", text: "تخمین غذا از عکس به مرحله تأیید می‌رسد. کاربر می‌تواند مقدارها را بررسی و ویرایش کند، پیش از اینکه تخمین وارد دفترچه غذا شود." },
          { title: "کاوش", text: "رابط‌های پژوهشی، ناوبری فصل‌ها، جست‌وجوی منبع، تغییر زبان و کنترل سناریو دارند. خواننده می‌تواند مسیر خودش را انتخاب کند." }
        ],
        projects: [
          { title: "کالری‌یار · تجربه تغذیه بومی", subtitle: "انتخاب روزانه غذا ← دفترچه شخصی قابل‌بررسی", tags: ["React Native / Expo", "Supabase", "فارسی / RTL"],
            question: "ثبت غذا چطور می‌تواند با زبان و عادت‌های کاربران ایرانی سازگار باشد؟", approach: "ترکیب فهرست غذای ایرانی، جست‌وجوی بارکد و ثبت غذا با کمک عکس و هوش مصنوعی، همراه با تأیید کاربر؛ استفاده از رابط فارسی و تاریخ جلالی.",
            output: "پروژه اپ موبایل با دفترچه غذا، ثبت آب و نماهای پیشرفت وزن و کالری." },
          { title: "پژوهش دوزبانه · رابطی به شواهد", subtitle: "گزارش فشرده ← مسیر شخصی خواننده", tags: ["طراحی اطلاعات", "انگلیسی / فارسی / عربی", "گزارش تعاملی"],
            question: "خوانندگان متفاوت چگونه می‌توانند در یک پژوهش مشترک مسیر خودشان را پیدا کنند؟", approach: "ناوبری فصل‌ها، منابع پیوندخورده، مقایسه‌های تعاملی و چیدمان سازگار با زبان در گزارش‌های پژوهشی.",
            output: "گزارش‌ها و برنامه‌های پژوهشی دوزبانه، از جمله کارهای عمان، بیمه و مارکت نویگیتور." }
        ]
      }
    ]
  }
};
