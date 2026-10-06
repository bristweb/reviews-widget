# Example reviews data (fictional)

Sample data for [bristweb/reviews-widget](https://github.com/bristweb/reviews-widget). **Northwind Cycles** is an invented bike shop — not a real business. Do not present these as real testimonials.

Demo platforms: **Google**, **Yelp**, **Facebook**, and **Trustpilot** (common review sources). The business and review text are fictional; the platform names identify where each sample would appear.

Copy this whole folder to start a new data repo (includes `.github/workflows/validate.yml`, `.nojekyll`, and `.gitignore`).

## Publish (GitHub Pages)

Branch `main`, site root, keep `.nojekyll`. Then point the widget at the published URL:

```html
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://YOUR_USER.github.io/YOUR_DATA_REPO/" defer></script>
```

Google Sites / fixed-height box: add `data-constrained="true"`.

## Layout

- `config.json` — business, platforms, display, summary, `reviews.years` (optional `languages` / `defaultLanguage`)
- `lang/` — optional UI wording listed in `languages` (partial OK; widget ships English)
- `reviews/<year>.json` — review records
- `theme/theme.css` — `--rw-*` colors (light + dark)
- `icons/`, `images/` — optional local assets
- `.github/workflows/validate.yml` — validates against reviews-widget on push

## Credits

Platform logos (**Google**, **Yelp**, **Facebook**, **Trustpilot**) are from [Simple Icons](https://simpleicons.org/) ([CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)); see [`icons/ATTRIBUTION.md`](icons/ATTRIBUTION.md). All marks belong to their owners and are used only to identify where each review was posted. This example is not affiliated with those platforms. Placeholder award badges in `config.json` are fictional (Local Shop Editors' Pick + Trail Town Best Bike Shop, each with `label` + year on the card; Awards tab + YYYY-12-31 track merge; see attribution).
