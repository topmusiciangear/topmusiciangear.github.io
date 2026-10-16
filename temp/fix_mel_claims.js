const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'repitch-vs-melodyne');

// ---- spanglish check ----
let s0 = JSON.stringify(g);
['compear', 'no-brainer', 'dobles toma'].forEach(k => {
  if (s0.includes(k)) console.log('spanglish "' + k + '": SI');
});

// ---- Melodyne section (index 1) ----
const mel = g.sections[1];
mel.content = '<p><strong>Melodyne 5 Essential is the most affordable entry into the industry-standard tuning engine.</strong> You record or import a vocal, and Melodyne analyzes it into individual notes you drag to correct pitch and timing. The result sounds perfectly tuned but completely natural: no robotic artifacts, no correction tells.</p><p>Note the tier limits honestly: this Essential version works on monophonic material only (lead vocals, single-note instruments). Polyphonic chord editing lives in Editor and Studio, and the formant tool starts at Assistant. If you only tune lead vocals on a budget, Essential is all you need, with a clear upgrade path when you outgrow it.</p>';
mel.content_es = '<p><strong>Melodyne 5 Essential es la entrada más asequible al motor de afinación estándar de la industria.</strong> Grabas o importas una voz, y Melodyne la analiza en notas individuales que arrastras para corregir tono y tiempo. El resultado suena perfectamente afinado pero completamente natural: sin artefactos robóticos ni señales de procesamiento. Cabe destacar que esta versión Essential se enfoca exclusivamente en audio monofónico (voces solistas o instrumentos de una sola nota). Si necesitas sus famosas capacidades polifónicas para editar acordes o el control avanzado de formantes, deberás dar el salto a sus versiones superiores (Melodyne Assistant o Studio). Sin embargo, para voces principales limpias y presupuestos ajustados, Essential sigue siendo el estándar de la industria.</p>';
mel.pros = ['Transparent monophonic pitch correction', 'Timing correction note by note', 'Natural results without artifacts', 'Cheapest entry into Melodyne with upgrade path'];
mel.pros_es = ['Corrección de tono monofónica y transparente', 'Corrección de tiempo nota por nota', 'Resultados naturales sin artefactos', 'La entrada más barata a Melodyne con ruta de mejora'];
mel.cons = ['No multi-track editing in a single window', 'No polyphonic or formant tools in Essential', 'Steeper learning curve than RePitch', 'No tuning macros or auto-timing'];
mel.cons_es = ['Sin edición multipista en una sola ventana', 'Sin herramientas polifónicas ni de formantes en Essential', 'Curva de aprendizaje más pronunciada que RePitch', 'Sin macros de afinación ni tiempo automático'];

// ---- RePitch section cons: quitar "no live" (misma logica) ----
const rep = g.sections[0];
rep.cons = ['No polyphonic pitch editing', 'Standard costs more than Melodyne Essential', 'Smaller tutorial ecosystem than Melodyne', 'No automatic double alignment (pair it with VocAlign)'];
rep.cons_es = ['Sin edición de tono polifónica', 'Standard cuesta más que Melodyne Essential', 'Ecosistema de tutoriales más pequeño que Melodyne', 'Sin alineación automática de dobles (combínalo con VocAlign)'];
// fix compear
rep.content_es = rep.content_es.split('así compear e igualar dobles toma minutos en lugar de una hora.').join('así que hacer el comping (selección de tomas) e igualar las voces dobles toma minutos en lugar de una hora.');

// ---- intro: no atribuir polifonia/formantes al Essential ----
g.intro = g.intro.split('while Melodyne 5 goes deeper, with polyphonic editing and formant control that no rival matches.').join('while Melodyne 5 offers the industry-reference engine with an upgrade path to polyphonic editing and formant control in higher tiers.');
g.intro_es = g.intro_es.split('mientras Melodyne 5 va más hondo, con edición polifónica y control de formantes que ningún rival iguala.').join('mientras Melodyne 5 ofrece el motor de referencia de la industria con ruta de mejora a edición polifónica y control de formantes en niveles superiores.');

// ---- verdictProsCons Melodyne ----
g.verdictProsCons[1] = { name: 'Melodyne 5 Essential', name_es: 'Melodyne 5 Essential',
  pros: ['Transparent monophonic tuning', 'Timing correction per note', 'Natural results, no artifacts', 'Cheapest tier, upgrade path'],
  pros_es: ['Afinación monofónica transparente', 'Corrección de tiempo por nota', 'Resultados naturales sin artefactos', 'Nivel más barato, ruta de mejora'],
  cons: ['No multi-track single view', 'No polyphonic/formant in Essential', 'Steeper learning curve', 'No tuning macros'],
  cons_es: ['Sin vista multipista única', 'Sin polifonía/formantes en Essential', 'Curva de aprendizaje pronunciada', 'Sin macros de afinación'] };
// RePitch verdict cons: quitar live
g.verdictProsCons[0].cons = ['No polyphonic editing', 'Costs more than Essential', 'Fewer tutorials', 'No auto double alignment'];
g.verdictProsCons[0].cons_es = ['Sin edición polifónica', 'Cuesta más que Essential', 'Menos tutoriales', 'Sin alineación auto de dobles'];

// ---- tabla del usuario ----
g.productTable.rows = [
  { label: 'Best For', label_es: 'Ideal para', values: [
    { value: 'Fast daily multi-track vocal tuning', value_es: 'Afinación vocal diaria, veloz y multipista' },
    { value: 'Transparent correction on a tight budget', value_es: 'Corrección transparente con presupuesto ajustado' } ] },
  { label: 'Editing Type', label_es: 'Tipo de edición', values: [
    { value: 'Monophonic (smart multi-track view)', value_es: 'Monofónica (vista multipista inteligente)' },
    { value: 'Basic monophonic (one track per window)', value_es: 'Monofónica básica (una sola pista por ventana)' } ] },
  { label: 'Timing Tools', label_es: 'Herramientas de tiempo', values: [
    { value: 'Automatic SmartAttack + macros', value_es: 'SmartAttack + macros automáticas' },
    { value: 'Manual note-by-note timing', value_es: 'Ajuste de tiempo manual nota por nota' } ] },
  { label: 'Formants & Polyphony', label_es: 'Formantes y polifonía', values: [
    { value: 'Not included', value_es: 'No incluye' },
    { value: 'Not included (paid higher tiers only)', value_es: 'No incluye (solo en versiones superiores de pago)' } ] },
  { label: 'Ecosystem', label_es: 'Ecosistema integrado', values: [
    { value: 'Direct SynchroLink to VocAlign & Revoice', value_es: 'SynchroLink directo a VocAlign y Revoice' },
    { value: 'Standalone (needs ARA or manual transfer)', value_es: 'Independiente (requiere ARA o transferencia manual)' } ] }
];

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('correcciones aplicadas');
// barrido final de claims falsos
const chk = JSON.stringify(g);
['polyphonic pitch editing: edit chords', 'Formant control for tonal', 'edición de tono polifónica: edita acordes', 'Control de formantes para carácter', 'en tiempo real: requiere análisis', 'No adecuado para interpretación', 'compear', 'no-brainer'].forEach(k => {
  if (chk.includes(k)) console.log('RESTO: ' + k);
});
console.log('barrido listo');
