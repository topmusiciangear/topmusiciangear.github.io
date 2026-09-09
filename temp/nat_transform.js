const fs = require('fs');
const src = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const ids = ['ableton-vs-logic','atc-vs-genelec','best-32-channel-digital-mixers','best-beginner-electric-guitar','best-drum-machine','best-headphones-for-mixing','best-live-subwoofers','best-multi-effects-pedals','best-reverb-delay','budget-bass-like-expensive','c414-vs-u87','dxr-vs-prx','fx-plugins','k371-vs-mdr7506','mics-for-creators','portable-interfaces','pro-headphones','pro-plugins','scarlett-vs-ssl','stage-wedges','studio-subwoofers','yamaha-mg-vs-behringer-xenyx'];
const my = ids.map(id => JSON.parse(JSON.stringify(src.find(x => x.id === id))));

let enFixes = 0, esFixes = 0;

function fixEN(guide, field, search, replace) {
  const val = guide[field];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide[field] = val.replace(search, replace);
    enFixes++;
  }
}

function fixES(guide, field, search, replace) {
  const fieldES = field + '_es';
  const val = guide[fieldES];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide[fieldES] = val.replace(search, replace);
    esFixes++;
  }
}

function fixESfield(guide, field, search, replace) {
  const val = guide[field];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide[field] = val.replace(search, replace);
    esFixes++;
  }
}

function fixSectionEN(guide, idx, field, search, replace) {
  const val = guide.sections[idx][field];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.sections[idx][field] = val.replace(search, replace);
    enFixes++;
  }
}

function fixSectionES(guide, idx, field, search, replace) {
  const val = guide.sections[idx][field + '_es'];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.sections[idx][field + '_es'] = val.replace(search, replace);
    esFixes++;
  }
}

function fixSnippetEN(guide, key, search, replace) {
  const val = guide.featuredSnippet[key];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.featuredSnippet[key] = val.replace(search, replace);
    enFixes++;
  }
}

function fixSnippetES(guide, key, search, replace) {
  const val = guide.featuredSnippet[key];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.featuredSnippet[key] = val.replace(search, replace);
    esFixes++;
  }
}

function fixRowValEN(guide, rowIdx, valIdx, search, replace) {
  const val = guide.productTable.rows[rowIdx].values[valIdx].value;
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.productTable.rows[rowIdx].values[valIdx].value = val.replace(search, replace);
    enFixes++;
  }
}

function fixRowValES(guide, rowIdx, valIdx, search, replace) {
  const val = guide.productTable.rows[rowIdx].values[valIdx].value_es;
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.productTable.rows[rowIdx].values[valIdx].value_es = val.replace(search, replace);
    esFixes++;
  }
}

// ============================================================
// portable-interfaces
// ============================================================
const pi = my.find(x => x.id === 'portable-interfaces');
fixSnippetEN(pi, 'faq_a1_en', 'For pro-level mobile recording', 'For high-quality mobile recording');
fixSnippetES(pi, 'faq_a1_es', 'Para grabación móvil de nivel profesional', 'Para grabación móvil de alta calidad');

// ============================================================
// k371-vs-mdr7506
// ============================================================
const k371 = my.find(x => x.id === 'k371-vs-mdr7506');
fixSnippetEN(k371, 'text_en', 'the industry standard for critical listening', 'the reference for critical listening');
fixSnippetEN(k371, 'key2', 'Industry Standard', 'The 30-Year Reference');
fixSectionEN(k371, 1, 'content', 'the industry standard for location sound', 'the go-to for location sound');
// s3.content: "essential" - leave (natural in context: "intelligibility is essential")

// ============================================================
// best-headphones-for-mixing
// ============================================================
const bhm = my.find(x => x.id === 'best-headphones-for-mixing');
fixSectionEN(bhm, 1, 'content', 'They have been an industry standard for decades', 'They have been the reference in studios for decades');

// ============================================================
// best-beginner-electric-guitar
// ============================================================
const beg = my.find(x => x.id === 'best-beginner-electric-guitar');
// s4.content has "essential" twice
fixSectionEN(beg, 4, 'content', 'include these essential accessories', 'include these accessories');
fixSectionEN(beg, 4, 'content', 'Clip-on tuners (-20) are essential.', 'Clip-on tuners (-20) are a must.');
// ES: todoterreno (6 hits) - vary replacements
fixESfield(beg, 'verdict', 'mejor eléctrica todoterreno', 'mejor eléctrica versátil');
fixESfield(beg, 'conclusion', 'mejor todoterreno', 'mejor opción versátil');
fixSnippetES(beg, 'text_es', 'mejor todoterreno', 'mejor opción versátil');
fixSnippetES(beg, 'faq_a3_es', 'la mejor todoterreno', 'la opción más versátil');
fixSectionES(beg, 0, 'content', 'sin complicaciones, perfecto', 'sin dramas, perfecto');
fixSectionES(beg, 1, 'content', 'la mejor todoterreno', 'la opción más versátil');
fixRowValES(beg, 1, 0, 'La mejor todoterreno para la mayoría', 'La más versátil para la mayoría');

// ============================================================
// best-drum-machine
// ============================================================
const bdm = my.find(x => x.id === 'best-drum-machine');
// ES conclusion: "a otro nivel"
fixESfield(bdm, 'conclusion', 'a otro nivel de inmediato', 'un paso notable de inmediato');

// ============================================================
// best-reverb-delay
// ============================================================
const brd = my.find(x => x.id === 'best-reverb-delay');
fixEN(brd, 'intro', 'the most essential time-based effects', 'the core time-based effects');
fixEN(brd, 'verdict', 'studio-grade spaces', 'spaces that sound like a real room');
fixEN(brd, 'conclusion', 'incredible reverb value', 'great reverb value');
fixEN(brd, 'conclusion', 'the studio-grade reverb for professionals', 'the reverb professionals reach for');
fixSnippetEN(brd, 'faq_a6_en', 'studio-grade algorithms', 'detailed, studio-quality algorithms');
fixSectionEN(brd, 0, 'content', 'the studio-grade reverb', 'the high-end reverb');
fixRowValEN(brd, 0, 3, 'Massive studio-grade reverbs', 'Massive, lush reverbs');

// ============================================================
// yamaha-mg-vs-behringer-xenyx
// ============================================================
const ymg = my.find(x => x.id === 'yamaha-mg-vs-behringer-xenyx');
fixEN(ymg, 'conclusion', 'the industry standard for build quality', 'the go-to for build quality');
fixSectionEN(ymg, 0, 'content', 'the benchmark for analog mixers', 'the reference for analog mixers');
fixSectionEN(ymg, 0, 'content', '24 studio-grade programs', '24 detailed reverb and modulation programs');
fixSectionEN(ymg, 1, 'content', 'packs an incredible amount of features', 'packs a huge amount of features');
fixSectionEN(ymg, 1, 'content', '4 studio-grade compressors', '4 one-knob compressors');
fixSectionEN(ymg, 3, 'content', 'offers incredible value', 'is hard to beat on value');
// ES
fixESfield(ymg, 'conclusion', 'el estándar de la industria en calidad', 'la referencia en calidad');
fixSectionES(ymg, 2, 'content', 'no tiene rival', 'poca le hace competencia');

// ============================================================
// budget-bass-like-expensive
// ============================================================
const bbl = my.find(x => x.id === 'budget-bass-like-expensive');
fixEN(bbl, 'intro', 'delivering pro-level tone', 'delivering tone that holds up against');
fixEN(bbl, 'verdict', 'the versatile workhorse', 'the versatile all-rounder');
fixSnippetEN(bbl, 'text_en', 'for incredible tonal versatility', 'for tonal versatility that punches above its price');
fixSectionEN(bbl, 1, 'content', 'for incredible tonal versatility', 'for impressive tonal versatility');
// ES
fixESfield(bbl, 'verdict', 'caballo de batalla versátil', 'opción versátil');
fixSnippetES(bbl, 'text_es', 'versatilidad tonal increíble', 'versatilidad tonal notable');
fixSectionES(bbl, 1, 'content', 'versatilidad tonal increíble', 'versatilidad tonal notable');

// ============================================================
// pro-headphones
// ============================================================
const ph = my.find(x => x.id === 'pro-headphones');
fixEN(ph, 'verdict', 'the other is a workhorse', 'the other is a daily driver');
fixEN(ph, 'description', 'the new benchmark', 'the new standard-bearer');
// "effortless to drive" in s1.content - borderline, but let's fix
fixSectionEN(ph, 1, 'content', 'the LCD-MX4 is effortless to drive', 'the LCD-MX4 is easy to drive');
// ES
fixESfield(ph, 'verdict', 'un caballo de batalla', 'un día a día');

// ============================================================
// pro-plugins
// ============================================================
const pp = my.find(x => x.id === 'pro-plugins');
fixSectionEN(pp, 0, 'content', 'the industry standard for mixing, mastering', 'the go-to bundle for mixing, mastering');
fixSectionEN(pp, 1, 'content', 'algorithmic reverb with incredible depth', 'algorithmic reverb with impressive depth');
fixSectionEN(pp, 1, 'content', 'the industry standard limiter', 'the limiter that most engineers rely on');
// ES
fixSectionES(pp, 0, 'content', 'el estándar de la industria para mezcla', 'el bundle de referencia para mezcla');
fixSectionES(pp, 1, 'content', 'el limitador estándar de la industria', 'el limitador que usan la mayoría de ingenieros');
fixSectionES(pp, 2, 'content', 'el sampler estándar de la industria', 'el sampler que se usa en todos lados');

// ============================================================
// best-multi-effects-pedals
// ============================================================
const bmp = my.find(x => x.id === 'best-multi-effects-pedals');
fixSnippetEN(bmp, 'faq_a5_en', 'for pro-level modeling depth', 'for deep, hands-on modeling');

// ============================================================
// stage-wedges
// ============================================================
const sw = my.find(x => x.id === 'stage-wedges');
fixSectionEN(sw, 4, 'content', 'with pro-level tuning at a fair price', 'with tuning controls that rival pricier options');
// ES
fixSectionES(sw, 4, 'content', 'ajuste de nivel profesional a un precio justo', 'controles de ajuste comparables a monitores más caros');

// ============================================================
// best-live-subwoofers
// ============================================================
const bls = my.find(x => x.id === 'best-live-subwoofers');
fixSnippetEN(bls, 'faq_a1_en', 'Subs are essential for bands', 'Subs are a must for bands');
fixSectionEN(bls, 3, 'content', "It's the workhorse most working bands buy first", "It's the reliable choice most working bands buy first");
// ES
fixSectionES(bls, 3, 'content', 'Es el caballo de batalla que la mayoría', 'Es la opción que la mayoría');

// ============================================================
// mics-for-creators
// ============================================================
const mfc = my.find(x => x.id === 'mics-for-creators');
fixSnippetEN(mfc, 'faq_a1_en', 'For a studio-grade condenser', 'For a dedicated condenser');
fixSectionEN(mfc, 1, 'content', 'A boom arm and pop filter are essential accessories', 'A boom arm and pop filter are the first accessories to get');
// ES
fixESfield(mfc, 'verdict', 'el mejor todoterreno para creadores', 'la mejor opción versátil para creadores');

// ============================================================
// best-32-channel-digital-mixers
// ============================================================
const b32 = my.find(x => x.id === 'best-32-channel-digital-mixers');
fixEN(b32, 'conclusion', 'is unmatched', 'leads the pack');
fixSectionES(b32, 1, 'heading', 'El rey del valor', 'La mejor relación calidad-precio');

// ============================================================
// studio-subwoofers
// ============================================================
const ss = my.find(x => x.id === 'studio-subwoofers');
// EN s0.content: "Essential for A/B referencing" - this is actually natural ("essential for" a specific task). Leave it.
// ES: "Imprescindible para comparaciones A/B" - same, natural. Leave it.

// ============================================================
// scarlett-vs-ssl
// ============================================================
const svs = my.find(x => x.id === 'scarlett-vs-ssl');
fixSectionES(svs, 3, 'content', 'funciones de nivel profesional', 'funciones de calidad profesional');

// ============================================================
// dxr-vs-prx
// ============================================================
const dxr = my.find(x => x.id === 'dxr-vs-prx');
fixESfield(dxr, 'conclusion', 'sin complicaciones', 'sin líos');
fixSnippetES(dxr, 'faq_a2_es', 'sin complicaciones de montaje', 'sin líos de montaje');

// ============================================================
// ableton-vs-logic
// ============================================================
const avl = my.find(x => x.id === 'ableton-vs-logic');
fixSectionES(avl, 0, 'content', 'DAWs estándar de la industria', 'DAWs que dominan la industria');
fixSectionES(avl, 2, 'content', 'Logic Pro no tiene rival', 'Logic Pro no tiene comparación');

// ============================================================
// atc-vs-genelec
// ============================================================
const atc = my.find(x => x.id === 'atc-vs-genelec');
fixSnippetES(atc, 'faq_a1_es', 'el todoterreno calibrado', 'el versátil con calibración');
fixSectionES(atc, 0, 'content', 'sin esfuerzo', 'sin problemas');

// ============================================================
// fx-plugins
// ============================================================
const fx = my.find(x => x.id === 'fx-plugins');
// ES: "imprescindible" - borderline, but it's "el bundle imprescindible" which is pretty standard. Leave it (sounds natural).

// ============================================================
// Write output
// ============================================================
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json', JSON.stringify(my, null, 2), 'utf8');
console.log('EN fixes:', enFixes);
console.log('ES fixes:', esFixes);
console.log('Total guides:', my.length);

// Verify JSON parses
try {
  JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json','utf8'));
  console.log('JSON valid: YES');
} catch(e) {
  console.log('JSON valid: NO -', e.message);
}
