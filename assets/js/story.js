/* A buildless, keyboard-accessible narrative. No network requests. */
(function () {
  "use strict";
  const esc = value => String(value).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const selected = new Map();
  let host, chapterEls = [], links = [], pending = false;
  const tags = items => items.map(tag => `<span class="tag">${esc(tag)}</span>`).join("");

  function diagram(kind) {
    if (kind === "map") return `
      <svg class="story-map" viewBox="0 0 360 240" aria-hidden="true">
        <circle class="story-map__orbit" cx="180" cy="123" r="85"/>
        <path class="story-map__link" d="M180 123L180 38M180 123L80 182M180 123L280 182"/>
        <circle class="story-map__core" cx="180" cy="123" r="30"/>
        <path class="story-map__spark" d="M168 123h24m-12-12v24"/>
        <g data-node="0"><circle cx="180" cy="38" r="18"/><circle class="story-map__halo" cx="180" cy="38" r="25"/></g>
        <g data-node="1"><circle cx="80" cy="182" r="18"/><circle class="story-map__halo" cx="80" cy="182" r="25"/></g>
        <g data-node="2"><circle cx="280" cy="182" r="18"/><circle class="story-map__halo" cx="280" cy="182" r="25"/></g>
      </svg>`;
    if (kind === "trace") return `
      <div class="story-trace" aria-hidden="true">
        <div data-node="0" class="story-trace__row"><i></i><i></i><i></i><i></i><i></i></div>
        <span class="story-trace__connector"></span>
        <div data-node="1" class="story-trace__row"><i></i><i></i><i></i></div>
        <span class="story-trace__connector"></span>
        <div data-node="2" class="story-trace__row"><span class="story-trace__check">✓</span><i></i><i></i></div>
      </div>`;
    if (kind === "pipeline") return `
      <div class="story-pipeline" aria-hidden="true">
        <div data-node="0"><span>01</span><i></i><i></i><i></i></div>
        <b class="story-pipeline__link"></b>
        <div data-node="1"><span>02</span><i></i><i></i><i></i></div>
        <b class="story-pipeline__link"></b>
        <div data-node="2"><span>03</span><i></i><i></i><i></i></div>
      </div>`;
    return `
      <div class="story-device" aria-hidden="true">
        <span class="story-device__speaker"></span>
        <div data-node="0" class="story-device__locale"><span>فا</span><span>EN</span><i></i></div>
        <div data-node="1" class="story-device__review"><span>✓</span><i></i><i></i></div>
        <div data-node="2" class="story-device__choices"><i></i><i></i><i></i></div>
      </div>`;
  }

  function render(lang, foundations) {
    const copy = window.WORK_STORY[lang] || window.WORK_STORY.en;
    host = document.getElementById("work-story");
    const openDetails = new Set(Array.from(host.querySelectorAll("details[open]"))
      .map(el => el.dataset.detail));
    const numeral = value => String(value).padStart(2, "0")
      .replace(/\d/g, d => lang === "fa" ? "۰۱۲۳۴۵۶۷۸۹"[d] : d);

    host.innerHTML = `
      <p class="work-story__intro reveal">${esc(copy.intro)}</p>
      <div class="story-layout">
        <aside class="story-rail">
          <p class="story-rail__heading">${esc(copy.nav)}</p>
          <nav class="story-nav" aria-label="${esc(copy.nav)}">
            ${copy.chapters.map((c, i) => `<a href="#chapter-${c.id}" data-chapter-link="${c.id}">
              <span class="story-nav__number">${numeral(i + 1)}</span><span>${esc(c.label)}</span>
            </a>`).join("")}
          </nav>
          <div class="story-progress" aria-hidden="true"><span></span></div>
          <p class="story-rail__hint">${esc(copy.navHint)}</p>
        </aside>
        <div class="story-journey">
          ${copy.chapters.map((c, i) => {
            const index = selected.get(c.id) || 0;
            const next = copy.chapters[i + 1];
            return `
            <article class="story-chapter story-chapter--${c.visual}" id="chapter-${c.id}" aria-labelledby="title-${c.id}">
              <header class="story-chapter__head reveal">
                <span class="story-chapter__number" aria-hidden="true">${numeral(i + 1)}</span>
                <p class="story-chapter__kicker">${esc(copy.chapter)} ${numeral(i + 1)} <span> / </span> ${esc(c.word)}</p>
                <h3 id="title-${c.id}">${esc(c.title)}</h3>
              </header>
              <div class="story-chapter__body reveal">${c.body.map(p => `<p>${esc(p)}</p>`).join("")}</div>
              <div class="story-lab" data-lab="${c.id}">
                <div class="story-lab__picture" data-stage="${index}">
                  ${diagram(c.visual)}
                  <p class="story-lab__caption">${esc(c.center)}</p>
                </div>
                <div class="story-lab__controls">
                  <p class="story-lab__eyebrow">${esc(copy.explore)}</p>
                  <div class="story-tabs" role="tablist" aria-label="${esc(c.word)}">
                    ${c.states.map((s, n) => `<button type="button" role="tab" id="tab-${c.id}-${n}"
                      aria-controls="panel-${c.id}-${n}" aria-selected="${n === index}" tabindex="${n === index ? 0 : -1}"
                      data-stage="${n}">${esc(s.title)}</button>`).join("")}
                  </div>
                  ${c.states.map((s, n) => `<div class="story-lab__panel" role="tabpanel" tabindex="0"
                    id="panel-${c.id}-${n}" aria-labelledby="tab-${c.id}-${n}" ${n !== index ? "hidden" : ""}>
                    <p>${esc(s.text)}</p></div>`).join("")}
                </div>
              </div>
              <div class="story-evidence">
                <h4 class="story-evidence__heading">${esc(copy.evidence)}</h4>
                ${c.projects.map((p, n) => `
                  <details class="story-project" data-detail="${c.id}-${n}" ${openDetails.has(c.id + "-" + n) ? "open" : ""}>
                    <summary><span><span class="story-project__title">${esc(p.title)}</span>
                      <span class="story-project__subtitle">${esc(p.subtitle)}</span></span>
                      <span class="story-project__plus" aria-hidden="true"></span>
                    </summary>
                    <div class="story-project__content">
                      <p class="story-project__privacy">${esc(copy.private)}</p>
                      <dl>${["question", "approach", "output"].map(key =>
                        `<div><dt>${esc(copy[key])}</dt><dd>${esc(p[key])}</dd></div>`).join("")}</dl>
                      <div class="card__tags">${tags(p.tags)}</div>
                    </div>
                  </details>`).join("")}
              </div>
              <p class="story-bridge">${esc(c.bridge)}</p>
              <a class="story-next" href="${next ? "#chapter-" + next.id : "#story-ending"}">
                ${next ? esc(copy.next) + " " + esc(next.label) : esc(copy.closing)} <span aria-hidden="true">↗</span>
              </a>
            </article>`;
          }).join("")}
        </div>
      </div>
      <details class="story-foundations" data-detail="foundations" ${openDetails.has("foundations") ? "open" : ""}>
        <summary><span>${esc(copy.foundations)}</span><span class="story-project__plus" aria-hidden="true"></span></summary>
        <p>${esc(copy.foundationIntro)}</p>
        <div class="cards" id="projects-grid">${foundations.map(p => `
          <article class="card"><p class="card__eyebrow">${esc(p[lang].eyebrow)}</p>
            <h3>${esc(p[lang].title)}</h3><p>${esc(p[lang].desc)}</p>
            <div class="card__tags">${tags(p.tags)}</div></article>`).join("")}</div>
      </details>
      <div class="story-ending" id="story-ending">
        <span class="story-ending__mark" aria-hidden="true">↗</span>
        <p class="section__kicker">${esc(copy.closing)}</p>
        <p class="story-ending__text">${esc(copy.closingBody)}</p>
        <a href="#contact" class="btn btn--primary">${esc(copy.contact)}</a>
        <a href="#projects" class="story-ending__back">${esc(copy.end)} ↑</a>
      </div>`;

    host.querySelectorAll("[data-lab]").forEach(lab => {
      const buttons = Array.from(lab.querySelectorAll('[role="tab"]'));
      const panels = Array.from(lab.querySelectorAll('[role="tabpanel"]'));
      const picture = lab.querySelector(".story-lab__picture");
      function activate(index, focus) {
        selected.set(lab.dataset.lab, index);
        buttons.forEach((btn, n) => {
          btn.setAttribute("aria-selected", String(n === index));
          btn.tabIndex = n === index ? 0 : -1;
          panels[n].hidden = n !== index;
        });
        picture.dataset.stage = index;
        if (focus) buttons[index].focus();
      }
      buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => activate(index, false));
        btn.addEventListener("keydown", event => {
          const advance = lang === "fa" ? "ArrowLeft" : "ArrowRight";
          const retreat = lang === "fa" ? "ArrowRight" : "ArrowLeft";
          let target;
          if (event.key === advance) target = (index + 1) % buttons.length;
          if (event.key === retreat) target = (index + buttons.length - 1) % buttons.length;
          if (event.key === "Home") target = 0;
          if (event.key === "End") target = buttons.length - 1;
          if (target !== undefined) { event.preventDefault(); activate(target, true); }
        });
      });
    });
    chapterEls = Array.from(host.querySelectorAll(".story-chapter"));
    links = Array.from(host.querySelectorAll("[data-chapter-link]"));
    queueUpdate();
  }

  function updateReading() {
    pending = false;
    if (!chapterEls.length) return;
    const readingLine = Math.max(150, window.innerHeight * 0.3);
    let current = 0;
    const rects = chapterEls.map(el => el.getBoundingClientRect());
    rects.forEach((rect, i) => { if (rect.top <= readingLine) current = i; });
    const visible = rects[current].bottom > 80 && rects[current].top < window.innerHeight;
    chapterEls.forEach((el, i) => el.classList.toggle("is-reading", visible && i === current));
    links.forEach((link, i) => {
      if (i === current) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    });
    const progress = Math.max(0, Math.min(1, (readingLine - rects[0].top) /
      (rects[rects.length - 1].bottom - rects[0].top)));
    host.style.setProperty("--story-progress", progress);
  }
  function queueUpdate() {
    if (!pending) { pending = true; requestAnimationFrame(updateReading); }
  }
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate, { passive: true });
  window.WorkStory = { render };
})();
