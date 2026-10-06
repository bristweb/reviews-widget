/* Reviews widget — static, no dependencies, no site-specific code. https://github.com/bristweb/reviews-widget
 * The code lives in this repo; everything about a site lives in a separate data repo, named by data-source:
 *   <source>config.json          business, platforms, display defaults, strings, schema settings, summary card,
 *                                and reviews.years (which yearly review files exist)
 *   <source>reviews/<year>.json  the reviews (plain records, newest first) — the only copy of the review data
 *   <source>theme/theme.css      fonts + CSS custom properties (colors, radius)
 *   <source>icons/, images/      platform icons, reviewer avatars
 * Counts, averages and the schema.org JSON-LD are computed here on load. The data carries full records;
 * presentation only: reviewer names are shown as first name + last initial and review text is clipped to a short
 * snippet (both computed here at render time).
 *
 * Usage (JS embed) — one script tag renders the widget right where the tag is (defer/async are fine):
 *   <script src="…/reviews-widget/assets/js/reviews-widget.js"
 *           data-source="…/<your-data-repo>/" defer></script>
 * Public options: data-source (required), data-layout, data-platform (one platforms key, or omit for all),
 *   data-limit, data-summary="off", data-theme="light|dark|auto", data-schema="off", data-constrained="true".
 * Bare pages index.html / embed.html default data via ?source= when the script has no data-source.
 * Explicit target: data-target="#id" on the script, or [data-reviews-widget] elements (their data-* override the script).
 * Code root is inferred from the script URL. CSS loads from this repo + <source>theme/theme.css.
 * data-constrained="true" = tight-box preset (fixed height, arrows inside, overflow hidden, no hover-lift,
 *   focus rings inside). Further fitting tweaks are CSS classes on .rw-host / .rw-root (see README).
 * URL params (?layout=&platform=&limit=&summary=off&theme=&constrained=true) override data attributes.
 * ?source= applies only when there is no data-source.
 */
(function () {
  // Captured at execution time (works for plain, defer and async scripts; null only for ES modules).
  const ME = document.currentScript;
  const DEFAULT_BASE = ME && ME.src ? new URL('../../', ME.src).href : './'; // this repo's root (code + CSS)
  // Shared across every copy of this script on the page, so data and CSS load once.
  const SHARED = (window.__reviewsWidget ??= { css: {}, loads: {} });
  const STRINGS = {
    loading: 'Loading reviews…', unavailable: 'Reviews are unavailable right now.',
    tabs_aria: 'Filter reviews by platform', tab_all: 'All', tab_all_suffix: ' reviews',
    tab_title: '{name}: {count} reviews', tab_aria: '{name}, {count} reviews', write_review: 'Write a review', write_review_short: 'Review',
    based_on: 'Based on ', review_one: 'review', review_many: 'reviews', on_platform: ' on {platform}',
    stars_aria: '{rating} out of 5 stars', recommends: 'Recommends', view_on: 'View on {platform}',
    card_aria: "Read {name}'s review on {platform} (opens in a new tab)", anonymous: 'Anonymous',
    previous: 'Previous reviews', next: 'Next reviews', ai_summary: 'Summary',
    ai_summary_aria: 'Summary of {count} reviews',
  };
  const DISPLAY = {
    layout: 'carousel', snippet_chars: 160, abbreviate_last_names: true, max_same_platform_run: 2,
    diversity_window_days: 548, date_locale: 'en-US', date_options: { year: 'numeric', month: 'short', day: 'numeric' },
    font_timeout_ms: 1200, show_rating_only_reviews: false, show_summary: true,
    theme: 'auto', constrained: false,
  };
  const RATING_LABELS = [{ min: 4.75, label: 'Excellent' }, { min: 4.25, label: 'Great' }, { min: 3.5, label: 'Good' }, { min: 0, label: 'Reviews' }];
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"/></svg>';
  const SPARKLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2.5l1.9 5.6 5.6 1.9-5.6 1.9L10 17.5l-1.9-5.6L2.5 10l5.6-1.9zM18.5 13l.95 2.55L22 16.5l-2.55.95L18.5 20l-.95-2.55L15 16.5l2.55-.95z"/></svg>';
  const THUMB = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 9h3v9H2zM7 18h7.6a2 2 0 0 0 2-1.6l1.2-6A2 2 0 0 0 15.8 8H12V4.5A2.5 2.5 0 0 0 9.5 2L7 8z"/></svg>';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fill = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  const isBlank = t => !String(t ?? '').replace(/[\s\u200b-\u200d\u2060\ufeff]+/g, '');
  const SIMPLE_ICONS = 'https://cdn.simpleicons.org/';
  const byNewest = (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id);
  // 'true' / '' (bare attribute) / '1' / 'on' / 'yes' -> true; 'false' / '0' / 'off' / 'no' -> false
  const toBool = v => (typeof v === 'boolean' ? v : v != null && !/^(false|0|off|no)$/i.test(String(v).trim()));

  // ---- loading helpers ----
  const fetchJson = url => fetch(url, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status + ' ' + url); return r.json(); });
  const cssLoads = SHARED.css;
  // Adds <link rel=stylesheet> unless the page already has it; resolves once it's applied (or failed).
  function ensureCss(href) {
    if (cssLoads[href]) return cssLoads[href];
    let link = [...document.querySelectorAll('link[rel~="stylesheet"]')].find(l => l.href === href);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    } else if (link.sheet) {
      return (cssLoads[href] = Promise.resolve());
    }
    return (cssLoads[href] = new Promise(res => {
      link.addEventListener('load', res, { once: true });
      link.addEventListener('error', res, { once: true });
    }));
  }
  const loads = SHARED.loads;
  // One fetch of config + reviews + CSS per data source, shared by every widget on the page. The stylesheets and
  // config start at once; every yearly review file listed in config.reviews.years is then fetched in parallel.
  function load(code, src) {
    return (loads[src] ??= (() => {
      const css = Promise.all([ensureCss(code + 'assets/css/reviews-widget.css'), ensureCss(src + 'theme/theme.css')]);
      const config = fetchJson(src + 'config.json');
      const reviews = config.then(c => Promise.all(((c.reviews && c.reviews.years) || []).map(y => fetchJson(`${src}reviews/${y}.json`))))
        .then(years => [].concat(...years));
      return Promise.all([config, reviews, css]);
    })());
  }
  // schema.org JSON-LD, built from the reviews on load -> one <script type="application/ld+json"> in <head> per page.
  // Off when config.schema.enabled is false or any widget script/target has data-schema="off".
  function injectSchema(json, opts) {
    if (!json || opts.schema === 'off' || SHARED.schema) return;
    SHARED.schema = true;
    if (document.getElementById('reviews-widget-schema')) return;
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = 'reviews-widget-schema';
    tag.textContent = JSON.stringify(json).replace(/</g, '\\u003c');
    document.head.appendChild(tag);
  }
  // Resolves when the theme's webfont (first family in the computed font-family) is loaded, or after a timeout
  // (then the theme's fallback face shows).
  const GENERIC_FONTS = /^(serif|sans-serif|monospace|cursive|fantasy|math|emoji|system-ui|ui-[a-z-]+|-apple-system|BlinkMacSystemFont)$/i;
  function fontsReady(el, timeout) {
    const fam = getComputedStyle(el).fontFamily.split(',')[0].trim();
    if (!document.fonts || !document.fonts.load || !fam || GENERIC_FONTS.test(fam)) return Promise.resolve();
    const faces = ['400 15px ' + fam, '700 15px ' + fam, 'italic 300 15px ' + fam];
    return Promise.race([
      Promise.all(faces.map(f => document.fonts.load(f))).catch(() => {}),
      new Promise(r => setTimeout(r, timeout)),
    ]);
  }

  // opts: data-* options (layout, platform, limit, base) from the script tag and/or the target element.
  // DOM: host (inserted container or your target; full-width block, gives the widget an intrinsic width)
  //        > .rw-sizer (zero-height; max-content = --rw-max-width, min-content tiny, so shrink-to-fit parents
  //          like centered flex columns, inline-blocks, fit-content or floats size the widget to the available width)
  //        > .rw-root (the widget; container-type:inline-size for the header/carousel container queries).
  // Without the sizer, size containment gives the root an intrinsic width of 0 and it collapses in such parents.

  // Active scheme for data-theme="auto": follow the host page (html/body data-theme / dark class /
  // color-scheme). Only use prefers-color-scheme when the host itself opts into system (color-scheme:
  // light dark, or data-theme=auto). No bare OS preference when the page is a light-only site.
  function detectHostTheme() {
    const roots = [document.documentElement, document.body].filter(Boolean);
    const attrNames = ['data-theme', 'data-color-scheme', 'data-bs-theme'];
    for (const el of roots) {
      for (const a of attrNames) {
        const v = (el.getAttribute(a) || '').toLowerCase();
        if (v === 'dark' || v === 'light') return v;
        if (v === 'auto' || v === 'system') {
          return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
      }
      const cls = String(el.className || '');
      if (/\b(dark|theme-dark|dark-mode|darkmode|scheme-dark)\b/i.test(cls)) return 'dark';
      if (/\b(light|theme-light|light-mode|lightmode|scheme-light)\b/i.test(cls)) return 'light';
    }
    for (const el of roots) {
      const cs = (getComputedStyle(el).colorScheme || '').trim().toLowerCase();
      if (!cs || cs === 'normal') continue;
      const hasL = /\blight\b/.test(cs), hasD = /\bdark\b/.test(cs);
      if (hasD && !hasL) return 'dark';
      if (hasL && !hasD) return 'light';
      if (hasL && hasD) return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  async function mount(host, opts) {
    const q = new URLSearchParams(location.search);
    let code = DEFAULT_BASE;
    if (!code.endsWith('/')) code += '/';
    // data-source (script tag or target) wins; ?source= is for the bare pages, whose script tag has none.
    let base = opts.source || q.get('source') || '';
    if (base && !base.endsWith('/')) base += '/';
    host.classList.add('rw-host');
    host.classList.add('rw-clip');
    host.innerHTML = `<div class="rw-sizer" aria-hidden="true">${'<i></i> '.repeat(24)}</div>`;
    const el = document.createElement('div');
    host.appendChild(el);
    el.classList.add('rw-root');
    el.style.opacity = '0'; // hidden until CSS, fonts and the first layout are ready (CSS takes over afterwards)
    // Stay invisible until the webfont is ready AND the first render is laid out, then fade in once, so there's
    // no font swap or re-fit flash. Header steps are pure CSS container queries.
    // Constrained / fixed host: fill parent height when definite, else viewport below the widget top.
    let fixedHeight = false;
    function fitHeight() {
      const parent = host.parentElement;
      if (!parent) return;
      const probe = document.createElement('div');
      probe.style.cssText = 'display:block;height:100%;width:0;min-height:0;margin:0;padding:0;border:0;flex:none';
      parent.insertBefore(probe, host);
      const definite = probe.getBoundingClientRect().height > 0 && parent !== document.body && parent !== document.documentElement;
      probe.remove();
      if (definite) { host.style.height = '100%'; return; }
      const bs = getComputedStyle(document.body), hs = getComputedStyle(document.documentElement);
      const top = host.getBoundingClientRect().top + scrollY;
      const below = (parseFloat(bs.marginBottom) || 0) + (parseFloat(bs.paddingBottom) || 0) + (parseFloat(hs.paddingBottom) || 0);
      host.style.height = Math.max(120, Math.floor(innerHeight - top - below)) + 'px';
    }
    const reveal = () => requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.add('rw-ready');
      el.style.removeProperty('opacity');
      if (!fixedHeight) notifyHeight();
    }));
    let config, reviews;
    try {
      if (!base) throw new Error('[reviews-widget] data-source is required (URL of a data repo root, ending in /)');
      [config, reviews] = await load(code, base);
    } catch (e) {
      console.warn(e);
      el.innerHTML = `<div class="rw-loading">${esc(STRINGS.unavailable)}</div>`;
      reveal();
      return;
    }
    const S = { ...STRINGS, ...(config.strings || {}) };
    const D = { ...DISPLAY, ...(config.display || {}) };
    const PLATFORMS = config.platforms || {};
    const RL = (config.rating_labels || RATING_LABELS).slice().sort((a, b) => b.min - a.min);
    // URL param > data-* > config.json display > built-in default.
    const opt = (param, key, dkey) => (q.get(param) !== null ? q.get(param) : opts[key] != null ? opts[key] : D[dkey]);
    const constrained = toBool(opt('constrained', 'constrained', 'constrained'));
    // One platform key from config.platforms, or omit / empty → all. ("all" still accepted.)
    let platform = String(q.get('platform') || opts.platform || '').trim();
    if (!platform) platform = 'all';
    const cfg = {
      layout: q.get('layout') || opts.layout || D.layout || 'carousel',
      platform,
      limit: +(q.get('limit') || opts.limit || 0),
      summary: (q.get('summary') || opts.summary) !== 'off' && D.show_summary !== false,
      constrained,
      // Fitting: only data-constrained toggles these in JS. Further tweaks → CSS classes (README).
      fixed: constrained,
      arrows: constrained ? 'inside' : 'outside',
    };
    fixedHeight = cfg.fixed;
    host.classList.toggle('rw-clip', !constrained);
    host.classList.toggle('rw-overflow-hidden', constrained);
    el.classList.add('rw-layout-' + cfg.layout);
    if (constrained) {
      el.classList.add('rw-arrows-inside', 'rw-nolift', 'rw-focus-inside');
      host.classList.add('rw-fixed-host');
      el.classList.add('rw-fixed');
      fitHeight();
      addEventListener('resize', fitHeight);
    }
    // Theme: light | dark | auto (follow host). Query / data-theme / display.theme.
    let themePref = String(opt('theme', 'theme', 'theme') || 'auto').toLowerCase();
    if (!/^(light|dark|auto)$/.test(themePref)) themePref = 'auto';
    host.dataset.theme = themePref;
    const applyTheme = () => {
      const resolved = themePref === 'auto' ? detectHostTheme() : themePref;
      host.classList.toggle('rw-dark', resolved === 'dark');
    };
    applyTheme();
    if (themePref === 'auto') {
      const mo = new MutationObserver(applyTheme);
      [document.documentElement, document.body].filter(Boolean).forEach(el => {
        mo.observe(el, { attributes: true, attributeFilter: ['class', 'data-theme', 'data-color-scheme', 'data-bs-theme'] });
      });
      try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch (_) {}
    }
    el.innerHTML = `<div class="rw-loading">${esc(S.loading)}</div>`;
    await fontsReady(el, D.font_timeout_ms);

    const url = p => (/^(https?:|data:|\/)/.test(p) ? p : base + p);
    const pname = p => (PLATFORMS[p] && PLATFORMS[p].name) || p;
    const label = avg => (RL.find(x => avg >= x.min) || { label: '' }).label;
    const fmtDate = d => new Date(d).toLocaleDateString(D.date_locale, D.date_options);
    const stars = (n, cls = '') => `<span class="rw-stars ${cls}" role="img" aria-label="${fill(S.stars_aria, { rating: n })}">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= Math.round(n) ? 'on' : ''}">${STAR}</i>`).join('')}</span>`;
    // Icons: the site's own SVG (config `icon`, else <source>icons/<platform>.svg). Only if that file is missing or
    // fails to load does the widget fall back to the Simple Icons CDN (slug = config `simple_icon` or the platform key).
    const icon = (p, cls) => {
      const P = PLATFORMS[p] || {};
      const c = [cls, P.invert_icon_when_active ? 'rw-icon-invert' : ''].filter(Boolean).join(' ');
      const fallback = SIMPLE_ICONS + encodeURIComponent(P.simple_icon || p);
      return `<img${c ? ` class="${c}"` : ''} src="${esc(url(P.icon || `icons/${p}.svg`))}" data-fallback="${esc(fallback)}" alt="">`;
    };
    const useFallbackIcons = root => root.querySelectorAll('img[data-fallback]').forEach(img => {
      const swap = () => { if (img.dataset.fallback) { img.src = img.dataset.fallback; delete img.dataset.fallback; } };
      img.addEventListener('error', swap, { once: true }); // attached in the same task as innerHTML, before any load result
    });

    // ---- presentation helpers (data stays complete; only the display is abbreviated/clipped) ----
    const isAllUpper = w => w === w.toUpperCase() && w !== w.toLowerCase();
    const isAllLower = w => w === w.toLowerCase() && w !== w.toUpperCase();
    const capitalize = w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    // 'Jane Doe' -> 'Jane D.'; 'Mary Smith (Smith Studio)' -> 'Mary S.'; 'Ann And Bob C.' -> 'Ann & Bob C.'; 'JANE D.' -> 'Jane D.'; 'AA' -> 'AA'
    function displayName(name) {
      if (!D.abbreviate_last_names) return (name || '').trim() || S.anonymous;
      const words = (name || '').replace(/\(.*?\)/g, ' ').trim().split(/\s+/).filter(Boolean);
      if (!words.length) return S.anonymous;
      const fix = w => (isAllUpper(w) && w.length <= 2 ? w : isAllUpper(w) || isAllLower(w) ? capitalize(w) : w); // 'AA' (initials) stays
      if (words.length === 1) return fix(words[0]);
      let first = words.slice(0, -1);
      const last = words[words.length - 1];
      if (!(first.length >= 3 && ['and', '&'].includes(first[1].toLowerCase()))) first = first.slice(0, 1);
      first = first.map(w => (['and', '&'].includes(w.toLowerCase()) ? '&' : fix(w)));
      return first.join(' ') + ' ' + last.charAt(0).toUpperCase() + '.';
    }
    // First N characters at a word boundary; with abbreviation on, the reviewer's own surname(s) shown as an initial.
    function snippet(text, fullName) {
      let t = (text || '').replace(/\s+/g, ' ').trim();
      if (D.abbreviate_last_names) {
        const words = (fullName || '').replace(/[()]/g, ' ').split(/\s+/).map(w => w.replace(/^[.,]+|[.,]+$/g, ''));
        for (const w of words.slice(1)) {
          if (w.length > 1 && !['and', '&'].includes(w.toLowerCase())) {
            t = t.replace(new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), w.charAt(0).toUpperCase() + '.');
          }
        }
      }
      const cps = Array.from(t);
      if (!D.snippet_chars || cps.length <= D.snippet_chars) return t;
      let cut = cps.slice(0, D.snippet_chars).join('');
      if (cut.includes(' ')) cut = cut.slice(0, cut.lastIndexOf(' '));
      return cut.replace(/[,.;:!?-]+$/, '') + '…';
    }
    // Card link: the individual review URL, or the platform page when the platform sets card_link: "page".
    const cardHref = r => ((PLATFORMS[r.platform] || {}).card_link === 'page' ? PLATFORMS[r.platform].page_url : r.review_url);

    // Card order: deterministic, newest first, with gentle platform diversity (same on every load).
    function diverseOrder(list) {
      const rest = list.slice().sort(byNewest), out = [];
      const RUN = D.max_same_platform_run, WINDOW = D.diversity_window_days;
      while (rest.length) {
        let i = 0;
        const run = out.slice(-RUN);
        // after RUN consecutive cards from one platform, prefer another platform if its newest review is <= WINDOW days older
        if (RUN > 0 && run.length === RUN && run.every(r => r.platform === rest[0].platform)) {
          const j = rest.findIndex(r => r.platform !== rest[0].platform);
          const gapDays = j < 0 ? Infinity : (new Date(rest[0].date) - new Date(rest[j].date)) / 864e5;
          if (gapDays <= WINDOW) i = j;
        }
        out.push(rest.splice(i, 1)[0]);
      }
      return out;
    }

    const summary = config.summary || null;
    const all = reviews;
    for (const r of all) {
      r.id = r.id || `${r.platform}:${r.platform_review_id}`;
      r.display_name = displayName(r.reviewer_name);
      r.snippet_text = snippet(r.text, r.reviewer_name);
    }
    // Rating-only reviews (empty/whitespace text) count in the header but never become cards, unless
    // display.show_rating_only_reviews is true; then their card simply has no text element.
    const hasText = r => !isBlank(r.text) && Boolean(r.snippet_text);
    const withText = D.show_rating_only_reviews ? all.slice() : all.filter(hasText);
    const newest = withText.slice().sort(byNewest);
    const allOrder = diverseOrder(withText);
    const present = Object.keys(PLATFORMS).filter(p => all.some(r => r.platform === p));
    const writeDefault = config.default_write_platform || present[0];
    injectSchema(buildSchema(), opts);

    // schema.org JSON-LD: the business (config.schema.type, name, url, schema.extra) with an AggregateRating over the
    // 1-5 star reviews and every review as a Review item (schema.max_reviews 0 = all): text reviews in the "All
    // reviews" card order, then rating-only reviews newest first. Names and text are the abbreviated ones visitors
    // see. A review without a 1-5 rating (Facebook "recommends") has no reviewRating and isn't in the aggregate;
    // a review without text has no reviewBody. The summary card is never included.
    function buildSchema() {
      const SC = { enabled: true, type: 'LocalBusiness', max_reviews: 0, ...(config.schema || {}) };
      const starred = all.filter(r => typeof r.rating === 'number');
      if (!SC.enabled || !starred.length) return null;
      const texts = all.filter(hasText), textIds = new Set(texts.map(r => r.id));
      const order = [...diverseOrder(texts), ...all.filter(r => !textIds.has(r.id)).sort(byNewest)];
      const listed = SC.max_reviews > 0 ? order.slice(0, SC.max_reviews) : order;
      const biz = config.business || {};
      return {
        '@context': 'https://schema.org',
        '@type': SC.type,
        ...(biz.website ? { '@id': biz.website.replace(/\/?$/, '/') + '#business' } : {}),
        name: biz.name,
        ...(biz.website ? { url: biz.website } : {}),
        ...(SC.extra || {}),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (starred.reduce((s, r) => s + r.rating, 0) / starred.length).toFixed(1),
          bestRating: 5, worstRating: 1, ratingCount: starred.length, reviewCount: starred.length,
        },
        review: listed.map(r => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.display_name },
          datePublished: r.date.slice(0, 10),
          ...(typeof r.rating === 'number' ? { reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 } } : {}),
          ...(textIds.has(r.id) ? { reviewBody: r.snippet_text } : {}),
          publisher: { '@type': 'Organization', name: pname(r.platform) },
        })),
      };
    }
    let active = cfg.platform;

    function render() {
      const pool = active === 'all' ? all : all.filter(r => r.platform === active);
      const rated = pool.filter(r => typeof r.rating === 'number');
      const avg = rated.length ? rated.reduce((s, r) => s + r.rating, 0) / rated.length : 5;
      // cards show the clipped snippet only. "All": newest first + gentle diversity; one platform: newest first.
      let shown = active === 'all' ? allOrder : newest.filter(r => r.platform === active);
      if (cfg.limit) shown = shown.slice(0, cfg.limit);
      const write = (PLATFORMS[active === 'all' ? writeDefault : active] || {}).write_url || '#';

      const tabs = present.length > 1 ? `<div class="rw-tabs" role="tablist" aria-label="${esc(S.tabs_aria)}">
        ${['all', ...present].map(p => {
          const n = p === 'all' ? all.length : all.filter(r => r.platform === p).length;
          const name = p === 'all' ? S.tab_all + S.tab_all_suffix : pname(p);
          return `<button role="tab" class="rw-tab ${p === active ? 'is-active' : ''}" data-p="${p}" aria-selected="${p === active}"
            title="${esc(fill(S.tab_title, { name, count: n }))}" aria-label="${esc(fill(S.tab_aria, { name, count: n }))}">
            ${p === 'all' ? `<span class="rw-tab-name">${esc(S.tab_all)}<span class="rw-tab-long">${esc(S.tab_all_suffix)}</span></span>` : `${icon(p)}<span class="rw-tab-name">${esc(name)}</span>`}
            <em>${n}</em></button>`;
        }).join('')}</div>` : '';

      const header = `<header class="rw-header">
        <div class="rw-summary">
          <div class="rw-score">${avg.toFixed(1)}</div>
          <div>
            <div class="rw-label">${esc(label(avg))}</div>
            ${stars(avg, 'rw-stars-lg')}
            <div class="rw-based"><span class="rw-based-pre">${esc((S.based_on || '').trimEnd())} </span><strong>${pool.length}</strong> ${esc(pool.length === 1 ? S.review_one : S.review_many)}<span class="rw-based-pre">${active === 'all' ? '' : esc(fill(S.on_platform, { platform: pname(active) }))}</span></div>
          </div>
        </div>
        <a class="rw-write" href="${esc(write)}" target="_blank" rel="noopener" aria-label="${esc(S.write_review)}"><span class="rw-write-long">${esc(S.write_review)}</span><span class="rw-write-short">${esc(S.write_review_short)}</span></a>
        ${tabs}
      </header>`;

      // Summary card: first card in "All reviews" only; not a link, not counted, not in the JSON-LD.
      const ai = cfg.summary && active === 'all' && summary && !isBlank(summary.text)
        ? `<div class="rw-card rw-ai" role="note" aria-label="${esc(fill(S.ai_summary_aria, { count: all.length }))}">
          <div class="rw-ai-top"><span class="rw-ai-icon">${SPARKLE}</span><span class="rw-ai-label">${esc(S.ai_summary)}</span></div>
          <p class="rw-ai-text">${esc(summary.text)}</p>
        </div>` : '';
      const cards = ai + shown.map(r => {
        const name = pname(r.platform);
        const rating = typeof r.rating === 'number' ? stars(r.rating) : `<span class="rw-rec">${THUMB}${esc(S.recommends)}</span>`;
        const aria = fill(S.card_aria, { name: r.display_name, platform: name });
        // The whole card is one link; nothing inside it is interactive (no nested links).
        return `<a class="rw-card" data-platform="${esc(r.platform)}" href="${esc(cardHref(r))}" target="_blank" rel="noopener" aria-label="${esc(aria)}">
          <div class="rw-card-top">
            <img class="rw-avatar" src="${esc(url(r.reviewer_image))}" alt="" loading="lazy" width="44" height="44">
            <div class="rw-who">
              <div class="rw-name">${esc(r.display_name)}</div>
              <time datetime="${esc(r.date)}">${fmtDate(r.date)}</time>
            </div>
            ${icon(r.platform, 'rw-platform')}
          </div>
          ${rating}
          ${hasText(r) ? `<p class="rw-text">${esc(r.snippet_text)}</p>` : ''}
          <span class="rw-link" aria-hidden="true">${esc(fill(S.view_on, { platform: name }))} <span class="rw-arrow">→</span></span>
        </a>`;
      }).join('');

      el.innerHTML = `${header}
        <div class="rw-viewport">
          ${cfg.layout === 'carousel' && cfg.arrows !== 'off' ? `<button class="rw-nav rw-prev" aria-label="${esc(S.previous)}">‹</button>` : ''}
          <div class="rw-track">${cards}</div>
          ${cfg.layout === 'carousel' && cfg.arrows !== 'off' ? `<button class="rw-nav rw-next" aria-label="${esc(S.next)}">›</button>` : ''}
        </div>`;

      useFallbackIcons(el);
      fitSummary();
      clampText();
      el.querySelectorAll('.rw-tab').forEach(b => b.addEventListener('click', () => { active = b.dataset.p; render(); }));
      const track = el.querySelector('.rw-track');
      const step = dir => track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' });
      el.querySelector('.rw-prev')?.addEventListener('click', () => step(-1));
      el.querySelector('.rw-next')?.addEventListener('click', () => step(1));
      const upd = () => {
        const p = el.querySelector('.rw-prev'), n = el.querySelector('.rw-next');
        if (!p) return;
        p.disabled = track.scrollLeft < 4;
        n.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      track.addEventListener('scroll', upd, { passive: true });
      upd();
      if (!cfg.fixed) notifyHeight();
    }
    // Very short fixed-height boxes (CSS switches the snippet to -webkit-box): clamp it to the whole lines that fit.
    function clampText() {
      if (!cfg.fixed) return;
      el.querySelectorAll('.rw-card .rw-text').forEach(t => {
        t.style.removeProperty('-webkit-line-clamp');
        if (getComputedStyle(t).display !== '-webkit-box') return;
        const lh = parseFloat(getComputedStyle(t).lineHeight) || 18;
        t.style.setProperty('-webkit-line-clamp', String(Math.max(1, Math.floor((t.clientHeight + 1) / lh))));
      });
    }
    // If the summary text is taller than its card (narrow cards), it scrolls; fade the bottom edge to show that.
    function fitSummary() {
      const t = el.querySelector('.rw-ai-text');
      if (t) t.classList.toggle('rw-ai-more', t.scrollHeight > t.clientHeight + 2 && t.scrollTop + t.clientHeight < t.scrollHeight - 2);
    }
    el.addEventListener('scroll', e => { if (e.target.classList && e.target.classList.contains('rw-ai-text')) fitSummary(); }, { capture: true, passive: true });
    render();
    reveal();
    new ResizeObserver(() => { fitSummary(); clampText(); if (!cfg.fixed) notifyHeight(); }).observe(el);
  }

  // When rendered inside an iframe (embed.html), tell the parent page our height.
  function notifyHeight() {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'reviews-widget-height', height: document.documentElement.scrollHeight }, '*');
    }
  }

  // ---- where to render (no class-name selectors) ----
  const OPTION_KEYS = ['source', 'layout', 'platform', 'limit', 'schema', 'summary', 'theme', 'constrained', 'target'];
  const BOOL_KEYS = ['constrained']; // bare data-constrained means true
  const pick = ds => Object.fromEntries(OPTION_KEYS.filter(k => ds && ds[k] != null && (ds[k] !== '' || BOOL_KEYS.includes(k)))
    .map(k => [k, ds[k] === '' ? 'true' : ds[k]]));
  const scriptOpts = pick(ME && ME.dataset);
  const claim = el => {
    if (el.__reviewsWidget) return false;
    el.__reviewsWidget = true;
    return true;
  };
  function start() {
    const target = ME && ME.dataset.target;
    if (target) { // explicit target on the script tag
      const el = document.querySelector(target);
      if (!el) return console.warn('[reviews-widget] data-target not found:', target);
      if (claim(el)) mount(el, { ...scriptOpts, ...pick(el.dataset) });
      return;
    }
    const marked = [...document.querySelectorAll('[data-reviews-widget]')].filter(claim);
    if (marked.length) { // element targets: <div data-reviews-widget data-layout="grid"></div>
      marked.forEach(el => mount(el, { ...scriptOpts, ...pick(el.dataset) }));
      return;
    }
    // default: render in place, right before this script tag
    const el = document.createElement('div');
    claim(el);
    if (ME && ME.parentNode && !(document.head && document.head.contains(ME))) ME.parentNode.insertBefore(el, ME);
    else document.body.appendChild(el);
    mount(el, scriptOpts);
  }
  // Plain/async scripts can run while the page is still parsing; wait so later [data-reviews-widget] targets
  // exist. Deferred scripts run after parsing, so they render at once.
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
