// Compara flags TITLE CASE del audit_es.js entre backup pre-fix y estado actual
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const cur = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const bak = JSON.parse(fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/guides.before_caps_fix.json', 'utf8'));
const PALMAS = ['PreSonus','Mackie','M-Audio','Edifier','Behringer','JBL','Yamaha','Adam','ADAM','Kali','KRK','Celemony','Fender','Shure','Rode','Neumann','Genelec','Focal','Tannoy','IK','Audio-Technica','NUX','IK Multimedia','Superlux','KRK Audio','Soundtoys','iZotope','Telos','SSL','Native Instruments','Arturia','XLN','Positive','Grid','FabFilter','Valhalla','Standard','Spitfire','Plugin','Neato','Output'];
function tc(g) {
  const c = v => {
    if (typeof v !== 'string') return 0;
    const t = String(v).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const h = t.replace(/^[¿"'(]/, '');
    const ws = h.split(/\s+/).filter(w => w.length > 3);
    const caps = ws.filter(w => /^[A-ZÁÉÍÓÚÑ]/.test(w) && !PALMAS.some(p => w.toLowerCase().indexOf(p.toLowerCase()) === 0));
    return caps.length > 1 ? 1 : 0;
  };
  let n = 0;
  (g.sections || []).forEach(s => { n += c(s.heading_es); });
  if (g.productTable) n += c(g.productTable.title_es);
  return n;
}
let a = 0, b = 0;
cur.forEach(g => { a += tc(g); });
bak.forEach(g => { b += tc(g); });
console.log('TITLE CASE headings (heurística audit_es.js): backup=' + b + ' actual=' + a);
