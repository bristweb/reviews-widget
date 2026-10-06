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

| | **reviews-widget** | [Elfsight](https://elfsight.com/all-in-one-reviews-widget/) | [EmbedSocial](https://embedsocial.com/review-widget/) | [SociableKIT](https://www.sociablekit.com/) | [Tagembed](https://tagembed.com/) | [ProvenExpert](https://www.provenexpert.com/) | [Trustpilot](https://www.trustpilot.com/) | [Google Business Profile](https://business.google.com/) | [Yelp](https://www.yelp.com/) | [Birdeye](https://birdeye.com/) | [Podium](https://www.podium.com/) | [Reputation.com](https://reputation.com/) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Self-hosted** (you serve the embed) | ✅¹ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Free to run** at modest traffic | ✅² | 🟡³ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ |
| **Static files** (no vendor server for the widget) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Full copy of the review data you display** | ✅⁴ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **No vendor account** to show reviews on your site | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **schema.org JSON-LD** on the host page | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ | ✅ | ✅ | 🟡 | ✅ | 🟡 | ✅ |
| **Summary card** on the site | ✅⁶ | 🟡 | ✅⁷ | ❌ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ✅ | 🟡 | ✅ |
| **Custom theme** (your fonts / colors / CSS) | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **Sync / collection you control** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Multi-source aggregate widget** | ✅ | ✅⁸ | ✅⁹ | ✅ | ✅ | 🟡 | 🟡¹¹ | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Review request / outreach** | ❌ | ❌ | 🟡 | ❌ | ❌ | ✅ | ✅ | 🟡 | 🟡 | ✅ | ✅ | ✅ |
| **Inbox / respond across platforms** | 🟡¹⁴ | ❌ | 🟡 | ❌ | ❌ | 🟡 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Vendor lock-in for the on-site widget** | ❌¹² | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | —¹³ | —¹³ | ✅ | ✅ | ✅ |

**Notes**

1. Static files; e.g. GitHub Pages or any static host.
2. e.g. GitHub Pages or another free static host.
3. Free tiers usually mean view caps and/or vendor branding.
4. Your data repo (or folder) is the copy the widget reads.
6. Summary text you store in `config.json` (labeled “Summary” in the widget).
7. AI summaries / tagging on higher plans.
8. 30+ review sources.
9. Google, Facebook, Trustpilot, Yelp, and more.
11. Trustpilot-first; third-party re-embeds are restricted.
12. Plain JSON + JS you can fork; no account required.
13. Not applicable — Google / Yelp are the review surfaces themselves, not a third-party embed you swap out.
14. No built-in inbox or reply UI — but you keep the full review records (including stored owner replies), so you can build your own response / follow-up workflows on top of that data.

### Review / social platforms you can show

Because this widget is self-hosted, **any platform is supported**: you store the records yourself, so nothing depends on a vendor’s connector catalog (including sources other services may not offer). The table below is about *built-in connectors / official integrations* for the other products — not whether a human could paste text by hand.

| Platform | **reviews-widget** | Elfsight | EmbedSocial | SociableKIT | Tagembed | ProvenExpert | Trustpilot | Google Business Profile | Yelp | Birdeye | Podium | Reputation.com |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Google Maps / Business Profile | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Yelp | ✅ | ✅ | 🟡¹⁵ | ✅ | 🟡 | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Facebook | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Amazon | ✅ | ✅ | 🟡¹⁶ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | 🟡 | 🟡 | 🟡 |
| Etsy | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | 🟡 |
| Zola | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| TripAdvisor | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Trustpilot | ✅ | ❌¹⁷ | ✅ | 🟡 | 🟡 | 🟡 | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Apple App Store | ✅ | ✅ | ❌ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | 🟡 |
| Google Play | ✅ | ✅ | ❌ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | 🟡 |
| Airbnb | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ |
| Booking.com | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ |

15. Yelp via EmbedSocial is capped (about three random reviews per business) because of Yelp’s API limits.
16. Amazon often needs a manual / CSV-style import; not a full live API sync.
17. Trustpilot generally does not allow third-party widgets to re-embed Trustpilot reviews; use Trustpilot’s own embeds or store a copy yourself (as with this widget).

Marks for other vendors are based on their public docs and may change; treat 🟡 as “partial, plan-gated, manual import, or limited API.” **reviews-widget** is ✅ on every row because any source you can turn into the data format can be displayed.

### Reading the columns

- **reviews-widget** is only the on-site display layer plus a data format. Collection (scrapers, hand entry, …) and any owner-reply / response automation live in each data store’s own tooling if you want them — there is no native inbox, but the data you own makes those workflows possible.
- **Elfsight**, **EmbedSocial**, **SociableKIT**, **Tagembed** — hosted multi-source review embeds.
- **ProvenExpert**, **Trustpilot**, **Google Business Profile**, **Yelp** — review platforms with their own badges/widgets; not drop-in self-hosted multi-source carousels.
- **Birdeye**, **Podium**, **Reputation.com** — reputation / messaging suites: widgets exist, but the core product is listing management, outreach, and inbox.

Corrections welcome via PR.
