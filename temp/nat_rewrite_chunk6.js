const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('temp/chunk6_raw.json', 'utf8'));

function replaceAll(text, search, replacement) {
  if (!text) return text;
  return text.split(search).join(replacement);
}

for (const g of guides) {

  // === american-pro-vs-les-paul ===
  if (g.id === 'american-pro-vs-les-paul') {
    g.sections[0].content = replaceAll(g.sections[0].content, 'effortless upper-fret access', 'easy upper-fret access');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'acceso sin esfuerzo a los trastes superiores', 'acceso cómodo a los trastes superiores');
    g.sections[1].content = replaceAll(g.sections[1].content, 'provides incredible sustain and resonance', 'gives you the kind of sustain and resonance');
    g.sections[1].content_es = replaceAll(g.sections[1].content_es, 'proporciona un sustain y una resonancia notables', 'da un sustain y una resonancia que los atornillados no igualan');
  }

  // === beginner-bass-guitars ===
  if (g.id === 'beginner-bass-guitars') {
    g.sections[0].content = replaceAll(g.sections[0].content, 'the industry standard for a reason', 'the reference point for a reason');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'el estándar de la industria por una razón', 'el punto de referencia por una razón');
    g.sections[1].content = replaceAll(g.sections[1].content, 'offers incredible versatility', 'is a versatile bass with');
    g.sections[1].content_es = replaceAll(g.sections[1].content_es, 'ofrece una versatilidad increíble', 'es un bajo versátil con');
    g.verdictProsCons[1].pros = g.verdictProsCons[1].pros.map(p => replaceAll(p, 'pro-level resonance', 'real, present resonance'));
    if (g.featuredSnippet && g.featuredSnippet.text_en) {
      g.featuredSnippet.text_en = replaceAll(g.featuredSnippet.text_en, 'incredible versatility', 'versatility');
    }
    if (g.featuredSnippet && g.featuredSnippet.text_es) {
      g.featuredSnippet.text_es = replaceAll(g.featuredSnippet.text_es, 'una versatilidad increíble', 'una versatilidad notable');
    }
  }

  // === best-bass-practice-amps ===
  if (g.id === 'best-bass-practice-amps') {
    g.intro = replaceAll(g.intro, 'pro-grade sound at bedroom levels', 'real bass tone at bedroom levels');
    g.intro_es = replaceAll(g.intro_es, 'sonido de nivel profesional a volúmenes de dormitorio', 'sonido de calidad a volúmenes de dormitorio');
    g.sections[0].content = replaceAll(g.sections[0].content, 'The Fender Rumble 40 V3 is the all-round standard', 'The Fender Rumble 40 V3 is what most bassists start with');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'El Fender Rumble 40 V3 es el estándar todoterreno', 'El Fender Rumble 40 V3 es lo que la mayoría de bajistas elige');
    g.sections[6].content = replaceAll(g.sections[6].content, 'studio-grade low end', 'studio-quality low end');
    g.sections[6].content_es = replaceAll(g.sections[6].content_es, 'tono de nivel profesional que sigue siendo musical', 'tono de calidad de estudio que sigue siendo musical');
    g.sections[6].content = replaceAll(g.sections[6].content, 'Premium studio-grade tone', 'Real studio tone');
    g.sections[6].content_es = replaceAll(g.sections[6].content_es, 'Tono premium de nivel estudio', 'Tono de calidad de estudio');
    g.verdict = replaceAll(g.verdict, 'studio-grade tone at low volume', 'studio-quality tone at low volume');
    g.verdict_es = replaceAll(g.verdict_es, 'tono premium de nivel estudio a bajo volumen', 'tono de calidad de estudio a bajo volumen');
    g.conclusion_es = replaceAll(g.conclusion_es, 'el mejor combo de bajo para practicar todoterreno', 'el mejor combo de bajo para practicar sin dramas');
    if (g.featuredSnippet && g.featuredSnippet.key1_es) {
      g.featuredSnippet.key1_es = replaceAll(g.featuredSnippet.key1_es, 'mejor combo de bajo para practicar todoterreno', 'mejor combo de bajo para practicar sin dramas');
    }
    if (g.featuredSnippet && g.featuredSnippet.text_es) {
      g.featuredSnippet.text_es = replaceAll(g.featuredSnippet.text_es, 'el mejor combo de bajo para practicar todoterreno', 'el mejor combo de bajo para practicar sin dramas');
    }
    if (g.featuredSnippet && g.featuredSnippet.faq_a4_es) {
      g.featuredSnippet.faq_a4_es = replaceAll(g.featuredSnippet.faq_a4_es, 'el mejor combo de bajo para practicar todoterreno', 'el mejor combo de bajo para practicar sin dramas');
    }
    g.verdictProsCons[5].pros = g.verdictProsCons[5].pros.map(p => replaceAll(p, 'Studio-grade Microtubes tone', 'Real Microtubes tone'));
  }

  // === best-digital-mixers ===
  if (g.id === 'best-digital-mixers') {
    g.sections[0].content = replaceAll(g.sections[0].content, 'offer incredible value', 'deliver great value');
    g.sections[0].content = replaceAll(g.sections[0].content, 'incredible value', 'great value');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'una relación calidad-precio excelente', 'una relación calidad-precio muy buena');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'relación calidad-precio excelente', 'relación calidad-precio muy buena');
    g.verdict_es = replaceAll(g.verdict_es, 'directo profesional', 'directo de nivel serio');
  }

  // === best-hardware-samplers ===
  if (g.id === 'best-hardware-samplers') {
    if (g.conclusion_es && g.conclusion_es.includes('máquina de')) {
      g.conclusion_es = replaceAll(g.conclusion_es, 'máquina de diseño sonoro', 'herramienta de diseño sonoro');
    }
    if (g.sections[4] && g.sections[4].content_es && g.sections[4].content_es.includes('máquina de')) {
      g.sections[4].content_es = replaceAll(g.sections[4].content_es, 'la máquina de diseño sonoro más profunda', 'la herramienta más profunda para diseñar sonido');
    }
  }

  // === best-keyboard ===
  // No clichés to fix (Arturia KeyLab Essential is a product name)

  // === best-monitors ===
  if (g.id === 'best-monitors') {
    g.sections[4].content = replaceAll(g.sections[4].content, 'the industry standard for mixing', 'the reference for mixing');
    g.sections[4].content_es = replaceAll(g.sections[4].content_es, 'el estándar de la industria para mezcla', 'la referencia para mezcla');
    g.conclusion = replaceAll(g.conclusion, 'the straightforward industry standard', 'the straightforward reference');
    g.conclusion_es = replaceAll(g.conclusion_es, 'el estándar de la industria brutalmente honesto', 'la referencia honesta y directa');
    if (g.verdictProsCons) {
      for (const v of g.verdictProsCons) {
        if (v.pros_es) {
          v.pros_es = v.pros_es.map(p => replaceAll(p, 'de estándar de la industria', 'de referencia'));
        }
      }
    }
  }

  // === best-plugins ===
  if (g.id === 'best-plugins') {
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_en) {
      g.featuredSnippet.faq_a1_en = replaceAll(g.featuredSnippet.faq_a1_en, 'the industry benchmark for', 'the reference for');
    }
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_es) {
      g.featuredSnippet.faq_a1_es = replaceAll(g.featuredSnippet.faq_a1_es, 'el estándar de la industria en', 'la referencia en');
      g.featuredSnippet.faq_a1_es = replaceAll(g.featuredSnippet.faq_a1_es, 'su interfaz visual no tiene rival', 'su interfaz visual es difícil de superar');
    }
  }

  // === best-synthesizers ===
  if (g.id === 'best-synthesizers') {
    g.sections[1].content = replaceAll(g.sections[1].content, 'incredible 8-operator FM synthesis', 'powerful 8-operator FM synthesis');
    g.sections[1].content_es = replaceAll(g.sections[1].content_es, 'una notable síntesis FM de 8 operadores', 'una síntesis FM de 8 operadores muy completa');
    g.verdict = replaceAll(g.verdict, 'the bass and lead monster', 'the king of bass and lead sounds');
    g.verdict_es = replaceAll(g.verdict_es, 'el monstruo de bajos y leads', 'el rey de bajos y leads');
  }

  // === budget-pa-systems ===
  if (g.id === 'budget-pa-systems') {
    if (g.sections[2]) {
      g.sections[2].content_es = replaceAll(g.sections[2].content_es, 'imagen de nivel profesional', 'imagen de calidad de estudio');
    }
    if (g.sections[4]) {
      g.sections[4].content_es = replaceAll(g.sections[4].content_es, 'sonido de nivel profesional', 'sonido de calidad');
    }
    if (g.featuredSnippet && g.featuredSnippet.faq_a4_es) {
      g.featuredSnippet.faq_a4_es = replaceAll(g.featuredSnippet.faq_a4_es, 'un sistema de nivel profesional', 'un sistema con calidad de estudio');
    }
  }

  // === digitakt-ii-vs-tr8s ===
  if (g.id === 'digitakt-ii-vs-tr8s') {
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'el más potente en cualquier máquina de batería', 'el más potente que hemos visto en una caja de ritmos');
    g.sections[1].content_es = replaceAll(g.sections[1].content_es, 'la máquina de batería más intuitiva e inspiradora', 'la caja de ritmos más intuitiva e inspiradora');
    g.sections[2].content_es = replaceAll(g.sections[2].content_es, 'no tiene rival para crear beats', 'es difícil de superar para crear beats');
  }

  // === fender-guide ===
  if (g.id === 'fender-guide') {
    g.verdict = replaceAll(g.verdict, 'the Latin music workhorse', 'the backbone of Latin music');
    g.verdict_es = replaceAll(g.verdict_es, 'la bestia de carga de la música latina', 'la columna vertebral de la música latina');
    g.sections[3].content = replaceAll(g.sections[3].content, 'is incredibly comfortable for long playing sessions', 'is really comfortable for long sessions');
    g.sections[3].content_es = replaceAll(g.sections[3].content_es, 'es notablemente cómodo para sesiones largas', 'es muy cómodo para sesiones largas');
    g.conclusion = replaceAll(g.conclusion, 'a Telecaster is essential', 'you want a Telecaster');
    g.conclusion_es = replaceAll(g.conclusion_es, 'una Telecaster es esencial', 'una Telecaster no puede faltar');
  }

  // === j48-vs-rndi ===
  if (g.id === 'j48-vs-rndi') {
    g.intro = replaceAll(g.intro, 'One is the industry workhorse', 'One is the go-to choice');
    g.intro_es = replaceAll(g.intro_es, 'Una es el caballo de batalla de la industria', 'Una es la opción que usa la gente');
    g.verdict = 'The J48 is the transparent, reliable pick for live and studio — it does its job without color. The RNDI is the premium choice for players who want their DI signal to sound rich and finished straight out of the box.';
    g.verdict_es = 'El J48 es la opción transparente y fiable para vivo y estudio — hace su trabajo sin color. El RNDI es la opción premium para músicos que quieren que su señal DI suene rica y lista directo de la caja.';
    g.sections[4].content = replaceAll(g.sections[4].content, 'the industry standard for a reason', 'the standard for a reason');
    g.sections[4].content_es = replaceAll(g.sections[4].content_es, 'Es el estándar de la industria por una razón', 'Es el punto de referencia por una razón');
    g.conclusion = replaceAll(g.conclusion, 'The J48 is the reliable workhorse', 'The J48 is the reliable pick');
    g.conclusion_es = replaceAll(g.conclusion_es, 'El J48 es el caballo de batalla confiable', 'El J48 es la opción fiable');
    g.description = replaceAll(g.description, 'the transparent industry workhorse', 'the transparent, reliable choice');
    g.description_es = replaceAll(g.description_es, 'el caballo de batalla transparente de la industria', 'la opción transparente y fiable');
    if (g.verdictProsCons[0].pros) {
      g.verdictProsCons[0].pros = g.verdictProsCons[0].pros.map(p => replaceAll(p, 'industry workhorse', 'go-to choice'));
    }
    if (g.verdictProsCons[0].pros_es) {
      g.verdictProsCons[0].pros_es = g.verdictProsCons[0].pros_es.map(p => replaceAll(p, 'caballo de batalla', 'la opción'));
    }
  }

  // === martin-d28-vs-taylor-314 ===
  if (g.id === 'martin-d28-vs-taylor-314') {
    g.sections[0].content = replaceAll(g.sections[0].content, 'the benchmark for acoustic guitars since 1931', 'the reference for acoustic guitars since 1931');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'el punto de referencia para guitarras acústicas desde 1931', 'la referencia para guitarras acústicas desde 1931');
  }

  // === nord-stage-4-vs-montage-m8x ===
  if (g.id === 'nord-stage-4-vs-montage-m8x') {
    g.sections[1].content = replaceAll(g.sections[1].content, 'incredible 8-operator FM synthesis', 'powerful 8-operator FM synthesis');
    g.sections[1].content_es = replaceAll(g.sections[1].content_es, 'una notable síntesis FM de 8 operadores', 'una síntesis FM de 8 operadores muy completa');
    g.sections[2].content = replaceAll(g.sections[2].content, 'excels as a sound design powerhouse', 'excels as a sound design machine');
    g.sections[2].content_es = replaceAll(g.sections[2].content_es, 'destaca como una bestia del diseño sonoro', 'destaca como una herramienta seria de diseño sonoro');
    g.sections[2].content_es = replaceAll(g.sections[2].content_es, 'no tiene rival', 'es difícil de igualar');
    g.verdict_es = replaceAll(g.verdict_es, 'el monstruo de bajos y leads', 'el rey de bajos y leads');
  }

  // === pro-drum-machines ===
  if (g.id === 'pro-drum-machines') {
    g.verdict_es = replaceAll(g.verdict_es, 'la máquina de diseño sonoro profundo', 'la herramienta de diseño sonoro profundo');
  }

  // === pro-mixers ===
  if (g.id === 'pro-mixers') {
    g.sections[0].content = replaceAll(g.sections[0].content, 'the M32R LIVE is the benchmark', 'the M32R LIVE is the reference');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'la M32R LIVE es la referencia de Midas', 'la M32R LIVE hereda esa referencia');
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_en) {
      g.featuredSnippet.faq_a1_en = replaceAll(g.featuredSnippet.faq_a1_en, 'the industry standard', 'the reference');
    }
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_es) {
      g.featuredSnippet.faq_a1_es = replaceAll(g.featuredSnippet.faq_a1_es, 'el estándar de la industria', 'la referencia');
    }
    if (g.verdictProsCons) {
      for (const v of g.verdictProsCons) {
        if (v.pros_es) {
          v.pros_es = v.pros_es.map(p => replaceAll(p, 'estándar de la industria', 'referencia'));
        }
      }
    }
  }

  // === rme-vs-motu ===
  if (g.id === 'rme-vs-motu') {
    g.sections[0].content = replaceAll(g.sections[0].content, 'the industry standard for', 'the reference for');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'el estándar de la industria en', 'la referencia en');
    g.sections[2].content = replaceAll(g.sections[2].content, 'the industry benchmark', 'the reference implementation');
    g.sections[2].content_es = replaceAll(g.sections[2].content_es, 'la referencia de la industria', 'la implementación de referencia');
    g.verdict = replaceAll(g.verdict, 'the incredible value option', 'the great value option');
    g.verdict_es = replaceAll(g.verdict_es, 'la opción de valor increíble', 'la opción con una relación calidad-precio muy buena');
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_es) {
      g.featuredSnippet.faq_a1_es = replaceAll(g.featuredSnippet.faq_a1_es, 'la mejor compra económica', 'la mejor opción económica');
    }
  }

  // === sm7b-vs-nt1 ===
  if (g.id === 'sm7b-vs-nt1') {
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_es) {
      g.featuredSnippet.faq_a1_es = replaceAll(g.featuredSnippet.faq_a1_es, 'sin esfuerzo', 'sin problemas');
    }
  }

  // === streaming-interfaces ===
  if (g.id === 'streaming-interfaces') {
    if (g.sections[3]) {
      g.sections[3].content = replaceAll(g.sections[3].content, 'is the budget interface that keeps surprising me', 'keeps punching above its weight');
      g.sections[3].content_es = replaceAll(g.sections[3].content_es, 'es la interfaz económica que no deja de sorprender', 'sigue demostrando que se puede calidad por poco');
    }
  }

  // === wireless-lapel-mics ===
  if (g.id === 'wireless-lapel-mics') {
    g.verdict_es = replaceAll(g.verdict_es, 'el mejor todoterreno', 'el más completo');
    g.sections[1].heading_es = replaceAll(g.sections[1].heading_es, 'el mejor todoterreno', 'el más completo');
  }

  // === PASS 2: remaining fixes (corrected targets) ===

  // beginner-bass-guitars: pro-level resonance in featuredSnippet.text_en
  if (g.id === 'beginner-bass-guitars') {
    if (g.featuredSnippet && g.featuredSnippet.text_en) {
      g.featuredSnippet.text_en = replaceAll(g.featuredSnippet.text_en, 'and pro-level resonance at', 'and real, present resonance at');
    }
    if (g.featuredSnippet && g.featuredSnippet.text_es) {
      g.featuredSnippet.text_es = replaceAll(g.featuredSnippet.text_es, 'y calidad profesional con', 'y calidad de sonido seria con');
    }
  }

  // best-bass-practice-amps: remaining studio-grade, todoterreno, nivel profesional
  if (g.id === 'best-bass-practice-amps') {
    g.intro_es = replaceAll(g.intro_es, 'el mejor combo todoterreno para casa y ensayos', 'el mejor combo para casa y ensayos');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'ofrece tono de nivel profesional que sigue siendo musical a bajo volumen', 'ofrece un tono de calidad de estudio que sigue siendo musical a bajo volumen');
    g.sections[0].content_es = replaceAll(g.sections[0].content_es, 'tono de nivel profesional que sigue siendo musical', 'tono de calidad de estudio que sigue siendo musical');
    g.conclusion = replaceAll(g.conclusion, 'premium studio-grade tone at low volume', 'real studio-quality tone at low volume');
    g.conclusion = replaceAll(g.conclusion, 'studio-grade tone at low volume', 'studio-quality tone at low volume');
    g.verdict_es = replaceAll(g.verdict_es, 'la mejor opción todoterreno', 'la opción más completa');
    if (g.productTable && g.productTable.rows && g.productTable.rows[0] && g.productTable.rows[0].values) {
      for (const v of g.productTable.rows[0].values) {
        if (v.value) v.value = replaceAll(v.value, 'Premium studio-grade tone', 'Real studio tone');
        if (v.value_es) v.value_es = replaceAll(v.value_es, 'Tono premium de nivel estudio', 'Tono de calidad de estudio');
      }
    }
  }

  // best-monitors: nivel profesional in conclusion_es
  if (g.id === 'best-monitors') {
    g.conclusion_es = replaceAll(g.conclusion_es, 'imagen de nivel profesional', 'imagen de calidad de estudio');
  }

  // best-plugins: industry standard in featuredSnippet.faq_a4
  if (g.id === 'best-plugins') {
    if (g.featuredSnippet && g.featuredSnippet.faq_a4_en) {
      g.featuredSnippet.faq_a4_en = replaceAll(g.featuredSnippet.faq_a4_en, 'it is the industry standard', 'it is the reference');
    }
    if (g.featuredSnippet && g.featuredSnippet.faq_a4_es) {
      g.featuredSnippet.faq_a4_es = replaceAll(g.featuredSnippet.faq_a4_es, 'es el estándar de la industria', 'es la referencia');
    }
  }

  // best-synthesizers: benchmark in SEC2 (Moog), incredible precision in SEC3 (Montage)
  if (g.id === 'best-synthesizers') {
    g.sections[2].content = replaceAll(g.sections[2].content, "It's the benchmark for analog bass and lead synthesis", "It's the go-to for analog bass and lead sounds");
    g.sections[3].content = replaceAll(g.sections[3].content, 'incredible precision', 'serious precision');
  }

  // digitakt-ii-vs-tr8s: incredible value in SEC3
  if (g.id === 'digitakt-ii-vs-tr8s') {
    g.sections[3].content = replaceAll(g.sections[3].content, 'incredible value and inspiration', 'great value and inspiration');
    g.sections[3].content_es = replaceAll(g.sections[3].content_es, 'increíble valor e inspiración', 'gran valor e inspiración');
  }

  // j48-vs-rndi: workhorse in featuredSnippet.key1
  if (g.id === 'j48-vs-rndi') {
    if (g.featuredSnippet && g.featuredSnippet.key1) {
      g.featuredSnippet.key1 = replaceAll(g.featuredSnippet.key1, 'The Transparent Industry Workhorse', 'The Transparent Go-To DI');
      g.featuredSnippet.key1 = replaceAll(g.featuredSnippet.key1, 'Workhorse', 'Go-To DI');
    }
  }

  // pro-mixers: benchmark in conclusion
  if (g.id === 'pro-mixers') {
    g.conclusion = replaceAll(g.conclusion, 'the M32R LIVE is the benchmark', 'the M32R LIVE is the reference');
    if (g.conclusion_es) {
      g.conclusion_es = replaceAll(g.conclusion_es, 'la M32R LIVE es la referencia', 'la M32R LIVE es la referencia');
    }
  }

  // rme-vs-motu: nivel profesional in featuredSnippet.faq_a1_es
  if (g.id === 'rme-vs-motu') {
    if (g.featuredSnippet && g.featuredSnippet.faq_a1_es) {
      g.featuredSnippet.faq_a1_es = replaceAll(g.featuredSnippet.faq_a1_es, 'estabilidad de drivers de nivel profesional', 'estabilidad de drivers de calidad profesional');
    }
  }

  // sm7b-vs-nt1: studio-grade SM6 shock mount in verdictProsCons
  if (g.id === 'sm7b-vs-nt1') {
    if (g.verdictProsCons && g.verdictProsCons[1] && g.verdictProsCons[1].pros) {
      g.verdictProsCons[1].pros = g.verdictProsCons[1].pros.map(p => replaceAll(p, 'Includes studio-grade SM6 shock mount', 'Includes the SM6 shock mount'));
    }
    if (g.verdictProsCons && g.verdictProsCons[1] && g.verdictProsCons[1].pros_es) {
      g.verdictProsCons[1].pros_es = g.verdictProsCons[1].pros_es.map(p => replaceAll(p, 'Incluye soporte antigolpes SM6 de nivel estudio', 'Incluye el soporte antigolpes SM6'));
    }
  }

  // streaming-interfaces: sin complicaciones in SEC3 content_es
  if (g.id === 'streaming-interfaces') {
    if (g.sections[3]) {
      g.sections[3].content_es = replaceAll(g.sections[3].content_es, 'compacta y sin complicaciones', 'compacta y sencilla');
    }
  }
}

fs.writeFileSync('temp/_nat_chunk6.json', JSON.stringify(guides, null, 2));
console.log('Written', guides.length, 'guides');
console.log('Size:', fs.statSync('temp/_nat_chunk6.json').size);
