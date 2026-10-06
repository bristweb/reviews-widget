# Comparison

Side-by-side look at this open, static reviews widget versus common **hosted review-widget** products and **reputation / review-management** platforms. Features and plans change — check each vendor’s docs for the current product.

**Key**

| | Meaning |
|---|---|
| ✅ | Built-in or a normal part of the product |
| 🟡 | Partial — limits, paid tiers, add-ons, or a different product shape |
| ❌ | Not offered, or not the product’s model |

Columns: **reviews-widget**, then **Birdeye** (strongest full-suite competitor), then other reputation platforms, review networks, and simpler embed widgets. Superscripts point to short notes under the table.

| Feature | **reviews-widget** | [Birdeye](https://birdeye.com/) | [Reputation.com](https://reputation.com/) | [Podium](https://www.podium.com/) | [Trustpilot](https://www.trustpilot.com/) | [Google Business Profile](https://business.google.com/) | [ProvenExpert](https://www.provenexpert.com/) | [Yelp](https://www.yelp.com/) | [Elfsight](https://elfsight.com/all-in-one-reviews-widget/) | [EmbedSocial](https://embedsocial.com/review-widget/) | [SociableKIT](https://www.sociablekit.com/) | [Tagembed](https://tagembed.com/) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Self-hosted** (you serve the embed) | ✅¹ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Free to run** at modest traffic | ✅² | ❌ | ❌ | ❌ | 🟡 | ✅ | 🟡 | 🟡 | 🟡³ | 🟡 | 🟡 | 🟡 |
| **Static files** (no vendor server for the widget) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Full copy of the review data you display** | ✅⁴ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **No vendor account** to show reviews on your site | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **schema.org JSON-LD** on the host page | ✅ | ✅ | ✅ | 🟡 | ✅ | ✅ | ✅ | 🟡 | ✅ | ✅ | 🟡 | 🟡 |
| **Summary card** on the site | ✅⁶ | ✅ | ✅ | 🟡 | 🟡 | ❌ | 🟡 | ❌ | 🟡 | ✅⁷ | ❌ | 🟡 |
| **Custom theme** (your fonts / colors / CSS) | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **Sync / collection you control** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Multi-source aggregate widget** | ✅ | ✅ | ✅ | ✅ | 🟡¹¹ | ❌ | 🟡 | ❌ | ✅⁸ | ✅⁹ | ✅ | ✅ |
| **Review request / outreach** | ❌ | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | 🟡 | ❌ | ❌ |
| **Inbox / respond across platforms** | 🟡¹⁴ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ | ❌ | 🟡 | ❌ | ❌ |
| **Vendor lock-in for the on-site widget** | ❌¹² | ✅ | ✅ | ✅ | ✅ | —¹³ | ✅ | —¹³ | ✅ | ✅ | ✅ | ✅ |

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

Because this widget is self-hosted, **any platform is supported**: you store the records yourself, so nothing depends on a vendor’s connector catalog (including sources other services may not offer). The table below is about *built-in connectors / official integrations* for the other products — not whether a human could paste text by hand. Rows cover 100+ common review, directory, marketplace, app-store, B2B, vertical, and social surfaces.

| Platform | **reviews-widget** | Birdeye | Reputation.com | Podium | Trustpilot | Google Business Profile | ProvenExpert | Yelp | Elfsight | EmbedSocial | SociableKIT | Tagembed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Google Maps / Business Profile | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | 🟡 | ❌ | ✅ | ✅ | ✅ | ✅ |
| Yelp¹⁵ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | 🟡 | ✅ | ✅ |
| Facebook | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | 🟡 | ❌ | ✅ | ✅ | ✅ | ✅ |
| BBB | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Yellow Pages | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Citysearch | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Foursquare | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Superpages | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Hotfrog | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Cylex | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Golocal247 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Nextdoor | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| TripAdvisor | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ | ✅ |
| Booking.com | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ | 🟡 |
| Airbnb | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ | ✅ |
| Expedia | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Hotels.com | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Vrbo | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Agoda | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Kayak | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Orbitz | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Travelocity | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Priceline | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| HolidayCheck | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| TheFork | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| OpenTable | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Resy | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| DoorDash | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Uber Eats | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Grubhub | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Deliveroo | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Just Eat | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Postmates | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Amazon¹⁶ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ | 🟡 |
| Etsy | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ | 🟡 |
| eBay | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | 🟡 | ✅ | 🟡 |
| AliExpress | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Walmart | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | ✅ | ❌ |
| Target | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | ✅ | ❌ |
| Best Buy | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Shopify App Store | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Flipkart | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Bol.com | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Newegg | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Costco | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Wayfair | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Apple App Store | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | 🟡 |
| Google Play | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | 🟡 |
| Microsoft Store | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Samsung Galaxy Store | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| G2 | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | 🟡 |
| Capterra | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| TrustRadius | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| GetApp | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Software Advice | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Product Hunt | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | ✅ | ❌ |
| Clutch | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | ✅ | ❌ |
| The Manifest | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| DesignRush | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Sortlist | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| PeerSpot | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Gartner Peer Insights | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Slashdot | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| AlternativeTo | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| FinancesOnline | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Trustpilot¹⁷ | ✅ | 🟡 | 🟡 | ❌ | ✅ | ❌ | ❌ | ❌ | 🟡 | ✅ | ✅ | 🟡 |
| ProvenExpert | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Sitejabber | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Reviews.io | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Feefo | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| ResellerRatings | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Trusted Shops | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| ConsumerAffairs | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Reviewcentre | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| ProductReview.com.au | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Angi | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| HomeAdvisor | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Thumbtack | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Bark | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Houzz | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Checkatrade | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Hipages | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| HomeStars | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| TaskRabbit | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Zola | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| WeddingWire | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| The Knot | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Here Comes The Guide | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Joy | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| DealerRater | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Edmunds | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Cars.com | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| CarGurus | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Autotrader | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Carfax | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Kelly Blue Book | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Healthgrades | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Vitals | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| RateMDs | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Zocdoc | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| WebMD | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Caring.com | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| A Place for Mom | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| FertilityIQ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Psychology Today | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| RealSelf | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Avvo | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Martindale | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Lawyers.com | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| FindLaw | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Justia | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Glassdoor | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | ✅ | ❌ |
| Indeed | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ | ✅ | ❌ |
| Comparably | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Kununu | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Blind | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Zillow | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| Apartments.com | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| ApartmentRatings | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Realtor.com | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Redfin | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| GreatSchools | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Niche | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Rate My Professors | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Course Report | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Reddit¹⁸ | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| X (Twitter)¹⁸ | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Instagram¹⁸ | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| LinkedIn | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| TikTok | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| YouTube | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Steam | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Goodreads | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Influenster | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Weedmaps | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| ClassPass | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| LendingTree | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Credit Karma | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Bass Pro / Cabela's | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |
| Michaels | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🟡 | ❌ |

15. Yelp via EmbedSocial is capped (about three random reviews per business) because of Yelp’s API limits.
16. Amazon often needs a manual / CSV-style import on several hosted widgets; not always a full live API sync.
17. Trustpilot generally does not allow third-party widgets to re-embed Trustpilot reviews; use Trustpilot’s own embeds or store a copy yourself (as with this widget).
18. Instagram / X / Reddit are not classic star-review graphs; some vendors treat them as social feeds or recommendations. This widget can still store and display whatever review-shaped records you collect there.

Marks for other vendors are based on their public docs and connector lists (and may change). Treat 🟡 as “partial, plan-gated, manual import, monitoring-only, or limited API.” **reviews-widget** is ✅ on every row because any source you can turn into the data format can be displayed. Elfsight also offers a custom/manual source for platforms without a connector — that is still not a live connector, so unlisted rows stay ❌ here.

### Reading the columns

Column order after this widget: **Birdeye** first among competitors (broadest reputation + multi-source suite), then other reputation / messaging platforms, then review networks that mainly host their own graph, then simpler hosted embed widgets.

- **reviews-widget** is only the on-site display layer plus a data format. Collection (scrapers, hand entry, …) and any owner-reply / response automation live in each data store’s own tooling if you want them — there is no native inbox, but the data you own makes those workflows possible.
- **Birdeye**, **Reputation.com**, **Podium** — reputation / messaging suites: widgets exist, but the core product is listing management, outreach, and inbox.
- **Trustpilot**, **Google Business Profile**, **ProvenExpert**, **Yelp** — review platforms with their own badges/widgets; not drop-in self-hosted multi-source carousels.
- **Elfsight**, **EmbedSocial**, **SociableKIT**, **Tagembed** — hosted multi-source review embeds.

Corrections welcome via PR.
