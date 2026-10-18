/* ============================================================
   Site logic: language toggle (EN/FA + RTL), rendering,
   nav behaviour, diary reader. No external dependencies.
   ============================================================ */

/* ---- Real brand icons (inline SVG, viewBox 24x24, fill=currentColor) — no CDN ---- */
const ICONS = {
  email:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  github:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  kaggle:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
};

/* ---- Pillar icons (inline SVG line icons, currentColor) ---- */
const PILLAR_ICONS = {
  search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  chart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="20" x2="20" y2="20"/><line x1="7" y1="20" x2="7" y2="14"/><line x1="12" y1="20" x2="12" y2="8"/><line x1="17" y1="20" x2="17" y2="11"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88"/></svg>'
};

/* ---- Contact config ---- */
const CONTACT = [
  { icon: "email",     label: { en: "Email",     fa: "ایمیل" },       href: "mailto:fatemehsheybani79@gmail.com" },
  { icon: "linkedin",  label: { en: "LinkedIn",  fa: "لینکدین" },     href: "https://www.linkedin.com/in/fatemeh-sheybani" },
  { icon: "github",    label: { en: "GitHub",    fa: "گیت‌هاب" },     href: "https://github.com/FatemehKare1" },
  { icon: "kaggle",    label: { en: "Kaggle",    fa: "کگل" },         href: "https://www.kaggle.com/fatemehsheybani/code" },
  { icon: "instagram", label: { en: "Instagram", fa: "اینستاگرام" }, href: "https://instagram.com/sheybani79" },
  { icon: "telegram",  label: { en: "Telegram",  fa: "تلگرام" },      href: "https://t.me/Sheybani79" }
];

(function () {
  "use strict";

  const STORE_KEY = "fs-lang";
  let lang = localStorage.getItem(STORE_KEY) || "en";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Language ---------- */
  function t(key) {
    const dict = window.I18N[lang] || window.I18N.en;
    return dict[key];
  }

  function applyStrings() {
    $$("[data-i18n]").forEach(el => {
      const val = t(el.getAttribute("data-i18n"));
      if (typeof val === "string") el.innerHTML = val;
    });
    $$("[data-i18n-label]").forEach(el => {
      const val = t(el.getAttribute("data-i18n-label"));
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });
  }

  function renderAbout() {
    const paras = t("about.body") || [];
    const open = $("#aboutMore")?.open || false;
    $("#aboutBody").innerHTML = `<p class="about__summary">${esc(t("about.summary"))}</p>
      <details id="aboutMore" ${open ? "open" : ""}>
        <summary>${esc(t("about.more"))}<span aria-hidden="true"> +</span></summary>
        ${paras.map(p => `<p>${p}</p>`).join("")}
      </details>`;
  }

  function renderPillars() {
    const open = $$("#pillars details").map(el => el.open);
    $("#pillars").innerHTML = window.CONTENT.pillars.map((p, index) => `
      <article class="pillar reveal">
        <div class="pillar__icon">${PILLAR_ICONS[p.icon] || ""}</div>
        <h3>${esc(p[lang].title)}</h3>
        <p>${esc(p[lang].body)}</p>
        <details class="pillar__methods" ${open[index] ? "open" : ""}><summary>${esc(t("background.tools"))} +</summary>
          <p>${p.tags.map(esc).join(" · ")}</p></details>
      </article>`).join("");
  }

  function renderExperience() {
    $("#timeline").innerHTML = window.CONTENT.experience.map(e => `
      <li class="tl reveal">
        <span class="tl__dot" aria-hidden="true"></span>
        <div class="tl__period">
          <span class="tl__when">${esc(e.when[lang])}</span>
          <span class="tl__badge">${esc(e.badge[lang])}</span>
        </div>
        <div class="tl__body">
          <h4 class="tl__role">${esc(e[lang].role)}</h4>
          <p class="tl__org">${esc(e[lang].org)}</p>
          <p class="tl__desc">${esc(e[lang].desc)}</p>
        </div>
      </li>`).join("");
  }

  function renderProjects() {
    window.WorkStory.render(lang, window.CONTENT.projects);
  }

  function renderCerts() {
    const c = window.CONTENT;
    const open = $("#credential-details")?.open || false;
    const edu = `
      <div class="cert cert--edu reveal">
        <span class="cert__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-5 10 5-10 5-10-5Zm4 2v6c4 3 8 3 12 0v-6M22 9v7"/></svg>
        </span>
        <div>
          <h4 class="cert__name">${esc(c.education[lang].name)}</h4>
          <div class="cert__by cert__education-meta">${c.education[lang].by.split(" · ").map(part => `<span>${esc(part)}</span>`).join("")}</div>
        </div>
      </div>`;
    const item = cert => `
      <div class="cert reveal">
        <span class="cert__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="m9 12-2 8 5-3 5 3-2-8"/></svg>
        </span>
        <div>
          <h4 class="cert__name">${esc(cert[lang].name)}</h4>
          <div class="cert__by">${esc(cert[lang].by)}</div>
        </div>
      </div>`;
    $("#certs-grid").innerHTML = edu + c.certs.slice(0, 2).map(item).join("") +
      `<details class="credential-details" id="credential-details" ${open ? "open" : ""}>
        <summary>${esc(t("background.more"))} <span aria-hidden="true">+</span></summary>
        <p class="credentials-note">${esc(c.certsNote[lang])}</p>
        <div class="credential-details__grid">${c.certs.slice(2).map(item).join("")}</div>
      </details>`;
  }

  function renderTestimonials() {
    const q = window.CONTENT.testimonials;
    const section = document.getElementById("testimonials");
    // Hide the whole section on a live site until real quotes exist
    if (!q.length) { if (section) section.style.display = "none"; return; }
    if (section) section.style.display = "";
    $("#quotes").innerHTML = q.map(item => `
      <blockquote class="quote reveal">
        <p class="quote__text">${esc(item[lang].text)}</p>
        <cite class="quote__by">— ${esc(item[lang].by)}</cite>
      </blockquote>`).join("");
  }

  function renderDiary() {
    const entries = [...window.DIARY].sort((a, b) => (a.iso < b.iso ? 1 : -1));
    $("#diary-grid").innerHTML = entries.map((e, index) => `
      <button class="entry ${index === 0 ? "entry--featured" : ""} reveal" data-entry="${esc(e.id)}">
        <span class="entry__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <span class="entry__date">${esc(e.date[lang])}</span>
        <span class="entry__title">${esc(e[lang].title)}</span>
        <span class="entry__excerpt">${esc(e[lang].excerpt)}</span>
        <span class="entry__more">${t("diary.readMore")}</span>
        <span class="entry__tags">${e.tags.map(tag => `<span class="tag">${esc(tag)}</span>`).join("")}</span>
      </button>`).join("");
    $$("#diary-grid .entry").forEach(btn =>
      btn.addEventListener("click", () => openDiary(btn.getAttribute("data-entry"))));
  }

  function renderContact() {
    const email = CONTACT.find(c => c.icon === "email");
    $("#contact-links").innerHTML = `
      <div class="contact__invitation">
        <a class="contact__email" href="${esc(email.href)}">
          <span>${esc(t("contact.email"))} <span aria-hidden="true">↗</span></span>
          <span class="contact__address" dir="ltr">${esc(email.href.replace("mailto:", ""))}</span>
        </a>
        <a class="contact__cv" href="cv.html">${esc(t("contact.cv"))} <span aria-hidden="true">↗</span></a>
      </div>
      <div class="contact__elsewhere"><p>${esc(t("contact.elsewhere"))}</p>
      <div class="contact__profiles">${CONTACT.filter(c => c.icon !== "email").map(c => `
      <a class="clink" href="${esc(c.href)}" target="_blank" rel="noopener" aria-label="${esc(c.label[lang])}">
        <span class="clink__icon">${ICONS[c.icon] || ""}</span>
        <span>${esc(c.label[lang])}</span>
      </a>`).join("")}</div></div>`;
  }

  function renderAll() {
    applyStrings();
    renderAbout();
    renderPillars();
    renderExperience();
    renderProjects();
    renderCerts();
    renderTestimonials();
    renderDiary();
    renderContact();
    window.SiteMotion.refresh();
  }

  function setLang(next) {
    lang = next;
    localStorage.setItem(STORE_KEY, lang);
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    $$(".lang-seg__opt").forEach(o =>
      o.classList.toggle("is-active", o.getAttribute("data-lang") === lang));
    const main = document.querySelector("main");
    main.classList.add("lang-swapping");
    renderAll();
    requestAnimationFrame(() => requestAnimationFrame(() => main.classList.remove("lang-swapping")));
  }

  /* ---------- Diary modal ---------- */
  const modal = $("#diaryModal");
  let diaryTrigger;
  function openDiary(id) {
    const e = window.DIARY.find(x => x.id === id);
    if (!e) return;
    diaryTrigger = document.activeElement;
    $("#modalDate").textContent  = e.date[lang];
    $("#modalTitle").textContent = e[lang].title;
    $("#modalTags").innerHTML    = e.tags.map(tag => `<span class="tag">${esc(tag)}</span>`).join("");
    $("#modalBody").innerHTML     = e[lang].body;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $$("body > header, body > main, body > footer").forEach(el => { el.inert = true; });
    $(".modal__close", modal).focus();
  }
  function closeDiary() {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    $$("body > header, body > main, body > footer").forEach(el => { el.inert = false; });
    if (diaryTrigger?.isConnected) diaryTrigger.focus();
  }
  $$("[data-close]").forEach(el => el.addEventListener("click", closeDiary));
  document.addEventListener("keydown", event => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") { event.preventDefault(); closeDiary(); }
    if (event.key === "Tab") {
      const focusable = $$('button, a[href], [tabindex]:not([tabindex="-1"])', modal)
        .filter(el => el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  const burger = $("#navBurger");
  const links = $(".nav__links");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  $$(".nav__links a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));

  $$(".lang-seg__opt").forEach(o =>
    o.addEventListener("click", () => { if (o.getAttribute("data-lang") !== lang) setLang(o.getAttribute("data-lang")); }));

  /* ---------- Scroll-spy: highlight current section in nav ---------- */
  function initScrollSpy() {
    const linkEls = $$(".nav__links a");
    const map = {};
    linkEls.forEach(a => { const id = a.getAttribute("href").replace("#", ""); if (id) map[id] = a; });
    const targets = Object.keys(map).map(id => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          linkEls.forEach(a => a.classList.remove("is-current"));
          if (map[en.target.id]) map[en.target.id].classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    targets.forEach(t => spy.observe(t));
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => { setLang(lang); initScrollSpy(); });
})();
