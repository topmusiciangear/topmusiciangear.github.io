const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const fixes = [
  { id: 'best-monitors', path: ['verdict_es'], sub: 'es la elección económica que supera su precio', rep: 'es la opción económica que supera su precio' },
  { id: 'best-monitors', path: ['verdict_es'], sub: 'es la elección de precisión pro con imagen coaxial', rep: 'es la opción por precisión profesional con imagen coaxial' },
  { id: 'stage-mics', path: ['featuredSnippet', 'faq_a3_es'], sub: '— son la elección estándar en escenarios profesionales ruidosos', rep: '— son la opción estándar en escenarios profesionales ruidosos' },
  { id: 'studio-subwoofers', path: ['conclusion_es'], sub: 'es la elección si ya mezclas con la serie HS', rep: 'es la opción si ya mezclas con la serie HS' },
  { id: 're20-vs-sm7b', path: ['verdict_es'], sub: 'es la elección natural para broadcast', rep: 'es la opción natural para broadcast' },
  { id: 'zlx-vs-k12', path: ['featuredSnippet', 'faq_a3_es'], sub: 'es la elección más segura.', rep: 'es la opción más segura.' },
  { id: 'dxr-vs-prx', path: ['sections', 3, 'content_es'], sub: 'es la elección profesional con fiabilidad probada', rep: 'es la opción profesional con fiabilidad probada' },
  { id: 'martin-d28-vs-taylor-314', path: ['sections', 3, 'content_es'], sub: 'es la elección moderna.', rep: 'es la opción moderna.' },
  { id: 'best-guitar-home-office', path: ['featuredSnippet', 'faq_a3_es'], sub: 'es la elección más limpia para una oficina', rep: 'es la opción más limpia para una oficina' },
  { id: 'best-mic-for-podcasting', path: ['sections', 0, 'content_es'], sub: 'son la elección segura para la mayoría de podcasters', rep: 'son la opción segura para la mayoría de podcasters' },
  { id: 'best-bass-amps', path: ['verdict_es'], sub: 'es la elección de portabilidad con potencia ligera', rep: 'es la opción de portabilidad con potencia ligera' },
  { id: 'best-live-sound-mixers', path: ['conclusion_es'], sub: 'es la elección premium.', rep: 'es la opción premium.' },
  { id: 'best-live-sound-mixers', path: ['verdict_es'], sub: 'es la elección pro para giras', rep: 'es la opción pro para giras' },
  { id: 'best-pa-speakers', path: ['verdict_es'], sub: 'es la elección económica que rinde por encima de su precio', rep: 'es la opción económica que rinde por encima de su precio' },
  { id: 'best-pa-speakers', path: ['verdict_es'], sub: 'es la elección premium con DSP', rep: 'es la opción premium con DSP' },
  { id: 'best-digital-pianos', path: ['conclusion_es'], sub: 'es la elección profesional.', rep: 'es la opción profesional.' },
  { id: 'xr18-vs-m32r', path: ['verdict_es'], sub: 'es la elección digital económica', rep: 'es la opción digital económica' },
  { id: 'xr18-vs-m32r', path: ['featuredSnippet', 'text_es'], sub: 'es la elección profesional con preamps PRO', rep: 'es la opción profesional con preamps PRO' },
  { id: 'budget-pa-systems', path: ['conclusion_es'], sub: 'es la elección profesional de entrada', rep: 'es la opción profesional de entrada' },
  { id: 'active-vs-passive-pa', path: ['sections', 0, 'content_es'], sub: 'son la elección correcta.</p>', rep: 'son la opción correcta.</p>' },
  { id: 'active-vs-passive-pa', path: ['featuredSnippet', 'faq_a1_es'], sub: 'son la elección correcta debido a', rep: 'son la opción correcta debido a' },
  { id: 'pro-guitars', path: ['faq', 4, 'a_es'], sub: 'que es la elección correcta para versatilidad', rep: 'que es la opción correcta para versatilidad' },
  { id: 'best-multi-effects-pedals', path: ['sections', 0, 'content_es'], sub: 'es la elección profesional con más de 300', rep: 'es la opción profesional con más de 300' },
  { id: 'best-multi-effects-pedals', path: ['verdict_es'], sub: 'es la elección pro de modelado que reemplaza', rep: 'es la opción pro de modelado que reemplaza' },
  { id: 'best-multi-effects-pedals', path: ['verdict_es'], sub: 'es la elección de modelado de amplificadores con pantalla táctil', rep: 'es la opción de modelado de amplificadores con pantalla táctil' },
  { id: 'me90-vs-mx5', path: ['featuredSnippet', 'faq_a6_es'], sub: 'el HX Stomp Es la elección profesional.', rep: 'el HX Stomp es la opción profesional.' },
  { id: 'best-instrument-mics', path: ['sections', 2, 'content_es'], sub: 'es la elección segura.</p>', rep: 'es la opción segura.</p>' },
  { id: 'stage-wedges', path: ['verdict_es'], sub: 'es la elección de valor equilibrado', rep: 'es la opción con mejor equilibrio de valor' },
  { id: 'pro-daw', path: ['verdict_es'], sub: 'es la elección de producción creativa', rep: 'es la opción para producción creativa' },
  { id: 'beat-making', path: ['featuredSnippet', 'faq_a5_es'], sub: 'pero Ableton es la elección cuando actúas', rep: 'pero Ableton es la opción cuando actúas' },
  { id: 'best-looper-pedals', path: ['verdict_es'], sub: 'es la elección si quieres ritmos', rep: 'es la opción si quieres ritmos' },
  { id: 'rode-wireless-pro-vs-dji-mic-2', path: ['sections', 2, 'heading_es'], sub: 'Por qué el dJI mic 2 es la elección diaria del creador', rep: 'Por qué el DJI Mic 2 es el micrófono diario del creador' },
  { id: 'ie900-vs-se846', path: ['featuredSnippet', 'faq_a1_es'], sub: 'es la elección más segura.', rep: 'es la opción más segura.' },
  { id: 'best-electric-guitars-2026', path: ['sections', 3, 'content_es'], sub: 'con presupuesto ajustado, esta es la elección.', rep: 'con presupuesto ajustado, esta es la opción.' },
  { id: 'best-electric-guitars-2026', path: ['featuredSnippet', 'faq_a3_es'], sub: 'una Squier es la elección inteligente', rep: 'una Squier es la opción inteligente' },
  { id: 'best-acoustic-guitars-for-beginners', path: ['sections', 3, 'content_es'], sub: 'Es la elección ideal si quieres una sola guitarra', rep: 'Es la opción ideal si quieres una sola guitarra' },
  { id: 'atc-vs-genelec', path: ['sections', 3, 'content_es'], sub: 'es la elección pro pragmática', rep: 'es la opción pro pragmática' },
  { id: 'j48-vs-rndi', path: ['faq', 0, 'a_es'], sub: 'el J48 es la elección pragmática', rep: 'el J48 es la opción pragmática' },
  { id: 'pro-mixers', path: ['verdict_es'], sub: 'El M32R LIVE es la elección profesional cuando necesitas', rep: 'El M32R LIVE es la opción profesional cuando necesitas' },
];

let ok = 0, fail = 0;
for (const f of fixes) {
  const o = g.find(x => x.id === f.id);
  if (!o) { console.log('NO GUIDE', f.id); fail++; continue; }
  let cur = o;
  for (let i = 0; i < f.path.length - 1; i++) cur = cur[f.path[i]];
  const leaf = f.path[f.path.length - 1];
  if (typeof cur[leaf] !== 'string') { console.log('FAIL not string', f.id, f.path.join('.')); fail++; continue; }
  if (!cur[leaf].includes(f.sub)) { console.log('MISS', f.id, f.path.join('.'), '::', f.sub.slice(0, 55)); fail++; continue; }
  cur[leaf] = cur[leaf].split(f.sub).join(f.rep);
  ok++;
}
console.log('OK:', ok, 'FAIL:', fail);
if (fail === 0) fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');