const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

const g = guides.find(x => x.id === 'best-pa-speakers');

// Fix 1: ES "2000W" -> "1000W" (EN is correct)
// Fix 2: EN "2500W peak" -> "1000W peak"
// Fix 3: FAQ "1250W" -> "1000W" (EN+ES)
// Fix 5: ES "30 lb" -> "32.67 lb"

// Check sections
(g.sections || []).forEach(s => {
  if (s.content.includes('2000W')) {
    s.content = s.content.replace(/2000W/g, '1000W');
    fixes++;
    console.log('Fix 1 (EN section): 2000W -> 1000W');
  }
  if (s.content_es.includes('2000W')) {
    s.content_es = s.content_es.replace(/2000W/g, '1000W');
    fixes++;
    console.log('Fix 1 (ES section): 2000W -> 1000W');
  }
  if (s.content.includes('2500W')) {
    s.content = s.content.replace(/2500W/g, '1000W');
    fixes++;
    console.log('Fix 2 (EN section): 2500W -> 1000W');
  }
  if (s.content.includes('1250W')) {
    s.content = s.content.replace(/1250W/g, '1000W');
    fixes++;
    console.log('Fix 3 (EN section): 1250W -> 1000W');
  }
  if (s.content_es.includes('1250W')) {
    s.content_es = s.content_es.replace(/1250W/g, '1000W');
    fixes++;
    console.log('Fix 3 (ES section): 1250W -> 1000W');
  }
  if (s.content_es.includes('30 libras')) {
    s.content_es = s.content_es.replace(/30 libras/g, '32.67 libras');
    fixes++;
    console.log('Fix 5 (ES section): 30 libras -> 32.67 libras');
  }
  if (s.content_es.includes('30 lb')) {
    s.content_es = s.content_es.replace(/30 lb/g, '32.67 lb');
    fixes++;
    console.log('Fix 5 (ES section): 30 lb -> 32.67 lb');
  }
});

// Check pros/cons
(g.verdictProsCons || []).forEach(v => {
  v.pros = v.pros.map(p => {
    if (p.includes('2000W')) { fixes++; console.log('Fix 1 (EN pro): 2000W -> 1000W'); return p.replace(/2000W/g, '1000W'); }
    if (p.includes('2500W')) { fixes++; console.log('Fix 2 (EN pro): 2500W -> 1000W'); return p.replace(/2500W/g, '1000W'); }
    if (p.includes('1250W')) { fixes++; console.log('Fix 3 (EN pro): 1250W -> 1000W'); return p.replace(/1250W/g, '1000W'); }
    return p;
  });
  v.cons = v.cons.map(c => {
    if (c.includes('2000W')) { fixes++; console.log('Fix 1 (EN con): 2000W -> 1000W'); return c.replace(/2000W/g, '1000W'); }
    if (c.includes('2500W')) { fixes++; console.log('Fix 2 (EN con): 2500W -> 1000W'); return c.replace(/2500W/g, '1000W'); }
    if (c.includes('1250W')) { fixes++; console.log('Fix 3 (EN con): 1250W -> 1000W'); return c.replace(/1250W/g, '1000W'); }
    return c;
  });
  v.pros_es = v.pros_es.map(p => {
    if (p.includes('2000W')) { fixes++; console.log('Fix 1 (ES pro): 2000W -> 1000W'); return p.replace(/2000W/g, '1000W'); }
    if (p.includes('1250W')) { fixes++; console.log('Fix 3 (ES pro): 1250W -> 1000W'); return p.replace(/1250W/g, '1000W'); }
    if (p.includes('30 libras')) { fixes++; console.log('Fix 5 (ES pro): 30 libras -> 32.67 libras'); return p.replace(/30 libras/g, '32.67 libras'); }
    if (p.includes('30 lb')) { fixes++; console.log('Fix 5 (ES pro): 30 lb -> 32.67 lb'); return p.replace(/30 lb/g, '32.67 lb'); }
    return p;
  });
  v.cons_es = v.cons_es.map(c => {
    if (c.includes('2000W')) { fixes++; console.log('Fix 1 (ES con): 2000W -> 1000W'); return c.replace(/2000W/g, '1000W'); }
    if (c.includes('1250W')) { fixes++; console.log('Fix 3 (ES con): 1250W -> 1000W'); return c.replace(/1250W/g, '1000W'); }
    if (c.includes('30 libras')) { fixes++; console.log('Fix 5 (ES con): 30 libras -> 32.67 libras'); return c.replace(/30 libras/g, '32.67 libras'); }
    if (c.includes('30 lb')) { fixes++; console.log('Fix 5 (ES con): 30 lb -> 32.67 lb'); return c.replace(/30 lb/g, '32.67 lb'); }
    return c;
  });
});

// Check productTable
if (g.productTable && g.productTable.rows) {
  g.productTable.rows.forEach(r => {
    if (r.values) r.values.forEach(v => {
      if (v.value && v.value.includes('2000W')) {
        v.value = v.value.replace(/2000W/g, '1000W');
        fixes++;
        console.log('Fix 1 (table): 2000W -> 1000W');
      }
      if (v.value_es && v.value_es.includes('2000W')) {
        v.value_es = v.value_es.replace(/2000W/g, '1000W');
        fixes++;
        console.log('Fix 1 (table ES): 2000W -> 1000W');
      }
    });
  });
}

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Total fixes:', fixes);