var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Fix "A cuesta más que" in best-amp-modelers
var amp = g.find(x=>x.id==='best-amp-modelers');
amp.sections.forEach((s,j)=>{
  if(s.content_es && s.content_es.includes('A cuesta más que')) {
    amp.sections[j].content_es = s.content_es.split('A cuesta más que').join('Cuesta más que');
    console.log('best-amp-modelers S'+j+': fixed A cuesta más que');
  }
});

// Check "probar" contexts
var probarIds = ['mixing-plugins','best-mic-for-guitar-amps','ie900-vs-se846','best-acoustic-guitars-for-beginners'];
probarIds.forEach(id=>{
  var guide = g.find(x=>x.id===id);
  guide.sections.forEach((s,j)=>{
    if(s.content_es && s.content_es.includes('probar')) {
      var ctx = s.content_es.substring(s.content_es.indexOf('probar')-30, s.content_es.indexOf('probar')+30);
      console.log(id+' S'+j+' ES probar context: ...'+ctx+'...');
    }
  });
  if(guide.intro_es && guide.intro_es.includes('probar')) {
    var ctx = guide.intro_es.substring(guide.intro_es.indexOf('probar')-30, guide.intro_es.indexOf('probar')+30);
    console.log(id+' intro_es probar context: ...'+ctx+'...');
  }
});

// Check "I use" in FAQ
['pro-daw','stage-wedges'].forEach(id=>{
  var guide = g.find(x=>x.id===id);
  if(guide.faq) guide.faq.forEach((f,j)=>{
    if(f.q && f.q.includes('I use')) {
      console.log(id+' faq['+j+'].q: '+f.q);
    }
  });
});

// best-hardware-samplers "I use"
var bhs = g.find(x=>x.id==='best-hardware-samplers');
bhs.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('I use')) {
    var ctx = s.content.substring(s.content.indexOf('I use')-30, s.content.indexOf('I use')+40);
    console.log('best-hardware-samplers S'+j+' EN I use context: ...'+ctx+'...');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone checking contexts.');
