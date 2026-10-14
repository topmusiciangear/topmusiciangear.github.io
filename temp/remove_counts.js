const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Elimina el CONTEO de productos del titulo. Motivo:
//  1) 4 de las 7 guias ya mentian (6 vs 7, 7 vs 5, 5 vs 14, 9 vs 11 productos).
//  2) Anadir o quitar un producto obliga a reeditar el <title>, y es facil
//     que se quede desincronizado otra vez.
// En su lugar se usa un termino de busqueda real y estable (caso de uso,
// tipo de instrumento, rango de precio) que no depende de cuantos productos haya.
// EN en Title Case, ES en sentence case y natural (no traduccion literal).

const T = {
  'budget-mics': {
    en: 'Best Budget XLR Microphones Under $200',
    es: 'Mejores micrófonos XLR económicos para estudio'
  },
  'budget-usb-mics': {
    en: 'Best Budget USB Mics Under $110 (Pros & Cons)',
    es: 'Mejores micrófonos USB por menos de $110'
  },
  'best-shotgun-mics': {
    en: 'Best Shotgun Mics for Film, Video & Broadcast',
    es: 'Mejores micrófonos Shotgun para cine, vídeo y broadcast'
  },
  'di-box': {
    en: 'Best DI Boxes for Bass, Guitar & Keyboards',
    es: 'Mejores cajas DI para cada instrumento'
  },
  'best-parlor-guitars': {
    en: 'Best Parlor Guitars for Blues & Fingerstyle',
    es: 'Mejores guitarras Parlor para blues y fingerstyle'
  },
  'premium-interfaces': {
    en: 'Best Premium Audio Interfaces for Recording Studios',
    es: 'Mejores interfaces de audio premium para estudios'
  },
  'studio-subwoofers': {
    en: 'Best Studio Subwoofers Under $700 for Mixing',
    es: 'Mejores subwoofers de estudio por menos de $700'
  },
  // 8a guia detectada por el control final: el titleTag EN ya no tenia numero
  // pero el ES si ("7 mejores..."), y ademas son 8 filas en tabla vs 7 destacados.
  'best-wireless-iems': {
    en: 'Best Wireless In-Ear Monitor Systems',
    es: 'Mejores sistemas In-Ear inalámbricos para directo'
  }
};

// Las 3 descripciones que tambien lleva el conteo. De paso se reparan dos
// descripciones que estaban cortadas a media frase ("... HS8S vs.").
const D = {
  'budget-usb-mics': {
    description: 'Best budget USB microphones for 2026: Samson Q2U, FIFINE, Rode, HyperX SoloCast 2 & more tested. Plug-and-play clear voice for gaming.',
    description_es: 'Mejores micrófonos USB económicos para 2026: Samson Q2U, FIFINE, Rode, HyperX SoloCast 2 y más probados. Voz clara plug-and-play.'
  },
  'di-box': {
    description: 'Best DI boxes 2026. Radial J48 vs Rupert Neve RNDI vs Tech 21 SansAmp — active and passive DIs for bass, guitar and keys. Best pick: Radial J48.',
    description_es: 'Las mejores cajas DI 2026. Radial J48 vs Rupert Neve RNDI vs Tech 21 SansAmp — DI activas y pasivas para bajo, guitarra y teclados.'
  },
  'studio-subwoofers': {
    description: 'Studio subwoofers tested for accurate low end: KRK S10.4 vs Yamaha HS8S vs Adam T10S for transient translation.',
    description_es: 'Subwoofers probados para graves precisos desde $479: KRK S10.4 vs HS8S vs T10S. Ficha técnica y veredicto.'
  }
};

let n = 0;
Object.keys(T).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log('[!!] no existe ' + id); return; }
  const t = T[id];
  ['title', 'titleTag'].forEach(function (k) { if (g[k]) { g[k] = t.en; n++; } });
  ['title_es', 'titleTag_es'].forEach(function (k) { if (g[k]) { g[k] = t.es; n++; } });
});
Object.keys(D).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  Object.keys(D[id]).forEach(function (k) {
    if (!g[k]) { console.log('[!!] ' + id + ' no tiene ' + k); return; }
    g[k] = D[id][k]; n++;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('campos modificados: ' + n);

// ---- verificacion ----
console.log('\n=== RESULTADO ===');
const accent = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
Object.keys(T).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  const en = g.titleTag || g.title, es = g.titleTag_es || g.title_es;
  console.log('\n' + id);
  console.log('  EN [' + en.length + '] ' + en);
  console.log('  ES [' + es.length + '] ' + es);
  ['EN', 'ES'].forEach(function (l) {
    const s = l === 'EN' ? en : es;
    const errs = [];
    if (s.length > 60) errs.push('>60 chars');
    if (/^\s*\d/.test(s)) errs.push('empieza por numero');
    if (/\(Pros/.test(s) && l === 'ES') errs.push('(Pros & Cons) sin traducir');
    if (/\$/.test(s) && l === 'ES') errs.push('$ en texto ES');
    const noSpace = s.replace(/\s+/g, '');
    if (l === 'ES' && /\b(cajas|microfonos|grabacion|mas|tecnica)\b/.test(noSpace)) errs.push('posible palabra ES sin tilde');
    if (errs.length) console.log('  !! ' + l + ': ' + errs.join(', '));
  });
});

console.log('\n=== control global ===');
let over = 0, lead = 0, pros = 0;
guides.forEach(function (g) {
  ['title', 'titleTag', 'title_es', 'titleTag_es'].forEach(function (k) {
    if (!g[k]) return;
    if (g[k].length > 60) { over++; console.log('  >60 [' + g.id + '] ' + k); }
    if (/^\s*\d/.test(g[k])) { lead++; console.log('  empieza por numero [' + g.id + '] ' + k); }
  });
  if (/\(Pros & Cons\)/.test(g.titleTag_es || g.title_es || '')) {
    pros++; console.log('  ES con (Pros & Cons) sin traducir: ' + g.id);
  }
});
console.log('titulos >60: ' + over + '   empiezan por numero: ' + lead + '   ES sin traducir: ' + pros);