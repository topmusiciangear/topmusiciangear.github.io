const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const x = g.find(y => y.id === 'open-headphones');
const s = x.sections[4];

s.heading = 'Is the Audio-Technica ATH-R70xa the Best Headphones for Studio Monitoring and Mixing?';
s.heading_es = '\u00bfEs el Audio-Technica ATH-R70xa el mejor auricular para monitoreo y mezcla de estudio?';
s.content = '<strong>The ATH-R70xa is Audio-Technica\'s flagship open-back reference headphone, an enhanced version of the ATH-R70x.</strong> The 45mm drivers deliver pure sound directly from the transducer without acoustic resonance enhancement. Extended frequency response (5-40,000 Hz) captures every detail. Carbon composite resin construction improves structural rigidity for detailed transient response. At 199g, these are featherlight for marathon sessions. The dual-sided detachable locking cable is L/R signal independent. Handcrafted in Audio-Technica\'s Tokyo factory. At $379, they compete directly with the Sennheiser HD 490 Pro and Hifiman Sundara.';
s.content_es = '<strong>Las ATH-R70xa son el auricular de referencia abierto insignia de Audio-Technica, una versi\u00f3n mejorada de las ATH-R70x.</strong> Los drivers de 45mm entregan sonido puro directamente del transductor sin mejora de resonancia ac\u00fastica. Respuesta de frecuencia extendida (5-40.000 Hz) captura cada detalle. La construcci\u00f3n de resina de composite de carbono mejora la rigidez estructural para respuesta transitoria detallada. Con 199g, son extremadamente ligeras para sesiones largas. El cable desmontable bilateral con bloqueo es independiente L/R. Fabricadas a mano en la f\u00e1brica de Tokio de Audio-Technica. A $379, compiten directamente con el Sennheiser HD 490 Pro y el Hifiman Sundara.';

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Updated guide section for R70xa');
