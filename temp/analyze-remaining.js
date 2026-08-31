var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

// 1. Fix short intros
console.log('=== SHORT INTROS ===');
g.forEach(guide=>{
  if(guide.intro && guide.intro.length < 60) {
    console.log(guide.id+': '+guide.intro.length+' chars');
  }
  if(guide.intro_es && guide.intro_es.length < 60) {
    console.log(guide.id+'_es: '+guide.intro_es.length+' chars');
  }
});

// 2. Product missing
console.log('\n=== PRODUCT MISSING ===');
var pidSet = new Set(p.map(x=>x.id));
g.forEach(guide=>{
  var ids = [...new Set(guide.sections.flatMap(s=>s.products||[]))];
  ids.forEach(id=>{
    if(typeof id === 'object') {
      console.log(guide.id+': ID is object: '+JSON.stringify(id).substring(0,50));
    } else if(!pidSet.has(id)) {
      console.log(guide.id+': ID '+id+' missing');
    }
  });
});

// 3. PROSCONS mismatch
console.log('\n=== PROSCONS MISMATCH ===');
var mismatchCount = 0;
g.forEach(guide=>{
  var ids = [...new Set(guide.sections.flatMap(s=>s.products||[]))];
  if(guide.verdictProsCons && guide.verdictProsCons.length !== ids.length) {
    if(mismatchCount < 15) {
      console.log(guide.id+': vpc='+guide.verdictProsCons.length+' products='+ids.length);
    }
    mismatchCount++;
  }
});
console.log('Total mismatched: '+mismatchCount);

// 4. Translation ratio extreme
console.log('\n=== TRANSLATION RATIO ===');
g.forEach(guide=>{
  guide.sections.forEach((s,i)=>{
    if(s.content && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var ratio = esW/enW;
      if(ratio > 2.0 || ratio < 0.4) {
        console.log(guide.id+' sec'+i+': ratio='+ratio.toFixed(2)+' ('+enW+'/'+esW+')');
      }
    }
  });
});

// 5. live-sound-pa sections
console.log('\n=== FEW SECTIONS ===');
g.forEach(guide=>{
  if(guide.sections.length < 2) {
    console.log(guide.id+': '+guide.sections.length+' sections');
  }
});
