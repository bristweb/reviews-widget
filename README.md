# Reviews widget

A static, dependency-free reviews widget in the style of Elfsight, served by GitHub Pages. This repo holds **only the code**: the widget script and stylesheet, two bare pages for iframes, and the scripts that collect and check reviews. It holds no reviews.

Each site's reviews and look live in their own **data repo**, which the widget reads at load time:

| Site | Data repo | Data URL (`data-source`) |
|---|---|---|
| Heather Wolfe Art | [bristweb/heather-wolfe-art-reviews](https://github.com/bristweb/heather-wolfe-art-reviews) | `https://bristweb.github.io/heather-wolfe-art-reviews/` |
| FASTONE Pro Paint | [bristweb/fastone-reviews](https://github.com/bristweb/fastone-reviews) | `https://bristweb.github.io/fastone-reviews/` |

There is no build step and no generated file. The widget computes counts, averages, card order and the schema.org JSON-LD in the browser from the stored records.

## Contents

1. [Embed on your site](#embed-on-your-site)
   - [JavaScript embed (preferred)](#javascript-embed-preferred)
   - [Google Sites and other fixed-height boxes](#google-sites-and-other-fixed-height-boxes)
   - [Iframe embed (alternative)](#iframe-embed-alternative)
2. [Options](#options)
3. [Data repo format](#data-repo-format)
   - [Layout](#layout)
   - [`config.json`](#configjson)
   - [Review records: `reviews/<year>.json`](#review-records-reviewsyearjson)
   - [Avatars: `images/reviewers/`](#avatars-imagesreviewers)
   - [Theme: `theme/theme.css`](#theme-themethemecss)
4. [Adding and updating reviews](#adding-and-updating-reviews)
5. [Weekly sync](#weekly-sync)
6. [AI summary card](#ai-summary-card)
7. [Validation](#validation)
8. [Card order](#card-order)
9. [Structured data (JSON-LD)](#structured-data-json-ld)
10. [Header behavior](#header-behavior)
11. [Privacy and presentation](#privacy-and-presentation)
12. [New site](#new-site)
13. [Technical details](#technical-details)
14. [Repo layout](#repo-layout)

---

## Embed on your site

### JavaScript embed (preferred)

Paste one tag where the widget should appear. `data-source` (required) is the data repo's URL:

```html
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://bristweb.github.io/heather-wolfe-art-reviews/" defer></script>
```

The widget renders right where the tag is. It loads `assets/css/reviews-widget.css` from this repo and `theme/theme.css`, `config.json` and every `reviews/<year>.json` from the data repo, all in parallel (the year files as soon as `config.json` has listed them). Then it inserts the widget immediately before the `<script>` element. `defer`, `async`, or neither all work.

Options go on the same tag ([full list](#options)):

```html
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://bristweb.github.io/fastone-reviews/" defer
        data-layout="grid" data-platform="amazon" data-limit="12"></script>
```

- The widget renders directly in your page, so it sizes itself naturally and needs no resize script.
- It stays invisible until its font and first layout are ready, then fades in once, with no font swap or layout jump.
- **Several widgets on one page:** use one script tag per widget, each with its own options (even different `data-source`s). Each data repo and the CSS are downloaded only once.
- **It fills the width it's given, up to 1200px, inside any page builder.** That includes containers that shrink their content to fit: Framer/Squarespace code blocks, centered flex columns, `text-align:center` blocks, inline-block, `fit-content`, floated, and absolutely positioned parents. It never causes horizontal scrolling.
- The widget's classes all start with `rw-`, its font has its own family name, and a small reset keeps common host styles (line height, image borders, text alignment) from leaking in.

**Rendering somewhere other than the script's position** (optional), for example when the script has to go in `<head>` or a site-wide footer:

```html
<!-- a) point the script at an element -->
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js" defer
        data-source="https://bristweb.github.io/heather-wolfe-art-reviews/" data-target="#reviews"></script>
<div id="reviews"></div>

<!-- b) or mark one or more elements; each can carry its own options -->
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js" defer
        data-source="https://bristweb.github.io/heather-wolfe-art-reviews/"></script>
<div data-reviews-widget data-layout="grid" data-platform="google"></div>
<div data-reviews-widget data-limit="6"></div>
```

How the script decides where to render:

1. If it has `data-target`, it renders into that element (any CSS selector). The element's own `data-` options (including `data-source`) override the script's.
2. Otherwise, if the page has `[data-reviews-widget]` elements that no script has filled yet, it fills all of them. Their own `data-` options override the script's.
3. Otherwise, it renders in place, just before its own tag. A script placed in `<head>` with no target renders at the end of `<body>`.

Mount points are chosen only by position, `data-target`, or the `data-reviews-widget` attribute, never by class name. Don't mix in-place tags and `data-reviews-widget` elements on one page; if you need both, give each script a `data-target`.

If your site builder loads scripts in a way that hides the script's own URL (rare, e.g. as an ES module), add `data-base="https://bristweb.github.io/reviews-widget/"`.

### Google Sites and other fixed-height boxes

Some site builders put embedded code in a box whose height you set and the code can't change. Google Sites is the common example: *Insert → Embed → Embed code* places your HTML in a sandboxed iframe on `atari-embeds.googleusercontent.com` (with `sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation"`). You set its height by dragging the box in the editor. Nothing inside the box can resize it, and anything taller than the box is cut off.

For boxes like that, the widget has a few independent [fitting options](#options). This combination suits Google Sites:

```html
<script src="https://bristweb.github.io/reviews-widget/assets/js/reviews-widget.js"
        data-source="https://bristweb.github.io/fastone-reviews/"
        data-fixed-height="true" data-arrows="inside" data-overflow="hidden"
        data-hover-lift="false" data-focus-ring="inside"></script>
```

In Google Sites: *Insert → Embed → Embed code*, paste the snippet, *Next*, *Insert*. Then stretch the box to the full width of the section and drag it to about **420px** tall.

- `data-fixed-height="true"`: the widget fills the box's full height and fits inside it. The header stays on top and the cards take the remaining height. A long review scrolls inside its own card. In short boxes the header compacts further (see [Header behavior](#header-behavior)). The widget never tries to resize the box (it sends no height messages).
- `data-arrows="inside"`: the carousel arrows sit inside the widget's edges instead of overhanging them by 8px.
- `data-overflow="hidden"`: nothing paints outside the widget, horizontally or vertically.
- `data-hover-lift="false"`: cards don't rise 2px on hover, so their top edge can't be cut off.
- `data-focus-ring="inside"`: keyboard focus outlines are drawn inside the tabs, the button, and the arrows.

| Box height | Result |
|---|---|
| above 460px | full header, roomy cards |
| about 420px (recommended) | one-row header without "Excellent" / "Based on"; the whole snippet shows on desktop widths |
| 300-400px | smaller score, stars, and text; longer snippets scroll inside their card |
| 140-240px | same layout with fewer extras: a slim one-row header, no dates or "View on" cues, snippets clamped to the lines that fit; the AI summary keeps most of the room. Tested down to 140px tall |

Tested in Chrome with a simulated Google Sites iframe (the sandbox above, and again without `allow-same-origin`, which gives the frame an opaque origin) at heights of 140 to 500px and widths of 320 to 1200px: nothing was cut off and the page inside the box never scrolled. Arrows and touch swipes page through the cards, and clicking a card opens the review in a new tab. *Embed → By URL* works the same with `embed.html?source=…&fixed-height=true&arrows=inside&overflow=hidden&hover-lift=false&focus-ring=inside`.

- **New tabs:** cards and "Write a review" are `target="_blank" rel="noopener"` links. In a sandboxed iframe they need `allow-popups`; Google Sites also grants `allow-popups-to-escape-sandbox`, so the review opens as a normal tab.
- **Fonts and data:** everything comes from GitHub Pages, which sends `Access-Control-Allow-Origin: *`, so it loads even from an opaque-origin sandbox.
- **Structured data:** the JSON-LD goes into the embed's own iframe document, not into the Google Sites page.

The same options work in any fixed-height container: a `<div style="height:400px">` around the script tag, or a fixed-height iframe of `embed.html` without the resize script. With `data-fixed-height`, the widget fills its parent element when the parent has a definite height. Otherwise it fills the window from its own top edge down, minus the page's bottom margin.

### Iframe embed (alternative)

Use this when your site builder only accepts iframes, or when you want the widget fully isolated from your page's CSS. `?source=` is required:

```html
<iframe id="reviews-widget" src="https://bristweb.github.io/reviews-widget/embed.html?source=https://bristweb.github.io/heather-wolfe-art-reviews/"
        title="Reviews" loading="lazy" scrolling="no" style="width:100%;border:0;height:420px"></iframe>
<script>
  // auto-resize the iframe to the widget's height
  addEventListener('message', function (e) {
    if (e.data && e.data.type === 'reviews-widget-height')
      document.getElementById('reviews-widget').style.height = e.data.height + 'px';
  });
</script>
```

Other options go in the same query string: `embed.html?source=…&layout=grid&platform=google&limit=12`. Without the resize script, set a fixed height (the carousel is about 410px tall at desktop widths), or add `fixed-height=true` so the widget fits whatever height you give the iframe.

`index.html` and `embed.html` are the same bare page (no chrome, transparent background, `noindex`). Without `?source=`, `index.html` shows a short help line.

---

## Options

| Attribute (JS embed: script tag or target element) | Query param (iframe / host page) | Values | Default |
|---|---|---|---|
| `data-source` | `source` | data repo root URL (a trailing `/` is added if missing). **Required.** `?source=` is used only when the embed has no `data-source`, so a link can't swap a site's data | none |
| `data-layout` | `layout` | `carousel` (one scrolling row with arrows) or `grid` (all cards, wrapping) | `display.layout` (`carousel`) |
| `data-platform` | `platform` | `all`, or a platform key from the data repo's `config.json` | `all` |
| `data-limit` | `limit` | maximum number of review cards (`0` = no limit) | `0` |
| `data-summary` | `summary` | `off` hides the [AI summary card](#ai-summary-card) | shown (`display.show_summary`) |
| `data-schema` | n/a | `off` skips injecting the [JSON-LD](#structured-data-json-ld) | injected (`schema.enabled`) |
| `data-base` | n/a | this repo's root URL, ending in `/` | worked out from the script URL |
| **Fitting options** | | | |
| `data-fixed-height` | `fixed-height` | `true`: fill the full height of the parent element (or, if it has no definite height, of the window below the widget) and fit everything inside it; the header compacts in short boxes, long text scrolls inside its card, no height messages are sent. `false`: as tall as its content | `display.fixed_height` (`false`) |
| `data-overflow` | `overflow` | `clip`: the arrows' 8px overhang is clipped sideways. `visible`: the arrows overhang the widget edge (the bare pages use this). `hidden`: nothing paints outside the widget | `display.overflow` (`clip`) |
| `data-arrows` | `arrows` | `outside` (overhang the edges by 8px), `inside`, or `off` (swiping and scrolling still work) | `display.arrows` (`outside`) |
| `data-hover-lift` | `hover-lift` | `true`: cards rise 2px on hover and focus. `false`: only the border changes | `display.hover_lift` (`true`) |
| `data-focus-ring` | `focus-ring` | `outside` or `inside` (focus outlines drawn inside tabs, button and arrows) | `display.focus_ring` (`outside`) |
| `data-cards` | `cards` | the most cards side by side: carousel `1`-`3`, grid `1`-`4`; `0` = automatic (carousel up to 4; grid as many 270px columns as fit) | `display.cards` (`0`) |
| `data-padding` | `padding` | space around the widget, in px | `display.padding` (`6`) |

Query parameters on the page that hosts the widget override the `data-` attributes (for every widget on that page). For options with a `display` key the order is: query parameter, `data-` attribute, `display` in the data repo's `config.json`, built-in default. On/off options take `true` / `false` (also `1` / `0`, `on` / `off`, `yes` / `no`), and a bare `data-fixed-height` means `true`. Each fitting option works on its own.

The platform tabs still let visitors switch filters; the header's rating and count follow the selected tab.

---

## Data repo format

A data repo is plain files at its root, served by its own GitHub Pages site (branch `main`, root, with `.nojekyll`). Nothing in it is generated.

### Layout

```
config.json              business, platforms (display + collection settings), links, display defaults, strings,
                         schema settings, avatar palette, AI summary, and reviews.years
reviews/<year>.json      the reviews dated in that year: a JSON array of plain records, newest first
images/reviewers/        reviewer avatars: <platform>-<platform_review_id, filesystem-safe>.<ext>
icons/                   platform logos (<platform>.svg unless config says otherwise)
theme/theme.css          @font-face rules + --rw-* CSS custom properties
theme/fonts/             self-hosted webfonts (with their licenses)
README.md                the site's embed snippet and notes about its platforms
.github/workflows/validate.yml   calls this repo's reusable validator on every push
.gitignore               .pull/ (raw scraper output, never committed)
```

### `config.json`

| Key | What it controls |
|---|---|
| `business` | `name`, `website` (used in the JSON-LD and as reference), optional extra details (e.g. `product`) |
| `sources` | `checked_at` and `notes`: when the site's outbound links were last audited and what was found |
| `platforms` | one entry per review platform, **in tab order**. Display: `name`, `icon` (data-repo path; default `icons/<key>.svg`), `simple_icon` (fallback slug), `write_url` ("Write a review" target on that tab), `page_url` (the platform page; also the fallback link for reviews without their own URL), `card_link` (`"review"` = each card links to its review, `"page"` = to `page_url`), optional `invert_icon_when_active`. Collection: `scrape_url` or `scrape_urls` (what the [weekly sync](#weekly-sync) scrapes; a platform without one isn't pulled), Amazon `asins` / Etsy `listing_ids` (import only those products), `product_title`. Anything else (`linked_url`, `reported_rating`, `reported_count`, `place_id`, notes, …) is reference data the widget ignores |
| `links` | other URLs the site links to that have no reviews (social profiles, shops), with notes. Reference only |
| `default_write_platform` | which platform's `write_url` the button uses on the "All" tab |
| `display.layout` | default layout |
| `display.snippet_chars` | snippet length in characters (`0` = full text) |
| `display.abbreviate_last_names` | `true`: "Kylee M." and surnames in the snippet shown as initials; `false`: full names |
| `display.max_same_platform_run`, `display.diversity_window_days` | card-order diversity (see [Card order](#card-order)) |
| `display.date_locale`, `display.date_options` | date formatting (`Intl.DateTimeFormat`) |
| `display.font_timeout_ms` | how long to wait for the webfont before showing the fallback face |
| `display.show_rating_only_reviews` | `false` (default): reviews with no text count in the header but get no card |
| `display.show_summary` | show the [AI summary card](#ai-summary-card) (default `true`) |
| `display.fixed_height`, `.overflow`, `.arrows`, `.hover_lift`, `.focus_ring`, `.cards`, `.padding` | site-wide defaults for the [fitting options](#options) |
| `schema.enabled`, `schema.type`, `schema.max_reviews`, `schema.extra` | the [JSON-LD](#structured-data-json-ld): on/off, `@type` (default `LocalBusiness`), how many Review items (`0` = all), extra properties merged into the entity |
| `rating_labels` | words next to the score (`min` average → label) |
| `strings` | every visible or screen-reader text ("Write a review", "Review", "Based on", "View on {platform}", aria labels, …) with `{placeholders}` |
| `avatars.initials_palette`, `avatars.initials_text_color` | colors of generated initials avatars (used by the importer) |
| `summary` | `{ "text": "…", "generated_at": "<ISO 8601>" }`, the [AI summary card](#ai-summary-card) |
| `reviews.years` | every year that has a `reviews/<year>.json`, newest first, e.g. `[2026, 2025, 2024]`. The widget fetches exactly these files, all at once; the importer keeps the list current |

### Review records: `reviews/<year>.json`

Each file is a JSON array of the reviews **dated** in that year, newest first. The data policy is *store everything*: full name, full text, owner reply, profile and avatar source URLs, individual review URL and every platform extra. Abbreviation happens only when the widget renders.

```jsonc
{
  "platform": "google",                    // a key of config.json platforms
  "platform_review_id": "Ci9DQUlRQUNv…",  // the platform's own review id (Etsy: transaction id). Unique per platform
  "reviewer_name": "Kylee Morris",         // full name as shown on the platform (widget shows "Kylee M."); null if anonymous
  "reviewer_profile_url": "https://www.google.com/maps/contrib/…",   // or null
  "reviewer_image": "images/reviewers/google-Ci9DQUlRQUNv….jpg",     // downloaded copy or generated initials SVG
  "reviewer_image_source_url": "https://lh3.googleusercontent.com/…", // where it came from (may expire), or null
  "rating": 5,                             // 1-5, or null (e.g. Facebook "recommends" with no star value)
  "text": "full review text",              // complete and verbatim; "" for rating-only reviews
  "date": "2026-10-05T20:19:50Z",          // ISO 8601 UTC. Day-only platforms (Amazon, Etsy) are stored at 12:00 UTC
  "review_url": "https://…",               // the individual review where the platform has one, else page_url
  "owner_reply": { "text": "…", "date": "2026-10-05T21:47:17Z" },     // the owner's public reply, or null
  "collected_at": "2026-10-05T22:00:27Z",  // first imported
  "updated_at": "…",                       // only when refreshed with --update
  "source": "apify",                       // how it was collected: direct | apify | elfsight
  // optional, platform-specific, e.g.:
  "featured_on_website": true,             // set by hand: the site quotes this review (kept on --update)
  "rating_source": "…",                    // when the rating isn't a native star field (Facebook "5 stars" tag)
  "recommended": true, "tags": ["…"],      // Facebook
  "title": "…",                            // Amazon / Zola review title
  "item_reviewed": { "title": "…", "asin": "…", "url": "…" },        // Amazon / Etsy product
  "verified_purchase": true, "amazon_vine": true, "helpful_votes": 2, // Amazon (Etsy: verified_purchase always true)
  "review_image_urls": ["…"], "reviewer_review_count": 3, "language": "en"
}
```

The widget identifies a review by `platform` + `platform_review_id` (records carry no separate id). Counts, per-platform averages and the header numbers are computed from these records on load.

### Avatars: `images/reviewers/`

Avatars are always downloaded (never hotlinked). Each is named after the review's **stable source id**: `<platform>-<platform_review_id>.<ext>`, with every character other than `A-Z a-z 0-9 _ -` replaced by `_` so the name is filesystem- and URL-safe (Facebook ids are base64 and may contain `=`). The review id is used because it is the one id every platform provides and never changes: Amazon `R1AS3YUWI1ZYPI`, Google `ChZDSUhNMG9n…`, Yelp `5YetL22t6xV6Vm4DfH_v3Q`, Zola UUIDs, Etsy transaction ids. Reviewer ids aren't available on every platform, and one reviewer could review twice. When the platform has no photo, the importer writes an initials SVG in the `avatars.initials_palette` colors.

### Theme: `theme/theme.css`

`@font-face` rules (fonts in `theme/fonts/`) and CSS custom properties on `.rw-host`, read by this repo's stylesheet:

| Variable | Used for |
|---|---|
| `--rw-font` | font stack; the widget waits for the first family (weights 400, 700, italic 300) |
| `--rw-letter-spacing` | body letter spacing |
| `--rw-ink` / `--rw-body` / `--rw-muted` | names and score / review text / dates and "Based on" |
| `--rw-line` / `--rw-line-strong` | borders / tab hover border |
| `--rw-card` | card, header, tab and arrow background |
| `--rw-tint` | count chips, avatar placeholder, AI summary card |
| `--rw-accent` / `--rw-accent-2` | active tab, button, links, focus ring, card hover border / hover shade |
| `--rw-on-accent` / `--rw-on-accent-soft` | text on the accent / count chip on the active tab |
| `--rw-star` / `--rw-star-off` | filled / empty stars |
| `--rw-nav-shadow` | carousel arrow shadow |
| `--rw-radius` | card and header corner radius |
| `--rw-max-width` | widget max width (centered) |

The theme may also add site-specific rules (e.g. FASTONE sets the score and labels in uppercase Oswald). Font URLs are relative to `theme.css`, so they resolve inside the data repo. A host page can override any variable in its own CSS, e.g. `html .rw-root{--rw-accent:#8a2be2}`.

---

## Adding and updating reviews

The scripts in `scripts/` work on any data repo checkout; pass it with `--data`. They need only Python 3 and Node (no packages).

**From scraper output:**

```bash
python3 reviews-widget/scripts/import_reviews.py --data heather-wolfe-art-reviews \
    --google google.json --yelp yelp.json --facebook facebook.json --source apify
```

- Converters: `--google` (`compass/Google-Maps-Reviews-Scraper`), `--yelp` (`web_wanderer/yelp-reviews-scraper`), `--facebook` (`apify/facebook-reviews-scraper`), `--zola` (storefront `__NEXT_DATA__` review objects), `--amazon` (`junglee/amazon-reviews-scraper`, run with `includeGdprSensitive`), `--etsy` (`astravalabs/etsy-reviews-scraper`).
- Only **new** reviews (by `platform` + `platform_review_id`) are added. `--update` also refreshes existing ones; they keep `collected_at`, `source`, their avatar and a hand-set `featured_on_website`, and get `updated_at`.
- A platform missing from `config.json` `platforms` is skipped; Amazon `asins` / Etsy `listing_ids` filter out other products.
- Each review goes into `reviews/<year>.json` (re-sorted newest first). A review in a new year creates that file and adds the year to `reviews.years`.
- Avatars are downloaded to `images/reviewers/` ([naming](#avatars-imagesreviewers)), or an initials SVG is generated.

**By hand:** add the record to the right `reviews/<year>.json` in date order (copy an existing one), put the avatar at `images/reviewers/<platform>-<id>.<ext>`, add the year to `reviews.years` if it's a new file, and run `node reviews-widget/scripts/validate.mjs <data repo>`. Commit and push; GitHub Pages redeploys in about a minute and the widget picks it up (data is fetched with `cache: no-cache`).

---

## Weekly sync

Monitoring is a scheduled agent run (on the Bristlecone box, using the Apify connector), one per site, not a GitHub Action. Free, direct methods are used wherever they work; Apify only where they don't.

| Platform | Method | Actor | Why not direct |
|---|---|---|---|
| Zola | **direct**, free | storefront HTML, `<script id="__NEXT_DATA__">` | n/a |
| Google | Apify | `compass/Google-Maps-Reviews-Scraper` | logged-out Maps shows no reviews |
| Yelp | Apify | `web_wanderer/yelp-reviews-scraper` | yelp.com answers 403 |
| Facebook | Apify | `apify/facebook-reviews-scraper` | lists only a few reviews without a login |
| Amazon | Apify | `junglee/amazon-reviews-scraper` | review pages need a login |
| Etsy | Apify | `astravalabs/etsy-reviews-scraper` | etsy.com is behind DataDome |

Each actor run asks only for reviews newer than the newest stored review on that platform minus 30 days (`--since-days`), and is capped at `maxTotalChargeUsd` 0.5 (Apify's minimum). Etsy has no date filter (shop-wide, newest 50). On Apify's free plan the Amazon actor returns at most 10 reviews per run, so a full pull (`--all`) runs once per star rating.

```bash
git -C reviews-widget pull && git -C <data-repo> pull
python3 reviews-widget/scripts/pull_reviews.py --data <data-repo> --print-inputs
#   -> per platform: actor, input (with the date window), cost cap, and where to save the items (<data-repo>/.pull/<platform>.json)
#   run each actor (Apify connector call-actor, callOptions.maxTotalChargeUsd 0.5) and save its dataset items there
python3 reviews-widget/scripts/pull_reviews.py --data <data-repo> --from-raw
#   -> pulls Zola directly (if listed), imports NEW reviews only, then checks the AI summary
#   if it prints SUMMARY STALE: rewrite config.json summary.text from <data-repo>/.pull/summary_input.txt and set summary.generated_at
node reviews-widget/scripts/validate.mjs <data-repo>
git -C <data-repo> add reviews images/reviewers config.json
git -C <data-repo> commit -m "reviews: weekly sync $(date +%F)" && git -C <data-repo> push    # only if something changed
```

Other ways to run it: `APIFY_TOKEN=… python3 reviews-widget/scripts/pull_reviews.py --data <data-repo>` calls the Apify REST API itself; `--all` drops the date window (still adds only new reviews); `import_reviews.py --update` refreshes existing records.

`.pull/` (raw scraper output) is git-ignored; the review records are the record.

---

## AI summary card

The first card in "All reviews" (carousel and grid) is a short summary of what reviewers say, written by AI from the stored review texts and labeled as such: a sparkle icon and **AI summary** (`strings.ai_summary`), `role="note"`, aria label "AI-generated summary of N reviews". It is not a link, has no stars or platform icon, isn't counted in any total or rating, doesn't count against `data-limit`, and is never in the JSON-LD. It doesn't appear on single-platform tabs.

It lives in the data repo's `config.json`:

```json
"summary": { "text": "2-4 sentences", "generated_at": "2026-10-06T02:31:00Z" }
```

Rules for the text: only themes that actually appear in the reviews, no invented facts, no quotes attributed to anyone, no star claims; about 300 characters (longer text scrolls inside the card).

**Staleness:** after an import, `pull_reviews.py` flags the summary as stale when **any review is dated or was collected after `summary.generated_at`**. It prints `SUMMARY STALE` and writes every review text to `<data-repo>/.pull/summary_input.txt`; the weekly run rewrites `summary.text` and sets `summary.generated_at` to the current UTC time.

**Hide it:** `display.show_summary: false`, `data-summary="off"`, `?summary=off`, or remove `summary` from `config.json`.

---

## Validation

`scripts/validate.mjs <data repo>` checks:

- `config.json` parses, has `business.name` and `platforms`, every platform/link icon exists, `summary` (if present) has text and an ISO `generated_at`;
- `reviews.years` is a list of integers, newest first, and matches the `reviews/*.json` files exactly (no missing, unlisted or empty files);
- every record has `platform`, `platform_review_id`, `reviewer_name`, `reviewer_image`, `text`, `date`, `review_url`, `source`; the platform is in `config.json`; `rating` is 1-5 or null; dates are ISO 8601; each record is in the file for its year, newest first; `owner_reply` is null or `{text, date}`;
- `platform` + `platform_review_id` is unique across all years;
- each `reviewer_image` is `images/reviewers/<platform>-<safe id>.<ext>` and exists, and no avatar file is unused.

Each data repo's `.github/workflows/validate.yml` calls this repo's reusable workflow (`bristweb/reviews-widget/.github/workflows/validate.yml@main`) on every push. It only checks; it never commits.

---

## Card order

Deterministic, the same on every load:

- **"All reviews": newest first, with gentle platform diversity.** For each slot the widget takes the newest remaining review; if its platform matches the previous **2** cards (`display.max_same_platform_run`), it takes the newest review from a *different* platform instead, but only if that one is at most **548 days** (`display.diversity_window_days`) older. Otherwise it takes the newest anyway.
- The [AI summary card](#ai-summary-card) comes first in "All reviews".
- **Single-platform tab:** newest first.
- Ties are broken by `platform:platform_review_id`.
- Rating-only reviews (empty or whitespace-only text) get no card but count in the header, unless `display.show_rating_only_reviews` is `true`.

---

## Structured data (JSON-LD)

The widget builds the schema.org JSON-LD from the loaded records and injects it once per page as `<script type="application/ld+json" id="reviews-widget-schema">` in `<head>`, however many widgets the page has. Turn it off with `schema.enabled: false` or `data-schema="off"`. If the page already has a script with that id, nothing is added.

- One entity, `@type` from `schema.type` (default `LocalBusiness`; FASTONE uses `Product`), `@id` `<website>#business`, `name` and `url` from `business`, plus everything in `schema.extra`.
- `aggregateRating`: `ratingValue` (one decimal), `bestRating` 5, `worstRating` 1, `ratingCount` / `reviewCount` = every review **with a 1-5 rating**. Unrated reviews (e.g. Facebook recommendations) are left out rather than counted as 5 stars.
- `review`: every review (`schema.max_reviews: 0`; a number caps it): text reviews in "All reviews" card order, then the rating-only ones newest first. Each has `author` (`Person`, the displayed abbreviated name), `datePublished`, `publisher` (`Organization`, the platform), `reviewRating` when rated, and `reviewBody` (the card's snippet) when it has text.

**Google caveat:** Google shows no review stars for *self-serving* reviews (a business's markup about itself, `LocalBusiness` / `Organization`) and asks sites not to aggregate reviews from other websites, so don't expect stars in search. The markup still describes the business and its reviews accurately to search engines and AI crawlers. Use one aggregate per page: if the site has its own markup, use the same `@id` so they merge, or turn this off.

---

## Header behavior

One compact row: rating on the left, platform tabs in the middle, **Write a review** on the right. It responds to the widget's own width through CSS container queries (`container: rw / inline-size` on `.rw-root`), so it follows the embed or iframe width, not the window:

| Widget width | Header |
|---|---|
| > 1020px | score, "Excellent", stars, "Based on N reviews" · tabs with icon, name and count · button |
| ≤ 1020px | tabs collapse to icon and count (the name stays in `title` / `aria-label`) |
| ≤ 720px | "Excellent" and "Based on" hidden (score, stars, "N reviews"), tighter tabs and button |
| ≤ 575px | tabs hidden (the cards show all reviews); rating on the left, compact button on the right |
| ≤ 360px | the button reads "Review" (`strings.write_review_short`; accessible name stays "Write a review") |

With [`data-fixed-height`](#google-sites-and-other-fixed-height-boxes) it also responds to height (the root becomes a `size` container):

| Widget height | Header and cards |
|---|---|
| ≤ 460px | "Excellent" and "Based on" hidden, tighter padding |
| ≤ 360px | smaller score, stars, button, tabs, avatars and text |
| ≤ 300px | tighter still |
| ≤ 240px | one slim header row (no "N reviews" line); cards drop the date and "View on" cue and clamp the snippet to the lines that fit; the AI summary keeps its label and scrolls its text; smaller arrows |
| ≤ 180px | slightly smaller still |

The carousel shows 4 cards above 1024px, 3 at ≤ 1024px, 2 at ≤ 760px, and one card (88% wide, swipeable, no arrows) at ≤ 575px. "Write a review" goes to the active platform's `write_url`, or `default_write_platform`'s on "All".

---

## Privacy and presentation

- **Storage is complete.** The records store everything collected: full reviewer name, profile URL, avatar source URL, full text, owner reply, individual review URL, dates and platform extras. The data repos are public, so all of it is publicly readable.
- **Presentation is abbreviated**, computed at render time: names as **first name + last initial** ("Kylee M."; couples like "Ann & Bob C." kept), text clipped to a **~160-character snippet** at a word boundary, the reviewer's own surname inside the snippet shown as an initial, screen-reader labels abbreviated too. Each card links to the original review (or the platform page, per `card_link`).
- **Search engines:** `index.html` and `embed.html` carry `<meta name="robots" content="noindex, nofollow, noarchive">`. The repos have no description, topics or homepage link, but they're public and findable through GitHub search.

---

## New site

1. Create a data repo (public), copy an existing one's layout, and enable GitHub Pages (branch `main`, root). Keep `.nojekyll`, `.gitignore` and `.github/workflows/validate.yml`.
2. Write `config.json`: `business`, `platforms` (display fields plus `scrape_url`/`scrape_urls`), `links`, `strings`, `display`, `schema`, `avatars`, and `"reviews": {"years": []}`.
3. Add `icons/`, `theme/theme.css` and `theme/fonts/`.
4. Collect: `python3 reviews-widget/scripts/pull_reviews.py --data <repo> --all --print-inputs`, run the actors, then `--from-raw`. Write a `summary` when there are reviews.
5. Validate, commit, push, and embed with `data-source="https://<owner>.github.io/<repo>/"`.

The importer understands Google, Yelp, Facebook, Zola, Amazon and Etsy. Any other platform works in the widget if it has a `platforms` entry, an icon, and records (by hand, or with a small converter added to `scripts/import_reviews.py`).

---

## Technical details

- **Loading:** the script finds this repo's root as `new URL('../../', document.currentScript.src)` (or `data-base`). Per data source it fetches `config.json`, then all `reviews/<year>.json` listed in `reviews.years` in parallel (`cache: no-cache`), while adding `<link>`s for `assets/css/reviews-widget.css` and `<source>theme/theme.css` (unless the page already has them). Everything is fetched once per page and source, however many widgets there are (shared through `window.__reviewsWidget`). Without a `data-source` (or `?source=` on the bare pages) the widget shows "Reviews are unavailable right now" and logs a console warning.
- **Mounting:** each copy of the script captures its own `document.currentScript`, then picks `data-target`, unfilled `[data-reviews-widget]` elements, or a new `<div>` before its own tag. A script that runs while the page is parsing waits for `DOMContentLoaded`. Each element is filled once.
- **Sizing:** the mount element becomes `.rw-host` (a full-width block with a doubled class so page-builder rules can't override it). It holds a zero-height `.rw-sizer` (24 inline blocks giving an intrinsic max-content width of `--rw-max-width` and min-content of 1/24 of it, so shrink-to-fit parents size the widget to the available width) and the widget, `.rw-root`, whose `container-type: inline-size` drives the container queries. `.rw-clip` (`overflow-x: clip`) trims the arrows' overhang; `data-overflow="hidden"` uses `overflow: hidden`.
- **Fixed height:** the host gets `100%` when its parent has a definite height (checked with a probe), otherwise the window height below the widget's top minus the page's bottom margin, recalculated on resize. `.rw-root.rw-fixed` becomes a flex column with `container-type: size`; card text scrolls vertically (`overflow-y: auto`, `overflow-x: hidden`) without blocking horizontal swipes.
- **No flash:** the root starts at `opacity: 0`, waits for the stylesheets and the first `--rw-font` family (timeout `display.font_timeout_ms`, then the theme's metric-matched fallback), then fades in over 0.18s (instantly with reduced motion).
- **Icons:** the data repo's SVG (`icon`, else `icons/<platform>.svg`); only if it fails does the `<img>` switch to the [Simple Icons CDN](https://simpleicons.org/).
- **Accessibility:** each card is a single `<a>` (new tab, `rel="noopener"`) with a label like "Read Kylee M.'s review on Google (opens in a new tab)". Tabs are `role="tab"` buttons with counts in their labels; stars have text labels; focus rings are visible.
- **Iframe height:** inside an iframe the widget posts `{type: 'reviews-widget-height', height}` to the parent on render, resize and tab change (not with `data-fixed-height`).
- **Local preview:** serve the parent folder of both checkouts with CORS (e.g. a small server adding `Access-Control-Allow-Origin: *`) and open `http://localhost:8000/reviews-widget/?source=http://localhost:8000/<data-repo>/`.

---

## Repo layout

```
assets/js/reviews-widget.js     the widget: loads a data repo, renders, computes counts and JSON-LD
assets/css/reviews-widget.css   layout and behavior; reads the --rw-* variables from the data repo's theme
index.html, embed.html          bare widget pages (noindex, transparent): ?source=<data repo URL>
scripts/import_reviews.py       scraper output -> reviews/<year>.json + avatars (new only, or --update)
scripts/pull_reviews.py         weekly sync: Apify inputs, direct Zola pull, import, AI summary staleness
scripts/validate.mjs            data repo checks (used by the reusable workflow)
.github/workflows/validate.yml  reusable workflow the data repos call on push
.github/workflows/check.yml     syntax check of this repo's code
```

Review content belongs to its authors and is shown with a link back to the original. Platform marks belong to their owners (see each data repo's README for icon sources and font licenses).
