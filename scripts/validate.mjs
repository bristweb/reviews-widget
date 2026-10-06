#!/usr/bin/env node
/**
 * Validate a reviews data repo against the JSON Schemas in schemas/, plus filesystem checks
 * the schemas cannot express (icons exist, relative avatars resolve, years list matches files, newest-first, etc.).
 *
 *   node reviews-widget/scripts/validate.mjs <data-repo-dir>   # default: .
 *
 * Requires the `ajv` dependency from this repo (`npm ci` in reviews-widget). The reusable workflow
 * installs it before running. Schemas: schemas/config.schema.json, schemas/reviews.schema.json.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WIDGET = path.resolve(HERE, '..');
const root = path.resolve(process.argv[2] || '.');
const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);

let Ajv, addFormats;
try {
  const require = createRequire(path.join(WIDGET, 'package.json'));
  Ajv = require('ajv');
  addFormats = require('ajv-formats');
} catch (e) {
  console.error(`Cannot load ajv from ${WIDGET}. Run: npm ci   (in the reviews-widget checkout)\n${e.message}`);
  process.exit(2);
}

const ajv = new (Ajv.default || Ajv)({ allErrors: true, strict: false });
(addFormats.default || addFormats)(ajv);
const loadSchema = name => JSON.parse(readFileSync(path.join(WIDGET, 'schemas', name), 'utf8'));
const validateConfig = ajv.compile(loadSchema('config.schema.json'));
const validateReviews = ajv.compile(loadSchema('reviews.schema.json'));

const readJson = f => {
  try { return JSON.parse(readFileSync(path.join(root, f), 'utf8')); }
  catch (e) { err(`${f}: ${e.code === 'ENOENT' ? 'missing' : 'invalid JSON (' + e.message + ')'}`); return null; }
};
const fmt = (prefix, e) => `${prefix}: ${e.instancePath || '/'} ${e.message}${e.params?.allowedValues ? ` (${e.params.allowedValues.join('|')})` : ''}`;
const isIso = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(s) && !Number.isNaN(Date.parse(s));

const config = readJson('config.json');
if (config) {
  if (!validateConfig(config)) for (const e of validateConfig.errors) err(fmt('config.json', e));
}
const platforms = (config && config.platforms) || {};
const relIcon = (where, icon) => {
  if (icon && !/^(https?:)?\/\//.test(icon) && !icon.startsWith('data:') && !existsSync(path.join(root, icon)))
    err(`config.json ${where}: icon ${icon} not found`);
};
for (const [k, p] of Object.entries(platforms)) relIcon(`platforms.${k}`, p.icon || `icons/${k}.svg`);
for (const l of (config && config.links) || []) relIcon(`links.${l.platform}`, l.icon);
(Array.isArray(config?.accolades) ? config.accolades : []).forEach((a, i) => {
  if (!a || typeof a !== 'object') return;
  if (a.icon) relIcon(`accolades[${i}]`, a.icon);
});
(Array.isArray(config?.testimonials) ? config.testimonials : []).forEach((t, i) => {
  if (!t || typeof t !== 'object') return;
  if (t.source && typeof t.source === 'object' && t.source.logo) relIcon(`testimonials[${i}].source`, t.source.logo);
  if (t.reviewer_image) {
    const img = String(t.reviewer_image);
    if (!/^(https?:|data:|\/)/i.test(img) && !existsSync(path.join(root, img)))
      err(`config.json testimonials[${i}]: reviewer_image ${img} not found`);
  }
});
if (!existsSync(path.join(root, 'theme', 'theme.css'))) warn('theme/theme.css not found (the widget loads it)');

// Language files listed in config.languages: [{ lang, url }, …]. defaultLanguage is a fallback ISO tag.
if (config) {
  if (config.default_language != null) warn('config.json: default_language is obsolete; use defaultLanguage');
  if (config.languages && typeof config.languages === 'object' && !Array.isArray(config.languages)) {
    err('config.json: languages must be an array of { lang, url } (object map form is obsolete)');
  }
  const langs = Array.isArray(config.languages) ? config.languages : null;
  if (langs) {
    const norm = c => String(c || '').trim().replace(/_/g, '-').toLowerCase();
    const tags = [];
    langs.forEach((entry, i) => {
      if (!entry || typeof entry !== 'object') { err(`config.json: languages[${i}] must be an object`); return; }
      const code = entry.lang;
      const rel = entry.url;
      if (code == null || !String(code).trim()) err(`config.json: languages[${i}].lang is required`);
      else tags.push(norm(code));
      if (rel == null || !String(rel).trim()) { err(`config.json: languages[${i}].url must be a non-empty path or URL`); return; }
      const langRel = String(rel).trim();
      if (/^(https?:)?\/\//i.test(langRel) || langRel.startsWith('/')) return;
      if (!existsSync(path.join(root, langRel))) err(`config.json: languages[${i}].url file ${langRel} not found`);
      else {
        const pack = readJson(langRel);
        if (pack && typeof pack === 'object') {
          const sk = pack.strings && typeof pack.strings === 'object' ? Object.keys(pack.strings) : Object.keys(pack).filter(k => k !== 'rating_labels' && typeof pack[k] === 'string');
          if (!sk.length) warn(`${langRel}: no string entries`);
        }
      }
    });
    const def = config.defaultLanguage;
    if (def != null && String(def).trim()) {
      const want = norm(def);
      const wantPrimary = want.split('-')[0];
      const matchable = tags.some(t => t === want || t === wantPrimary || t.split('-')[0] === want || t.split('-')[0] === wantPrimary);
      if (tags.length && !matchable) warn(`config.json: defaultLanguage "${def}" does not match any languages[].lang (widget English will be used)`);
    } else if (tags.length) {
      warn('config.json: languages set but defaultLanguage missing');
    }
  }
  if (typeof config.strings === 'string') err('config.json: strings must be an object of inline overrides (use languages for translation files)');
}

const years = (config && config.reviews && config.reviews.years) || [];
if (Array.isArray(years) && years.some((y, i) => i && y >= years[i - 1])) err('config.json: reviews.years must be unique and sorted newest first');
const files = existsSync(path.join(root, 'reviews')) ? readdirSync(path.join(root, 'reviews')).filter(f => f.endsWith('.json')) : [];
for (const f of files) if (!years.includes(Number(f.replace(/\.json$/, '')))) err(`reviews/${f}: not listed in config.json reviews.years`);

const seen = new Map(), used = new Set(), counts = {};
let total = 0;
for (const y of years) {
  const f = `reviews/${y}.json`;
  const list = readJson(f);
  if (!list) continue;
  if (!validateReviews(list)) for (const e of validateReviews.errors) err(fmt(f, e));
  if (!Array.isArray(list)) continue;
  list.forEach((r, i) => {
    const at = `${f}[${i}]`;
    if (r.platform && !platforms[r.platform]) err(`${at}: platform "${r.platform}" is not in config.json platforms`);
    if (r.date && isIso(r.date) && r.date.slice(0, 4) !== String(y)) err(`${at}: dated ${r.date.slice(0, 10)} but stored in ${f}`);
    if (i && r.date > list[i - 1].date) err(`${at}: not newest first`);
    const key = `${r.platform}:${r.platform_review_id}`;
    if (seen.has(key)) err(`${at}: duplicate review ${key} (also ${seen.get(key)})`);
    seen.set(key, at);
    if (r.reviewer_image) {
      const img = String(r.reviewer_image);
      // Absolute / data URLs are fine as-is. Relative paths should exist under the data root.
      if (!/^(https?:|data:|\/)/i.test(img)) {
        if (!existsSync(path.join(root, img))) err(`${at}: reviewer_image ${img} not found`);
        else used.add(img);
      }
    }
    counts[r.platform] = (counts[r.platform] || 0) + 1;
    total++;
  });
}
(Array.isArray(config?.testimonials) ? config.testimonials : []).forEach(t => {
  if (!t?.reviewer_image) return;
  const img = String(t.reviewer_image);
  if (!/^(https?:|data:|\/)/i.test(img)) used.add(img);
});
const imgDir = path.join(root, 'images', 'reviewers');
if (existsSync(imgDir)) for (const f of readdirSync(imgDir)) if (!used.has(`images/reviewers/${f}`)) warn(`images/reviewers/${f}: not referenced by any review or testimonial (ok if unused)`);

for (const w of warnings) console.warn('warning:', w);
if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} problem(s)`); process.exit(1); }
const nAcc = Array.isArray(config?.accolades) ? config.accolades.length : 0;
const nTes = Array.isArray(config?.testimonials) ? config.testimonials.length : 0;
console.log(`ok: ${total} reviews (${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(', ') || 'none'}) in ${years.length} year file(s)` +
  (nAcc ? `; ${nAcc} accolade(s)` : '') +
  (nTes ? `; ${nTes} testimonial(s)` : '') +
  (config?.summary ? `; summary generated ${config.summary.generated_at}` : ''));
