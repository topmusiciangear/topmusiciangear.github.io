// SERP batch: 12 short descriptions + truncate all >155 at word boundary.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const byId = {};
G.forEach(g => { byId[g.id] = g; });
const SET = (id, en, es) => { byId[id].description = en; byId[id].description_es = es; };
SET('best-bass-amps',
  'Best bass amps 2026: Ampeg RB-210 vs Fender Rumble 500 vs Markbass Mini CMD. Compare combo amps for gigs and rehearsal.',
  'Mejores amplis de bajo 2026: Ampeg RB-210 vs Fender Rumble 500 vs Markbass Mini CMD. Compara combos para bolos y ensayo.');
SET('best-bass-practice-amps',
  'Best bass practice amps 2026: Fender Rumble 40 vs Orange Crush Bass 25 vs Spark MINI. Quiet home low end compared.',
  'Mejores amplis de bajo para practicar 2026: Rumble 40 vs Crush Bass 25 vs Spark MINI. Graves caseros comparados.');
SET('best-practice-amps',
  'Best guitar practice amps 2026: Katana 50 vs Champion II 25 vs Crush 35RT vs THR10II. Home tones and prices compared.',
  'Mejores amplis de práctica 2026: Katana 50 vs Champion II 25 vs Crush 35RT vs THR10II. Sonidos y precios comparados.');
SET('nx912-vs-pxm12mp',
  'RCF NX 912-SMA vs EV PXM-12MP coaxial stage monitors compared: specs, live sound and verdict for bands.',
  'RCF NX 912-SMA vs EV PXM-12MP coaxiales comparados: specs, sonido en vivo y veredicto para bandas.');
SET('stage-wedges',
  'Best powered stage wedges 2026: RCF NX 912 vs EV PXM-12MP vs Yamaha DHR12M. Floor monitors for live vocals compared.',
  'Mejores cuñas activas 2026: RCF NX 912 vs EV PXM-12MP vs Yamaha DHR12M. Monitores de piso comparados.');
SET('studio-subwoofers',
  'Best studio subwoofers for accurate low end 2026: KRK S10.4 vs Yamaha HS8S vs Adam T10S. Compare specs and verdict.',
  'Mejores subwoofers de estudio para graves precisos 2026: KRK S10.4 vs Yamaha HS8S vs Adam T10S. Compara specs y veredicto.');
const cut = s => {
  if (!s || s.length <= 155) return s;
  let t = s.slice(0, 155);
  const i = t.lastIndexOf(' ');
  return t.slice(0, i);
};
let n = 0;
G.forEach(g => {
  if (g.description && g.description.length > 155) { g.description = cut(g.description); n++; }
  if (g.description_es && g.description_es.length > 155) { g.description_es = cut(g.description_es); n++; }
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('truncadas: ' + n);
const G2 = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const over = G2.filter(g => (g.description && g.description.length > 155) || (g.description_es && g.description_es.length > 155));
console.log('restan >155: ' + over.length);
const under = G2.filter(g => (g.description && g.description.length < 100) || (g.description_es && g.description_es.length < 100));
console.log('quedan <100: ' + under.map(g => g.id).join(','));
