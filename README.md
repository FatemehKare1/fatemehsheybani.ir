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
  js/   i18n.js        # EN/FA UI strings + long-form copy
        main.js        # rendering, language toggle (RTL), motion, scroll-spy
  fonts/               # vendored woff2 files
  img/                 # portrait, favicon
data/
  content.js           # experience, expertise, projects, certifications
  diary.js             # Diary entries (first-hand notes)
```

## Editing

- **Text / copy:** `assets/js/i18n.js`
- **Experience / projects / certs / expertise:** `data/content.js`
- **Diary entries:** `data/diary.js` (copy a block, edit both `en` and `fa`)
- **Contact links:** the `CONTACT` array at the top of `assets/js/main.js`

## Deployment

Static files — copy the whole folder to any web server / VPS document root.
