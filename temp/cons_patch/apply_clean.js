var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8');

// 1) heading fallback fix on the single guide-section-heading line
var a = 'const h = isEs && s.heading_es ? s.heading_es : s.heading;';
var b = "const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');";
var n = t.split(a).length - 1;
console.log('heading line occurences: ' + n);
if (n !== 1) { console.log('ABORT: not exactly 1'); process.exit(1); }
t = t.split(a).join(b);

// 2) selective guard on the GENERATE loop ONLY, using the unique filename-write line
var anchor = "guides.forEach((guide, idx) => {\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
var guard = "var onlyIds = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;\nguides.forEach((guide, idx) => {\n  if (onlyIds && onlyIds.indexOf(guide.id) === -1) return;\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
if (t.indexOf(anchor) === -1) { console.log('ABORT: generate anchor not found'); process.exit(1); }
if (t.indexOf(guard) !== -1) { console.log('already guarded'); process.exit(袖子); }
t = t.split(anchor).join(guard);

fs.writeFileSync(p, t, 'utf8');
console.log('done; new heading line ~1222 first 90 chars: ' + (t.split(/\r?\n/)[1219].slice(1, 120)));
