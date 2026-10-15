// Los $605 / $925 que quedan en intro y description, mas el titular del featuredSnippet
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const log = [];
const ok = m => log.push('  ok  ' + m);
const no = m => log.push('  FALTA  ' + m);

function sub(campo, pares, etiqueta) {
  let t = guia[campo], n = 0;
  pares.forEach(([v, nv]) => { if (t.indexOf(v) > -1) { t = t.replace(v, nv); n++; } });
  guia[campo] = t;
  (n ? ok : no)(etiqueta + ': ' + n + '/' + pares.length);
  pares.forEach(([v]) => { if (t.indexOf(v) > -1) log.push('        no aplicado: "' + v.slice(0, 55) + '"'); });
}

sub('intro', [
  ['The cheapest comes to <strong>$605</strong>, the middle to <strong>$925</strong>, and the one with real monitors to <strong>$1.393</strong>.',
   'Tier 1 comes to <strong>$1,003</strong>, Tier 2 to <strong>$1,113</strong>, and the one with 7-inch monitors to <strong>$1,393</strong>.']
], 'intro');

sub('intro_es', [
  ['El más barato sale por <strong>$605</strong>, el intermedio por <strong>$925</strong> y el que lleva monitores de verdad por <strong>$1.393</strong>.',
   'El Nivel 1 sale por <strong>$1.003</strong>, el Nivel 2 por <strong>$1.113</strong> y el de monitores de 7 pulgadas por <strong>$1.393</strong>.']
], 'intro_es');

sub('description', [
  ['What $605, $925 and $1,393 actually buy', 'What $1,003, $1,113 and $1,393 actually buy']
], 'description');

sub('description_es', [
  ['Qué compran $605, $925 y $1,393', 'Qué compran $1.003, $1.113 y $1.393']
], 'description_es');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log(log.join('\n'));

/* ── BARRIDO FINAL ── */
const g2 = JSON.parse(fs.readFileSync(F, 'utf8'));
const s2 = g2.find(x => x.id === 'starter-studio');
const json = JSON.stringify(s2);
console.log('\n=== BARRIDO FINAL DE IMPORTES VIEJOS ===');
['$545', '$605', '$816', '$905', '$925', '$1,284', '$690', '$850', '$1,290'].forEach(p => {
  const n = (json.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log('  ' + (n ? 'RESTA x' + n + '  ' : 'limpio     ') + p);
});
console.log('\n=== IMPORTES NUEVOS ===');
['$1,003', '$1,113', '$1,393', '$1.003', '$1.113', '$1.393'].forEach(p => {
  const n = (json.match(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log('  ' + String(n).padStart(3) + 'x  ' + p);
});
console.log('\n  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
