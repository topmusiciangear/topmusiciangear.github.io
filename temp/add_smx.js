const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');
const s = g.sections.find(x => x && x.heading === 'Shure SM7dB: A Closer Look');
if (!s) { console.log('!! seccion no encontrada'); process.exit(1); }

const addEn = '<p><strong>SM7B or SM7dB?</strong> Same sound, different math: the classic SM7B at ~$439 needs around 60 dB of clean gain, so with a standard desktop interface you add a ~$150 inline booster and a second cable — roughly $589 total. The SM7dB at ~$549 builds +18/+28 dB into the mic and runs on any interface with 48V phantom, saving about $40 and the extra box. Keep the classic only if you already own a high-gain interface or a booster.</p>';
const addEs = '<p><strong>¿SM7B o SM7dB?</strong> Mismo sonido, distinta matemática: el SM7B clásico por ~$439 pide unos 60 dB de ganancia limpia, así que con una interfaz estándar de escritorio sumas un booster de ~$150 y un segundo cable — unos $589 en total. El SM7dB por ~$549 integra +18/+28 dB en el micro y funciona con el phantom 48V de cualquier interfaz, ahorrando unos $40 y la caja extra. Quédate el clásico solo si ya tienes una interfaz de previos potentes o un booster.</p>';

if (s.content.includes('SM7B or SM7dB?')) { console.log('EN ya existe, no se duplica'); }
else s.content += addEn;
if (s.content_es.includes('¿SM7B o SM7dB?')) { console.log('ES ya existe, no se duplica'); }
else s.content_es += addEs;

fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('bloque comparativo anadido EN+ES');