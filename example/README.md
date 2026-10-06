# Example reviews data (fictional)

Sample data for [bristweb/reviews-widget](https://github.com/bristweb/reviews-widget). **Northwind Cycles** is an invented bike shop — not a real business. Do not present these as real testimonials.

Copy this whole folder to start a new data repo (includes `.github/workflows/validate.yml`, `.nojekyll`, and `.gitignore`).

## Publish (GitHub Pages)

Branch `main`, site root, keep `.nojekyll`. Then point the widget at the published URL:

```html
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://YOUR_USER.github.io/YOUR_DATA_REPO/" defer></script>
```

Google Sites / fixed-height box: add `data-constrained="true"`.

## Layout

- `config.json` — business, platforms, `languages` / `defaultLanguage`, display, summary, `reviews.years`
- `lang/` — optional UI wording files listed in `languages` (this starter has a tiny `en-override.json` plus a partial `es.json`; the widget ships `lang/en.json` as the English base)
- `reviews/<year>.json` — review records
- `theme/theme.css` — `--rw-*` colors (light + dark)
- `icons/`, `images/` — optional local assets
- `.github/workflows/validate.yml` — validates against reviews-widget on push

Partial language files are fine — missing keys fall through to the widget’s English catalog. Optional inline `config.strings` object keys override last.
