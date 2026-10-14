const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
let fixes = 0;
function rep(t, from, to) {
  if (typeof t !== 'string' || !t.includes(from)) return t;
  const n = t.split(from).join(to);
  if (n !== t) fixes++;
  return n;
}
// 1. monitor-config link
const bm = guides.find(x => x.id === 'best-monitors');
if (bm) (bm.sections || []).forEach(s => {
  if (!s) return;
  s.content_es = rep(s.content_es, '/guides/monitor-configuración.html', '/guides/monitor-setup_es.html');
  s.content_es = rep(s.content_es, 'Monitor configuración guide', 'Guía de configuración de monitores');
});
// 2. headphones -> auriculares SOLO fuera de URLs/slugs
function fixHp(t) {
  if (typeof t !== 'string' || !t.includes('headphones')) return t;
  const n = t.replace(/(?<![-\/])headphones(?![-\/.])/g, 'auriculares');
  if (n !== t) fixes++;
  return n;
}
// "Best headphones" al inicio de frase -> "Mejores auriculares"
function fixBestHp(t) {
  if (typeof t !== 'string') return t;
  let n = t;
  if (/\bBest headphones\b/.test(n)) { n = n.replace(/\bBest headphones\b/g, 'Mejores auriculares'); fixes++; }
  return fixHp(n);
}
['best-headphones', 'open-headphones'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  (g.sections || []).forEach(s => {
    if (!s) return;
    s.content_es = fixBestHp(s.content_es);
    s.heading_es = fixBestHp(s.heading_es);
  });
  g.intro_es = fixBestHp(g.intro_es);
  g.verdict_es = fixBestHp(g.verdict_es);
  g.conclusion_es = fixBestHp(g.conclusion_es);
  (g.verdictProsCons || []).forEach(v => {
    if (!v) return;
    if (v.pros_es) v.pros_es = v.pros_es.map(fixBestHp);
    if (v.cons_es) v.cons_es = v.cons_es.map(fixBestHp);
  });
});
// 3. es el mejor para -> es ideal para (usb-mics ES)
const um = guides.find(x => x.id === 'usb-mics');
if (um) (um.sections || []).forEach(s => {
  if (!s || !s.content_es) return;
  if (s.content_es.includes('es el mejor para ')) {
    s.content_es = s.content_es.split('es el mejor para ').join('es ideal para ');
    fixes++;
  }
});
fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('fixes:', fixes);
// Verificar que no se rompieron URLs
const all = JSON.stringify(guides);
console.log('auriculares en URLs rotas:', (all.match(/best-auriculares|auriculares\.html|auriculares\//g) || []).length);
console.log('headphones en slugs intactos:', (all.match(/best-headphones/g) || []).length);