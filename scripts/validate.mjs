#!/usr/bin/env node
/**
 * Validate a reviews data repo against the JSON Schemas in schemas/, plus filesystem checks
 * the schemas cannot express (icons and avatars exist, years list matches files, newest-first, etc.).
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
const safeId = s => String(s).replace(/[^A-Za-z0-9_-]/g, '_');
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
if (!existsSync(path.join(root, 'theme', 'theme.css'))) warn('theme/theme.css not found (the widget loads it)');

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
      const want = `images/reviewers/${r.platform}-${safeId(r.platform_review_id)}`;
      if (r.reviewer_image.replace(/\.[^.]+$/, '') !== want) err(`${at}: reviewer_image must be ${want}.<ext>, got ${r.reviewer_image}`);
      if (!existsSync(path.join(root, r.reviewer_image))) err(`${at}: reviewer_image ${r.reviewer_image} not found`);
      used.add(r.reviewer_image);
    }
    counts[r.platform] = (counts[r.platform] || 0) + 1;
    total++;
  });
}
const imgDir = path.join(root, 'images', 'reviewers');
if (existsSync(imgDir)) for (const f of readdirSync(imgDir)) if (!used.has(`images/reviewers/${f}`)) err(`images/reviewers/${f}: not used by any review`);

for (const w of warnings) console.warn('warning:', w);
if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} problem(s)`); process.exit(1); }
console.log(`ok: ${total} reviews (${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(', ') || 'none'}) in ${years.length} year file(s)` +
  (config?.summary ? `; summary generated ${config.summary.generated_at}` : ''));
