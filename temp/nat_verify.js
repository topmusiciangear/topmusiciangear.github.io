const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json','utf8'));

const enCliches = /\b(workhorse|industry standard|benchmark|effortless(?:ly)?|hassle-free|pro-level|studio-grade|incredible|essential|unmatched|unrivaled|second to none|the beast|beast of|monster|king of the budget|unlock(?:s)?|holy grail|bulletproof|definitely|ultimate weapon)\b/gi;
const esCliches = /\b(caballo de batalla|todoterreno|est[aá]ndar de la industria|sin esfuerzo|sin complicaciones|nivel profesional|imprescindible|m[aá]quina de escenario|la bestia|bestia de|monstruo de|no tiene rival|incre[ií]ble|a prueba de balas|desbloquea|eleva tu|a otro nivel|el rey del presupuesto|arma definitiva|sin igual|el rey)\b/gi;

let enHits = 0, esHits = 0;

function scan(val, regex, lang) {
  if (typeof val !== 'string') return;
  let m;
  const r = new RegExp(regex.source, 'gi');
  while ((m = r.exec(val)) !== null) {
    const start = Math.max(0, m.index - 40);
    const end = Math.min(val.length, m.index + m[0].length + 40);
    console.log(lang + ': "' + m[0] + '" in ...' + val.substring(start, end).replace(/\n/g,' ') + '...');
    if (lang === 'EN') enHits++; else esHits++;
  }
}

for (const guide of g) {
  for (const k of ['intro','verdict','conclusion','description']) {
    scan(guide[k], enCliches, 'EN');
    scan(guide[k+'_es'], esCliches, 'ES');
  }
  if (guide.featuredSnippet) {
    for (const [k,v] of Object.entries(guide.featuredSnippet)) {
      if (typeof v === 'string') {
        scan(v, enCliches, 'EN');
        scan(v, esCliches, 'ES');
      }
    }
  }
  if (guide.sections) {
    for (let i=0;i<guide.sections.length;i++) {
      const s = guide.sections[i];
      scan(s.heading, enCliches, 'EN');
      scan(s.heading_es, esCliches, 'ES');
      scan(s.content, enCliches, 'EN');
      scan(s.content_es, esCliches, 'ES');
    }
  }
  if (guide.verdictProsCons) {
    for (const v of guide.verdictProsCons) {
      for (const k of ['name','pros','cons']) {
        scan(v[k], enCliches, 'EN');
        scan(v[k+'_es'], esCliches, 'ES');
      }
    }
  }
  if (guide.productTable) {
    if (guide.productTable.columns) {
      for (const c of guide.productTable.columns) {
        scan(c.title, enCliches, 'EN');
        scan(c.title_es, esCliches, 'ES');
      }
    }
    if (guide.productTable.rows) {
      for (const r of guide.productTable.rows) {
        if (r.values) {
          for (const v of r.values) {
            scan(v.value, enCliches, 'EN');
            scan(v.value_es, esCliches, 'ES');
          }
        }
      }
    }
  }
}

console.log('\nRemaining EN:', enHits, '| Remaining ES:', esHits);
