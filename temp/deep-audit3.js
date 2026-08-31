var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var issues = [];

// ============= 1. PRODUCT MISMATCHES =============
// Check if product IDs in guide match actual products
var productIds = new Set(p.map(x=>x.id));
g.forEach(guide=>{
  var allIds = [...new Set(guide.sections.flatMap(s=>s.products||[]))];
  allIds.forEach(id=>{
    if(!productIds.has(id)) {
      issues.push({id:guide.id, type:'PRODUCT_MISSING', detail:'ID '+id+' not in products.json'});
    }
  });
  // Check verdictProsCons length matches products
  if(guide.verdictProsCons) {
    if(guide.verdictProsCons.length !== allIds.length) {
      issues.push({id:guide.id, type:'PROSCONS_LENGTH', detail:'verdictProsCons has '+guide.verdictProsCons.length+' but guide has '+allIds.length+' products'});
    }
  }
});

// ============= 2. TABLE STRUCTURE =============
g.forEach(guide=>{
  // Check comparison tables exist where expected
  guide.sections.forEach((s,si)=>{
    if(s.table) {
      if(!s.table.headers || s.table.headers.length < 2) {
        issues.push({id:guide.id, type:'TABLE_EMPTY', detail:'Section '+si+' has table with no headers'});
      }
      if(s.table.rows) {
        s.table.rows.forEach((row,ri)=>{
          if(row.length !== s.table.headers.length) {
            issues.push({id:guide.id, type:'TABLE_MISMATCH', detail:'Section '+si+' row '+ri+' has '+row.length+' cells but '+s.table.headers.length+' headers'});
          }
        });
      }
    }
  });
});

// ============= 3. GRAMMAR/SYNTAX PATTERNS =============
var enGrammar = [
  ['a a ', 'double article'],
  ['the the ', 'double article'],
  ['an an ', 'double article'],
  ['to to ', 'double preposition'],
  ['of of ', 'double preposition'],
  ['in in ', 'double preposition'],
  ['is is ', 'double verb'],
  ['are are ', 'double verb'],
  ['and and ', 'double conjunction'],
  ['or or ', 'double conjunction'],
  [',,', 'double comma'],
  ['..', 'double period'],
  ['  ', 'double space'],
  [' .', 'space before period'],
  [' ,', 'space before comma'],
  [' !', 'space before exclamation'],
  [' ?', 'space before question mark'],
  [' a the', 'wrong article order'],
  [' the a', 'wrong article order'],
  [' of the the', 'double article'],
  [' in the the', 'double article'],
  [' is a a', 'double article'],
  [' to the the', 'double article'],
];

var esGrammar = [
  ['el el ', 'doble artículo'],
  ['la la ', 'doble artículo'],
  ['un un ', 'doble artículo'],
  ['una una ', 'doble artículo'],
  ['de de ', 'doble preposición'],
  ['en en ', 'doble preposición'],
  ['que que ', 'doble conjunción'],
  ['y y ', 'doble conjunción'],
  ['o o ', 'doble conjunción'],
  ['se se ', 'doble pronombre'],
  ['lo lo ', 'doble pronombre'],
  ['le le ', 'doble pronombre'],
  ['..', 'doble punto'],
  [',,', 'doble coma'],
  ['  ', 'doble espacio'],
  [' .', 'espacio antes de punto'],
  [' ,', 'espacio antes de coma'],
  [' ¿', 'espacio antes de interrogación'],
  [' ¡', 'espacio antes de exclamación'],
  [' es un un', 'doble artículo'],
  [' es una una', 'doble artículo'],
];

// ============= 4. EXAGGERATION/SELLING PATTERNS =============
var sellingPatterns = [
  ['you.*need.*to buy', 'pushy'],
  ['you.*should buy', 'pushy'],
  ['you must buy', 'pushy'],
  ['don\'t miss out', 'FOMO'],
  ['limited time', 'FOMO'],
  ['before it\'s gone', 'FOMO'],
  ['best deal', 'salesy'],
  ['incredible deal', 'salesy'],
  ['amazing deal', 'salesy'],
  ['unbeatable', 'exaggerated'],
  ['indisputable', 'exaggerated'],
  ['undeniable', 'exaggerated'],
];

var sellingPatternsES = [
  ['debes comprar', 'agresivo'],
  ['no te lo pierdas', 'FOMO'],
  ['oferta increíble', 'salesy'],
  ['mejor precio', 'salesy'],
  ['no dejes pasar', 'FOMO'],
  ['antes de que se agote', 'FOMO'],
  ['imbatible', 'exagerado'],
  ['indiscutible', 'exagerado'],
];

// ============= 5. CONSISTENCY CHECKS =============
g.forEach(guide=>{
  var en = guide.sections.map(s=>s.content).join(' ');
  var es = guide.sections.map(s=>s.content_es).join(' ');
  
  // Check EN grammar
  enGrammar.forEach(([pat,desc])=>{
    if(en.includes(pat)) {
      issues.push({id:guide.id, type:'EN_GRAMMAR', detail:desc+': "'+pat+'"'});
    }
  });
  
  // Check ES grammar
  esGrammar.forEach(([pat,desc])=>{
    if(es.includes(pat)) {
      issues.push({id:guide.id, type:'ES_GRAMMAR', detail:desc+': "'+pat+'"'});
    }
  });
  
  // Check selling patterns
  sellingPatterns.forEach(([pat,desc])=>{
    var re = new RegExp(pat, 'gi');
    if(re.test(en)) {
      issues.push({id:guide.id, type:'EN_SELLING', detail:desc+': "'+pat+'"'});
    }
  });
  
  sellingPatternsES.forEach(([pat,desc])=>{
    var re = new RegExp(pat, 'gi');
    if(re.test(es)) {
      issues.push({id:guide.id, type:'ES_SELLING', detail:desc+': "'+pat+'"'});
    }
  });
});

// ============= 6. MISSING CONTENT =============
g.forEach(guide=>{
  if(!guide.intro || guide.intro.length < 50) issues.push({id:guide.id, type:'SHORT_INTRO', detail:'EN intro '+guide.intro.length+' chars'});
  if(!guide.intro_es || guide.intro_es.length < 50) issues.push({id:guide.id, type:'SHORT_INTRO_ES', detail:'ES intro '+guide.intro_es.length+' chars'});
  if(!guide.conclusion || guide.conclusion.length < 50) issues.push({id:guide.id, type:'SHORT_CONCLUSION', detail:'EN conclusion '+guide.conclusion.length+' chars'});
  if(!guide.conclusion_es || guide.conclusion_es.length < 50) issues.push({id:guide.id, type:'SHORT_CONCLUSION_ES', detail:'ES conclusion '+guide.conclusion_es.length+' chars'});
  if(guide.sections.length < 2) issues.push({id:guide.id, type:'FEW_SECTIONS', detail:'Only '+guide.sections.length+' sections'});
  
  guide.sections.forEach((s,i)=>{
    if(!s.content || s.content.length < 100) issues.push({id:guide.id, type:'SHORT_SECTION', detail:'EN section '+i+' '+s.content.length+' chars'});
    if(!s.content_es || s.content_es.length < 100) issues.push({id:guide.id, type:'SHORT_SECTION_ES', detail:'ES section '+i+' '+s.content_es.length+' chars'});
  });
});

// ============= 7. TRANSLATION ALIGNMENT =============
g.forEach(guide=>{
  guide.sections.forEach((s,i)=>{
    if(s.content && s.content_es) {
      var enWords = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esWords = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var ratio = esWords/enWords;
      if(ratio > 1.8 || ratio < 0.5) {
        issues.push({id:guide.id, type:'TRANSLATION_RATIO', detail:'Section '+i+' ratio '+ratio.toFixed(2)+' ('+enWords+' en/'+esWords+' es)'});
      }
    }
  });
});

// ============= REPORT =============
var grouped = {};
issues.forEach(i=>{
  if(!grouped[i.type]) grouped[i.type] = [];
  grouped[i.type].push(i);
});

Object.keys(grouped).sort().forEach(k=>{
  console.log('\n=== '+k+' ('+grouped[k].length+') ===');
  grouped[k].slice(0,5).forEach(i=>{
    console.log('  '+i.id+': '+i.detail);
  });
  if(grouped[k].length > 5) console.log('  ...+'+ (grouped[k].length-5)+' more');
});

console.log('\n=== TOTAL: '+issues.length+' issues ===');
