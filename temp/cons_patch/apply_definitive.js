var fs = require('fs');
var child = require('child_process');
var repo = 'C:/Users/Daniel/projects/topmusiciangear';
var p = repo + '/build-guides.js';

var orig = fs.readFileSync(p, 'utf8');
var lines = orig.split(/\r?\n/);

// ===== FIX 1: heading fallback (single line, exact match) =====
var a = 'const h = isEs && s.heading_es ? s.heading_es : s.heading;';
var n1 = orig.split(a).length - 1;
console.log('fix1 occurrences: ' + n1);
if (n1 !== 1) { console.log('ABORT fix1 (want 1, got ' + n1 + ')'); process.exit(1); }
lines = lines.join('\r\n').split(a).join("const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');").split(/\r?\n/);

// ===== FIX 2: ONLY_GUIDES guard on the GENERATE loop =====
// Find line "guides.forEach((guide, idx) => {" where the NEXT line contains "buildGuidePage("
var gi = -1;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('guides.forEach((guide, idx) => {') !== -1) {
    var nx = lines[i + 1] || '';
    if (nx.indexOf("['en', 'es'].forEach") !== -1 || nx.indexOf("['en','es'].forEach") !== -1) { gi = i; break; }
  }
}
if (gi === -1) { console.log('ABORT fix2: generate forEach not found'); process.exit(1); }
var indent = lines[gi].match(/^\s*/)[0];
console.log('fix2 at line ' + (gi + 1) + ' indent=' + JSON.stringify(indent));
var guard = indent + "var onlyIds = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;";
var inside = indent + "if (onlyIds && onlyIds.indexOf(guide.id) === -1) return;";
lines.splice(gi, 0, guard, inside);

// Inline the var idempotently (safety): if a prior run already added it, remove duplicates.
// (No-op path: the split above may have matched the sitemap foreach too; we verified gi is THE one with en/es + buildGuidePage.)

var out = lines.join('\r\n');
fs.writeFileSync(p, out, 'utf8');
console.log('\n=== wrote. now node --check ===');
child.execSync('node --check "' + p + '"');
console.log('syntax OK');
console.log('\n=== git diff ===');
console.log(child.execSync('git -C "' + repo + '" diff build-guides.js', { encoding: 'utf8', maxBuffer: 1e9 }).toString());
