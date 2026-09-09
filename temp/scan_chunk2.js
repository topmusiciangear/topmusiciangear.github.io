const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const ids = ['ableton-vs-logic','atc-vs-genelec','best-32-channel-digital-mixers','best-beginner-electric-guitar','best-drum-machine','best-headphones-for-mixing','best-live-subwoofers','best-multi-effects-pedals','best-reverb-delay','budget-bass-like-expensive','c414-vs-u87','dxr-vs-prx','fx-plugins','k371-vs-mdr7506','mics-for-creators','portable-interfaces','pro-headphones','pro-plugins','scarlett-vs-ssl','stage-wedges','studio-subwoofers','yamaha-mg-vs-behringer-xenyx'];
const my = g.filter(x => ids.includes(x.id));

const enCliches = /\b(workhorse|industry standard|benchmark|effortless(?:ly)?|hassle-free|pro-level|studio-grade|incredible|essential|unmatched|unrivaled|second to none|the beast|beast of|monster|king of the budget|unlock(?:s)?|holy grail|bulletproof|definitely|ultimate weapon)\b/gi;
const esCliches = /\b(caballo de batalla|todoterreno|est[aá]ndar de la industria|sin esfuerzo|sin complicaciones|nivel profesional|imprescindible|m[aá]quina de|la bestia|bestia de|monstruo de|no tiene rival|incre[ií]ble|a prueba de balas|desbloquea|eleva tu|a otro nivel|el rey del presupuesto|arma definitiva|sin igual|el rey)\b/gi;

let enHits = [], esHits = [];

function scanString(val, field, id) {
  if (typeof val !== 'string') return;
  let m;
  const enR = new RegExp(enCliches.source, 'gi');
  while ((m = enR.exec(val)) !== null) {
    const start = Math.max(0, m.index - 50);
    const end = Math.min(val.length, m.index + m[0].length + 50);
    enHits.push({ id, field, match: m[0], context: val.substring(start, end).replace(/\n/g,' ') });
  }
  const esR = new RegExp(esCliches.source, 'gi');
  while ((m = esR.exec(val)) !== null) {
    const start = Math.max(0, m.index - 50);
    const end = Math.min(val.length, m.index + m[0].length + 50);
    esHits.push({ id, field, match: m[0], context: val.substring(start, end).replace(/\n/g,' ') });
  }
}

for (const guide of my) {
  // Top-level fields
  for (const k of ['intro','verdict','conclusion','description']) {
    if (typeof guide[k]==='string') scanString(guide[k], k, guide.id);
    if (typeof guide[k+'_es']==='string') scanString(guide[k+'_es'], k+'_es', guide.id);
  }
  // featuredSnippet
  if (guide.featuredSnippet) {
    for (const [k,v] of Object.entries(guide.featuredSnippet)) {
      if (typeof v === 'string') scanString(v, 'snippet.'+k, guide.id);
    }
  }
  // sections
  if (guide.sections) {
    for (let i=0;i<guide.sections.length;i++) {
      const s = guide.sections[i];
      for (const k of ['heading','content']) {
        if (typeof s[k]==='string') scanString(s[k], 's'+i+'.'+k, guide.id);
        if (typeof s[k+'_es']==='string') scanString(s[k+'_es'], 's'+i+'.'+k+'_es', guide.id);
      }
    }
  }
  // verdictProsCons
  if (guide.verdictProsCons) {
    for (let i=0;i<guide.verdictProsCons.length;i++) {
      const v = guide.verdictProsCons[i];
      for (const k of ['name','pros','cons','name_es','pros_es','cons_es']) {
        if (typeof v[k]==='string') scanString(v[k], 'vpc'+i+'.'+k, guide.id);
      }
    }
  }
  // productTable
  if (guide.productTable) {
    if (guide.productTable.columns) {
      for (let i=0;i<guide.productTable.columns.length;i++) {
        const c = guide.productTable.columns[i];
        for (const k of ['title','title_es']) {
          if (typeof c[k]==='string') scanString(c[k], 'col'+i+'.'+k, guide.id);
        }
      }
    }
    if (guide.productTable.rows) {
      for (let i=0;i<guide.productTable.rows.length;i++) {
        const r = guide.productTable.rows[i];
        if (r.values) {
          for (let j=0;j<r.values.length;j++) {
            const v = r.values[j];
            for (const k of ['value','value_es']) {
              if (typeof v[k]==='string') scanString(v[k], 'r'+i+'v'+j+'.'+k, guide.id);
            }
          }
        }
      }
    }
  }
}

console.log('=== EN HITS (' + enHits.length + ') ===');
for (const h of enHits) {
  console.log(h.id + ' | ' + h.field + ' | "' + h.match + '"');
  console.log('  ...' + h.context + '...');
}
console.log('');
console.log('=== ES HITS (' + esHits.length + ') ===');
for (const h of esHits) {
  console.log(h.id + ' | ' + h.field + ' | "' + h.match + '"');
  console.log('  ...' + h.context + '...');
}
