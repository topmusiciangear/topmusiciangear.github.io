const fs = require('fs');
const { execSync } = require('child_process');
const headRaw = execSync('git show HEAD:data/guides.json', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const gh = JSON.parse(headRaw);
const gc = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const diffs = [];
function esc(s) { return JSON.stringify(s); }
function walk(h, c, pfx, guide) {
  if (h == null || c == null) return;
  if (typeof h === 'string' || typeof c === 'string') {
    if (typeof h === 'string' && h !== c) {
      diffs.push({ guide, pfx, h, c });
    }
    return;
  }
  if (Array.isArray(h)) {
    for (let i = 0; i < Math.max(h.length, c.length); i++) {
      walk(h[i], c[i], pfx + '[' + i + ']', guide);
    }
    return;
  }
  if (typeof h === 'object') {
    for (const k of Object.keys(h)) {
      if (k.endsWith('_es')) continue;
      if (c == null || !(k in c)) continue;
      if (typeof h[k] === 'string' && h[k] !== c[k]) {
        diffs.push({ guide, pfx: pfx + '.' + k, h: h[k], c: c[k] });
      } else if (typeof h[k] === 'object') {
        walk(h[k], c[k], pfx + '.' + k, guide);
      }
    }
  }
}
for (const g of gh) {
  const c = gc.find(x => x.id === g.id);
  if (!c) continue;
  walk(g, c, '', g.id);
}
let out = '';
for (const d of diffs) {
  out += '### ' + d.guide + d.pfx + '\n';
  out += 'HEAD: ' + esc(d.h) + '\n';
  out += 'CURR: ' + esc(d.c) + '\n\n';
}
fs.writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/en-diffs.txt', out, 'utf8');
console.log('EN field diffs (guides.json):', diffs.length);