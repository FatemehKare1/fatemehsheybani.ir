# fatemehsheybani.ir

Personal portfolio & résumé site for **Fatemeh Sheybani** — Product Analyst
(market research · data analysis · product management).

Bilingual (English / فارسی, with full RTL), warm & elegant, and fully
**self-contained**: no CDNs, no build step, no external dependencies — every
font, icon, and asset is vendored locally. Open `index.html` in a browser to run it.

## Structure

```
index.html            # single-page site
cv.html               # print-ready résumé (Ctrl/Cmd+P → Save as PDF)
assets/
  css/  fonts.css      # @font-face (Fraunces, Mulish, Vazirmatn)
        styles.css     # all site styles + design tokens
        story.css      # narrative layout, diagrams, and chapter motion
  js/   i18n.js        # EN/FA UI strings + long-form copy
        main.js        # rendering, language toggle (RTL), motion, scroll-spy
        story.js       # chapter navigation and interactive approach diagrams
        motion.js      # scroll reveals, typewriter text, animated disclosures
  fonts/               # vendored woff2 files
  img/                 # portrait, favicon
data/
  content.js           # experience, expertise, projects, certifications
  story.js             # connected work narrative and project evidence, EN/FA
  diary.js             # Diary entries (first-hand notes)
```

## Editing

- **Text / copy:** `assets/js/i18n.js`
- **Experience / projects / certs / expertise:** `data/content.js`
- **Work narrative / chapter evidence:** `data/story.js`
- **Narrative layout and diagrams:** `assets/css/story.css`
- **Diary entries:** `data/diary.js` (copy a block, edit both `en` and `fa`)
- **Contact links:** the `CONTACT` array at the top of `assets/js/main.js`

The work section follows four connected chapters: context, evidence, decisions,
and delivery. Each chapter has an illustrated summary built from local HTML,
CSS, and SVG; these are explanatory diagrams rather than project screenshots.
The Insights → GTM → Pitch chapter uses a dark editorial spread. Approach tabs
support arrow keys, Home, and End; project evidence
uses native expandable details. Language switching preserves selected tabs and
expanded details, including About, methods, and credentials. Motion follows
the reader and respects reduced-motion settings.
Earlier analyses remain available in the expandable foundations section.
The hero heading and closing statement each type once as they enter view, with a
blinking cursor, preserved emphasis and line breaks, and reserved text space to
prevent layout shifts. The full text remains available
to screen readers. Diagram entrances, interactive states, portrait and link
feedback, and expandable details use progressive motion. Reduced-motion settings
show the complete text immediately and disable animated transitions.
Headings marked with `data-phrase-reveal` reveal complete sentences in sequence
on entering view. The work heading uses this for “A question.”, “A pattern.”,
and “A way forward.”, with the same behavior in Persian. Inline phrases retain
the original wrapping and remain fully available to screen readers.

Expertise, experience, and education share the Background section; full
credentials remain expandable. Diary uses a featured entry and a compact index,
with keyboard focus contained in the reader and restored on close. Contact
prioritizes email and the CV. CV styling changes apply only on screen; the
existing print layout is preserved.

Project descriptions are public-facing summaries of repository evidence.
Keep private source documents, datasets, and repository links outside the site.
Add personal contributions or measured outcomes only when verified.

## Deployment

Static files — copy the whole folder to any web server / VPS document root.

## Collecting private project details

With GitHub CLI installed and signed in locally, run from this folder:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\export-repo-details.ps1 -OpenReport
```

The exporter uses read-only requests and defaults to private repositories owned
by `FatemehKare1`, excluding `lumacue` and `exhibition-registration-platform`.
It collects repository metadata, languages, README and documentation excerpts,
dependency names, HTML headings, sampled source symbols, and file inventories.
It does not execute repository code or connect GitHub to OpenAI.

The report and JSON are saved in a new folder under the Windows temporary
directory, outside this website. Review documentation for private information
before sharing. Supply your role and measured outcomes yourself; the exporter
does not infer them. PDF, Office, notebook, image, and dataset contents are not
extracted. For one project, append `-Repository 'repository-name'`; use
`-Visibility all` to include public repositories as well.
