// Escanea data/guides.json: palabras dudosas en campos heading ES + typos a corregir a mano
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const HEADING_RE = /\b(Piano|Kit|Track|Tu|Ti)\b/;
const FIX_RE = /(Sona|nT-USB|traducen)/;

const headHits = [], fixHits = [];
function walk(o, path, id, bucket, re) {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) { o.forEach((x, i) => walk(x, path + '[' + i + ']', id, bucket, re)); return; }
  for (const k of Object.keys(o)) {
    const v = o[k];
    if (typeof v === 'string' && k.endsWith('_es') && re.test(v)) bucket.push({ id, path: path + '.' + k, t: v });
    else if (typeof v === 'object') walk(v, path + '.' + k, id, bucket, re);
  }
}
const HEAD_FIELDS = /title_es$|titleTag_es$|metaDesc_es$|heading_es$|\.h_es$|\.q_es$/;
g.forEach(gd => {
  walkAll(gd, '', gd.id);
});
function walkAll(o, path, id) {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) { o.forEach((x, i) => walkAll(x, path + '[' + i + ']', id)); return; }
  for (const k of Object.keys(o)) {
    const v = o[k];
    if (typeof v === 'string' && k.endsWith('_es')) {
      if (HEAD_FIELDS.test(k) && HEADING_RE.test(v)) headHits.push({ id, path: path + '.' + k, t: v });
      if (FIX_RE.test(v)) fixHits.push({ id, path: path + '.' + k, t: v });
    } else if (typeof v === 'object') walkAll(v, path + '.' + k, id);
  }
}
console.log('== HEADINGS con Piano/Kit/Track/Tu/Ti ==');
headHits.forEach(h => console.log('[' + h.id + '] ' + h.path + '\n   ' + h.t.replace(/\n/g, ' ')));
console.log('== TYPOS Sona / nT-USB / traducen (todos los campos _es) ==');
fixHits.forEach(h => console.log('[' + h.id + '] ' + h.path + '\n   ' + h.t.slice(0, 400).replace(/\n/g, ' ')));
console.log('TOTALS heading=' + headHits.length + ' fix=' + fixHits.length);
