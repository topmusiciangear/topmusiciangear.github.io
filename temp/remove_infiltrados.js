const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');

// 1. Quitar los 2 veredictos
const nVpc0 = g.verdictProsCons.length;
g.verdictProsCons = g.verdictProsCons.filter(v => v && v.name !== 'Rode Rodecaster Duo' && v.name !== 'Roland Bridge Cast X');
console.log('veredictos:', nVpc0, '->', g.verdictProsCons.length);

// 2. Quitar las 3 secciones (2 dedicadas + streaming [239,240])
const nSec0 = g.sections.length;
g.sections = g.sections.filter(s => {
  if (!s) return false;
  const p = JSON.stringify(s.products || []);
  return p !== '[239]' && p !== '[240]' && p !== '[239,240]';
});
console.log('secciones:', nSec0, '->', g.sections.length);

// 3. Quitar de featuredProducts
g.featuredProducts = (g.featuredProducts || []).filter(id => id !== 239 && id !== 240);
console.log('featured:', JSON.stringify(g.featuredProducts));

// 4. Veredicto EN/ES
const vEn0 = 'Focusrite Scarlett 2i2 for beginners, Audient iD14 for better preamps, Universal Audio Volt 2 for portability, Rode Rodecaster Duo for streaming and podcasting.';
const vEn1 = 'Focusrite Scarlett 2i2 for beginners, Audient iD14 for better preamps and Universal Audio Volt 2 for portability.';
if (g.verdict !== vEn0) { console.log('!! verdict EN no coincide, no se toca'); } else g.verdict = vEn1;
const vEs0 = 'La Scarlett 2i2 es ideal para principiantes, la Audient iD14 para mejores previos, la Universal Audio Volt 2 para portabilidad y la Rode Rodecaster Duo para streaming y podcasting.';
const vEs1 = 'La Scarlett 2i2 es ideal para principiantes, la Audient iD14 para mejores previos y la Universal Audio Volt 2 para portabilidad.';
if (g.verdict_es !== vEs0) { console.log('!! verdict ES no coincide, no se toca'); } else g.verdict_es = vEs1;

// 5. Conclusion EN/ES (quitar la frase del Rodecaster, mantener el link a streaming-interfaces)
const cEn0 = 'For streaming and podcasting, get a dedicated streaming interface like the Rode Rodecaster Duo. ';
if (!g.conclusion.includes(cEn0)) { console.log('!! conclusion EN no contiene la frase, no se toca'); } else g.conclusion = g.conclusion.split(cEn0).join('');
const cEs0 = 'Para streaming y podcasting, consigue una interfaz de streaming dedicada como la Rode Rodecaster Duo. ';
if (!g.conclusion_es.includes(cEs0)) { console.log('!! conclusion ES no contiene la frase, no se toca'); } else g.conclusion_es = g.conclusion_es.split(cEs0).join('');

fs.writeFileSync(P, JSON.stringify(guides, null, 2));

// Verificacion
const all = JSON.stringify(g);
console.log('Rodecaster restante:', (all.match(/Rodecaster/g) || []).length);
console.log('Bridge Cast restante:', (all.match(/Bridge Cast/g) || []).length);
console.log('239/240 en products:', (all.match(/239|240/g) || []).length, '(pueden ser otros IDs)');
const cols = g.productTable.columns.map(c => c.title);
const vpc = g.verdictProsCons.map(v => v.name);
console.log('tabla:', cols.length, '| veredictos:', vpc.length, '| coinciden:', JSON.stringify(cols) === JSON.stringify(vpc));