# Reviews widget

A static, dependency-free reviews widget for any site. Host the files anywhere that can serve static assets (GitHub Pages works out of the box; any other static host is fine). This repository holds **only the code**: the widget script and stylesheet, two bare demo pages, JSON Schemas for the data format, a validator, and a fictional [example/](example/) data set. It holds no real reviews. License is TBD — there is no LICENSE file yet.

Each site you embed on points the widget at its own **data repo** (or folder) with `data-source`. Counts, averages, card order and schema.org JSON-LD are computed in the browser. There is no build step and no generated index file.

A low-priority side-by-side with named commercial widgets and reputation platforms lives in [COMPARISON.md](COMPARISON.md).

## Contents

1. [Embed](#embed)
2. [Options](#options)
3. [Data format](#data-format)
4. [Example data](#example-data)
5. [JSON Schema and validation](#json-schema-and-validation)
6. [Updating data](#updating-data)
7. [AI summary](#ai-summary)
8. [Card order](#card-order)
9. [Structured data (JSON-LD)](#structured-data-json-ld)
10. [Header behavior](#header-behavior)
11. [Privacy and presentation](#privacy-and-presentation)
12. [New data repo](#new-data-repo)
13. [Technical details](#technical-details)
14. [Repo layout](#repo-layout)

---

## Embed

### JavaScript (preferred)

```html
<script src="https://<host>/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://<host>/<your-data-repo>/" defer></script>
```

The widget renders where the tag is. It loads CSS from this repo and `theme/theme.css`, `config.json`, and every `reviews/<year>.json` from `data-source`, in parallel. Options go on the same tag ([list](#options)).

- Sizes itself in the page; no resize script needed for the JS embed.
- Invisible until font and first layout are ready, then fades in once.
- Several tags on one page are fine (even different `data-source`s); each source and the CSS are fetched once.
- Fills the width it is given (up to 1200px) inside page builders that shrink-to-fit their content.
- Classes are prefixed `rw-`; a small reset limits host CSS leakage.

**Other mount points:**

```html
<script src="https://<host>/reviews-widget/assets/js/reviews-widget.js" defer
        data-source="https://<host>/<your-data-repo>/" data-target="#reviews"></script>
<div id="reviews"></div>

<script src="https://<host>/reviews-widget/assets/js/reviews-widget.js" defer
        data-source="https://<host>/<your-data-repo>/"></script>
<div data-reviews-widget data-layout="grid" data-platform="maps"></div>
```

1. `data-target` → that element (its own `data-*` override the script’s).
2. Else unfilled `[data-reviews-widget]` elements.
3. Else in place (a `<head>` script with no target goes to the end of `<body>`).

If the host hides the script URL, set `data-base` to this repo’s root URL (ending in `/`).

### Google Sites and fixed-height boxes

Builders that put code in a box whose height you set (Google Sites: *Insert → Embed → Embed code*) need fitting options:

```html
<script src="https://<host>/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://<host>/<your-data-repo>/"
        data-fixed-height="true" data-arrows="inside" data-overflow="hidden"
        data-hover-lift="false" data-focus-ring="inside"></script>
```

Stretch the box full width and about **420px** tall. See [Options](#options) and [Header behavior](#header-behavior) for short heights (tested down to 140px).

### Iframe

```html
<iframe id="reviews-widget"
        src="https://<host>/reviews-widget/embed.html?source=https://<host>/<your-data-repo>/"
        title="Reviews" loading="lazy" scrolling="no"
        style="width:100%;border:0;height:420px"></iframe>
<script>
  addEventListener('message', function (e) {
    if (e.data && e.data.type === 'reviews-widget-height')
      document.getElementById('reviews-widget').style.height = e.data.height + 'px';
  });
</script>
```

`index.html` and `embed.html` are bare, transparent, `noindex` pages. With no `?source=` they load the bundled [example/](example/).

---

## Options

| Attribute | Query param | Values | Default |
|---|---|---|---|
| `data-source` | `source` | Data repo root URL (trailing `/` added if missing). **Required** on real embeds. `?source=` applies only when there is no `data-source` | none |
| `data-layout` | `layout` | `carousel` \| `grid` | `display.layout` |
| `data-platform` | `platform` | `all` or a `platforms` key | `all` |
| `data-limit` | `limit` | max review cards (`0` = no limit) | `0` |
| `data-summary` | `summary` | `off` hides the AI summary card | shown |
| `data-schema` | n/a | `off` skips JSON-LD | injected |
| `data-base` | n/a | this code repo’s root | from the script URL |
| `data-fixed-height` | `fixed-height` | `true` = fill parent/viewport height and fit inside | `false` |
| `data-overflow` | `overflow` | `clip` \| `visible` \| `hidden` | `clip` |
| `data-arrows` | `arrows` | `outside` \| `inside` \| `off` | `outside` |
| `data-hover-lift` | `hover-lift` | `true` \| `false` | `true` |
| `data-focus-ring` | `focus-ring` | `outside` \| `inside` | `outside` |
| `data-cards` | `cards` | max cards across (carousel 1–3, grid 1–4; `0` = auto) | `0` |
| `data-padding` | `padding` | px around the widget | `6` |

Precedence: query param → `data-*` → `display` in config → built-in default.

---

## Data format

Plain files at the data root, served over HTTPS with CORS open enough for your pages to fetch them (GitHub Pages does this by default with branch `main`, site root, and `.nojekyll`; any static host works). The widget reads only these paths; other folders (e.g. your own `scripts/`) are never loaded.

```
config.json              business, platforms, display, strings, schema, summary, reviews.years, …
reviews/<year>.json      reviews dated that year (array, newest first)
images/reviewers/        <platform>-<platform_review_id>.<ext> (filesystem-safe id)
icons/                   platform logos
theme/theme.css          @font-face + --rw-* variables
theme/fonts/             optional self-hosted fonts
```

### `config.json`

| Key | Role |
|---|---|
| `business` | `name` (required), optional `website` and extras |
| `platforms` | review platforms in **tab order**: `name`, `icon`, `write_url`, `page_url`, `card_link` (`review`\|`page`), optional `invert_icon_when_active`. Extra fields (scrape URLs, notes, …) are ignored by the widget |
| `default_write_platform` | `write_url` used on the “All” tab |
| `display.*` | layout, snippets, diversity, dates, fitting defaults, … |
| `schema.*` | JSON-LD on/off, `@type`, `max_reviews`, `extra` |
| `rating_labels`, `strings` | score words and UI copy |
| `summary` | `{ "text", "generated_at" }` for the AI summary card |
| `reviews.years` | year files to fetch, newest first, e.g. `[2026, 2025]` |

Formal shape: [`schemas/config.schema.json`](schemas/config.schema.json).

### `reviews/<year>.json`

Array of records for that calendar year, newest first. Store full names, full text, replies, URLs, and platform extras; the widget abbreviates at render time.

```jsonc
{
  "platform": "maps",
  "platform_review_id": "ex-maps-001",
  "reviewer_name": "Avery Quinn",
  "reviewer_profile_url": null,
  "reviewer_image": "images/reviewers/maps-ex-maps-001.svg",
  "reviewer_image_source_url": null,
  "rating": 5,
  "text": "full review text",
  "date": "2026-09-14T18:22:00Z",
  "review_url": "https://example.com/maps/reviews/ex-maps-001",
  "owner_reply": { "text": "…", "date": "2026-09-14T21:00:00Z" },
  "collected_at": "2026-10-01T12:00:00Z"
}
```

Identity is `platform` + `platform_review_id` (no separate `id` field). How a review was collected belongs in your tooling/config, not on the record.

Avatars: `images/reviewers/<platform>-<id>.<ext>` with characters other than `A-Z a-z 0-9 _ -` replaced by `_`.

Formal shape: [`schemas/reviews.schema.json`](schemas/reviews.schema.json).

### Theme

`theme/theme.css` sets `--rw-font`, `--rw-ink`, `--rw-accent`, `--rw-star`, `--rw-radius`, `--rw-max-width`, and related variables on `.rw-host`. Font URLs are relative to that file.

---

## Example data

[`example/`](example/) is a **fictional** business (“Cedar & Pine Studio”) with invented reviewers and platforms (`maps`, `directory`). The demo pages load it by default. Do not present it as real testimonials.

---

## JSON Schema and validation

| Schema | Validates |
|---|---|
| [`schemas/config.schema.json`](schemas/config.schema.json) | `config.json` |
| [`schemas/reviews.schema.json`](schemas/reviews.schema.json) | each `reviews/<year>.json` array |

[`scripts/validate.mjs`](scripts/validate.mjs) checks both schemas (via [Ajv](https://ajv.js.org/)) and filesystem rules: icons and avatars exist, `reviews.years` matches the files and is newest-first, dates sit in the right year file, `(platform, platform_review_id)` is unique, avatar paths match the safe-id pattern.

```bash
# from a checkout of this repo (once):
npm ci

# validate any data directory (the bundled example, or your data repo):
node scripts/validate.mjs example
node scripts/validate.mjs /path/to/your-data-repo
```

A data repo can call the reusable workflow on every push:

```yaml
# .github/workflows/validate.yml
name: Validate reviews data
on:
  push:
  workflow_dispatch:
jobs:
  validate:
    uses: bristweb/reviews-widget/.github/workflows/validate.yml@main
```

That workflow checks out this repo, runs `npm ci`, then `node scripts/validate.mjs` on the caller.

---

## Updating data

1. Edit `reviews/<year>.json` (newest first); add the year to `reviews.years` when you add a file.
2. Place avatars under `images/reviewers/`.
3. Run `node scripts/validate.mjs <data-dir>`.
4. Publish the data files (`cache: no-cache` on fetches means the widget picks them up quickly after your host updates).

---

## AI summary

Optional first card on “All reviews”: `config.summary` `{ text, generated_at }`. Not linked, not rated, not in JSON-LD, not counted by `data-limit`. Hide with `display.show_summary: false`, `data-summary="off"`, or omit `summary`.

---

## Card order

Deterministic: on “All”, newest first with platform diversity (`display.max_same_platform_run`, `display.diversity_window_days`). Single-platform tabs are newest first. Ties break on `platform:platform_review_id`. Rating-only reviews count in the header but get no card unless `display.show_rating_only_reviews`.

---

## Structured data (JSON-LD)

Built in the browser and injected once per page as `#reviews-widget-schema`. `@type` from `schema.type` (default `LocalBusiness`), `aggregateRating` from 1–5 ratings only, `review` items in card order. Disable with `schema.enabled: false` or `data-schema="off"`. Google often withholds review stars for self-serving business markup; the JSON-LD still describes the entity accurately.

---

## Header behavior

Container queries on the widget’s own width (and height when `data-fixed-height`):

| Width | Header |
|---|---|
| > 1020px | full score row, named tabs, button |
| ≤ 1020px | tabs → icon + count |
| ≤ 720px | hide “Excellent” / “Based on” |
| ≤ 575px | hide tabs |
| ≤ 360px | button label → short string |

| Height (fixed mode) | |
|---|---|
| ≤ 460px | compact header |
| ≤ 240px | slim header; cards drop date / “View on”; snippets clamp |

Carousel: 4 / 3 / 2 / 1 cards by width breakpoints.

---

## Privacy and presentation

- **Storage:** full names, text, replies, URLs, extras in the public data files.
- **Presentation:** first name + last initial; ~160-character snippets; card links back to the platform.

---

## New data repo

1. Create a repo (or folder) for the data; publish it on any static host. If you use GitHub Pages: branch `main`, site root, and keep `.nojekyll`. Optionally add a validate workflow (above).
2. Add `config.json`, `icons/`, `theme/`, empty `reviews/` + `images/reviewers/`, `"reviews": { "years": [] }`.
3. Add records and avatars; validate; push.
4. Embed with `data-source` pointing at that Pages URL.

---

## Technical details

- Loads `config.json`, then all year files in parallel; injects CSS if missing.
- Without `data-source` / `?source=`, shows the unavailable message.
- Fixed-height mode: host height 100% or viewport remainder; card text scrolls without blocking horizontal swipe.
- Icons: data-repo SVG, then Simple Icons CDN fallback.
- Local preview: serve this repo (and your data) from any static origin with CORS (`Access-Control-Allow-Origin: *`) and open `index.html` or point `data-source` at a local URL.

---

## Repo layout

```
assets/js/reviews-widget.js   widget
assets/css/reviews-widget.css layout (reads --rw-* from the data theme)
index.html, embed.html        demos (default data-source: example/)
example/                      fictional sample data
schemas/*.schema.json         config + reviews JSON Schema
scripts/validate.mjs          Ajv + filesystem checks
COMPARISON.md                 optional product comparison
.github/workflows/            check (this repo) + reusable validate
```

Review text belongs to its authors; platform marks belong to their owners.
