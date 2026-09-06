const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function findByN(n) { return g[n]; }

const fixes = [
  { serie: 'RESIDUAL-1', n: 6, path: ['conclusion_es'], sub: 'la mayor cantidad de hardware por dólar', rep: 'la mayor cantidad de hardware por tu dinero' },
  { serie: 'RESIDUAL-2', n: 11, path: ['conclusion_es'], sub: 'ofrecen más precisión por dólar que cualquier otra', rep: 'ofrecen más precisión por tu dinero que cualquier otra' },
  { serie: 'RESIDUAL-3', n: 11, path: ['featuredSnippet', 'faq_a1_es'], sub: 'dan más precisión por dólar.', rep: 'dan más precisión por tu dinero.' },
  { serie: 'RESIDUAL-4', n: 20, path: ['conclusion_es'], sub: 'te da la mayor salida por dólar con dos woofers', rep: 'te da la mayor salida por tu dinero con dos woofers' },
  { serie: 'RESIDUAL-5', n: 20, path: ['featuredSnippet', 'text_es'], sub: 'con la mayor salida por dólar', rep: 'con la mayor salida por tu dinero' },
  { serie: 'RESIDUAL-6', n: 57, path: ['sections', 3, 'content_es'], sub: 'la máxima versatilidad tonal por dólar', rep: 'la máxima versatilidad tonal por tu dinero' },
  { serie: 'RESIDUAL-7', n: 57, path: ['conclusion_es'], sub: 'la máxima versatilidad por dólar.', rep: 'la máxima versatilidad por tu dinero.' },
  { serie: 'RESIDUAL-8', n: 91, path: ['featuredSnippet', 'faq_a1_es'], sub: 'si quieres más funciones por dólar', rep: 'si quieres más funciones por tu dinero' },
  { serie: 'RESIDUAL-9', n: 91, path: ['featuredSnippet', 'faq_a2_es'], sub: 'mete más funciones por dólar, incluyendo', rep: 'mete más funciones por tu dinero, incluyendo' },
  { serie: 'RESIDUAL-10', n: 91, path: ['featuredSnippet', 'faq_a4_es'], sub: 'más canales y funciones por dólar', rep: 'más canales y funciones por tu dinero' },
  { serie: 'RESIDUAL-11', n: 91, path: ['verdictProsCons', 1, 'pros_es', 4], sub: 'A con funciones que la Yamaha no ofrece', rep: 'Viene con funciones que la Yamaha no ofrece' },
  { serie: 'RESIDUAL-12', n: 91, path: ['verdictProsCons', 1, 'cons_es', 3], sub: 'Fantom power +48V solo global', rep: 'Phantom power +48V solo global' },
  { serie: 'RESIDUAL-13', n: 92, path: ['sections', 0, 'content_es'], sub: 'ofrecen más potencia bruta por dólar', rep: 'ofrecen más potencia bruta por tu dinero' },
  { serie: 'RESIDUAL-14', n: 92, path: ['conclusion_es'], sub: 'ofrece la mayor potencia por dólar con 2500W', rep: 'ofrece la mayor potencia por tu dinero con 2500W' },
  { serie: 'RESIDUAL-15', n: 92, path: ['featuredSnippet', 'faq_a2_es'], sub: 'ofrecen más potencia bruta por dólar.', rep: 'ofrecen más potencia bruta por tu dinero.' },
  { serie: 'RESIDUAL-16', n: 96, path: ['sections', 0, 'content_es'], sub: 'quieren máxima capacidad por dólar.', rep: 'quieren máxima capacidad por tu dinero.' },
  { serie: 'RESIDUAL-17', n: 96, path: ['sections', 2, 'content_es'], sub: 'arreglo. en contenido por dólar, Logic Pro', rep: 'arreglo. Y en contenido, Logic Pro' },
  { serie: 'RESIDUAL-18', n: 102, path: ['faq', 4, 'a_es'], sub: 'si necesitas versatilidad por dólar.', rep: 'si necesitas versatilidad por tu dinero.' },
  { serie: 'RESIDUAL-19', n: 132, path: ['sections', 2, 'content_es'], sub: 'más hardware por dólar.</strong>', rep: 'más hardware por tu dinero.</strong>' },
  { serie: 'RESIDUAL-20', n: 132, path: ['conclusion_es'], sub: 'la mayor cantidad de hardware por dólar, y el FIFINE', rep: 'la mayor cantidad de hardware por tu dinero, y el FIFINE' },
  { serie: 'RESIDUAL-21', n: 135, path: ['conclusion_es'], sub: 'calibración GLM y más reserva por dólar.', rep: 'calibración GLM y más reserva por tu dinero.' },
  { serie: 'RESIDUAL-22', n: 139, path: ['verdict_es'], sub: 'en confiabilidad por dólar; Xvive', rep: 'en confiabilidad por tu dinero; Xvive' },
  { serie: 'RESIDUAL-23', n: 74, path: ['verdictProsCons', 2, 'cons_es', 0], sub: 'A cuesta el doble que la Circuit Tracks', rep: 'Cuesta el doble que la Circuit Tracks' },
  { serie: 'RESIDUAL-24', n: 75, path: ['verdictProsCons', 2, 'pros_es', 3], sub: 'A cuesta menos que los de la Katana 50 Gen 3', rep: 'Cuesta menos que los de la Katana 50 Gen 3' },
  { serie: 'RESIDUAL-25', n: 94, path: ['verdictProsCons', 2, 'cons_es', 0], sub: 'A cuesta aproximadamente el doble que la serie Player', rep: 'Cuesta aproximadamente el doble que la serie Player' },
  { serie: 'RESIDUAL-26', n: 138, path: ['verdictProsCons', 8, 'cons_es', 0], sub: 'A cuesta casi el doble del MKH 416', rep: 'Cuesta casi el doble del MKH 416' },
  { serie: 'RESIDUAL-27', n: 18, path: ['verdictProsCons', 3, 'cons_es', 4], sub: 'A cuestan tres veces los AcouFoam 6', rep: 'Cuestan tres veces los AcouFoam 6' },
];

let ok = 0, fail = 0;
for (const f of fixes) {
  const o = findByN(f.n);
  let cur = o;
  for (let i = 0; i < f.path.length - 1; i++) cur = cur[f.path[i]];
  const leaf = f.path[f.path.length - 1];
  if (typeof cur[leaf] !== 'string') { console.log('FAIL (no string):', f.serie, f.n, f.path.join('.')); fail++; continue; }
  if (cur[leaf].includes(f.sub)) {
    cur[leaf] = cur[leaf].split(f.sub).join(f.rep);
    console.log('OK', f.serie, o.id, f.path.join('.'), 'x', (cur[leaf].match(new RegExp(f.sub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length + 1);
    ok++;
  } else {
    console.log('MISS:', f.serie, o.id, f.path.join('.'), '| sub not found:');
    console.log('   sub:', f.sub.slice(0, 70));
    fail++;
  }
}
console.log('OK:', ok, 'FAIL/MISS:', fail);
if (fail === 0) {
  fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
  console.log('written data/guides.json');
}