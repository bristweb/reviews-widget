# Comparison

Side-by-side look at this open, static reviews widget versus common **hosted review-widget** products and **reputation / review-management** platforms. Use it only as a starting point; features and plans change — check each vendor’s docs for the current product.

Inspired by [TanStack Router’s comparison](https://tanstack.com/router/latest/docs/comparison): named options, a feature matrix, and no claim that one row covers every nuance.

**Key**

| Mark | Meaning |
|---|---|
| Yes | Built-in or a normal part of the product |
| Partial | Available with limits, paid tiers, add-ons, or a different product shape |
| No | Not offered, or not the product’s model |

Columns are this widget, then representative **embeddable review widgets**, then **platforms** that own the review graph and/or sell reputation tooling (some also ship a website badge or widget).

| | **reviews-widget** (this repo) | [Elfsight](https://elfsight.com/all-in-one-reviews-widget/) | [EmbedSocial](https://embedsocial.com/review-widget/) | [SociableKIT](https://www.sociablekit.com/) | [Tagembed](https://tagembed.com/) | [Juicer](https://www.juicer.io/) | [ProvenExpert](https://www.provenexpert.com/) | [Trustpilot](https://www.trustpilot.com/) | [Google Business Profile](https://business.google.com/) / Customer Reviews | [Yelp](https://www.yelp.com/) | [Birdeye](https://birdeye.com/) | [Podium](https://www.podium.com/) | [Reputation.com](https://reputation.com/) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Self-hosted** (you serve the embed) | Yes (static files / GitHub Pages) | No (vendor hosts the script) | No | No | No | No | No | No | No | No | No | No | No |
| **Free to run** at modest traffic | Yes (e.g. GitHub Pages) | Partial (free tier, view caps + branding) | Partial (free / limited tier) | Partial | Partial | Partial | Partial | Partial (free business tools; paid for more) | Yes (profile + reviews) | Partial (free listing; ads/widgets limited) | No (sales-led) | No (sales-led) | No (sales-led) |
| **Static files** (no vendor server for the widget) | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| **You keep a full copy of review data** you display | Yes (your data repo) | Partial (export / dashboard; primary copy is vendor’s) | Partial | Partial | Partial | Partial (social posts) | Partial (reviews live on ProvenExpert) | Partial (reviews live on Trustpilot) | Partial (reviews live on Google) | Partial (reviews live on Yelp) | Partial (platform-centric) | Partial | Partial |
| **No vendor account required** to show reviews on your site | Yes | No | No | No | No | No | No | No | No | No | No | No | No |
| **schema.org JSON-LD** for the host page | Yes (computed in the browser) | Yes | Yes | Partial | Partial | No (UGC / social focus) | Yes | Yes (Trustpilot markup / rich results where eligible) | Yes (Google’s own) | Partial | Yes | Partial | Yes |
| **AI summary** of reviews on the site | Yes (text you store in config) | Partial (varies by widget / plan) | Yes (AI summaries / tagging on higher plans) | No | Partial | No | Partial | Partial | No | No | Yes | Partial | Yes |
| **Custom theme** (fonts, colors, CSS you control) | Yes (`theme/theme.css`) | Partial (builder + custom CSS on plans) | Partial | Partial | Partial | Partial | Partial | Partial (badge / widget presets) | Partial | Partial | Partial | Partial | Partial |
| **Sync / collection you control** (your scripts, your schedule) | Yes | No (vendor crawl / connect) | No | No | No | No | No (platform collects) | No | No (Google collects) | No | No (platform workflows) | No | No |
| **Multi-source aggregate widget** (several sites in one embed) | Yes (whatever you store) | Yes (30+ sources) | Yes (Google, Facebook, Trustpilot, Yelp, …) | Yes | Yes | Partial (social networks; not a review desk) | Partial (ProvenExpert-centric) | Partial (Trustpilot-first; third-party embeds restricted) | No (Google only) | No (Yelp only) | Yes | Yes | Yes |
| **Review generation / request outreach** | No | No | Partial | No | No | No | Yes | Yes | Partial (asks via Google) | Partial | Yes | Yes | Yes |
| **Inbox / respond across platforms** | No | No | Partial | No | No | No | Partial | Yes | Yes (in Google) | Yes (in Yelp) | Yes | Yes | Yes |
| **Vendor lock-in for the on-site widget** | No (plain JSON + JS) | Yes | Yes | Yes | Yes | Yes | Yes | Yes | n/a (Google surfaces) | n/a | Yes | Yes | Yes |

### Notes

- **reviews-widget** is only the on-site display layer plus a data format. Collection (Apify, direct fetches, hand entry, …) lives in each data repo’s own tooling if you want it.
- **Juicer** is included as a common “feed on your site” embed; it is primarily social/UGC aggregation, not a multi-platform review desk.
- **Trustpilot**, **Google**, and **Yelp** are sources of reviews *and* products with their own badges/widgets; they are not drop-in replacements for a self-hosted multi-source carousel, and some (notably Trustpilot) limit third-party re-embeds.
- **Birdeye**, **Podium**, and **Reputation.com** are reputation / messaging suites: widgets exist, but the core product is listing management, outreach, and inbox — not a free static embed you host yourself.
- “Partial” for **free** or **theme** usually means a capped free plan, branding, or builder presets rather than full CSS ownership.

Corrections welcome via PR.
