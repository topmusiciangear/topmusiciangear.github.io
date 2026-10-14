const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Cierre manual de los ultimos casos: quitan el conteo de productos (que ya no
// esta en el titulo y se desincroniza al anadir productos) y cierran frases que
// el recorte automatico habia partido.
const FIX = {
  'budget-mics': {
    description: 'In 2026, the best budget microphones: from the Behringer XM8500 to the Rode NT1 Signature. Stage dynamics, podcast mics and quiet condensers.',
    description_es: 'En 2026, los mejores micrófonos económicos: del Behringer XM8500 al Rode NT1 Signature. Dinámicos de directo, mics de podcast y condensadores.'
  },
  'best-bass-under-700': {
    description: 'Best bass guitars 2026: Schecter Stiletto for metal, ESP LTD for looks, Hofner for unique sound, Yamaha TRBX304 most versatile, Sire V5R for vintage.',
    description_es: 'Mejores bajos 2026: Schecter Stiletto para metal, ESP LTD para look, Hofner para sonido único, Yamaha TRBX304 el más versátil, Sire V5R para tono.'
  },
  'premium-interfaces': {
    description: 'The premium interfaces that actually earn a permanent rack spot — Neumann, UA, RME, Apogee, Audient and Lynx compared on real use.',
    description_es: 'Las interfaces premium que de verdad se ganan un hueco fijo en el rack — Neumann, UA, RME, Apogee, Audient y Lynx comparadas por uso real.'
  },
  'best-stage-keyboards': {
    description: 'Nord Stage 4, RD-2000 EX, Montage M8x, Fantom 8 EX, YC88, Electro 7 and more stage keyboards compared for 2026, ranked by weight for live gigs.',
    description_es: 'Nord Stage 4, RD-2000 EX, Montage M8x, Fantom 8 EX, YC88, Electro 7 y más comparados para 2026, ordenados por peso para directo.'
  },
  'best-bass-home-office': {
    description: 'Desk-friendly basses for home offices compared: EHB1000 leads headless, Minion as the most compact micro-scale option for quick bass lines.'
  },
  'best-electric-guitars-2026': {
    description_es: 'Mejores guitarras eléctricas 2026: Squier Debut, Sonic Mustang, Affinity, Yamaha Pacifica, Classic Vibe, PRS SE Custom 24 y Fender.'
  }
};

const NARROW = "iljtIf.,;:'`|!()[]{}/\\-—–\"";
const WIDE = "mwMW@%&#AQROGD";
function PX(str) {
  let em = 0;
  for (const ch of String(str)) {
    if (NARROW.indexOf(ch) > -1) em += 0.30;
    else if (WIDE.indexOf(ch) > -1) em += 0.85;
    else if (ch === ' ') em += 0.28;
    else if (/[A-Z0-9]/.test(ch)) em += 0.62;
    else em += 0.50;
  }
  return Math.round(em * 13);
}

let n = 0, bad = 0;
Object.keys(FIX).forEach(function (id) {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log('[!!] no existe ' + id); return; }
  Object.keys(FIX[id]).forEach(function (k) {
    if (!g[k]) { console.log('[!!] ' + id + ' sin ' + k); return; }
    console.log('[' + id + '] ' + k + '  ' + g[k].length + 'c -> ' + FIX[id][k].length + 'c');
    console.log('   ' + FIX[id][k]);
    if (FIX[id][k].length > 155 || PX(FIX[id][k]) > 900) { bad++; console.log('   !! FUERA DE LIMITE'); }
    g[k] = FIX[id][k]; n++;
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\ncampos escritos a mano: ' + n + '   fuera de limite: ' + bad);