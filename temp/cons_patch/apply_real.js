var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8');

// STEP 1: heading fallback (single unique line).
var a = 'const h = isEs && s.heading_es ? s.heading_es : s.heading;';
var b = "const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');";
var n = t.split(a).length - 1;
console.log('heading-line occurrences = ' + n);
if (n !== 1) { console.log('ABORT'); process.exit(1); }
t = t.split(a).join(b);

// STEP 2: guard on the GENERATE loop, anchored to the unique buildGuidePage call.
var anchor = "guides.forEach((guide, idx) => {\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
var guard = "var onlyIds = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;\nguides.forEach((guide, idx) => {\n  if (onlyIds && onlyIds.indexOf(guide.id) === -1) return;\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
if (t.indexOf(anchor) === -1) { console.log('ABORT: anchor not found'); process.exit(1); }
t = t.split(anchor).join(guard);

fs.writeFileSync(p, t, 'utf8');
console.log('patched OK; now checking syntax...');
cp.execSync('node --check ' + p);
console.log('syntax OK');
