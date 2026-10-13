var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var ps = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
var fails = [];
function assert(c, m) { if (!c) fails.push(m); }
function repOnce(s, a, b, tag) {
  assert(s.indexOf(a) > -1, tag + ' ANCHOR MISSING: ' + a.slice(0, 60));
  return s.split(a).join(b);
}

// ============ A. 7 monitor-setup ES fixes ============
var mon = d.find(function (x) { return x.id === 'monitor-setup'; });
var S = mon.sections;
var introHit = false;
['intro_es', 'conclusion_es', 'verdict_es'].forEach(function (f) {
  if (mon[f] && mon[f].indexOf('supera un par perfecto') > -1) { mon[f] = mon[f].split('supera un par perfecto').join('supera a un par perfecto'); introHit = true; }
});
S.forEach(function (s) {
  if (s.content_es && s.content_es.indexOf('supera un par perfecto') > -1) { s.content_es = s.content_es.split('supera un par perfecto').join('supera a un par perfecto'); introHit = true; }
});
assert(introHit, 'F1 anchor');
S[1].content_es = repOnce(S[1].content_es, 'Dos interruptores traseros son la primera', 'Dos selectores traseros son la primera', 'F2a');
S[1].content_es = repOnce(S[1].content_es, 'baja a 38 Hz', 'baja hasta los 38 Hz', 'F2b');
S[2].content_es = repOnce(S[2].content_es, 'mueve menos aire que un HS8 de 8', 'mueve menos aire que el de 8 del HS8', 'F3a');
S[2].content_es = repOnce(S[2].content_es, 'cualquier rival con puerto trasero peleando contra el límite', 'cualquier rival con puerto trasero que pelee contra el límite', 'F3b');
S[3].content_es = repOnce(S[3].content_es, 'Cada Soportes de Monitor K&M 26722 (Unidad) se vende por unidad', 'Cada soporte de monitor K&M 26722 se vende por unidad', 'F4');
S[4].content_es = repOnce(S[4].content_es, 'con inclinación hasta 6,5 grados', 'con una inclinación de hasta 6,5 grados', 'F5a');
S[4].content_es = repOnce(S[4].content_es, 'el par cuesta dinero de verdad', 'el par, cuestan dinero de verdad', 'F5b');
S[5].content_es = repOnce(S[5].content_es, 'Mueve REW, Sonarworks y Dirac por igual — los oídos honestos más baratos que tu sala verá jamás.', 'Funciona con REW, Sonarworks y Dirac por igual: la herramienta de medición más honesta y barata que verá tu sala.', 'F6');
S[6].content_es = repOnce(S[6].content_es, '¿Tienes SAM? GLM. ¿Sin dinero? MoPADs. ¿Mueves tres vías de 15 kg? MS-100.', '¿Tienes un sistema SAM? GLM. ¿Poco presupuesto? MoPADs. ¿Cargas con monitores de tres vías de 15 kg? MS-100.', 'F7');
console.log('A done');

// ============ B. 4 new condenser products 652-655 ============
ps = ps.filter(function (x) { return x.id < 652 || x.id > 655; });
ps.push(
  { id: 652, title: 'Lewitt LCT 440 PURE', title_es: 'Lewitt LCT 440 PURE', brand: 'Lewitt', category: 'microphones', price: null, rating: 4.7, badge: 'recommended',
    desc: '1-inch true-condenser cardioid mic with 27.4 mV/Pa sensitivity, 7 dB-A self-noise and 140 dB max SPL. Record-ready sound with shock mount, magnetic pop filter and windscreen included. No pad or filters — pure simplicity.',
    desc_es: 'Micrófono de condensador verdadero de 1 pulgada, cardioide, con 27,4 mV/Pa, 7 dB-A de ruido propio y 140 dB SPL máximo. Sonido listo para grabar con soporte, filtro antipop magnético y paravientos incluidos. Sin pad ni filtros — simplicidad pura.',
    img: 'https://d2pucgucjvdva3.cloudfront.net/sites/default/files/styles/wide_cover_small/public/2023-03/lct-440-pure.jpg', stores: {} },
  { id: 653, title: 'Neumann TLM 102', title_es: 'Neumann TLM 102', brand: 'Neumann', category: 'microphones', price: null, rating: 4.7, badge: 'recommended',
    desc: 'The most affordable Neumann large-diaphragm condenser: cardioid, 20 Hz–20 kHz, 11 mV/Pa, 12 dB-A self-noise, 144 dB max SPL, transformerless with integrated pop screen. Huge 132 dB dynamic range for small studios.',
    desc_es: 'El Neumann de gran diafragma más asequible: cardioide, 20 Hz–20 kHz, 11 mV/Pa, 12 dB-A de ruido, 144 dB SPL máximo, sin transformador y con antipop integrado. Enorme rango dinámico de 132 dB para estudios pequeños.',
    img: 'https://assets.sennheiser.com/assets/TLM-102-with-EA4_Neumann-Studio-Microphone_M.png/Zz1kN2U3ZDIyZWU3YWIxMWYwOGNiZDJhMzQxNzliYzkxZA==?width=730&format=webp&quality=80', stores: {} },
  { id: 654, title: 'Neumann TLM 103', title_es: 'Neumann TLM 103', brand: 'Neumann', category: 'microphones', price: null, rating: 4.8, badge: 'topQuality',
    desc: 'The modern vocal standard with U87-derived capsule: cardioid, 23 mV/Pa, 7 dB-A self-noise, 138 dB max SPL, transformerless with presence boost above 5 kHz. Pristine definition from whispers to kick drums.',
    desc_es: 'El estándar vocal moderno con cápsula derivada del U87: cardioide, 23 mV/Pa, 7 dB-A de ruido, 138 dB SPL máximo, sin transformador y con realce de presencia sobre 5 kHz. Definición impecable del susurro al bombo.',
    img: 'https://assets.sennheiser.com/assets/TLM-103-with-EA1_Neumann-Studio-Microphone_M.png/Zz1kZTJmOTBjY2U3YWIxMWYwOGNiZDJhMzQxNzliYzkxZA==?width=730&format=webp&quality=80', stores: {} },
  { id: 655, title: 'Warm Audio WA-8000', title_es: 'Warm Audio WA-8000', brand: 'Warm Audio', category: 'microphones', price: 1299, rating: 4.8, badge: 'premium',
    desc: 'Tube condenser in the 90s 800 style for rap, hip-hop and R&B: NOS 6AU6 tube, Lundahl transformer, brass K67-style capsule. Cardioid + omni, 131/134 dB max SPL, external PSU included. MSRP $1,299.',
    desc_es: 'Condensador de válvulas estilo 800 de los 90 para rap, hip-hop y R&B: válvula NOS 6AU6, transformador Lundahl, cápsula K67 de latón. Cardioide + omni, 131/134 dB SPL máximo, fuente externa incluida. PVP $1.299.',
    img: 'https://images.ctfassets.net/h4x5uvaoia7v/7rnMS9gQvkKXl9PW1DOIWC/87a8ef713e75b13af706a9548dc14822/8000-product-card.png', stores: {} }
);
ps.sort(function (a, b) { return a.id - b.id; });
fs.writeFileSync(BASE + 'data/products.json', JSON.stringify(ps, null, 2));
console.log('B done: 652-655 added');
console.log('saved');
