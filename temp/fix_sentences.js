const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));

// [guia, seccion, texto roto EXACTO, texto corregido]
const FIX = [
  ['best-reverb-delay', 0,
    'Consider whether consider a dedicated pedal or a multi-effects solution.',
    'Consider whether to get a dedicated pedal or a multi-effects solution.'],

  ['budget-monitors', 4,
    'Buy the Yamaha HS8 if consider accurate studio monitors.',
    'Buy the Yamaha HS8 if you want accurate studio monitors.'],

  ['best-condenser-mics', 2,
    'Buy the AKG C414 XLII if consider a professional microphone.',
    'Buy the AKG C414 XLII if you need a professional microphone.'],

  ['usb-mics', 3,
    'Buy the Sennheiser Profile Streaming Set if consider a complete USB streaming setup with hardware controls.',
    'Buy the Sennheiser Profile Streaming Set if you want a complete USB streaming setup with hardware controls.'],

  ['best-microphone', 0,
    'If consider a mic for streaming or gaming instead, see',
    "If you're looking for a mic for streaming or gaming instead, see"],

  ['best-microphone', 2,
    'If consider a ribbon for untreated rooms,',
    'If you need a ribbon for untreated rooms,'],

  ['m50x-vs-mdr7506', 1,
    'If consider a reliable reference that tells you the truth, not what you want to hear, the 7506 is hard to beat.',
    'If you want a reliable reference that tells you the truth, not what you want to hear, the 7506 is hard to beat.'],

  ['best-amp-modelers', 1,
    'If consider a complete rig in one pedal, the GX-1 or Flex Prime is more practical.',
    'If you want a complete rig in one pedal, the GX-1 or Flex Prime is more practical.'],

  ['dxr-vs-prx', 3,
    'If consider a traditional powered speaker that integrates with existing PA systems and scales for larger events, the Yamaha DXR12mkII is the professional choice with proven reliability.',
    'If you want a traditional powered speaker that integrates with existing PA systems and scales for larger events, the Yamaha DXR12mkII is the professional choice with proven reliability.'],

  ['martin-d28-vs-taylor-314', 3,
    'If consider a versatile acoustic that is comfortable to play, sounds great plugged in, and works for both strumming and fingerstyle, the Taylor 314ce Next Generation is the modern choice.',
    'If you want a versatile acoustic that is comfortable to play, sounds great plugged in, and works for both strumming and fingerstyle, the Taylor 314ce Next Generation is the modern choice.'],

  ['katana-vs-dsl', 3,
    'If consider authentic all-tube Marshall tone, the Marshall DSL40CR gives you the genuine article.',
    'If you want authentic all-tube Marshall tone, the Marshall DSL40CR gives you the genuine article.'],
];

let ok = 0;
for (const [gid, idx, roto, bueno] of FIX) {
  const g = guides.find(x => x.id === gid);
  if (!g) { console.log('!! no existe la guia ' + gid); continue; }
  const s = g.sections[idx];
  if (!s) { console.log('!! ' + gid + ' no tiene seccion ' + idx); continue; }
  const n = (s.content.match(new RegExp(roto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n !== 1) { console.log('!! ' + gid + ' sec ' + idx + ': ' + n + ' coincidencias (esperaba 1)'); continue; }
  s.content = s.content.replace(roto, bueno);
  ok++;
  console.log('OK  ' + gid + ' sec ' + idx);
  console.log('    - ' + roto);
  console.log('    + ' + bueno);
}

// verificacion: no queda ningun "if/whether consider" en todo el corpus
let restos = 0;
(function w(v, ruta) {
  if (typeof v === 'string') {
    if (/\b(if|whether|where|how)\s+(consider|choosing|choose|deciding)\b/i.test(v)) {
      restos++; console.log('!! RESTA en ' + ruta + ': ' + v.match(/[^.]*\b(?:if|whether|when|where|how)\s+(?:consider|choosing|choose|deciding)\b[^.]*\./i)[0].trim().slice(0, 120));
    }
  } else if (Array.isArray(v)) v.forEach((x, i) => w(x, ruta + '[' + i + ']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], ruta + '.' + k));
})(guides, '');
console.log('\ncorrecciones aplicadas: ' + ok + ' de ' + FIX.length);
console.log('frases rotas que quedan en todo el corpus: ' + restos);

if (ok === FIX.length && restos === 0) {
  fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8');
  console.log('\nguides.json escrito');
} else {
  console.log('\nNO se escribe: revisa los avisos');
}