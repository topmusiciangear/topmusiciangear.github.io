const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

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
  if (!g) continue;
  
  const issues = [];
  
  // Gather all ES text
  const allEsText = [];
  if (g.sections) {
    for (const s of g.sections) {
      if (s.content_es) allEsText.push(s.content_es);
    }
  }
  if (g.verdictProsCons) {
    for (const vpc of g.verdictProsCons) {
      if (vpc.pros_es) allEsText.push(...vpc.pros_es);
      if (vpc.cons_es) allEsText.push(...vpc.cons_es);
    }
  }
  if (g.conclusion_es) allEsText.push(g.conclusion_es);
  if (g.verdict_es) allEsText.push(g.verdict_es);
  
  const esText = allEsText.join(' ');
  
  // CHECK 1: "previolificador" - calque of "preamp"
  if (esText.includes('previolificador')) {
    const matches = esText.match(/previolificador/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES calque: "previolificador" (literal translation of "preamp")', text: m, correct: 'previo / preamplificador', context: context.trim() });
      }
    }
  }
  
  // CHECK 2: "via Bluetooth" instead of "por Bluetooth"
  if (esText.includes('via Bluetooth')) {
    const matches = esText.match(/via Bluetooth/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES calque: "via" instead of "por"', text: m, correct: 'por Bluetooth', context: context.trim() });
      }
    }
  }
  
  // CHECK 3: "suena como" instead of "suena a"
  if (esText.includes('suena como')) {
    const matches = esText.match(/suena como\b/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES calque: "suena como" instead of "suena a"', text: m, correct: 'suena a ...', context: context.trim() });
      }
    }
  }
  
  // CHECK 4: "punto justo" instead of "punto ideal"
  if (esText.includes('punto justo')) {
    const matches = esText.match(/punto justo\b/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES calque: "punto justo" for "sweet spot"', text: m, correct: 'punto ideal', context: context.trim() });
      }
    }
  }
  
  // CHECK 5: "es el mejor para" instead of "es ideal para"
  if (esText.includes('es el mejor para')) {
    const matches = esText.match(/es el mejor para\b/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES calque: "es el mejor para" instead of "es ideal para"', text: m, correct: 'es ideal para', context: context.trim() });
      }
    }
  }
  
  // CHECK 6: "monitor-configuración" calque
  if (esText.includes('monitor-configuración')) {
    const matches = esText.match(/monitor-configuración/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 60), idx + m.length + 60);
        issues.push({ type: 'ES calque: "monitor-configuración"', text: m, correct: 'configuración de monitores', context: context.trim() });
      }
    }
  }
  
  // CHECK 7: "headphones" in Spanish text
  if (esText.includes('headphones')) {
    const matches = esText.match(/\bheadphones\b/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES: "headphones" used instead of "auriculares"', text: m, correct: 'auriculares', context: context.trim() });
      }
    }
  }
  
  // CHECK 8: "speakers" in Spanish text
  if (esText.includes('speakers')) {
    const matches = esText.match(/\bspeakers\b/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES: "speakers" used instead of "altavoces"', text: m, correct: 'altavoces', context: context.trim() });
      }
    }
  }
  
  // CHECK 9: "monitoring" in Spanish text
  if (esText.includes('monitoring')) {
    const matches = esText.match(/\bmonitoring\b/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES: "monitoring" used instead of "monitoreo"', text: m, correct: 'monitoreo', context: context.trim() });
      }
    }
  }
  
  // CHECK 10: "caballo de batalla" for "workhorse"
  if (esText.includes('caballo de batalla')) {
    const matches = esText.match(/caballo[s]? de batalla/g);
    if (matches) {
      for (const m of matches) {
        const idx = esText.indexOf(m);
        const context = esText.substring(Math.max(0, idx - 40), idx + m.length + 40);
        issues.push({ type: 'ES calque: "caballo de batalla" for "workhorse"', text: m, correct: 'herramienta fundamental / básico', context: context.trim() });
      }
    }
  }
  
  // Store results
  if (issues.length > 0) {
    results[id] = issues;
  }
}

// Print results
console.log('=== AUDIT RESULTS (ROUND 2) ===\n');
let totalIssues = 0;
for (const [id, issues] of Object.entries(results)) {
  console.log(`\n### ${id} ### (${issues.length} issues)`);
  for (const issue of issues) {
    console.log(`  [${issue.type}]`);
    if (issue.text) console.log(`    Text: "${issue.text}"`);
    if (issue.correct) console.log(`    Should be: "${issue.correct}"`);
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
