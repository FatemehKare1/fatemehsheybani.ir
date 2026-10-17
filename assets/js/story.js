/* A buildless, keyboard-accessible narrative. No network requests. */
(function () {
  "use strict";
  const esc = value => String(value).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const selected = new Map();
  let host, chapterEls = [], links = [], pending = false;
  const tags = items => items.map(tag => `<span class="tag">${esc(tag)}</span>`).join("");

  function diagram(chapter, numeral) {
    const labels = chapter.artifact.labels;
    const label = item => `<strong>${esc(item.title)}</strong><small>${esc(item.detail)}</small>`;
    if (chapter.visual === "map") {
      const icons = [
        '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
        '<path d="M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4V4Zm9 3a3 3 0 0 1 3-3h4v14h-3a4 4 0 0 0-4 3"/>',
        '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>'
      ];
      return `
      <div class="artifact-map">
        <ul class="artifact-map__inputs">${labels.map((item, n) => `
          <li class="artifact-map__node" data-node="${n}">
            <span class="artifact-map__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${icons[n]}</svg>
            </span>${label(item)}
          </li>`).join("")}
        </ul>
        <div class="artifact-map__connection" aria-hidden="true"></div>
        <p class="artifact-map__core">${esc(chapter.center)}</p>
      </div>`;
    }
    if (chapter.visual === "product") {
      const glyphs = [
        '<span class="artifact-product__language" lang="fa">فا</span><span class="artifact-product__language" lang="en">EN</span>',
        '<span class="artifact-product__check">✓</span><span class="artifact-product__edit"><i></i><i></i></span>',
        '<span class="artifact-product__links"><i></i><i></i><i></i></span>'
      ];
      return `<ol class="artifact-product">${labels.map((item, n) => `
        <li data-node="${n}">
          <span class="artifact-step" aria-hidden="true">${numeral(n + 1)}</span>
          <div class="artifact-product__screen" aria-hidden="true"><span class="artifact-product__bar"></span>
            <div class="artifact-product__glyph">${glyphs[n]}</div></div>
          ${label(item)}
        </li>`).join("")}</ol>`;
    }
    return `<ol class="artifact-flow artifact-flow--${chapter.visual}">${labels.map((item, n) => `
      <li data-node="${n}">
        <span class="artifact-step" aria-hidden="true">${numeral(n + 1)}</span>
        <div class="artifact-flow__symbol artifact-flow__symbol--${n}" aria-hidden="true">
          ${chapter.visual === "trace" ? "<i></i><i></i><i></i>" : "<i></i><i></i>"}
        </div>
        ${label(item)}
        ${n < 2 ? '<span class="artifact-flow__arrow" aria-hidden="true">→</span>' : ""}
      </li>`).join("")}</ol>`;
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
              <span class="story-nav__number">${numeral(i + 1)}</span><span>${esc(c.word)}</span>
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
                <figure class="story-lab__picture" data-stage="${index}" aria-labelledby="artifact-${c.id}">
                  <div class="artifact-heading">
                    <p>${esc(copy.illustrated)}</p>
                    <h4 id="artifact-${c.id}">${esc(c.artifact.title)}</h4>
                  </div>
                  ${diagram(c, numeral)}
                  <figcaption class="story-lab__caption">${esc(c.artifact.caption)}</figcaption>
                </figure>
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
        <p class="section__kicker">${esc(copy.closing)}</p>
        <p class="story-ending__text">${esc(copy.closingBody)}</p>
        <a href="#contact" class="story-ending__contact">${esc(copy.contact)} ↗</a>
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
