#!/usr/bin/env python3
"""Normalize raw scraper output into review records in a data repo (reviews/<year>.json).

Usage (run from anywhere; --data is the data repo checkout, default: current directory):
  python3 reviews-widget/scripts/import_reviews.py --data fastone-reviews --amazon .pull/amazon.json --source apify
  python3 reviews-widget/scripts/import_reviews.py --data heather-wolfe-art-reviews --google g.json --yelp y.json \
      --facebook fb.json --source apify
  python3 reviews-widget/scripts/import_reviews.py --data heather-wolfe-art-reviews --zola zola.json --source direct

Raw inputs (see README "Weekly sync"):
  google   : Apify compass/Google-Maps-Reviews-Scraper dataset items (JSON array)
  yelp     : Apify web_wanderer/yelp-reviews-scraper dataset items
  facebook : Apify apify/facebook-reviews-scraper dataset items
  zola     : review objects extracted from the Zola storefront __NEXT_DATA__
  etsy     : Apify astravalabs/etsy-reviews-scraper dataset items (etsy.com itself is behind DataDome)
  amazon   : Apify junglee/amazon-reviews-scraper dataset items (Amazon review pages need a login)

A review is identified by (platform, platform_review_id). By default only NEW reviews are added; --update also
refreshes existing ones (they keep collected_at, source, their avatar and a hand-set featured_on_website flag).
EVERYTHING is stored: full reviewer name, full text, owner reply (text + date), reviewer profile URL, avatar source
URL, individual review URL, plus platform extras. Abbreviating names and clipping text happens only in the widget.
Each review goes into reviews/<year of its date>.json (an array, newest first). When a review starts a new year,
the file is created and the year is added to config.json reviews.years. Avatars are downloaded (never hotlinked) to
images/reviewers/<platform>-<platform_review_id>.<ext>, the id made filesystem-safe (characters other than
A-Z a-z 0-9 _ - become _); an initials SVG is generated when the platform has no photo.
"""
import argparse, datetime, hashlib, html, json, os, re, sys, urllib.request

NOW = datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')
ROOT = CONFIG = PLATFORMS = None
REVIEW_PAGE, ETSY_LISTINGS, AMAZON_ASINS, PALETTE, INITIALS_TEXT = {}, set(), set(), ['#555555'], '#fff'


def dump(obj, path):
    with open(path, 'w') as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write('\n')


def init(data_dir):
    """Everything site-specific comes from <data>/config.json: per-platform page_url (fallback link when a review
    has no URL of its own), Amazon `asins` / Etsy `listing_ids` filters, product title, the initials-avatar palette."""
    global ROOT, CONFIG, PLATFORMS, REVIEW_PAGE, ETSY_LISTINGS, AMAZON_ASINS, PALETTE, INITIALS_TEXT
    ROOT = os.path.abspath(data_dir)
    with open(os.path.join(ROOT, 'config.json')) as f:
        CONFIG = json.load(f)
    PLATFORMS = CONFIG.get('platforms', {})
    REVIEW_PAGE = {k: v.get('page_url') for k, v in PLATFORMS.items()}
    ETSY_LISTINGS = {str(i) for i in PLATFORMS.get('etsy', {}).get('listing_ids') or []}  # optional: only these listings
    AMAZON_ASINS = {str(i) for i in PLATFORMS.get('amazon', {}).get('asins') or []}       # optional: only these ASINs
    av = CONFIG.get('avatars', {})
    PALETTE = av.get('initials_palette') or ['#555555']
    INITIALS_TEXT = av.get('initials_text_color', '#fff')


def load_reviews(data_dir=None):
    """All stored reviews (every year listed in config.json reviews.years)."""
    root = os.path.abspath(data_dir) if data_dir else ROOT
    cfg = CONFIG if not data_dir else json.load(open(os.path.join(root, 'config.json')))
    out = []
    for y in (cfg.get('reviews') or {}).get('years', []):
        with open(os.path.join(root, 'reviews', f'{y}.json')) as f:
            out += json.load(f)
    return out


def safe_id(s):
    return re.sub(r'[^A-Za-z0-9_-]', '_', str(s))


def display_name(name):
    """Used for initials avatars only. 'Jane Doe' -> 'Jane D.'; 'Mary Smith (Smith Studio)' -> 'Mary S.';
    'Ann And Bob C.' -> 'Ann & Bob C.'; 'Ashley' -> 'Ashley'; 'JANE D.' -> 'Jane D.'. """
    n = re.sub(r'\(.*?\)', ' ', name or '').strip()
    words = [w for w in re.split(r'\s+', n) if w]
    if not words:
        return 'Anonymous'
    fix = lambda w: w if w.isupper() and len(w) <= 2 else w.capitalize() if w.isupper() or w.islower() else w  # 'AA' stays
    if len(words) == 1:
        return fix(words[0])
    first, last = words[:-1], words[-1]
    # keep couples like "Ann And Bob C."; otherwise only the first given name
    if not (len(first) >= 3 and first[1].lower() in ('and', '&')):
        first = first[:1]
    first = ['&' if w.lower() in ('and', '&') else fix(w) for w in first]
    return ' '.join(first) + ' ' + last[0].upper() + '.'


def initials_svg(name, path):
    parts = [p for p in re.split(r'[\s.]+', re.sub(r'\(.*?\)', '', name or '')) if p and p[0].isalpha()]
    ini = (''.join(p[0] for p in parts[:2]) or '?').upper()
    color = PALETTE[int(hashlib.md5((name or '').encode()).hexdigest(), 16) % len(PALETTE)]
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="{html.escape(name or "")}">'
           f'<rect width="120" height="120" rx="60" fill="{color}"/>'
           f'<text x="60" y="60" dy=".35em" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" '
           f'font-size="46" font-weight="600" fill="{INITIALS_TEXT}">{html.escape(ini)}</text></svg>')
    with open(path, 'w') as f:
        f.write(svg)


def fetch_avatar(url, base):
    """Download avatar -> data-relative path (images/reviewers/<base>.<ext>), or None."""
    if not url:
        return None
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as r:
            data, ctype = r.read(), r.headers.get('Content-Type', '')
        ext = '.png' if 'png' in ctype else '.webp' if 'webp' in ctype else '.jpg'
        rel = f'images/reviewers/{base}{ext}'
        with open(os.path.join(ROOT, rel), 'wb') as f:
            f.write(data)
        return rel
    except Exception as e:  # expired/blocked URL -> initials
        print('avatar failed', base, e, file=sys.stderr)
        return None


def iso(d):
    if isinstance(d, (int, float)):
        return datetime.datetime.fromtimestamp(d / 1000, datetime.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')
    dt = datetime.datetime.fromisoformat(d.replace('Z', '+00:00'))
    return dt.astimezone(datetime.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')


def etsy_date(d):
    """Etsy gives a calendar day ('Oct 21, 2025'); stored at 12:00 UTC so it shows as that day in US time zones."""
    if not d:
        return None
    try:
        return iso(d)
    except ValueError:
        return datetime.datetime.strptime(d.strip(), '%b %d, %Y').strftime('%Y-%m-%dT12:00:00Z')


def reply(text, date):
    return {'text': text, 'date': iso(date) if date else None} if text else None


def from_google(x):
    photo = x.get('reviewerPhotoUrl')
    return dict(platform='google', pid=x['reviewId'], name=x.get('name'), photo=photo,
                photo_dl=re.sub(r'=s\d+.*$', '=s160-c', photo) if photo else None,
                profile=x.get('reviewerUrl'), rating=x.get('stars'),
                text=x.get('text') or '', date=iso(x['publishedAtDate']),
                url=x.get('reviewUrl') or REVIEW_PAGE['google'],
                reply=reply(x.get('responseFromOwnerText'), x.get('responseFromOwnerDate')),
                extra={'reviewer_review_count': x.get('reviewerNumberOfReviews'),
                       'reviewer_is_local_guide': x.get('isLocalGuide'),
                       'review_image_urls': x.get('reviewImageUrls') or None,
                       'language': x.get('originalLanguage')})


def from_yelp(x):
    a = x.get('author') or {}
    pr = x.get('publicReply') or {}
    return dict(platform='yelp', pid=x['reviewEncid'], name=a.get('name'), photo=a.get('profile_photo'),
                profile=None, rating=x.get('rating'), text=x.get('text') or '', date=iso(x['reviewDate']),
                url=x.get('reviewUrl') or REVIEW_PAGE['yelp'],
                reply=reply(pr.get('text'), pr.get('created_at')),
                extra={'reviewer_review_count': a.get('review_count'),
                       'review_image_urls': [ph.get('url') for ph in x.get('photos') or [] if ph.get('url')] or None,
                       'language': x.get('language')})


def fb_star_tag(tags):
    """Facebook reviews are recommend / don't recommend. A star value is stored only when Facebook itself shows one,
    i.e. a recommendation tag like '5 stars' on the review. Never inferred from 'recommends'."""
    for t in tags or []:
        m = re.fullmatch(r'\s*([1-5])\s*stars?\s*', str(t), re.I)
        if m:
            return int(m.group(1)), t
    return None, None


def from_facebook(x):
    u = x.get('user') or {}
    stars, tag = fb_star_tag(x.get('tags'))
    return dict(platform='facebook', pid=x['id'], name=u.get('name'), photo=u.get('profilePic'),
                profile=u.get('profileUrl'), rating=stars, text=x.get('text') or '', date=iso(x['date']),
                url=x.get('url') or REVIEW_PAGE['facebook'], reply=None,
                extra={'recommended': bool(x.get('isRecommended')), 'tags': x.get('tags') or None,
                       'rating_source': f'facebook recommendation tag "{tag}"' if tag else None})


def from_zola(x):
    resp = next(iter(x.get('responses') or []), {}) or {}
    return dict(platform='zola', pid=x['reviewUuid'], name=x.get('reviewerName'), photo=x.get('reviewerPhotoUrl'),
                profile=None, rating=x.get('overallRating'), text=x.get('reviewText') or '', date=iso(x['createdAt']),
                url=REVIEW_PAGE['zola'],
                reply=reply(resp.get('responseText') or x.get('responseText'), resp.get('createdAt') or x.get('respondedAt')),
                extra={'title': x.get('title'),
                       'review_image_ids': [ph.get('imageUuid') for ph in x.get('reviewPhotos') or []] or None})


def from_etsy(x):
    """Apify astravalabs/etsy-reviews-scraper item. The actor returns every review in the shop; when
    config.json platforms.etsy lists `listing_ids`, reviews of other listings are skipped. Etsy only lets buyers review,
    so each review is tied to an order (`review_id` is Etsy's transaction id). The actor has no avatar field; an
    optional `buyer_avatar_url` / `buyer_profile_url` (read from the listing page's review markup) is used when present."""
    lid = str(x.get('listing_id') or '') or None
    if ETSY_LISTINGS and lid not in ETSY_LISTINGS:
        return None
    name = x.get('buyer')
    photos = [p if isinstance(p, str) else (p or {}).get('url') for p in x.get('photos') or []]
    return dict(platform='etsy', pid=str(x['review_id']), name=None if name == 'Anonymous' else name,
                photo=x.get('buyer_avatar_url'), profile=x.get('buyer_profile_url'), rating=x.get('rating'),
                text=x.get('text') or '', date=etsy_date(x['review_date']),
                url=f'https://www.etsy.com/listing/{lid}#reviews' if lid else REVIEW_PAGE['etsy'],
                reply={'text': x['seller_response'], 'date': etsy_date(x.get('seller_response_date'))} if x.get('seller_response') else None,
                extra={'item_reviewed': {'title': x.get('listing_title'), 'listing_id': lid,
                                         'url': f'https://www.etsy.com/listing/{lid}' if lid else None} if (lid or x.get('listing_title')) else None,
                       'verified_purchase': True,
                       'verified_purchase_source': f'Etsy reviews can only be left by buyers; tied to Etsy transaction {x["review_id"]}',
                       'review_image_urls': [p for p in photos if p] or None,
                       'etsy_shop': x.get('shop'),
                       'etsy_shop_id': x.get('shop_id')})


def from_amazon(x):
    """Apify junglee/amazon-reviews-scraper item (run with includeGdprSensitive: true). Error / category-only rows
    (no reviewId) are skipped, as are ASINs not listed in config.json platforms.amazon `asins` (when that list is set).
    Amazon shows no seller replies on reviews, so owner_reply is always null. The actor returns `avatar: null` when
    Amazon shows its default silhouette; an initials avatar is generated then."""
    if not x.get('reviewId'):
        return None
    asin = x.get('productAsin') or x.get('variantAsin')
    if AMAZON_ASINS and asin not in AMAZON_ASINS and x.get('productOriginalAsin') not in AMAZON_ASINS:
        return None
    try:
        helpful = int(str(x.get('reviewReaction') or '').split()[0].replace(',', ''))
    except (ValueError, IndexError):
        helpful = 1 if str(x.get('reviewReaction') or '').lower().startswith('one') else None
    prof = (x.get('userProfileLink') or '').split('/ref=')[0] or None
    return dict(platform='amazon', pid=x['reviewId'], name=x.get('username'), photo=x.get('avatar'),
                profile=prof, rating=x.get('ratingScore'), text=x.get('reviewDescription') or '',
                date=f"{x['date'][:10]}T12:00:00Z" if re.fullmatch(r'\d{4}-\d{2}-\d{2}', str(x.get('date') or '')) else iso(x['date']),
                url=x.get('reviewUrl') or REVIEW_PAGE['amazon'], reply=None,
                extra={'title': x.get('reviewTitle'),
                       'item_reviewed': {'title': PLATFORMS.get('amazon', {}).get('product_title'), 'asin': asin,
                                         'variant_asin': x.get('variantAsin'),
                                         'variant': x.get('variant') or None,
                                         'url': f'https://www.amazon.com/dp/{asin}' if asin else None},
                       'verified_purchase': bool(x.get('isVerified')),
                       'amazon_vine': bool(x.get('isAmazonVine')) or None,
                       'helpful_votes': helpful,
                       'reviewed_in': x.get('reviewedIn'),
                       'country': x.get('country'),
                       'amazon_user_id': x.get('userId'),
                       'review_image_urls': x.get('reviewImages') or None})


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--data', default='.', help='data repo checkout (has config.json, reviews/, images/)')
    for p in ('google', 'yelp', 'facebook', 'zola', 'etsy', 'amazon'):
        ap.add_argument('--' + p)
    ap.add_argument('--source', default='direct', help="value for the `source` field (direct|apify|elfsight)")
    ap.add_argument('--update', action='store_true',
                    help='also refresh reviews that already exist (default: add new reviews only)')
    a = ap.parse_args()
    init(a.data)
    os.makedirs(os.path.join(ROOT, 'reviews'), exist_ok=True)
    os.makedirs(os.path.join(ROOT, 'images', 'reviewers'), exist_ok=True)
    reviews = load_reviews()
    index = {(r['platform'], r['platform_review_id']): i for i, r in enumerate(reviews)}
    conv = {'google': from_google, 'yelp': from_yelp, 'facebook': from_facebook, 'zola': from_zola, 'etsy': from_etsy,
            'amazon': from_amazon}
    n = 0
    for plat, fn in conv.items():
        path = getattr(a, plat)
        if not path:
            continue
        if plat not in PLATFORMS:
            print(f'{plat}: not in config.json platforms, skipped', file=sys.stderr)
            continue
        with open(path) as f:
            items = json.load(f)
        for x in items:
            r = fn(x)
            if r is None:  # not a review of this business (other listing/ASIN, error row)
                continue
            key = (plat, r['pid'])
            pos = index.get(key)
            if pos is not None and not a.update:
                continue
            old = reviews[pos] if pos is not None else {}
            img = old.get('reviewer_image')
            if not (img and os.path.exists(os.path.join(ROOT, img))):  # keep an already-downloaded avatar
                stem = f'{plat}-{safe_id(r["pid"])}'
                img = fetch_avatar(r.get('photo_dl') or r['photo'], stem)
                if not img:
                    img = f'images/reviewers/{stem}.svg'
                    initials_svg(display_name(r['name']), os.path.join(ROOT, img))
            rec = {
                'platform': plat,
                'platform_review_id': r['pid'],
                'reviewer_name': r['name'],
                'reviewer_profile_url': r['profile'],
                'reviewer_image': img,
                'reviewer_image_source_url': r['photo'],
                'rating': r['rating'],
                'text': r['text'],
                'date': r['date'],
                'review_url': r['url'],
                'owner_reply': r['reply'],
                'collected_at': old.get('collected_at') or NOW,
                'source': old.get('source') or a.source,
            }
            if old:
                rec['updated_at'] = NOW
            rec.update({k: v for k, v in r['extra'].items() if v not in (None, '', []) and not (v is False and k != 'verified_purchase')})
            if old.get('featured_on_website'):  # set by hand (the site quotes this review)
                rec['featured_on_website'] = True
            if pos is None:
                index[key] = len(reviews)
                reviews.append(rec)
            else:
                reviews[pos] = rec
            n += 1
            print('  +' if not old else '  ~', plat, r['date'][:10], display_name(r['name']))
    if n:
        save(reviews)
    print(f'wrote {n} reviews ({"add+update" if a.update else "new only"})')


def save(reviews):
    """reviews/<year>.json for every year (newest first); config.json reviews.years kept in step."""
    by_year = {}
    for r in reviews:
        by_year.setdefault(r['date'][:4], []).append(r)
    for y, lst in by_year.items():
        lst.sort(key=lambda r: r['date'], reverse=True)
        dump(lst, os.path.join(ROOT, 'reviews', f'{y}.json'))
    years = sorted((int(y) for y in by_year), reverse=True)
    if (CONFIG.get('reviews') or {}).get('years') != years:
        CONFIG.setdefault('reviews', {})['years'] = years
        dump(CONFIG, os.path.join(ROOT, 'config.json'))
        print('config.json reviews.years ->', years)


if __name__ == '__main__':
    main()
