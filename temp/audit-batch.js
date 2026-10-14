const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(path, 'utf8'));

const batchIds = [
  'starter-studio', 'best-interface', 'best-headphones', 'best-microphone',
  'best-monitors', 'best-plugins', 'budget-mics', 'usb-mics', 'stage-mics',
  'portable-interfaces', 'open-headphones', 'budget-headphones',
  'tracking-headphones', 'budget-monitors', 'monitor-setup', 'mixing-plugins',
  'fx-plugins', 'midi-controllers', 'studio-furniture', 'best-condenser-mics',
  'studio-subwoofers', 'channel-strip-plugins', 'fender-guide',
  'guitar-bass-amps', 'stage-wireless', 'guitar-pedals',
  'acoustic-guitars-guide', 'live-sound-pa', 'daw-guide', 'budget-interfaces',
  'vocal-plugins', 'beginner-guitar', 'sm57-vs-sm58', 'scarlett-vs-ssl',
  'dt770-vs-dt990', 'hs8-vs-rokit-7', 'm50x-vs-mdr7506',
  'best-electric-guitar', 'best-keyboard', 'best-drum-machine',
  'apollo-vs-babyface', 'scarlett-vs-volt', 'audient-vs-motu'
];

const results = {};

for (const id of batchIds) {
  const g = guides.find(x => x.id === id);
  if (!g) {
    results[id] = [{ error: 'NOT FOUND' }];
    continue;
  }
  
  const issues = [];
  const esTexts = [];
  const enTexts = [];
  
  // Check sections
  if (g.sections) {
    for (const s of g.sections) {
      if (s.content_es) esTexts.push(s.content_es);
      if (s.content) enTexts.push(s.content);
    }
  }
  
  // Check pros/cons ES
  if (g.verdictProsCons) {
    for (const vpc of g.verdictProsCons) {
      if (vpc.pros_es) esTexts.push(...vpc.pros_es);
      if (vpc.cons_es) esTexts.push(...vpc.cons_es);
      if (vpc.pros) enTexts.push(...vpc.pros);
      if (vpc.cons) enTexts.push(...vpc.cons);
    }
  }
  
  // Check conclusion
  if (g.conclusion_es) esTexts.push(g.conclusion_es);
  if (g.conclusion) enTexts.push(g.conclusion);
  
  // Check verdict
  if (g.verdict_es) esTexts.push(g.verdict_es);
  if (g.verdict) enTexts.push(g.verdict);
  
  // Check productTable ES values
  if (g.productTable) {
    for (const row of g.productTable.rows || []) {
      if (row.label_es) esTexts.push(row.label_es);
      for (const v of row.values || []) {
        if (v.value_es) esTexts.push(v.value_es);
      }
    }
  }
  
  // Check FAQ ES
  if (g.featuredSnippet) {
    for (let i = 1; i <= 6; i++) {
      const q = g.featuredSnippet[`faq_q${i}_es`];
      const a = g.featuredSnippet[`faq_a${i}_es`];
      if (q) esTexts.push(q);
      if (a) esTexts.push(a);
    }
  }
  
  const allEs = esTexts.join(' ');
  
  // CHECK 1: Missing accents
  const accentChecks = [
    { pattern: /funcion\b/g, correct: 'función' },
    { pattern: /opcion\b/g, correct: 'opción' },
    { pattern: /configuracion\b/g, correct: 'configuración' },
    { pattern: /grabacion\b/g, correct: 'grabación' },
    { pattern: /tambien\b/g, correct: 'también' },
    { pattern: /microfono\b/g, correct: 'micrófono' },
    { pattern: /descripcion\b/g, correct: 'descripción' },
    { pattern: /solucion\b/g, correct: 'solución' },
    { pattern: /version\b/g, correct: 'versión' },
    { pattern: /razon\b/g, correct: 'razón' },
    { pattern: /aplicacion\b/g, correct: 'aplicación' },
    { pattern: /seleccion\b/g, correct: 'selección' },
    { pattern: /cancelacion\b/g, correct: 'cancelación' },
    { pattern: /informacion\b/g, correct: 'información' },
    { pattern: /conexion\b/g, correct: 'conexión' },
    { pattern: /condicion\b/g, correct: 'condición' },
    { pattern: /transmision\b/g, correct: 'transmisión' },
    { pattern: /poblacion\b/g, correct: 'población' },
    { pattern: /amplificacion\b/g, correct: 'amplificación' },
    { pattern: /organizacion\b/g, correct: 'organización' },
    { pattern: /comparacion\b/g, correct: 'comparación' },
    { pattern: /proteccion\b/g, correct: 'protección' },
    { pattern: /recomendacion\b/g, correct: 'recomendación' },
  ];
  
  for (const check of accentChecks) {
    const matches = allEs.match(check.pattern);
    if (matches) {
      for (const m of matches) {
        const idx = allEs.indexOf(m);
        const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({
          type: 'ES missing accent',
          word: m,
          correct: check.correct,
          context: context.trim()
        });
      }
    }
  }
  
  // CHECK 2: "via Bluetooth" instead of "por Bluetooth"
  const viaMatches = allEs.match(/via Bluetooth/g);
  if (viaMatches) {
    for (const m of viaMatches) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES calque: "via" instead of "por"',
        text: m,
        correct: 'por Bluetooth',
        context: context.trim()
      });
    }
  }
  
  // CHECK 3: "suena como" instead of "suena a"
  const suenaComo = allEs.match(/suena como\b/g);
  if (suenaComo) {
    for (const m of suenaComo) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES calque: "suena como" instead of "suena a"',
        text: m,
        correct: 'suena a ...',
        context: context.trim()
      });
    }
  }
  
  // CHECK 4: "punto justo" instead of "punto ideal"
  const puntoJusto = allEs.match(/punto justo\b/g);
  if (puntoJusto) {
    for (const m of puntoJusto) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES calque: "punto justo" for "sweet spot"',
        text: m,
        correct: 'punto ideal',
        context: context.trim()
      });
    }
  }
  
  // CHECK 5: "es el mejor para" instead of "es ideal para"
  const esMejorPara = allEs.match(/es el mejor para\b/g);
  if (esMejorPara) {
    for (const m of esMejorPara) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES calque: "es el mejor para" instead of "es ideal para"',
        text: m,
        correct: 'es ideal para',
        context: context.trim()
      });
    }
  }
  
  // CHECK 6: "monitor-configuración" calque
  const monitorConfig = allEs.match(/monitor-configuraci[óo]n/g);
  if (monitorConfig) {
    for (const m of monitorConfig) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 60), idx + m.length + 60);
      issues.push({
        type: 'ES calque: "monitor-configuración"',
        text: m,
        correct: 'configuración de monitores',
        context: context.trim()
      });
    }
  }
  
  // CHECK 7: "previolificadores" - calque of "preamp"
  const previolificadores = allEs.match(/previolificador/g);
  if (previolificadores) {
    for (const m of previolificadores) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES calque: "previolificador" (literal translation of "preamp")',
        text: m,
        correct: 'previo / preamplificador',
        context: context.trim()
      });
    }
  }
  
  // CHECK 8: "set" used as a verb in Spanish
  const setVerb = allEs.match(/\bset\b/gi);
  if (setVerb) {
    for (const m of setVerb) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      // Only flag if it looks like a verb usage
      if (context.includes('the set') || context.includes('to set') || context.includes('set the') || context.includes('set up')) {
        issues.push({
          type: 'ES: "set" used as English loanword',
          text: m,
          correct: 'ajustar/configurar',
          context: context.trim()
        });
      }
    }
  }
  
  // CHECK 9: Check for spec mismatches in pros/cons between EN and ES
  // Look for numbers/specs that differ
  if (g.verdictProsCons) {
    for (const vpc of g.verdictProsCons) {
      if (vpc.pros && vpc.pros_es) {
        // Extract numbers from EN pros
        const enNums = vpc.pros.join(' ').match(/\d+[\.,]?\d*\s*(dB|Hz|kHz|ohm|ohms|Ω|mm|cm|g|kg|W|V|bit|bit)/g) || [];
        const esNums = vpc.pros_es.join(' ').match(/\d+[\.,]?\d*\s*(dB|Hz|kHz|ohm|ohms|Ω|mm|cm|g|kg|W|V|bit|bit)/g) || [];
        
        if (enNums.length > 0 && esNums.length > 0) {
          // Simple comparison - check if key specs match
          for (const enNum of enNums) {
            const enVal = enNum.replace(/\s/g, '');
            const esEquivalent = esNums.some(es => {
              const esVal = es.replace(/\s/g, '');
              return esVal === enVal || esVal.includes(enVal) || enVal.includes(esVal);
            });
            if (!esEquivalent) {
              // Check if it's a real mismatch or just different units/format
              const enParsed = parseFloat(enNum);
              const esMatch = esNums.find(es => Math.abs(parseFloat(es) - enParsed) < 1);
              if (!esMatch) {
                issues.push({
                  type: 'Possible spec mismatch EN vs ES',
                  text: `EN: "${enNum}"`,
                  correct: `ES equivalent not found. ES specs: ${esNums.join(', ')}`,
                  context: vpc.name
                });
              }
            }
          }
        }
      }
    }
  }
  
  // CHECK 10: Check for verdict/conclusion contradictions
  // This is harder to automate, but we can check for obvious issues
  
  // CHECK 11: Check for "CD" vs "CD" - skip, style choice
  
  // CHECK 12: Check for "caja" used for "box" (as in device) - this is correct in ES
  
  // CHECK 13: Check for "caballo de batalla" (literal "horse of battle" for "workhorse")
  const workhorse = allEs.match(/caballo[s]? de batalla/g);
  if (workhorse) {
    for (const m of workhorse) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES calque: "caballo de batalla" for "workhorse"',
        text: m,
        correct: 'herramienta fundamental / básico',
        context: context.trim()
      });
    }
  }
  
  // CHECK 14: Check for "a un DAW" - this is actually correct
  
  // CHECK 15: Check for "setup" used as a loanword (acceptable in ES but note it)
  const setupUsage = allEs.match(/\bsetup\b/g);
  if (setupUsage) {
    // This is acceptable in modern Spanish, skip
  }
  
  // CHECK 16: Check for "software" - acceptable in Spanish
  
  // CHECK 17: Check for "headphones" in Spanish text (should be "auriculares")
  const headphonesInEs = allEs.match(/\bheadphones\b/g);
  if (headphonesInEs) {
    for (const m of headphonesInEs) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES: "headphones" used instead of "auriculares"',
        text: m,
        correct: 'auriculares',
        context: context.trim()
      });
    }
  }
  
  // CHECK 18: Check for "speakers" in Spanish text (should be "altavoces")
  const speakersInEs = allEs.match(/\bspeakers\b/g);
  if (speakersInEs) {
    for (const m of speakersInEs) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES: "speakers" used instead of "altavoces"',
        text: m,
        correct: 'altavoces',
        context: context.trim()
      });
    }
  }
  
  // CHECK 19: Check for "spot" in Spanish (should be "punto" or stay as loanword)
  // Skip - "spot" is used in Spanish music context
  
  // CHECK 20: Check for "monitoring" in Spanish (should be "monitoreo")
  const monitoringInEs = allEs.match(/\bmonitoring\b/g);
  if (monitoringInEs) {
    for (const m of monitoringInEs) {
      const idx = allEs.indexOf(m);
      const context = allEs.substring(Math.max(0, idx - 40), idx + m.length + 40);
      issues.push({
        type: 'ES: "monitoring" used instead of "monitoreo"',
        text: m,
        correct: 'monitoreo',
        context: context.trim()
      });
    }
  }
  
  // Store results
  if (issues.length > 0) {
    results[id] = issues;
  }
}

// Print results
console.log('=== AUDIT RESULTS ===\n');
let totalIssues = 0;
for (const [id, issues] of Object.entries(results)) {
  if (issues[0] && issues[0].error) {
    console.log(`\n### ${id} ### ERROR: ${issues[0].error}`);
    continue;
  }
  console.log(`\n### ${id} ### (${issues.length} issues)`);
  for (const issue of issues) {
    console.log(`  [${issue.type}]`);
    if (issue.word) console.log(`    Word: "${issue.word}" -> should be "${issue.correct}"`);
    if (issue.text) console.log(`    Text: "${issue.text}" -> should be "${issue.correct}"`);
    if (issue.context) console.log(`    Context: "...${issue.context}..."`);
    console.log('');
    totalIssues++;
  }
}

console.log(`\n=== TOTAL: ${totalIssues} issues across ${Object.keys(results).length} guides ===`);

console.log('\n=== GUIDES WITH NO ISSUES ===');
for (const id of batchIds) {
  if (!results[id]) {
    console.log(`  ${id}`);
  }
}
