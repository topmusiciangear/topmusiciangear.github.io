const fs = require('fs');
const path = require('path');
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d)) {
    const p = path.join(d, e);
    if (fs.statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
})('guides');
files.push('data/guides.json');

const PATTERNS = [
  [/\uFFFD/g, 'U+FFFD mojibake'],
  [/undefined/g, 'literal undefined'],
  [/\bNaN\b/g, 'NaN'],
  [/[ÂÃ][\x80-\xBF]/g, 'double-encoded UTF8'],
  [/&amp;amp;/g, 'double-encoded html entity'],
  [/\{\{/g, 'template token {{'],
  [/\bnull\b/g, 'literal null'],
  [/\$\sNaN/g, '$NaN'],
  [/£[0-9]{4,}|€[0-9]{4,}|\$[0-9]{4,}/g, 'price w/o thousands comma (>4 digits)'],
  [/\u00A0/g, 'non-breaking space in text'],
  [/href="undefined"/g, 'href=undefined'],
  [/src="undefined"/g, 'src=undefined'],
  [/(?:content|alt)=""(?!=)/g, 'empty content/alt'],
  [/\b(?:lorem|TODO|FIXME|PLACEHOLDER|XXXX)\b/gi, 'placeholder token'],
];

const counts = {};
let totalFiles = 0;
const fileMatches = {};

// visible-text heuristic: strip <script>/<style> blocks, strip tags
function cleanHtml(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

for (const f of files) {
  totalFiles++;
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  const visible = f.endsWith('.json') ? content : cleanHtml(content);
  for (const [re, label] of PATTERNS) {
    const m = visible.match(re);
    if (m && m.length) {
      counts[label] = (counts[label] || 0) + m.length;
      (fileMatches[label] = fileMatches[label] || []).push(`${path.basename(f)}:${m.length}`);
    }
  }
}

console.log('FILES SCANNED:', totalFiles);
for (const [label, n] of Object.entries(counts)) {
  console.log(`\n### ${label}: ${n} occurrences across ${fileMatches[label].length} files`);
  const files = [...new Set(fileMatches[label])];
  console.log('  files:', files.slice(0, 30).join(', ') + (files.length > 30 ? ` ... +${files.length - 30}` : ''));
}
console.log('\nDONE');