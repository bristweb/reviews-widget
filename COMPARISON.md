# Comparison

Side-by-side look at this open, static reviews widget versus common **hosted review-widget** products, **reputation / review-management** suites, and **review platforms** that sell their own badges/widgets (e.g. Trustpilot, ProvenExpert). Source networks like Google and Yelp appear as **rows** in the platform-support table, not as product columns. Features and plans change — check each vendor’s docs for the current product.

**Key**

| | Meaning |
|---|---|
| ✅ | Built-in or a normal part of the product |
| 🟡 | Partial — limits, paid tiers, add-ons, or a different product shape |
| ❌ | Not offered, or not the product’s model |

Columns: **reviews-widget** first; other products sorted by score (✅×2 + 🟡) on that table, high to low. Superscripts point to short notes under the table.

| Feature | **reviews-widget** | [Birdeye](https://birdeye.com/) | [Reputation.com](https://reputation.com/) | [EmbedSocial](https://embedsocial.com/review-widget/) | [Trustpilot](https://www.trustpilot.com/) | [Podium](https://www.podium.com/) | [ProvenExpert](https://www.provenexpert.com/) | [Elfsight](https://elfsight.com/all-in-one-reviews-widget/) | [Tagembed](https://tagembed.com/) | [SociableKIT](https://www.sociablekit.com/) |
|---|---|---|---|---|---|---|---|---|---|---|
| **Self-hosted** (you serve the embed) | ✅¹ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Free to run** at modest traffic | ✅² | ❌ | ❌ | 🟡 | 🟡 | ❌ | 🟡 | 🟡³ | 🟡 | 🟡 |
| **Static files** (no vendor server for the widget) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Full copy of the review data you display** | ✅⁴ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **No vendor account** to show reviews on your site | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **schema.org JSON-LD** on the host page | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ | ✅ | 🟡 | 🟡 |
| **Summary card** on the site | ✅⁶ | ✅ | ✅ | ✅⁷ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | ❌ |
| **Custom theme** (your fonts / colors / CSS) | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 |
| **Sync / collection you control** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Multi-source aggregate widget** | ✅ | ✅ | ✅ | ✅⁹ | 🟡¹¹ | ✅ | 🟡 | ✅⁸ | ✅ | ✅ |
| **Review request / outreach** | ❌ | ✅ | ✅ | 🟡 | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Inbox / respond across platforms** | 🟡¹⁴ | ✅ | ✅ | 🟡 | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ |
| **Vendor lock-in for the on-site widget** | ❌¹² | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

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
14. No built-in inbox or reply UI — but you keep the full review records (including stored owner replies), so you can build your own response / follow-up workflows on top of that data.

### Review / social platforms you can show

Because this widget is self-hosted, **any platform is supported**: you can gather the records however you like (automation or by hand), so nothing depends on a vendor’s connector catalog (including sources other services may not offer). The table below is about *built-in connectors / official integrations* for the other products (including whether a review platform only “connects” to itself). Rows cover 100+ common review, directory, marketplace, app-store, B2B, vertical, and social surfaces.

| Platform | **reviews-widget** | Birdeye | SociableKIT | Reputation.com | Elfsight | Podium | Tagembed | EmbedSocial | ProvenExpert | Trustpilot |
|---|---|---|---|---|---|---|---|---|---|---|
| Google Maps / Business Profile | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ |
| Yelp | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡¹⁵ | ❌ | ❌ |
| Facebook | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ |
| BBB | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Yellow Pages | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Citysearch | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Foursquare | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Superpages | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Hotfrog | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cylex | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Golocal247 | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Nextdoor | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| TripAdvisor | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ |
| Booking.com | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ |
| Airbnb | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ |
| Expedia | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Hotels.com | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vrbo | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Agoda | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Kayak | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Orbitz | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Travelocity | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Priceline | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| HolidayCheck | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| TheFork | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| OpenTable | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Resy | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DoorDash | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Uber Eats | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Grubhub | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Deliveroo | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Just Eat | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Postmates | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Amazon¹⁶ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ |
| Etsy | ✅ | 🟡 | ✅ | 🟡 | ✅ | ❌ | 🟡 | 🟡 | ❌ | ❌ |
| eBay | ✅ | 🟡 | ✅ | 🟡 | ✅ | ❌ | 🟡 | 🟡 | ❌ | ❌ |
| AliExpress | ✅ | 🟡 | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Walmart | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Target | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Best Buy | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Shopify App Store | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Flipkart | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Bol.com | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Newegg | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Costco | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Wayfair | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Apple App Store | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ |
| Google Play | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ |
| Microsoft Store | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Samsung Galaxy Store | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| G2 | ✅ | 🟡 | ✅ | 🟡 | ✅ | ❌ | 🟡 | ❌ | ❌ | ❌ |
| Capterra | ✅ | 🟡 | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| TrustRadius | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| GetApp | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Software Advice | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Product Hunt | ✅ | 🟡 | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Clutch | ✅ | 🟡 | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ |
| The Manifest | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DesignRush | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Sortlist | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PeerSpot | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Gartner Peer Insights | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Slashdot | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| AlternativeTo | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| FinancesOnline | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Trustpilot¹⁷ | ✅ | 🟡 | ✅ | 🟡 | 🟡 | ❌ | 🟡 | ✅ | ❌ | ✅ |
| ProvenExpert | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Sitejabber | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reviews.io | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Feefo | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ResellerRatings | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Trusted Shops | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ConsumerAffairs | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reviewcentre | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ProductReview.com.au | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Angi | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| HomeAdvisor | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Thumbtack | ✅ | ✅ | ✅ | ✅ | ❌ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Bark | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Houzz | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ |
| Checkatrade | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Hipages | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| HomeStars | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| TaskRabbit | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Zola | ✅ | 🟡 | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| WeddingWire | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| The Knot | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Here Comes The Guide | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Joy | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DealerRater | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Edmunds | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cars.com | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| CarGurus | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Autotrader | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Carfax | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Kelly Blue Book | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Healthgrades | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vitals | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| RateMDs | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Zocdoc | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| WebMD | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Caring.com | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| A Place for Mom | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| FertilityIQ | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Psychology Today | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| RealSelf | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Avvo | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Martindale | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Lawyers.com | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| FindLaw | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Justia | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Glassdoor | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Indeed | ✅ | ✅ | ✅ | ✅ | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ |
| Comparably | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Kununu | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Blind | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Zillow | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Apartments.com | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ApartmentRatings | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Realtor.com | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Redfin | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| GreatSchools | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Niche | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Rate My Professors | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Course Report | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Reddit¹⁸ | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| X (Twitter)¹⁸ | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Instagram¹⁸ | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| LinkedIn | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| TikTok | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| YouTube | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Steam | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Goodreads | ✅ | 🟡 | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Influenster | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Weedmaps | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ClassPass | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| LendingTree | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Credit Karma | ✅ | ✅ | 🟡 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Bass Pro / Cabela's | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Michaels | ✅ | 🟡 | 🟡 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

15. Yelp via EmbedSocial is capped (about three random reviews per business) because of Yelp’s API limits.
16. Amazon often needs a manual / CSV-style import on several hosted widgets; not always a full live API sync.
17. Trustpilot generally does not allow third-party widgets to re-embed Trustpilot reviews; use Trustpilot’s own embeds or store a copy yourself (as with this widget).
18. Instagram / X / Reddit are not classic star-review graphs; some vendors treat them as social feeds or recommendations. This widget can still store and display whatever review-shaped records you collect there.

Marks for other vendors are based on their public docs and connector lists (and may change). Treat 🟡 as “partial, plan-gated, manual import, monitoring-only, or limited API.” **reviews-widget** is ✅ on every row because any source you can turn into the data format can be displayed. Elfsight also offers a custom/manual source for platforms without a connector — that is still not a live connector, so unlisted rows stay ❌ here.

### Reading the columns

Each matrix sorts competitor columns by its own score: **✅ × 2 + 🟡** (reviews-widget always first). Feature-matrix order and platform-support order can differ. Google Business Profile and Yelp are **not** product columns — they are review platforms / source networks listed as **rows** under platform support.

- **reviews-widget** is only the on-site display layer plus a data format. Collection (scrapers, hand entry, …) and any owner-reply / response automation live in each data store’s own tooling if you want them — there is no native inbox, but the data you own makes those workflows possible.
- **Birdeye**, **Reputation.com**, **Podium** — reputation / review-management / messaging suites: widgets exist, but the core product is listing management, outreach, and inbox across many sources.
- **Trustpilot**, **ProvenExpert** — review platforms that also sell first-party badges/widgets (still not self-hosted multi-source carousels).
- **Elfsight**, **EmbedSocial**, **SociableKIT**, **Tagembed** — hosted multi-source review embeds (pull from networks like Google/Yelp into a vendor widget).

Corrections welcome via PR.
