/* Progressive motion: complete copy remains available without animation. */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealSelectors = [
    ".hero__eyebrow", ".hero__title", ".hero__lead", ".hero__cta", ".hero__portrait",
    ".hero-thread li", ".section__kicker", ".section__title", ".section__intro",
    ".about__summary", ".background__heading", ".background__credentials",
    ".story-lab", ".story-evidence", ".story-bridge", ".story-next",
    ".story-foundations", ".story-ending__contact", ".story-ending__back",
    ".contact__invitation", ".contact__elsewhere"
  ].join(",");
  let observer, typingObserver;
  const writers = new Set();
  const disclosures = new Map();

  function preparePhrases() {
    document.querySelectorAll("[data-phrase-reveal]").forEach(element => {
      if (element.querySelector(".phrase-reveal__part")) return;
      // Keep punctuation and whitespace so the original line wrapping is preserved.
      const phrases = element.textContent.match(/[^.!?؟。]+[.!?؟。]*\s*/gu);
      if (!phrases || phrases.length < 2) return;
      element.replaceChildren(...phrases.map((phrase, index) => {
        const part = document.createElement("span");
        part.className = "phrase-reveal__part";
        part.style.setProperty("--phrase-index", index);
        part.textContent = phrase;
        return part;
      }));
      element.classList.add("phrase-reveal", "reveal");
      element.classList.remove("is-in");
    });
  }

  function prepareTypewriter(element) {
    const locale = document.documentElement.lang;
    const heading = element.matches(".hero__title");
    const segmenter = typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter(locale, { granularity: "grapheme" }) : null;
    // Clone the inline markup so line breaks and emphasis stay intact.
    const content = Array.from(element.childNodes);
    const cloneContent = () => content.map(node => node.cloneNode(true));
    const accessible = document.createElement("span");
    accessible.className = "sr-only";
    accessible.append(...cloneContent());
    const sizer = document.createElement("span");
    sizer.className = "typewriter__sizer";
    sizer.setAttribute("aria-hidden", "true");
    sizer.append(...cloneContent());
    const visual = document.createElement("span");
    visual.className = "typewriter__visual";
    visual.setAttribute("aria-hidden", "true");
    visual.append(...cloneContent());
    // Keep each text run whole; splitting letters into spans breaks Persian joins.
    const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
    const runs = [], letters = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const copy = node.data;
      runs.push({ node, copy });
      const graphemes = segmenter
        ? Array.from(segmenter.segment(copy), s => s.segment) : Array.from(copy);
      graphemes.forEach(letter => letters.push({ node, letter }));
      node.data = "";
    }
    const cursor = document.createElement("span");
    cursor.className = "typewriter__cursor";
    if (runs.length) runs[0].node.after(cursor);
    element.replaceChildren(accessible, sizer, visual);
    element.classList.remove("is-typing", "is-complete");
    element.classList.add("typewriter");
    let timer, index = 0, started = false;
    const writer = {
      element,
      finish() {
        clearTimeout(timer);
        runs.forEach(({ node, copy }) => { node.data = copy; });
        element.classList.remove("is-typing");
        element.classList.add("is-complete");
        writers.delete(writer);
      },
      start() {
        if (started) return;
        started = true;
        element.classList.add("is-typing");
        function tick() {
          if (!element.isConnected || reduced.matches) { writer.finish(); return; }
          // Pause in background tabs instead of skipping ahead on return.
          if (document.hidden) { timer = setTimeout(tick, 200); return; }
          const { node, letter } = letters[index++];
          node.appendData(letter);
          node.after(cursor);
          if (index === letters.length) {
            timer = setTimeout(() => writer.finish(), 1600);
          } else {
            const pause = /[.!?؟。]/u.test(letter) ? 170 : /[,،:;]/u.test(letter) ? 75 : 0;
            timer = setTimeout(tick, (heading ? 36 : 19) + pause);
          }
        }
        if (letters.length) timer = setTimeout(tick, heading ? 550 : 180);
        else writer.finish();
      }
    };
    writers.add(writer);
    return writer;
  }

  function refresh() {
    observer?.disconnect();
    typingObserver?.disconnect();
    writers.forEach(writer => writer.finish());
    disclosures.forEach(state => state.settle());
    preparePhrases();
    document.querySelectorAll(revealSelectors).forEach(el => el.classList.add("reveal"));
    const elements = document.querySelectorAll(".reveal:not(.is-in)");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      elements.forEach(el => el.classList.add("is-in"));
      return;
    }
    const siblings = new Map();
    elements.forEach(el => {
      const index = siblings.get(el.parentElement) || 0;
      siblings.set(el.parentElement, index + 1);
      el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 85}ms`);
    });
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    elements.forEach(el => observer.observe(el));

    const targets = new Map();
    document.querySelectorAll(".hero__title, .story-ending__text").forEach(element => {
      if (!element.querySelector(":scope > .typewriter__visual")) {
        targets.set(element, prepareTypewriter(element));
      }
    });
    typingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target).start();
        typingObserver.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    targets.forEach((writer, element) => typingObserver.observe(element));
  }

  // Keep native summary keyboard behavior; animate the details' actual height.
  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const summary = event.target.closest("summary");
    if (!summary || event.defaultPrevented || event.target.closest("a, button, input")) return;
    const details = summary.parentElement;
    if (details.tagName !== "DETAILS" || reduced.matches || !details.animate) return;
    event.preventDefault();
    const previous = disclosures.get(details);
    const expand = previous ? !previous.expand : !details.open;
    const startHeight = details.getBoundingClientRect().height;
    const original = previous?.original || { height: details.style.height, overflow: details.style.overflow };
    previous?.animation.cancel();
    details.style.height = "";
    details.open = false;
    const closedHeight = details.getBoundingClientRect().height;
    details.open = true;
    const endHeight = expand ? details.getBoundingClientRect().height : closedHeight;
    details.style.height = `${startHeight}px`;
    details.style.overflow = "hidden";
    const animation = details.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, {
      duration: 340, easing: "cubic-bezier(.22,1,.36,1)"
    });
    const state = { expand, animation, original, settle() {
      animation.onfinish = null;
      animation.cancel();
      details.open = expand;
      details.style.height = original.height;
      details.style.overflow = original.overflow;
      disclosures.delete(details);
    } };
    disclosures.set(details, state);
    animation.onfinish = () => state.settle();
  });

  reduced.addEventListener("change", () => {
    if (reduced.matches) refresh();
  });
  window.SiteMotion = { refresh };
})();
