const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'best-drum-machine');

// 1. section 4 -> G2
const s = d.sections[4];
s.heading = 'Chop Everything: Is the MPC One G2 the Hip-Hop Brain?';
s.heading_es = 'Trocea todo: ¿es la MPC One G2 el cerebro del hip-hop?';
s.content = '<p><strong>Sixteen pads, forty years of lineage, zero computer required — now with four times the power.</strong> The MPC One G2 runs the workflow that invented hip-hop production standalone on a G2 8-core chip: chop samples on the 7-inch touch screen, sequence 32 plugin plus 16 audio tracks, and finish songs with plugin synths, Stems separation and 100+ AIR effects inside the box.</p><p>Standalone means standalone limits: a small screen next to a DAW, 4 GB of working RAM, and no battery for the park. With 64 GB inside, USB-C 24-channel audio and MPC3 aboard, it is the One, perfected. For beatmakers who think in pads, nothing else speaks the mother tongue.</p>';
s.content_es = '<p><strong>Dieciséis pads, cuarenta años de linaje, cero ordenador — ahora con cuatro veces la potencia.</strong> La MPC One G2 corre autónoma el flujo que inventó producir hip-hop en chip G2 de 8 núcleos: trocea samples en la táctil de 7 pulgadas, secuencia 32 de plugin más 16 de audio, y termina canciones con sintes plugin, separación Stems y más de 100 efectos AIR dentro de la caja.</p><p>Autónomo significa límites autónomos: pantalla pequeña junto a un DAW, 4 GB de RAM de trabajo y sin batería para el parque. Con 64 GB dentro, audio USB-C de 24 canales y MPC3 a bordo, es la One perfeccionada. Para beatmakers que piensan en pads, nada más habla la lengua madre.</p>';
s.products = [256];

// 2. table column + values
const C = (en, es) => ({ title: en, title_es: es || en });
const V = (en, es) => ({ value: en, value_es: es || en });
d.productTable.columns[4] = C('Akai MPC One G2');
const newVals = [
  V('Standalone hip-hop brain, perfected', 'Cerebro hip-hop autónomo, perfeccionado'),
  V('$799'),
  V('Standalone sampler/sequencer', 'Sampler/secuenciador autónomo'),
  V('32 plugin + 16 audio', '32 de plugin + 16 de audio'),
  V('MPC sampler + plugins', 'Sampler MPC + plugins'),
  V('Grid + step, touchscreen', 'Rejilla + pasos, táctil'),
  V('64 GB + SD/USB', '64 GB + SD/USB'),
  V('100+ AIR FX', 'Más de 100 FX AIR'),
  V('USB-C 24ch, MIDI, WiFi, BT', 'USB-C 24ch, MIDI, WiFi, BT'),
  V('12V DC adapter', 'Adaptador 12V DC'),
  V('2.1 kg', '2,1 kg')
];
d.productTable.rows.forEach((r, i) => { r.values[4] = newVals[i]; });

// 3. verdict entry
const VV = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
d.verdictProsCons = d.verdictProsCons.map(v => v.name === 'Akai MPC One+' ? VV('Akai MPC One G2',
  ['The pad workflow that invented hip-hop, 4x the power', 'Standalone touchscreen song finishing with Stems', '32 plugin + 16 audio tracks, 64 GB inside', 'USB-C 24-channel audio, Wi-Fi and MPC3'],
  ['Small screen next to a real DAW', '4 GB RAM caps the most giant projects', 'No battery for the park', 'Red paint gone, classic black only'],
  ['El flujo de pads que inventó el hip-hop, 4x potencia', 'Canciones terminadas en táctil autónoma con Stems', '32 de plugin + 16 de audio, 64 GB dentro', 'Audio USB-C 24 canales, Wi-Fi y MPC3'],
  ['Pantalla pequeña junto a un DAW real', '4 GB de RAM topan los proyectos más gigantes', 'Sin batería para el parque', 'Se acabó la pintura roja, solo negro clásico']) : v);

// 4. verdict + conclusion string swaps
['verdict', 'verdict_es', 'conclusion', 'conclusion_es'].forEach(k => {
  if (typeof d[k] === 'string') d[k] = d[k].split('MPC One+').join('MPC One G2');
});

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
const str = JSON.stringify(d);
console.log('One+ left:', str.includes('One+'), '| 611 left:', str.includes('[611]'));
