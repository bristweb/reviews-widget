# Comparison

Side-by-side look at this open, static reviews widget versus common **hosted review-widget** products and **reputation / review-management** platforms. Features and plans change — check each vendor’s docs for the current product.

Inspired by [TanStack Router’s comparison](https://tanstack.com/router/latest/docs/comparison): named options, a feature matrix, and no claim that one row covers every nuance.

**Key**

| | Meaning |
|---|---|
| ✅ | Built-in or a normal part of the product |
| 🟡 | Partial — limits, paid tiers, add-ons, or a different product shape |
| ❌ | Not offered, or not the product’s model |

Columns: this widget → representative **embeddable review widgets** → **platforms** that own the review graph and/or sell reputation tooling (some also ship a website badge or widget). Superscripts point to short notes under the table.

| | **reviews-widget** | [Elfsight](https://elfsight.com/all-in-one-reviews-widget/) | [EmbedSocial](https://embedsocial.com/review-widget/) | [SociableKIT](https://www.sociablekit.com/) | [Tagembed](https://tagembed.com/) | [Juicer](https://www.juicer.io/) | [ProvenExpert](https://www.provenexpert.com/) | [Trustpilot](https://www.trustpilot.com/) | [Google Business Profile](https://business.google.com/) | [Yelp](https://www.yelp.com/) | [Birdeye](https://birdeye.com/) | [Podium](https://www.podium.com/) | [Reputation.com](https://reputation.com/) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Self-hosted** (you serve the embed) | ✅¹ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Free to run** at modest traffic | ✅² | 🟡³ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ |
| **Static files** (no vendor server for the widget) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Full copy of the review data you display** | ✅⁴ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡⁵ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **No vendor account** to show reviews on your site | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **schema.org JSON-LD** on the host page | ✅ | ✅ | ✅ | 🟡 | 🟡 | ❌ | ✅ | ✅ | ✅ | 🟡 | ✅ | 🟡 | ✅ |
| **AI summary** of reviews on the site | ✅⁶ | 🟡 | ✅⁷ | ❌ | 🟡 | ❌ | 🟡 | 🟡 | ❌ | ❌ | ✅ | 🟡 | ✅ |
| **Custom theme** (your fonts / colors / CSS) | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **Sync / collection you control** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Multi-source aggregate widget** | ✅ | ✅⁸ | ✅⁹ | ✅ | ✅ | 🟡¹⁰ | 🟡 | 🟡¹¹ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Review request / outreach** | ❌ | ❌ | 🟡 | ❌ | ❌ | ❌ | ✅ | ✅ | 🟡 | 🟡 | ✅ | ✅ | ✅ |
| **Inbox / respond across platforms** | ❌ | ❌ | 🟡 | ❌ | ❌ | ❌ | 🟡 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Vendor lock-in for the on-site widget** | ❌¹² | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | —¹³ | —¹³ | ✅ | ✅ | ✅ |

**Notes**

1. Static files; e.g. GitHub Pages or any static host.
2. e.g. GitHub Pages or another free static host.
3. Free tiers usually mean view caps and/or vendor branding.
4. Your data repo (or folder) is the copy the widget reads.
5. Juicer is mainly social / UGC posts, not a review desk.
6. Summary text you store in `config.json`.
7. AI summaries / tagging on higher plans.
8. 30+ review sources.
9. Google, Facebook, Trustpilot, Yelp, and more.
10. Social networks; not multi-platform review aggregation.
11. Trustpilot-first; third-party re-embeds are restricted.
12. Plain JSON + JS you can fork; no account required.
13. Not applicable — Google / Yelp are the review surfaces themselves, not a third-party embed you swap out.

### Reading the columns

- **reviews-widget** is only the on-site display layer plus a data format. Collection (scrapers, hand entry, …) lives in each data store’s own tooling if you want it.
- **Elfsight**, **EmbedSocial**, **SociableKIT**, **Tagembed** — hosted multi-source review embeds.
- **Juicer** — common “feed on your site” embed; primarily social/UGC.
- **ProvenExpert**, **Trustpilot**, **Google Business Profile**, **Yelp** — review platforms with their own badges/widgets; not drop-in self-hosted multi-source carousels.
- **Birdeye**, **Podium**, **Reputation.com** — reputation / messaging suites: widgets exist, but the core product is listing management, outreach, and inbox.

Corrections welcome via PR.
