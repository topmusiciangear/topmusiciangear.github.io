const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));

const ids = [
  'acoustic-guitars-guide','audient-vs-motu','best-amp-modelers','best-compact-mixers',
  'best-electric-guitar','best-in-ear-monitors','best-looper-pedals','best-overdrive-distortion',
  'best-ribbon-mics','budget-interfaces','channel-strip-plugins','ew-iem-g4-twin-vs-psm300',
  'guitar-bass-amps','katana-vs-dsl','midi-controllers','precision-vs-jazz',
  'pro-interfaces','pro-synths','sidechain-modulation-plugins','stage-wireless',
  'tracking-headphones','zlx-vs-k12'
];

const guides = ids.map(id => {
  const g = data.find(x => x.id === id);
  return JSON.parse(JSON.stringify(g)); // deep clone
});

// Keep a lookup for reordering output to match guides.json order
const byId = {};
guides.forEach(g => { byId[g.id] = g; });

let enFixes = 0, esFixes = 0;

// Helper: apply targeted string replacements to a text field
function replaceInText(text, replacements) {
  let result = text;
  for (const [find, replace] of replacements) {
    if (result.includes(find)) {
      result = result.split(find).join(replace);
    }
  }
  return result;
}

// Process each guide
guides.forEach(g => {
  const id = g.id;

  // ============================================================
  // acoustic-guitars-guide
  // ============================================================
  if (id === 'acoustic-guitars-guide') {
    g.intro = replaceInText(g.intro, []);
    g.intro_es = replaceInText(g.intro_es, []);

    // Section 0 content - "the benchmark every other dreadnought is compared to"
    g.sections[0].content = replaceInText(g.sections[0].content, [
      ['It is the benchmark every other dreadnought is compared to, and a genuine investment that appreciates in value.',
       'Every other dreadnought gets measured against it, and it\'s a genuine investment that appreciates in value.']
    ]);
    g.sections[0].content_es = replaceInText(g.sections[0].content_es, []);

    // Section 1 heading - "workhorse"
    g.sections[1].heading = replaceInText(g.sections[1].heading, [
      ['The Balanced Session Workhorse:', 'The Balanced Session Pick:']
    ]);
    g.sections[1].heading_es = replaceInText(g.sections[1].heading_es, [
      ['El Caballo de Batalla Equilibrado:', 'La Elección Equilibrada para Sesiones:']
    ]);

    // Section 3 content - "studio-grade"
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['huge, crystalline, studio-grade voice', 'huge, crystalline voice that records beautifully']
    ]);
    g.sections[3].content_es = replaceInText(g.sections[3].content_es, [
      ['voz enorme, cristalina y de calidad de estudio', 'voz enorme y cristalina que graba de maravilla']
    ]);

    // Conclusion - "benchmark"
    g.conclusion = replaceInText(g.conclusion, [
      ['If you want the benchmark every dreadnought is measured against', 'If you want the dreadnought that defined the standard']
    ]);
    // conclusion_es keeps natural "referente" phrasing

    // Verdict - "the timeless benchmark"
    g.verdict = replaceInText(g.verdict, [
      ['the timeless benchmark', 'the time-tested standard']
    ]);
    // Note: verdict_es already uses "referente atemporal" - leave it, that's fine

    // featuredSnippet
    g.featuredSnippet.text_en = replaceInText(g.featuredSnippet.text_en, [
      ['the benchmark dreadnought', 'the dreadnought by which others are judged']
    ]);
    // text_es keeps natural "de referencia" phrasing
    g.featuredSnippet.key1_en = replaceInText(g.featuredSnippet.key1_en, [
      ['The benchmark every dreadnought is compared to', 'The dreadnought every other is measured against']
    ]);
    // key1_es keeps natural "El referente con el que se compara cada dreadnought"

    // FAQ a5 - "studio-grade"
    g.featuredSnippet.faq_a5_en = replaceInText(g.featuredSnippet.faq_a5_en, [
      ['huge crystalline studio-grade voice', 'huge crystalline voice that shines in the studio']
    ]);
    g.featuredSnippet.faq_a5_es = replaceInText(g.featuredSnippet.faq_a5_es, [
      ['una voz enorme, cristalina y de calidad de estudio', 'una voz enorme y cristalina que brilla en el estudio']
    ]);

    // Table row - "studio-grade" in "Warm pre-war vintage warhorse tone"
    g.productTable.rows[1].values[5].value = replaceInText(g.productTable.rows[1].values[5].value, [
      ['Warm pre-war vintage warhorse tone', 'Warm pre-war vintage tone, built to last']
    ]);
    g.productTable.rows[1].values[5].value_es = replaceInText(g.productTable.rows[1].values[5].value_es, [
      ['Tono vintage de preguerra, cálido y robusto', 'Tono vintage de preguerra, cálido y duradero']
    ]);

    // Table row - "King of the Flat-Tops" - this is a legitimate nickname, leave it
    // verdictProsCons - "studio-grade"
    if (g.verdictProsCons) {
      g.verdictProsCons.forEach(pc => {
        if (pc.pros) {
          pc.pros = pc.pros.map(p =>
            p
              .replace('huge, crystalline, studio-grade voice', 'huge, crystalline voice that records beautifully')
              .replace('The benchmark every other acoustic guitar is measured against', 'The standard every other acoustic guitar is judged against')
          );
        }
        if (pc.pros_es) {
          pc.pros_es = pc.pros_es.map(p =>
            p.replace('voz enorme, cristalina y de calidad de estudio', 'voz enorme y cristalina que graba de maravilla')
          );
        }
      });
    }
  }

  // ============================================================
  // audient-vs-motu
  // ============================================================
  if (id === 'audient-vs-motu') {
    g.sections[3].content_es = replaceInText(g.sections[3].content_es, [
      ['Ambas son opciones de nivel profesional', 'Ambas son opciones serias para un estudio']
    ]);

    g.featuredSnippet.text_en = replaceInText(g.featuredSnippet.text_en, [
      ['with benchmark converters', 'with accurate ESS Sabre32 converters']
    ]);
    g.featuredSnippet.key2 = replaceInText(g.featuredSnippet.key2, [
      ['Benchmark Converters', 'ESS Sabre32 Converters']
    ]);
  }

  // ============================================================
  // best-amp-modelers
  // ============================================================
  if (id === 'best-amp-modelers') {
    // Section 1 - "MIDI unlocks all 20 presets"
    g.sections[1].content = replaceInText(g.sections[1].content, [
      ['MIDI unlocks all 20 presets', 'MIDI gives you access to all 20 presets']
    ]);
    g.sections[1].content_es = replaceInText(g.sections[1].content_es, [
      ['el MIDI desbloquea los 20 presets', 'el MIDI te da acceso a los 20 presets']
    ]);

    // Section 2 - "sin complicaciones" and "no tiene rival"
    g.sections[2].content_es = replaceInText(g.sections[2].content_es, [
      ['suene genial y sin complicaciones a un precio económico, y para ese trabajo no tiene rival en esta lista',
       'suene bien y sin problemas a un precio accesible, y para ese trabajo le gana a cualquiera en esta lista']
    ]);
    g.sections[2].content = replaceInText(g.sections[2].content, [
      ['great-sounding, no-fuss gear at a budget price, and for that job it has no rival on this list',
       'great-sounding, straightforward gear at a budget price, and for that job it beats everything else on this list']
    ]);

    // Section 1 pros_es - "nivel profesional"
    if (g.verdictProsCons && g.verdictProsCons[0] && g.verdictProsCons[0].pros_es) {
      g.verdictProsCons[0].pros_es = g.verdictProsCons[0].pros_es.map(p =>
        p.replace('Motor Helix de nivel profesional', 'Motor Helix usado por profesionales')
      );
    }
  }

  // ============================================================
  // best-compact-mixers
  // ============================================================
  if (id === 'best-compact-mixers') {
    g.verdict = replaceInText(g.verdict, [
      ['the budget analog workhorse', 'the go-to budget analog mixer']
    ]);
    g.verdict_es = replaceInText(g.verdict_es, [
      ['el caballo de batalla analógico económico', 'el mixer analógico económico más usado']
    ]);
  }

  // ============================================================
  // best-electric-guitar
  // ============================================================
  if (id === 'best-electric-guitar') {
    // ES - "todoterreno" (3x in featuredSnippet)
    g.featuredSnippet.text_es = replaceInText(g.featuredSnippet.text_es, [
      ['es la mejor guitarra eléctrica todoterreno', 'es la mejor guitarra eléctrica multipropósito'],
      ['la ESP E-II Eclipse DB es la máquina de alta ganancia', 'la ESP E-II Eclipse DB es la opción de alta ganancia']
    ]);
    g.featuredSnippet.key1_es = replaceInText(g.featuredSnippet.key1_es, [
      ['Mejor guitarra de estudio todoterreno', 'Mejor guitarra de estudio multipropósito']
    ]);
    g.featuredSnippet.faq_a1_es = replaceInText(g.featuredSnippet.faq_a1_es, [
      ['es la mejor opción todoterreno', 'es la mejor opción multipropósito'],
      ['la ESP E-II Eclipse DB no tiene rival', 'la ESP E-II Eclipse DB es difícil de superar']
    ]);

    // EN - "effortless"
    g.featuredSnippet.faq_a3_en = replaceInText(g.featuredSnippet.faq_a3_en, [
      ['make long recording sessions effortless', 'make long recording sessions comfortable']
    ]);

    // Table row
    g.productTable.rows[0].values[0].value_es = replaceInText(g.productTable.rows[0].values[0].value_es, [
      ['La guitarra de estudio todoterreno más versátil', 'La guitarra de estudio multipropósito más versátil']
    ]);
  }

  // ============================================================
  // best-in-ear-monitors
  // ============================================================
  if (id === 'best-in-ear-monitors') {
    // Intro - "workhorses"
    g.intro = replaceInText(g.intro, [
      ['to affordable workhorses', 'to reliable mid-range options']
    ]);

    // Section 1 heading
    g.sections[1].heading = replaceInText(g.sections[1].heading, [
      ['Industry Standards & Workhorses (Mid-Range)', 'Industry-Standard Picks (Mid-Range)']
    ]);

    // Section 3 - "industry standard"
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['Sennheiser EW IEM G4 series remains the industry standard for professional touring',
       'Sennheiser EW IEM G4 series remains the go-to choice for professional touring']
    ]);
    g.sections[3].content_es = replaceInText(g.sections[3].content_es, [
      ['Sennheiser EW IEM G4 sigue siendo el estándar de la industria para giras profesionales',
       'Sennheiser EW IEM G4 sigue siendo la opción preferida para giras profesionales']
    ]);

    // Conclusion - "benchmark"
    g.conclusion = replaceInText(g.conclusion, [
      ['the Shure SE846 Gen 2 remains the benchmark with',
       'the Shure SE846 Gen 2 remains the reference with']
    ]);
  }

  // ============================================================
  // best-looper-pedals
  // ============================================================
  if (id === 'best-looper-pedals') {
    // No clichés found - skip
  }

  // ============================================================
  // best-overdrive-distortion
  // ============================================================
  if (id === 'best-overdrive-distortion') {
    // Section 1 - "effortless" and "essential"
    g.sections[1].content = replaceInText(g.sections[1].content, [
      ['makes it effortless to dial in. It\'s an essential pedal for',
       'makes it easy to dial in. Every guitarist needs one of these for']
    ]);

    // Section 3 - "incredible"
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['hides an incredible range', 'hides a surprisingly wide range']
    ]);

    // VerdictProsCons - "Effortless"
    if (g.verdictProsCons && g.verdictProsCons[0]) {
      g.verdictProsCons[0].pros = g.verdictProsCons[0].pros.map(p =>
        p.replace('Effortless 3-knob layout', 'Simple 3-knob layout')
      );
    }
  }

  // ============================================================
  // best-ribbon-mics
  // ============================================================
  if (id === 'best-ribbon-mics') {
    // Section 2 - "industry standard"
    g.sections[2].content = replaceInText(g.sections[2].content, [
      ['The Royer R-121 is the industry standard for recording guitar amps with ribbon microphones',
       'The Royer R-121 is the mic engineers reach for when recording guitar amps with ribbons']
    ]);
    g.sections[2].content_es = replaceInText(g.sections[2].content_es, [
      ['La Royer R-121 es el estándar de la industria para grabar amplificadores de guitarra',
       'La Royer R-121 es el micrófono que más usan los ingenieros para grabar amplificadores de guitarra']
    ]);

    // Table row
    g.productTable.rows[0].values[4].value = replaceInText(g.productTable.rows[0].values[4].value, [
      ['Pro guitar amp recording — the industry standard',
       'Pro guitar amp recording — the ribbon mic engineers trust most']
    ]);
    g.productTable.rows[0].values[4].value_es = replaceInText(g.productTable.rows[0].values[4].value_es, [
      ['estándar de la industria', 'el ribbon que más usan los ingenieros']
    ]);

    // VerdictProsCons
    if (g.verdictProsCons && g.verdictProsCons[0]) {
      g.verdictProsCons[0].pros_es = g.verdictProsCons[0].pros_es.map(p =>
        p.replace('estándar de la industria para amplificadores y metales',
                   'el ribbon que más se usa para amplificadores y metales')
      );
    }

    // Conclusion - "unmatched" and "industry standard"
    g.conclusion = replaceInText(g.conclusion, [
      ['the R-121 remains unmatched', 'the R-121 remains the one to beat']
    ]);
    g.conclusion_es = replaceInText(g.conclusion_es, [
      ['la estándar de la industria Royer R-121', 'la Royer R-121, que define el estándar']
    ]);
  }

  // ============================================================
  // budget-interfaces
  // ============================================================
  if (id === 'budget-interfaces') {
    // Section 4 - "effortlessly"
    g.sections[4].content = replaceInText(g.sections[4].content, [
      ['that make vocals sit in the mix effortlessly',
       'that make vocals sit naturally in the mix']
    ]);

    // Conclusion - "can't go wrong"
    g.conclusion = replaceInText(g.conclusion, [
      ['You can\'t go wrong with any of these',
       'Any of these will serve you well']
    ]);
  }

  // ============================================================
  // channel-strip-plugins
  // ============================================================
  if (id === 'channel-strip-plugins') {
    g.sections[1].content_es = replaceInText(g.sections[1].content_es, [
      ['y lo convierten en un imprescindible de estudio',
       'y lo convierten en un plugin que todo estudio debería tener']
    ]);
  }

  // ============================================================
  // ew-iem-g4-twin-vs-psm300
  // ============================================================
  if (id === 'ew-iem-g4-twin-vs-psm300') {
    g.sections[0].content = replaceInText(g.sections[0].content, [
      ['a bulletproof analog RF link',
       'a reliable analog RF link']
    ]);
  }

  // ============================================================
  // guitar-bass-amps
  // ============================================================
  if (id === 'guitar-bass-amps') {
    // Section 0 - "nivel profesional"
    g.sections[0].content_es = replaceInText(g.sections[0].content_es, [
      ['son modeladores de nivel profesional usados en grabaciones importantes',
       'son modeladores que usan profesionales en grabaciones importantes']
    ]);

    // Section 1 - "industry standard"
    g.sections[1].content = replaceInText(g.sections[1].content, [
      ['The Ampeg SVT-CL ($1,700) is the industry standard for rock bass',
       'The Ampeg SVT-CL ($1,700) is the amp that defined rock bass tone']
    ]);
    g.sections[1].content_es = replaceInText(g.sections[1].content_es, [
      ['El Ampeg SVT-CL ($1,700) es el estándar de la industria para bajo de rock',
       'El Ampeg SVT-CL ($1,700) es el amplificador que definió el tono de bajo de rock']
    ]);

    // VerdictProsCons - "effortless"
    if (g.verdictProsCons && g.verdictProsCons[1]) {
      g.verdictProsCons[1].pros = g.verdictProsCons[1].pros.map(p =>
        p.replace('makes recording effortless', 'makes recording easy')
      );
    }
  }

  // ============================================================
  // katana-vs-dsl
  // ============================================================
  if (id === 'katana-vs-dsl') {
    g.conclusion = replaceInText(g.conclusion, [
      ['offers incredible versatility and value',
       'offers serious versatility and value for money']
    ]);
  }

  // ============================================================
  // midi-controllers
  // ============================================================
  if (id === 'midi-controllers') {
    // Section 3 - "incredible value"
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['you\'re getting incredible value', 'you\'re getting a lot for the money']
    ]);

    // Section 4 - "unmatched"
    g.sections[4].content = replaceInText(g.sections[4].content, [
      ['the UF1 is unmatched', 'the UF1 is in a class of its own at this price']
    ]);

    // Section 7 heading - "Industry Standard"
    g.sections[7].heading = replaceInText(g.sections[7].heading, [
      ['Is the Mackie MCU Pro Still the Industry Standard?',
       'Is the Mackie MCU Pro Still the Go-To Control Surface?']
    ]);
    g.sections[7].heading_es = replaceInText(g.sections[7].heading_es, [
      ['¿Sigue siendo el Mackie MCU Pro el estándar de la industria?',
       '¿Sigue siendo el Mackie MCU Pro la superficie de control preferida?']
    ]);

    // Conclusion - "unmatched" and "king of the budget"
    g.conclusion = replaceInText(g.conclusion, [
      ['the Avid S1 offers unmatched integration',
       'the Avid S1 offers deep integration you won\'t find elsewhere at this price']
    ]);
    g.conclusion_es = replaceInText(g.conclusion_es, [
      ['el Behringer X-Touch es el rey del presupuesto',
       'el Behringer X-Touch es la mejor compra por el precio']
    ]);

    // Verdict - "unmatched" and "king"
    g.verdict = replaceInText(g.verdict, [
      ['the Avid S1 is unmatched', 'the Avid S1 leads for Pro Tools users']
    ]);
    g.verdict_es = replaceInText(g.verdict_es, [
      ['El Behringer X-Touch es el rey del presupuesto',
       'El Behringer X-Touch es la mejor compra por el precio']
    ]);

    // VerdictProsCons - "incredible price"
    if (g.verdictProsCons && g.verdictProsCons[2]) {
      g.verdictProsCons[2].pros = g.verdictProsCons[2].pros.map(p =>
        p.replace('at an incredible price', 'at a very competitive price')
      );
      g.verdictProsCons[2].pros_es = g.verdictProsCons[2].pros_es.map(p =>
        p.replace('a un precio increíble', 'a un precio muy competitivo')
      );
    }
  }

  // ============================================================
  // precision-vs-jazz
  // ============================================================
  if (id === 'precision-vs-jazz') {
    g.conclusion = replaceInText(g.conclusion, [
      ['you can\'t go wrong with either', 'either is a solid choice']
    ]);
    g.conclusion_es = replaceInText(g.conclusion_es, [
      ['sin esfuerzo', 'con naturalidad']
    ]);
  }

  // ============================================================
  // pro-interfaces
  // ============================================================
  if (id === 'pro-interfaces') {
    // Intro - "bulletproof"
    g.intro = replaceInText(g.intro, [
      ['RME offers bulletproof reliability', 'RME offers rock-solid reliability']
    ]);

    // Section 0
    g.sections[0].content = replaceInText(g.sections[0].content, [
      ['RME for bulletproof reliability', 'RME for rock-solid reliability']
    ]);

    // Verdict - "bulletproof"
    g.verdict = replaceInText(g.verdict, [
      ['is bulletproof reliability', 'is rock-solid reliability']
    ]);

    // FAQ - "bulletproof" (multiple)
    g.featuredSnippet.faq_a1_en = replaceInText(g.featuredSnippet.faq_a1_en, [
      ['bulletproof drivers', 'rock-solid drivers']
    ]);
    g.faq[0].a = replaceInText(g.faq[0].a, [
      ['bulletproof drivers', 'rock-solid drivers']
    ]);
    g.faq[1].a = replaceInText(g.faq[1].a, [
      ['bulletproof driver stability', 'rock-solid driver stability']
    ]);
  }

  // ============================================================
  // pro-synths
  // ============================================================
  if (id === 'pro-synths') {
    g.faq[4].a = replaceInText(g.faq[4].a, [
      ['Both sound incredible out of the box', 'Both sound impressive out of the box']
    ]);
    g.faq[4].a_es = replaceInText(g.faq[4].a_es, [
      ['Ambos suenan increíbles', 'Ambos suenan muy bien']
    ]);

    if (g.verdictProsCons && g.verdictProsCons[0]) {
      g.verdictProsCons[0].pros_es = g.verdictProsCons[0].pros_es.map(p =>
        p.replace('osciladores increíblemente gordos y cálidos',
                   'osciladores muy gordos y cálidos')
      );
    }
  }

  // ============================================================
  // sidechain-modulation-plugins
  // ============================================================
  if (id === 'sidechain-modulation-plugins') {
    // Section 2 - "máquina de"
    g.sections[2].content_es = replaceInText(g.sections[2].content_es, [
      ['es solo un plugin de sidechain: es una máquina de crear efectos creativos',
       'no es solo un plugin de sidechain: crea efectos creativos']
    ]);

    // Section 3 - "increíblemente fácil"
    g.sections[3].content_es = replaceInText(g.sections[3].content_es, [
      ['Es increíblemente fácil de usar', 'Es muy fácil de usar']
    ]);

    // Conclusion - "máquina de"
    g.conclusion_es = replaceInText(g.conclusion_es, [
      ['Infiltrator 2 es la máquina de efectos multiuso',
       'Infiltrator 2 es el plugin multiuso para efectos']
    ]);
  }

  // ============================================================
  // stage-wireless
  // ============================================================
  if (id === 'stage-wireless') {
    // Section 0 - "industry standard"
    g.sections[0].content = replaceInText(g.sections[0].content, [
      ['They are the industry standard for professional live sound',
       'They are the most trusted choice for professional live sound']
    ]);
    g.sections[0].content_es = replaceInText(g.sections[0].content_es, [
      ['Son el estándar de la industria para sonido en vivo profesional',
       'Son la opción más usada para sonido en vivo profesional']
    ]);

    // Section 2 heading
    g.sections[2].heading = replaceInText(g.sections[2].heading, [
      ['Is the Shure BLX288/PG58 the Industry Standard Wireless System?',
       'Is the Shure BLX288/PG58 the Go-To Wireless System?']
    ]);
    g.sections[2].heading_es = replaceInText(g.sections[2].heading_es, [
      ['hure bLX288/pG58 el sistema inalámbrico estándar de la industria?',
       'Shure BLX288/PG58 el sistema inalámbrico que más se usa?']
    ]);

    // Conclusion - "incredible value"
    g.conclusion = replaceInText(g.conclusion, [
      ['delivers incredible value', 'delivers great value for the money']
    ]);
  }

  // ============================================================
  // tracking-headphones
  // ============================================================
  if (id === 'tracking-headphones') {
    // Section 1 - "incredible detail"
    g.sections[1].content = replaceInText(g.sections[1].content, [
      ['which reveals incredible detail resolution',
       'which reveals impressive detail resolution']
    ]);

    // Conclusion - "workhorse"
    g.conclusion = replaceInText(g.conclusion, [
      ['The ATH-M50x is the versatile workhorse that handles',
       'The ATH-M50x is the versatile all-rounder that handles']
    ]);
    g.conclusion_es = replaceInText(g.conclusion_es, [
      ['Las ATH-M50x son el caballo de batalla versátil que maneja',
       'Las ATH-M50x son la opción versátil para']
    ]);

    // Verdict - "workhorse"
    g.verdict = replaceInText(g.verdict, [
      ['the ATH-M50x is the do-it-all workhorse',
       'the ATH-M50x does a bit of everything']
    ]);
    g.verdict_es = replaceInText(g.verdict_es, [
      ['las ATH-M50x son el caballo de batalla versátil',
       'las ATH-M50x son la opción más versátil']
    ]);
  }

  // ============================================================
  // zlx-vs-k12
  // ============================================================
  if (id === 'zlx-vs-k12') {
    // Section 1 - "benchmark"
    g.sections[1].content = replaceInText(g.sections[1].content, [
      ['The K12.2 is the benchmark for portable PA speakers',
       'The K12.2 is the portable PA speaker others get measured against']
    ]);

    // Section 3 - "incredible value", "bulletproof", "industry standard"
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['the EV ZLX-12P-G2 offers incredible value that will handle most gigs',
       'the EV ZLX-12P-G2 offers great value and will handle most gigs']
    ]);
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['and venues that need bulletproof reliability and pristine audio',
       'and venues that need dependable reliability and pristine audio']
    ]);
    g.sections[3].content = replaceInText(g.sections[3].content, [
      ['the QSC K12.2 is the industry standard for good reason',
       'the QSC K12.2 is the PA speaker most professionals choose, for good reason']
    ]);
    g.sections[3].content_es = replaceInText(g.sections[3].content_es, [
      ['el QSC K12.2 es el estándar de la industria por una buena razón',
       'el QSC K12.2 es el altavoz PA que eligen la mayoría de profesionales, y con razón']
    ]);

    // Conclusion - "incredible value"
    g.conclusion = replaceInText(g.conclusion, [
      ['offers incredible value for budget-conscious buyers',
       'is the better pick for budget-conscious buyers']
    ]);

    // featuredSnippet
    g.featuredSnippet.text_en = replaceInText(g.featuredSnippet.text_en, [
      ['delivering pro-level performance with Class-D power',
       'delivering consistent, reliable performance with Class-D power']
    ]);
  }
});

// Count fixes by scanning for remaining clichés (approximate)
const enCl = /workhorse|industry standard|benchmark|effortless(?:ly)?|hassle-free|incredible|unmatched|bulletproof|the beast|monster|king of the budget|ultimate weapon|second to none/gi;
const esCl = /caballo de batalla|todoterreno|estándar de la industria|sin esfuerzo|sin complicaciones|nivel profesional|imprescindible|máquina de|la bestia|monstruo de|no tiene rival|increíble|a prueba de balas|desbloquea|eleva tu|a otro nivel|el rey del presupuesto|arma definitiva|sin igual|el rey de/gi;

guides.forEach(g => {
  function countCl(obj) {
    if (typeof obj === 'string') {
      let m;
      enCl.lastIndex = 0;
      while ((m = enCl.exec(obj)) !== null) enFixes++;
      esCl.lastIndex = 0;
      while ((m = esCl.exec(obj)) !== null) esFixes++;
    } else if (Array.isArray(obj)) {
      obj.forEach(countCl);
    } else if (obj && typeof obj === 'object') {
      Object.values(obj).forEach(countCl);
    }
  }
  countCl(g);
});

// Write output in the same order the guides appear in guides.json
const orderSet = new Set(ids);
const output = data.filter(g => orderSet.has(g.id)).map(g => byId[g.id]);

fs.writeFileSync(
  'C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\_nat_chunk3.json',
  JSON.stringify(output, null, 2),
  'utf8'
);

console.log('Written ' + output.length + ' guides');
console.log('Remaining EN clichés (approx):', enFixes);
console.log('Remaining ES clichés (approx):', esFixes);
