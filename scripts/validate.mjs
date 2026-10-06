#!/usr/bin/env node
// Validate a reviews data repo:  node reviews-widget/scripts/validate.mjs <data repo dir>   (default: .)
// Checks config.json, every reviews/<year>.json listed in config.json reviews.years, and images/reviewers/.
// Exits 1 with a list of problems; the reusable GitHub workflow (.github/workflows/validate.yml) runs this on push.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);
const readJson = f => { try { return JSON.parse(readFileSync(path.join(root, f), 'utf8')); } catch (e) { err(`${f}: ${e.code === 'ENOENT' ? 'missing' : 'invalid JSON (' + e.message + ')'}`); return null; } };
const isIso = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(s) && !Number.isNaN(Date.parse(s));
const safeId = s => String(s).replace(/[^A-Za-z0-9_-]/g, '_');
const REQUIRED = ['platform', 'platform_review_id', 'reviewer_name', 'reviewer_image', 'text', 'date', 'review_url'];

const config = readJson('config.json') || {};
const platforms = config.platforms || {};
if (!config.business || !config.business.name) err('config.json: business.name is required');
if (!Object.keys(platforms).length) err('config.json: platforms is empty');
const relIcon = (where, icon) => { if (icon && !/^(https?:)?\/\//.test(icon) && !icon.startsWith('data:') && !existsSync(path.join(root, icon))) err(`config.json ${where}: icon ${icon} not found`); };
for (const [k, p] of Object.entries(platforms)) relIcon(`platforms.${k}`, p.icon || `icons/${k}.svg`);
for (const l of config.links || []) relIcon(`links.${l.platform}`, l.icon);
if (config.summary) {
  if (typeof config.summary.text !== 'string' || !config.summary.text.trim()) err('config.json: summary.text must be a non-empty string');
  if (!isIso(config.summary.generated_at)) err('config.json: summary.generated_at must be an ISO 8601 timestamp');
}
if (!existsSync(path.join(root, 'theme', 'theme.css'))) warn('theme/theme.css not found (the widget loads it)');

const years = (config.reviews || {}).years;
if (!Array.isArray(years) || !years.every(Number.isInteger)) err('config.json: reviews.years must be an array of integers');
const yl = Array.isArray(years) ? years : [];
if (yl.some((y, i) => i && y >= yl[i - 1])) err('config.json: reviews.years must be unique and sorted newest first');
const files = existsSync(path.join(root, 'reviews')) ? readdirSync(path.join(root, 'reviews')).filter(f => f.endsWith('.json')) : [];
for (const f of files) if (!yl.includes(Number(f.replace(/\.json$/, '')))) err(`reviews/${f}: not listed in config.json reviews.years`);

const seen = new Map(), used = new Set(), counts = {};
let total = 0;
for (const y of yl) {
  const f = `reviews/${y}.json`;
  const list = readJson(f);
  if (!list) continue;
  if (!Array.isArray(list)) { err(`${f}: must be an array`); continue; }
  if (!list.length) err(`${f}: empty (drop the file and the year instead)`);
  list.forEach((r, i) => {
    const at = `${f}[${i}]`;
    for (const k of REQUIRED) if (r[k] === undefined) err(`${at}: missing "${k}"`);
    if (r.platform && !platforms[r.platform]) err(`${at}: platform "${r.platform}" is not in config.json platforms`);
    if (r.rating !== null && r.rating !== undefined && !(Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5)) err(`${at}: rating must be 1-5 or null`);
    if (!isIso(r.date)) err(`${at}: date is not ISO 8601`);
    else if (r.date.slice(0, 4) !== String(y)) err(`${at}: dated ${r.date.slice(0, 10)} but stored in ${f}`);
    for (const k of ['collected_at', 'updated_at']) if (r[k] != null && !isIso(r[k])) err(`${at}: ${k} is not ISO 8601`);
    if (r.owner_reply != null && (typeof r.owner_reply.text !== 'string' || (r.owner_reply.date != null && !isIso(r.owner_reply.date)))) err(`${at}: owner_reply must be null or {text, date}`);
    if (i && r.date > list[i - 1].date) err(`${at}: not newest first`);
    const key = `${r.platform}:${r.platform_review_id}`;
    if (seen.has(key)) err(`${at}: duplicate review ${key} (also ${seen.get(key)})`);
    seen.set(key, at);
    if (r.reviewer_image) {
      const want = `images/reviewers/${r.platform}-${safeId(r.platform_review_id)}`;
      if (!/^images\/reviewers\/[^/]+\.(jpg|jpeg|png|webp|gif|svg)$/.test(r.reviewer_image) || r.reviewer_image.replace(/\.[^.]+$/, '') !== want) err(`${at}: reviewer_image must be ${want}.<ext>, got ${r.reviewer_image}`);
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
console.log(`ok: ${total} reviews (${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(', ')}) in ${yl.length} year file(s)` +
  (config.summary ? `; summary generated ${config.summary.generated_at}` : ''));
