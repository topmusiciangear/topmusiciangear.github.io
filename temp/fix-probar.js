var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Fix ie900-vs-se846 - remove personal "He tenido la oportunidad de probar"
var ie = g.find(x=>x.id==='ie900-vs-se846');
ie.intro_es = ie.intro_es.replace('He tenido la oportunidad de probar el Sennheiser IE 900', 'El Sennheiser IE 900');
console.log('ie900-vs-se846 intro_es: fixed');

// Fix best-acoustic-guitars-for-beginners - remove personal "Después de probar"
var ag = g.find(x=>x.id==='best-acoustic-guitars-for-beginners');
ag.intro_es = ag.intro_es.replace('Después de probar las acústicas para prin', 'Las acústicas para prin');
console.log('best-acoustic-guitars-for-beginners intro_es: fixed');

// Also check if intro_es needs fixing after replacement
if(ag.intro_es.includes('prin')) {
  // Check the sentence is complete
  var idx = ag.intro_es.indexOf('Las acústicas para prin');
  console.log('  context: ...'+ag.intro_es.substring(idx-20, idx+80)+'...');
}

// Fix best-hardware-samplers - "use" is product feature, not personal. Skip.

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone!');
