// Quita las menciones de precio de las descripciones que se muestran en las cards.
const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const edits = [
  [59,
    '. Sold each (~€156 the pair).', '.',
    ' Se venden por unidad (~€156 el par).', ''],
  [635,
    'response and a price around $99 — the working player’s', 'response — the working player’s',
    'respuesta de 50 Hz a 16 kHz y precio alrededor de $99: la alternativa', 'respuesta de 50 Hz a 16 kHz: la alternativa'],
  [648,
    '$79 USB plug-and-play', 'USB plug-and-play',
    'de medición USB plug-and-play de $79 con', 'de medición USB plug-and-play con'],
  [650,
    '$39.99 isolation pads', 'Isolation pads',
    'Pads de aislamiento de $39,99 pensados', 'Pads de aislamiento pensados'],
  [651,
    'feet. $599.99 a pair, zero height adjustment.', 'feet. Zero height adjustment.',
    'goma. $599,99 el par, sin ajuste de altura.', 'goma. Sin ajuste de altura.'],
  [655,
    'external PSU included. MSRP $1,299.', 'external PSU included.',
    'fuente externa incluida. PVP $1.299.', 'fuente externa incluida.'],
  [657,
    'Real analog weight for $299.', 'Real analog weight.',
    'Peso analógico real por $299.', 'Peso analógico real.'],
  [658,
    'like the T4S). Official price $999.', 'like the T4S).',
    'como el T4S). Precio oficial $999.', 'como el T4S).'],
  [659,
    'Windows only — no macOS support. Street ~$189.', 'Windows only — no macOS support.',
    'Solo Windows — sin macOS. Calle ~$189.', 'Solo Windows — sin macOS.'],
  [661,
    'Mackie lists it on backorder. $299.99 direct.', 'Mackie lists it on backorder.',
    'Mackie lo lista bajo pedido. $299,99 directo.', 'Mackie lo lista bajo pedido.'],
  [662,
    'No standalone recording — needs PC/iPad. ~$499.', 'No standalone recording — needs PC/iPad.',
    'Sin grabación autónoma — exige PC/iPad. ~$499.', 'Sin grabación autónoma — exige PC/iPad.'],
  [663,
    'needs no DAW knowledge. ~$499 (often less on sale).', 'needs no DAW knowledge.',
    'sin saber de DAW. ~$499 (suele bajar en oferta).', 'sin saber de DAW.'],
  [664,
    ' ~$179 street.', '.',
    ' ~$179 en calle.', '.'],
  [1048,
    'the deepest bass under $150', 'the deepest bass in this class',
    'el grave más profundo bajo $150', 'el grave más profundo de su clase']
];

for (const [id, enFrom, enTo, esFrom, esTo] of edits) {
  const p = products.find(x => x.id === id);
  if (!p) throw new Error('producto no encontrado: ' + id);
  if (!p.desc.includes(enFrom)) throw new Error('EN no encontrado en ' + id + ': ' + enFrom);
  if (!p.desc_es.includes(esFrom)) throw new Error('ES no encontrado en ' + id + ': ' + esFrom);
  p.desc = p.desc.split(enFrom).join(enTo);
  p.desc_es = p.desc_es.split(esFrom).join(esTo);
}

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');

// Revisión final
const money = /(\$|€|£)\s?\d|\b\d[\d.,]*\s?(USD|EUR|GBP|dollars?|euros?)\b/i;
const left = products.filter(p => money.test(p.desc || '') || money.test(p.desc_es || ''));
console.log('descripciones con precio restantes:', left.length);
for (const p of left) {
  console.log('#' + p.id + ' ' + p.title);
  console.log('  EN: ' + p.desc);
  console.log('  ES: ' + p.desc_es);
}
