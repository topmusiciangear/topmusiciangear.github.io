const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ============================================================
// SCORES REALES - Guías contienen lo mejor de lo mínimo
// S = 9.8 | A = 9.5 | B = 9.2 | C = 8.8
// Todos son "best of" así que mínimo 8.8
// ============================================================

const TIER_S = 9.8;  // Referencia absoluta
const TIER_A = 9.5;  // Excelente
const TIER_B = 9.2;  // Muy bueno
const TIER_C = 8.8;  // Bueno (mínimo - son lo mejor de su categoría)

function getTier(p) {
  const t = p.title || '';

  // S tier - Referencia absoluta
  if (/Genelec 8351B|Neumann KH 80 DSP|Adam Audio A7V|Focal Trio11 Be|Barefoot MicroSub45|Focal Sub12|Genelec 7370A|Neumann KH 750 DSP|Neumann KH 810 II|Genelec 7050C|ATC SCS120 Pro|ATC SCM25A Pro|ADAM Audio S3H|Sequential Prophet-10|Sequential OB-6|Nord Stage 4 88|Yamaha Montage M8x|Roland Fantom 8 EX|SSL UF8|Neumann MT 48/.test(t)) return TIER_S;

  // A tier - Excelente
  if (/Genelec 8010A|Focal Alpha 65 Evo|Focal Alpha 50 Evo|Yamaha HS8|Kali Audio LP-6 V2|Kali Audio IN-8 V2|Adam Audio T5V|ADAM Audio D3V|JBL 305P MkII|Kali Audio LP-UNF|Kali Audio IN-UNF|Kali Audio WS-6.2|Yamaha HS8S|KRK Rokit 7 G5|KRK S10.4|Adam T10S|IK Multimedia iLoud MTM MKII|IK Multimedia iLoud Micro Monitor Pro|IK Multimedia iLoud Sub|Mackie CR4.5|PreSonus Eris 3.5 2nd Gen|Mackie CR3.5|PreSonus Eris E3.5|M-Audio BX4|Yamaha HS5|PreSonus Eris E4.5|Mackie CR3-X|Behringer Truth 3.5 BT|KRK Rokit 5 G5|PreSonus Eris Studio 5|Behringer Truth B2031A|M-Audio BX3|Samson Resolv SE5|Edifier R1280T|Edifier MR3/.test(t)) return TIER_A;

  // B tier - Muy bueno
  if (/Audeze MM-500|Sennheiser HD 650|Beyerdynamic DT 1990 Pro MKII|Neumann NDH 30|Sennheiser IE 900|Shure SE846 Gen 2|Sennheiser IE 600|Audeze LCD-MX4|Audeze LCD-X|Beyerdynamic DT 900 Pro X|Neumann NDH 20|Sennheiser HD 300 Pro|Beyerdynamic DT 990 Pro|Beyerdynamic DT 770 Pro|Audio-Technica ATH-M50x|Audio-Technica ATH-M70x|Sony MDR-7506|Focal Listen Professional|Audio-Technica ATH-R70xa|Audio-Technica ATH-R30x|Shure SRH440A|Sennheiser HD 490 Pro Plus|Sennheiser HD 560S|Sennheiser HD 280 PRO II|AKG K371|AKG K240 Studio|Samson SR850|Audio-Technica ATH-M20x|Audio-Technica ATH-M40x/.test(t)) return TIER_B;

  // C tier - Bueno (mínimo 8.8)
  return TIER_C;
}

products.forEach(p => {
  p.score = getTier(p);
});

// Verificar
const dist = {};
products.forEach(p => { dist[p.score] = (dist[p.score] || 0) + 1; });
console.log('Distribución:');
Object.entries(dist).sort((a, b) => b[0] - a[0]).forEach(([k, v]) => console.log('  ' + k + ': ' + v + ' productos'));

console.log('\nScore mínimo: ' + Math.min(...products.filter(p => p.score !== undefined).map(p => p.score)));
console.log('Score máximo: ' + Math.max(...products.filter(p => p.score !== undefined).map(p => p.score)));

// Verificar monitores clave
console.log('\nMonitores clave:');
['Yamaha HS8', 'JBL 305P MkII', 'Kali Audio LP-6 V2', 'Genelec 8010A', 'Neumann KH 80 DSP', 'Adam Audio A7V', 'Genelec 8351B SAM 3-Way Coaxial Studio Monitor'].forEach(n => {
  const x = products.find(y => y.title === n);
  if (x) console.log('  ' + n + ': ' + x.score);
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nListo.');