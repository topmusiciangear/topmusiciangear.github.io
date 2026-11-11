// extrae el TEXTO COMPLETO de cada campo con flag, para escribir reemplazos exactos
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function textosEN(o, ruta, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => textosEN(v, ruta + '[' + i + ']', acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (Array.isArray(v) && /pros|cons/i.test(k)) {
        // arrays de pros/cons: cada item es texto completo
        v.forEach((item, i) => { if (typeof item === 'string') acc.push({ campo: (ruta ? ruta + '.' : '') + k + '[' + i + ']', texto: item }); });
      }
      else if (typeof v === 'string' && !/(_es|title_es|desc_es)$/.test(k)) {
        if (['title', 'heading', 'body', 'conclusion', 'faq_q', 'faq_a', 'snippet', 'sectionHeading', 'pros', 'cons', 'verdictPros', 'verdictCons', 'metaDesc', 'ogDesc', 'intro', 'section', 'sectionText'].includes(k)) {
          acc.push({ campo: (ruta ? ruta + '.' : '') + k, texto: v });
        }
      }
      else if (v && typeof v === 'object') textosEN(v, (ruta ? ruta + '.' : '') + k, acc);
    });
    return acc;
  }
  return acc;
}

const TARGETS = [
  [/\bseamlessly?\b/i, 'seamless'],
  [/\btake your.*to the next level\b/i, 'next level'],
  [/\bcompletely blurs the line\b/i, 'blurs line'],
  [/\bdefinitive\b/i, 'definitive'],
  [/\bcutting-edge\b/i, 'cutting-edge'],
  [/\bpowerhouse\b/i, 'powerhouse'],
  [/\bWhether you'?re\b/i, 'whether'],
  [/\bHere'?s what\b/i, 'heres-what'],
  [/\bIs the .* the Best .* the Best\b/i, 'generic-heading'],
  [/Is the .+ the (?:Best|Most) .+\?/i, 'generic-heading'],
  [/\bthe most versatile and respected\b/i, 'generic'],
  [/\bversatile compressor\b/i, 'generic'],
  [/\bversatile studio pianos\b/i, 'generic'],
  [/\bversatile HSS\b/i, 'generic'],
  [/\bHowever\b/, 'however-overuse']
];

const IDS = ['american-pro-vs-les-paul', 'beginner-guitar', 'best-condenser-mics', 'best-drum-machine',
  'best-electric-guitars-2026', 'best-keyboard', 'best-piano-keyboard-vsts', 'best-plugins',
  'best-stage-keyboards', 'blx288-vs-ewd', 'c414-vs-u87', 'channel-strip-plugins', 'katana-vs-dsl',
  'nord-stage-4-vs-montage-m8x', 'player-strat-vs-pacifica', 'portable-interfaces', 'pro-drum-machines',
  'sidechain-modulation-plugins', 'sm57-vs-md421', 'studio-subwoofers', 'studio-subwoofers-setup'];

g.filter(x => IDS.includes(x.id)).forEach(function (guide) {
  const campos = textosEN(guide, guide.id, []);
  let printed = false;
  campos.forEach(function (f) {
    TARGETS.forEach(function (t) {
      const m = f.texto.match(t[0]);
      if (m) {
        // imprimir el campo completo (recortado a 600 chars para legibilidad)
        console.log('### ' + f.campo + '  [' + t[1] + ']');
        console.log(f.texto.length > 700 ? f.texto.slice(0, 700) + ' …[+]' + f.texto.length : f.texto);
        console.log('');
        printed = true;
      }
    });
  });
});
