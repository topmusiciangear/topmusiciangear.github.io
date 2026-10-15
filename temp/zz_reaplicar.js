// Reaplicar TODO lo pendiente en build-guides.js, solo con Node (UTF-8 seguro)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'build-guides.js';
let s = fs.readFileSync(F, 'utf8');
const antes = s;

// ── 1) searchUrls de zZounds: la portada del catalogo -> URL de busqueda ──
const viejo1 = "zzounds: () => 'https://www.zzounds.com/a--925521/'";
const nuevo1 = "zzounds: (t) => `https://www.zzounds.com/prodsearch?form=search&q=${encodeURIComponent(t).replace(/%20/g, '+')}`";
if (s.includes(viejo1)) { s = s.replace(viejo1, nuevo1); console.log('1) searchUrls zzounds -> URL de busqueda  OK'); }
else console.log('1) searchUrls: PATRON NO ENCONTRADO (revisar)');

// ── 2) las 6 entradas del mapa, con reemplazo literal exacto ──
const CAMBIOS = [
  [' 138: { prices: { amazon: "$1,398.00", andertons: "£991.00", gear4music: "£1,037.00", musicstore: "€1,298.00" }, urls: { zzounds: "https://www.zzounds.com/productreview--BEHX32COMPACT" }, oos: [ "zzounds" ] }',
   ' 138: { prices: { amazon: "$1,398.00", andertons: "£991.00", gear4music: "£1,037.00", musicstore: "€1,298.00" }, urls: { zzounds: "https://www.zzounds.com/prodsearch?form=search&q=Behringer+X32+Compact" }, oos: [ "zzounds" ] }'],

  [' 145: { prices: { amazon: "$509.00", andertons: "£315.00", gear4music: "£315.00", musicstore: "£369.00" }, urls: { zzounds: "https://www.zzounds.com/productreview--BEHXR18" }, oos: [ "zzounds" ] }', null],
  [' 422: { prices: { amazon: "$279.00", gear4music: "£149.00", musicstore: "€304.00" } }',
   ' 422: { prices: { amazon: "$279.00", gear4music: "£149.00", musicstore: "€304.00" }, urls: { zzounds: "https://www.zzounds.com/item--SENHD600" }, oos: [ "zzounds" ] }'],
  [' 430: { prices: { amazon: "$39.99", zzounds: "$39.99", gear4music: "£35.00", musicstore: "€31.93" }, oos: [ "andertons" ] }',
   ' 430: { prices: { amazon: "$39.99", gear4music: "£35.00", musicstore: "€31.93" }, oos: [ "andertons" ] }'],
  [' 449: { prices: { amazon: "$149.99", musicstore: "€133.60", andertons: "£139.00" } }',
   ' 449: { prices: { zzounds: "$149.99", amazon: "$149.99", musicstore: "€133.60", andertons: "£139.00" }, urls: { zzounds: "https://www.zzounds.com/item--WLRCANVAS" } }'],
];

CAMBIOS.forEach(([viejo, nuevo], i) => {
  if (!nuevo) { console.log('2.' + i + ') omitido (patron dudoso, se verifica aparte)'); return; }
  if (s.includes(viejo)) { s = s.replace(viejo, nuevo); console.log('2.' + i + ') entrada parcheada  OK'); }
  else console.log('2.' + i + ') NO ENCONTRADA: ' + viejo.slice(0, 70));
});

// 670: quitar precio + cambiar la URL zzounds rota + oos
const rx670 = /( 670: \{ prices: \{ amazon: "\$169\.00"), zzounds: "\$169\.00"/;
if (rx670.test(s)) {
  s = s.replace(rx670, '$1');
  s = s.replace(/( 670: \{[\s\S]*?urls: \{) zzounds: "https:\/\/www\.zzounds\.com\/item--SEENEOMUSB"/,
    '$1 zzounds: "https://www.zzounds.com/prodsearch?form=search&q=sE+Electronics+Neom"');
  s = s.replace(/( 670: \{[\s\S]*?musicstore: "https:\/\/www\.musicstore\.com\/[^"]*" \})/,
    '$1, oos: [ "zzounds" ]');
  console.log('2.5) 670 parcheada  OK');
} else console.log('2.5) 670: NO ENCONTRADA');

fs.writeFileSync(F, s, 'utf8');
console.log('\ncambios aplicados: ' + (s !== antes) + '  | longitud ' + antes.length + ' -> ' + s.length);

// verificacion
console.log('euros: ' + (s.match(/€/g) || []).length + ' | libras: ' + (s.match(/£/g) || []).length +
  ' | mojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SYNTAXIS ROTA: ' + e.message); }

const ini = s.indexOf('const TEST_SHOP_BTN = {');
const bloque = s.slice(ini, s.indexOf('\n};', ini));
function ent(id) {
  const re = new RegExp('(^|\\n)(\\s*)' + id + ':\\s*\\{', 'm');
  const m = re.exec(bloque); if (!m) return '(NO)';
  const i0 = m.index + m[1].length; let d = 0, i = i0;
  for (; i < bloque.length; i++) { if (bloque[i] === '{') d++; else if (bloque[i] === '}') { d--; if (!d) break; } }
  return bloque.slice(i0, i + 1).replace(/\s+/g, ' ');
}
console.log('\n--- estado final de las 6 entradas ---');
[138, 145, 422, 430, 449, 670].forEach(id => console.log('\n' + ent(id).slice(0, 260)));
