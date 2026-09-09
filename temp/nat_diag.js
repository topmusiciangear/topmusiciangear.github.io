const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/_nat_chunk2.json','utf8'));

let enFixes = 0, esFixes = 0;

function fix(guide, field, search, replace, lang) {
  const val = guide[field];
  if (typeof val !== 'string') return false;
  if (val.includes(search)) {
    guide[field] = val.replace(search, replace);
    if (lang === 'EN') enFixes++; else esFixes++;
    return true;
  }
  return false;
}

function fixS(guide, idx, field, search, replace, lang) {
  const esField = field + '_es';
  // Try EN field
  if (fix(guide.sections[idx], field, search, replace, lang)) return;
  // Try ES field
  if (typeof guide.sections[idx][esField] === 'string' && guide.sections[idx][esField].includes(search)) {
    guide.sections[idx][esField] = guide.sections[idx][esField].replace(search, replace);
    if (lang === 'ES') esFixes++; else enFixes++;
  }
}

function fixSnip(guide, key, search, replace, lang) {
  const val = guide.featuredSnippet[key];
  if (typeof val !== 'string') return;
  if (val.includes(search)) {
    guide.featuredSnippet[key] = val.replace(search, replace);
    if (lang === 'EN') enFixes++; else esFixes++;
  }
}

function fixRow(guide, ri, vi, search, replace, lang) {
  for (const k of ['value', 'value_es']) {
    const val = guide.productTable.rows[ri].values[vi][k];
    if (typeof val === 'string' && val.includes(search)) {
      guide.productTable.rows[ri].values[vi][k] = val.replace(search, replace);
      if (lang === 'EN') enFixes++; else esFixes++;
    }
  }
}

// Remaining fixes:

// best-headphones-for-mixing ES s1: "estándar de la industria"
fixS(g.find(x=>x.id==='best-headphones-for-mixing'), 1, 'content', 'Han sido un estándar de la industria', 'Han sido la referencia', 'ES');

// budget-bass-like-expensive ES verdict: second "caballo de batalla versátil" → already changed, but verify
const bbl = g.find(x=>x.id==='budget-bass-like-expensive');
// The verdict_es now has "caballo de batalla versátil" which I already replaced with "opción versátil". But the verifier still found it. Let me check.
// Actually my first replace was "caballo de batalla versátil" → "opción versátil". The verifier shows it's still there. Maybe it's in a different part of the string.
// Let me just do a replaceAll on the specific field
if (bbl.verdict_es.includes('caballo de batalla')) {
  console.log('BBL verdict_es still has caballo de batalla:', bbl.verdict_es.substring(bbl.verdict_es.indexOf('caballo')-20, bbl.verdict_es.indexOf('caballo')+40));
}

// best-drum-machine conclusion_es: second "a otro nivel"
const bdm = g.find(x=>x.id==='best-drum-machine');
if (bdm.conclusion_es.includes('a otro nivel')) {
  // Already replaced first. Check if there's a second.
  const idx = bdm.conclusion_es.indexOf('a otro nivel');
  if (idx >= 0) {
    console.log('BDM conclusion_es still has a otro nivel at', idx, ':', bdm.conclusion_es.substring(Math.max(0,idx-30), idx+50));
  }
}

// best-beginner-electric-guitar verdict_es and conclusion_es: "todoterreno"
const beg = g.find(x=>x.id==='best-beginner-electric-guitar');
// verdict_es: "mejor eléctrica todoterreno" → I changed to "mejor eléctrica versátil"
// But verifier found "todoterreno para principiantes" - this is the remaining part
if (beg.verdict_es.includes('todoterreno')) {
  console.log('BEG verdict_es:', beg.verdict_es.substring(beg.verdict_es.indexOf('todoterreno')-30, beg.verdict_es.indexOf('todoterreno')+50));
}
// conclusion_es: "mejor todoterreno" → I changed to "mejor opción versátil"
// But there might be another "todoterreno"
if (beg.conclusion_es.includes('todoterreno')) {
  console.log('BEG conclusion_es:', beg.conclusion_es.substring(beg.conclusion_es.indexOf('todoterreno')-30, beg.conclusion_es.indexOf('todoterreno')+50));
}

// Print all remaining for diagnostics
const esCliches = /\b(caballo de batalla|todoterreno|est[aá]ndar de la industria|sin esfuerzo|sin complicaciones|nivel profesional|imprescindible|m[aá]quina de escenario|la bestia|bestia de|monstruo de|no tiene rival|incre[ií]ble|a prueba de balas|desbloquea|eleva tu|a otro nivel|el rey del presupuesto|arma definitiva|sin igual|el rey)\b/gi;
const enCliches = /\b(workhorse|industry standard|benchmark|effortless(?:ly)?|hassle-free|pro-level|studio-grade|incredible|essential|unmatched|unrivaled|second to none|the beast|beast of|monster|king of the budget|unlock(?:s)?|holy grail|bulletproof|definitely|ultimate weapon)\b/gi;

for (const guide of g) {
  for (const k of ['intro','verdict','conclusion','description']) {
    if (typeof guide[k]==='string') {
      let m;
      const r = new RegExp(enCliches.source, 'gi');
      while ((m = r.exec(guide[k])) !== null) {
        console.log('EN remaining: ' + guide.id + ' ' + k + ': "' + m[0] + '"');
      }
    }
    if (typeof guide[k+'_es']==='string') {
      let m;
      const r = new RegExp(esCliches.source, 'gi');
      while ((m = r.exec(guide[k+'_es'])) !== null) {
        console.log('ES remaining: ' + guide.id + ' ' + k + '_es: "' + m[0] + '"');
      }
    }
  }
  if (guide.featuredSnippet) {
    for (const [k,v] of Object.entries(guide.featuredSnippet)) {
      if (typeof v === 'string') {
        let m;
        const r1 = new RegExp(enCliches.source, 'gi');
        while ((m = r1.exec(v)) !== null) console.log('EN remaining: ' + guide.id + ' snippet.' + k + ': "' + m[0] + '"');
        const r2 = new RegExp(esCliches.source, 'gi');
        while ((m = r2.exec(v)) !== null) console.log('ES remaining: ' + guide.id + ' snippet.' + k + ': "' + m[0] + '"');
      }
    }
  }
  if (guide.sections) {
    for (let i=0;i<guide.sections.length;i++) {
      const s = guide.sections[i];
      for (const f of ['heading','content']) {
        if (typeof s[f]==='string') {
          let m; const r=new RegExp(enCliches.source,'gi');
          while((m=r.exec(s[f]))!==null) console.log('EN remaining: '+guide.id+' s'+i+'.'+f+': "'+m[0]+'"');
        }
        if (typeof s[f+'_es']==='string') {
          let m; const r=new RegExp(esCliches.source,'gi');
          while((m=r.exec(s[f+'_es']))!==null) console.log('ES remaining: '+guide.id+' s'+i+'.'+f+'_es: "'+m[0]+'"');
        }
      }
    }
  }
}

console.log('\nThis pass fixes:', enFixes, 'EN,', esFixes, 'ES');
