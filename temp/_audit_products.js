const fs = require('fs');

const raw = fs.readFileSync('data/products.json', 'utf8');
const products = JSON.parse(raw);

const issues = [];
function add(id, field, msg) { issues.push(`[${id}] ${field}: ${msg}`); }

const MOJI_PATTERNS = [
  [/\uFFFD/g, 'U+FFFD replacement char (mojibake)'],
  [/[\u00C3][\u00A2\u2013\u201C\u2019\u2018\u00A9\u00AE\u00A1\u00AA\u00A7\u00B0\u00BC\u00BD\u00BE\u00B7\u00A6\u00A5\u00A4\u00A3\u00A2\u00A1\u00A0]/, 'UTF8-double-encoded byte (mojibake)'],
  [/[\u0080-\u009F]/, 'C1 control char']
];
const CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;
const URL_ANOM = [
  [/[^\x21-\x7E]/u, 'non-ASCII char in URL'],
  [/<|>|"|'|\s/, 'illegal char/space in URL'],
  [/\.\.\//, 'relative resolution in URL'],
  [/^(?!https:\/\/)/, 'not https']
];

let priceAnomalies = 0;

for (const it of products) {
  const id = it.id;
  for (const f of ['title', 'title_es', 'brand', 'category', 'desc', 'desc_es', 'img']) {
    if (it[f] === undefined || it[f] === null || it[f] === '') add(id, f, 'MISSING/EMPTY');
  }
  for (const f of ['price', 'rating', 'reviews']) {
    if (it[f] === undefined || it[f] === null) add(id, f, 'MISSING');
  }
  if (typeof it.price === 'number' && (it.price <= 0)) { priceAnomalies++; add(id, 'price', `suspicious value ${it.price}`); }

  // text mojibake
  for (const f of ['title', 'title_es', 'desc', 'desc_es']) {
    if (typeof it[f] !== 'string') continue;
    const s = it[f];
    for (const [re, label] of MOJI_PATTERNS) {
      const m = s.match(re);
      if (m) add(id, f, `${label} count=${(s.match(re) || []).length}`);
    }
    if (CTRL.test(s)) add(id, f, 'control char');
    const collapsed = s.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, '');
    if (s !== collapsed) add(id, f, 'contains emoji/symbol char');
  }

  // stores
  const st = it.stores || {};
  const stKeys = Object.keys(st);
  if (!stKeys.length) add(id, 'stores', 'EMPTY stores object');
  for (const [shop, url] of Object.entries(st)) {
    if (typeof url !== 'string' || !url) { add(id, `stores.${shop}`, 'MISSING/EMPTY'); continue; }
    for (const [re, label] of URL_ANOM) {
      if (re.test(url)) add(id, `stores.${shop}`, `${label} -> ${url.slice(0, 120)}`);
    }
    if (/awin1\.com/.test(url)) {
      const u = decodeURIComponent(url);
      const t = /ued=(https?:\/\/[^&]+)/.exec(u);
      if (!t) add(id, `stores.${shop}`, 'awin WITHOUT ued target');
      else {
        const target = t[1];
        const host = new URL(target).hostname;
        const shopHost = { gear4music: 'gear4music.com', musicstore: 'musicstore.com', thomann: 'thomann.de' }[shop];
        if (shopHost && !host.endsWith(shopHost)) add(id, `stores.${shop}`, `awin target host ${host} != ${shopHost}`);
        if (new URL(target).pathname.length > 160) add(id, `stores.${shop}`, 'target path suspiciously long');
      }
    }
    if (/musicstore\.com/.test(url)) {
      const u = decodeURIComponent(url);
      const m = /art-[A-Z0-9]+-[0-9]{3}/.exec(u);
      if (!m) add(id, 'stores.musicstore', 'NO art-XXXXXXX-XXX article id in target');
      else if (/art-[A-Z0-9]+-000\b/.test(u)) add(id, 'stores.musicstore', `article ends -000 (placeholder?) -> ${m[0]}`);
    }
    if (/andertons/.test(url) && /dusk|surf|tidepool|crimson|olympic|sienna/i.test(url)) add(id, 'stores.andertons', 'variant keyword in URL (check color variant)');
  }

  // oos consistency
  if (Array.isArray(it.oos)) {
    for (const o of it.oos) {
      if (!stKeys.includes(o)) add(id, 'oos', `oos entry "${o}" not in stores`);
    }
    for (const k of stKeys) {
      if (it.oos.includes(k) && /zzounds/.test(k)) add(id, 'oos', `zzounds marked oos but has zzounds URL`);
    }
  }
}

console.log(`TOTAL PRODUCTS: ${products.length}`);
console.log(`TOTAL ISSUES: ${issues.length}`);
console.log('---');
const grouped = {};
for (const i of issues) {
  const kind = /MISSING|EMPTY/.test(i) ? 'missing' : /mojibake|double-encoded|control|replacement/.test(i) ? 'encoding' : /URL|url|article id|variant/.test(i) ? 'url' : /price/.test(i) ? 'price' : /oos/.test(i) ? 'oos' : 'other';
  (grouped[kind] = grouped[kind] || []).push(i);
}
for (const [k, v] of Object.entries(grouped)) {
  console.log(`\n===== ${k.toUpperCase()} (${v.length}) =====`);
  for (const line of v.slice(0, 60)) console.log(' ' + line);
  if (v.length > 60) console.log(`  ... +${v.length - 60} more`);
}