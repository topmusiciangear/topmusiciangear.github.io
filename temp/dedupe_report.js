// Dedupe los hits del informe por (kind, m) para revisión rápida
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/deep_es_audit_report.txt', 'utf8');
const lines = raw.split(/\r?\n/);
let curKind = null, curSec = null, m = null;
const seen = new Map(); // kind + ' | ' + m -> count, secs
for (let i = 0; i < lines.length; i++) {
  const L = lines[i];
  const hk = L.match(/^===== (METAFORA|EN|EN-AUDIO|EN-1|ARTIFACT|QF-VAL-EN|QF-VAL-SIN-ES|QF-LABEL-SIN-ES|QF-BESTFOR-SIN-ES|SIN-ES) /);
  if (hk) { curKind = hk[1]; continue; }
  const ds = L.match(/^--- (.+?) \((\d+)\) ---$/);
  if (ds && curKind && (curKind === 'EN-1' || curKind === 'EN-AUDIO-1')) { curKind = curKind + ':' + ds[1]; continue; }
  const det = L.match(/^\[(JSON-ES|HTML-ES|HTML-JSONLD|JSON-SIN-ES|QF)\] (.+?) :: (.+)$/);
  if (det) { curSec = det[1] + ' / ' + det[2]; continue; }
  const mm = L.match(/^   «(.*)»\s*$/);
  if (mm && curKind) {
    const key = curKind + ' ||| ' + mm[1];
    if (!seen.has(key)) seen.set(key, { kind: curKind, m: mm[1], secs: [] });
    seen.get(key).secs.push(curSec);
  }
}
const out = [];
for (const [key, v] of seen) {
  out.push(v.kind + '  [' + v.secs.length + ']  «' + v.m + '»   @ ' + v.secs.slice(0, 3).join(' ; '));
}
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/deep_es_dedupe.txt', out.join('\n'), 'utf8');
console.log('total unicos: ' + out.length);
const kinds = {};
out.forEach(o => { const k = o.split('  [')[0]; kinds[k] = (kinds[k] || 0) + 1; });
Object.keys(kinds).sort().forEach(k => console.log('  ' + k + ': ' + kinds[k]));
