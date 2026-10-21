// Segunda parte del cambio a MoPAD-XL: veredicto y pros/contras de monitor-setup.
const fs = require('fs');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');

const swap = (obj, key, from, to) => {
  if (typeof obj[key] !== 'string' || !obj[key].includes(from)) {
    console.log('AVISO: no encontrado en ' + key);
    return;
  }
  obj[key] = obj[key].split(from).join(to);
};

swap(g, 'verdict',
  '<span class="product-name">Auralex MoPADs (4-Pack)</span></strong> — Five tilt steps from -8° to +8° aim tweeters at your ears. Fits virtually any small nearfield.',
  '<span class="product-name">Auralex MoPAD-XL (Pair)</span></strong> — Wider pads for larger nearfields: five tilt steps from -8° to +8° aim tweeters at your ears, and each takes up to 100 lb.');

swap(g, 'verdict_es',
  '<span class="product-name">Auralex MoPADs (Pack 4)</span></strong> — Cinco pasos de -8° a +8° para apuntar al oído. Sirven para casi cualquier nearfield pequeño.',
  '<span class="product-name">Auralex MoPAD-XL (Par)</span></strong> — Pads más anchos para nearfields más grandes: cinco pasos de -8° a +8° para apuntar al oído y hasta 45 kg por monitor.');

const e = g.verdictProsCons.find(x => /MoPAD/i.test(x.name));
e.name = 'Auralex MoPAD-XL (Pair)';
e.name_es = 'Auralex MoPAD-XL (Par)';
e.pros = [
  '$39.99 a pair decouples a full stereo pair for pocket money',
  'Five tilt steps from -8° to +8° aim tweeters at your ears',
  'High-density foam absorbs desk vibration on contact',
  'Wider than standard MoPADs, so most 8-inch monitors sit fully on the pad'
];
e.cons = [
  'Foam compresses under heavy monitors over time',
  'No height adjustment — tilt only',
  'Foam degrades after years of use',
  'Less effective than true mechanical isolators'
];
e.pros_es = [
  '$39,99 el par desacopla un par estéreo completo por poco dinero',
  'Cinco pasos de inclinación de -8° a +8° apuntan tweeters al oído',
  'La espuma de alta densidad absorbe la vibración al contacto',
  'Más anchas que las MoPAD estándar: casi cualquier monitor de 8 pulgadas apoya entero'
];
e.cons_es = [
  'La espuma se comprime con monitores pesados con el tiempo',
  'Sin ajuste de altura — solo inclinación',
  'La espuma se degrada tras años de uso',
  'Menos efectivo que aisladores mecánicos de verdad'
];

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

const raw = fs.readFileSync('data/guides.json', 'utf8');
for (const bad of ['MoPADs (4-Pack)', 'MoPADs (Pack 4)']) {
  console.log('restos de "' + bad + '": ' + (raw.split(bad).length - 1));
}
console.log('veredicto:', g.verdict.includes('MoPAD-XL') ? 'ok' : 'FALTA');
