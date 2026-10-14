var fs = require('fs');
var cp = require('child_process');
var repo = 'C:/Users/Daniel/projects/topmusiciangear';
var p = repo + '/build-guides.js';
var t = fs.readFileSync(p, 'utf8');
var orig = t;

// ---- FIX 1: heading fallback (unique line) ----
var a = 'const h = isEs && s.heading_es ? s.heading_es : s.heading;';
var b = "const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');";
var n = t.split(a).length - 1;
console.log('fix1 occurrences: ' + n);
if (n !== 1) { console.log('ABORT fix1'); process.exit(1); }
t = t.split(a).join(b);

// ---- FIX 2: ONLY_GUIDES guard anchored to UNIQUE 3-line generate block ----
var anchor = "guides.forEach((guide, idx) => {\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
var guard = "var onlyIds = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;\nguides.forEach((guide, idx) => {\n  if (onlyIds && onlyIds.indexOf(guide.id) === -1) return;\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
var m = t.split(anchor).length - 1;
console.log('fix2 anchor occurrences: ' + m);
if (m !== 1) { console.log('ABORT fix2'); process.exit(1); }
t = t.split(anchor).join(guard);

if (orig === t) { console.log('ABORT noop'); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');

// ---- VERIFY syntax + git diff ----
cp.execSync('node --check "' + p + '"');
console.log('syntax OK');
console.log('');
console.log(cp.execSync('git -C "' + repo + '" diff build-guides.js', {encoding: 'utf8', maxBuffer: 1e9}));
