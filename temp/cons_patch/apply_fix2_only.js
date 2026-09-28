var fs = require('fs');
var child = require('child_process');
var repo = 'C:/Users/Daniel/projects/topmusiciangear';
var p = repo + '/build-guides.js';
var t = fs.readFileSync(p, 'utf8');

// Anchor: the unique generate-line inside the page-generation forEach.
var a = "guides.forEach((guide, idx) => {\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";
var n = t.split(a).length - 1;
console.log('generate-loop anchor occurrences: ' + n);

// guard (idempotent check)
var g = "var onlyG = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;\nguides.forEach((guide, idx) => {\n  if (onlyG && onlyG.indexOf(guide.id) === -1) return;\n  ['en', 'es'].forEach(lang => {\n    const html = buildGuidePage(guide, lang, idx);";

if (n === 1 && t.split(g).length - 1 === 0) {
  t = t.split(a).join(g);
  fs.writeFileSync(p, t, 'utf8');
  console.log('guard inserted');
} else if (t.split(g).length - 1 > 0) {
  console.log('guard already present — no-op OK');
} else {
  console.log('ABORT: anchor not unique (n=' + n + ')');
  process.exit(1);
}

child.execSync('node --check "' + p + '"');
console.log('syntax OK');
console.log('\n=== git diff build-guides.js ===');
console.log(child.execSync('git -C "' + repo + '" diff build-guides.js', { encoding: 'utf8', maxBuffer: 1e9 }).toString());
