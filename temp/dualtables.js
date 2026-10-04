const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function stripTable(t) {
  const before = t.length;
  t = t.replace(/<div class="guide-table-wrap">\s*<table[\s\S]*?<\/table>\s*<\/div>/g, '');
  t = t.replace(/<table[\s\S]*?<\/table>/g, '');
  return { t, removed: t.length !== before };
}
// 1. intro tables: 13 guides x EN+ES
const INTRO_IDS = ['best-interface', 'best-microphone', 'best-plugins', 'portable-interfaces', 'guitar-bass-amps', 'guitar-pedals', 'live-sound-pa', 'daw-guide', 'beginner-guitar', 'best-electric-guitar', 'best-mic-for-podcasting', 'best-digital-mixers', 'beginner-bass-guitars', 'mics-for-creators'];
INTRO_IDS.forEach(id => {
  const g = G.find(x => x.id === id);
  ['intro', 'intro_es'].forEach(k => {
    const r = stripTable(g[k] || '');
    g[k] = r.t;
    console.log(id, k, r.removed ? 'TABLA FUERA' : 'sin tabla!');
  });
});
// 2. guitar-pedals Signal Chain row at index 2
{
  const g = G.find(x => x.id === 'guitar-pedals');
  g.productTable.rows.splice(2, 0, {
    label: 'Signal Chain', label_es: 'Cadena de señal',
    values: [
      { value: 'First', value_es: 'Al principio' },
      { value: 'Last', value_es: 'Al final' },
      { value: 'Very first', value_es: 'Lo primero' },
      { value: 'First', value_es: 'Al principio' },
      { value: 'Last', value_es: 'Al final' },
      { value: 'After drive', value_es: 'Tras el drive' },
      { value: 'After drive', value_es: 'Tras el drive' }
    ]
  });
  console.log('guitar-pedals Signal Chain añadida');
}
// 3. active-vs-passive sec2: table -> prose
{
  const g = G.find(x => x.id === 'active-vs-passive-pa');
  const enProse = '<p><strong>Active pros:</strong> built-in amplifier, perfect power matching, built-in DSP with presets, bi-amped clarity, portable one-box design, faster setup. <strong>Active cons:</strong> a dead amp kills the speaker, heavier per cabinet, less flexible for huge custom installs.</p><p><strong>Passive pros:</strong> separate repairable components, one amp powers many speakers, rack-mounted amps, standard for large installs, no electronics in the cabinet. <strong>Passive cons:</strong> separate amp purchase and setup, mismatch risk, no onboard DSP, more cables and weight, slower setup.</p>';
  const esProse = '<p><strong>Ventajas activas:</strong> amplificador incorporado, emparejamiento perfecto, DSP con preajustes, claridad bi-amplificada, diseño portátil todo en uno, montaje rápido. <strong>Contras activas:</strong> si falla el amp muere el altavoz, más peso por caja, menos flexible en instalaciones gigantes.</p><p><strong>Ventajas pasivas:</strong> componentes separados fáciles de reparar, un amp alimenta varios altavoces, amps en rack, estándar en instalaciones grandes, sin electrónica en la caja. <strong>Contras pasivas:</strong> comprar y configurar el amp aparte, riesgo de desajuste, sin DSP integrado, más cables y peso, montaje lento.</p>';
  ['content', 'content_es'].forEach((k, idx) => {
    const t = g.sections[2][k];
    const nw = t.replace(/<div class="guide-table-wrap">\s*<table[\s\S]*?<\/table>\s*<\/div>/g, idx ? esProse : enProse);
    console.log('active sec2', k, nw.length !== t.length ? 'TABLA->PROSA' : 'SIN CAMBIO!');
    g.sections[2][k] = nw;
  });
}
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('done');