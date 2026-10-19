const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// tiers aproximados basados en posición en guías
// Los top picks de cada categoría reciben ~9.5-9.8; entrada/budget ~8.7-9.0
function scoreFor(p) {
  // Si ya tiene score en rango válido, conservar
  if (p.score >= 8.7 && p.score <= 9.8) return p.score;

  // Top picks (pos 1-3 en guías principales) → 9.5-9.8
  if (/Mackie CR4\.5|PreSonus Eris 3\.5 2nd Gen|ADAM Audio A7V|Yamaha HS8/i.test(p.title)) return 9.6;
  if (/M-Audio BX4|Mackie CR3\.5/i.test(p.title)) return 9.4;

  // Behringer Truth 3.5 BT es sólido pero gama media
  if (/Behringer Truth 3\.5 BT/i.test(p.title)) return 9.2;

  // Kali Audio IN-8 V2 es monitoreo gama alta
  if (/Kali Audio IN-8/i.test(p.title)) return 9.7;

  // KRK Rokit 7 G5 es gama media profesional
  if (/KRK Rokit 7 G5/i.test(p.title)) return 9.1;

  // Edifier R1280T es entrada premium
  if (/Edifier R1280T/i.test(p.title)) return 8.9;

  // Kali LP-UNF es ultracompacto nicho
  if (/Kali Audio LP-UNF/i.test(p.title)) return 8.8;

  // Kali WS-6.2 es subwoofer gama media
  if (/Kali Audio WS-6\.2/i.test(p.title)) return 9.0;

  // Interfaces
  if (/Universal Audio Apollo Twin/i.test(p.title)) return 9.7;
  if (/RME Babyface/i.test(p.title)) return 9.6;
  if (/Focusrite Scarlett 2i2/i.test(p.title)) return 9.3;
  if (/SSL 2\+/i.test(p.title)) return 9.4;
  if (/Audient iD14/i.test(p.title)) return 9.2;
  if (/Antelope Orion/i.test(p.title)) return 9.5;

  // Auriculares
  if (/Audeze MM-500/i.test(p.title)) return 9.8;
  if (/Sennheiser HD 650/i.test(p.title)) return 9.5;
  if (/Sennheiser IE 900/i.test(p.title)) return 9.7;
  if (/Beyerdynamic DT 1990/i.test(p.title)) return 9.6;
  if (/Beyerdynamic DT 900/i.test(p.title)) return 9.4;
  if (/Beyerdynamic DT 770/i.test(p.title)) return 9.1;
  if (/Sony MDR-7506/i.test(p.title)) return 9.0;

  // Monitores
  if (/Genelec 8351B/i.test(p.title)) return 9.8;
  if (/Focal Alpha 65/i.test(p.title)) return 9.5;
  if (/Genelec 7370A/i.test(p.title)) return 9.7;

  // SM7B etc
  if (/Shure SM7B/i.test(p.title)) return 9.7;

  // Fender, Gibson, etc
  if (/Fender American Professional II Stratocaster/i.test(p.title)) return 9.5;
  if (/Gibson Les Paul Standard/i.test(p.title)) return 9.5;
  if (/Fender Player II/i.test(p.title)) return 9.2;

  // Default para productos en catálogo sin score
  return 8.8;
}

let changed = 0;
let total = 0;
products.forEach(p => {
  if (!p.score) { p.score = scoreFor(p); changed++; }
  total++;
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Productos totales: ' + total);
console.log('Asignados por tier: ' + changed);

// Reporte por guía
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
console.log('\nScores en best-home-studio-speakers:');
g.productTable.columns.forEach((c, i) => {
  const p = products.find(x => x.title === c.title || x.title === c.title_es);
  console.log('  ' + (p ? p.score : 'N/A') + '  ' + (c.title_es || c.title));
});