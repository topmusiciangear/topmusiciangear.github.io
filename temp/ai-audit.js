var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var issues = [];

// AI/exaggerated patterns in EN
var enPatterns = [
  ['game-changer', 'AI cliche'],
  ['revolutionize', 'AI cliche'],
  ['unleash', 'AI cliche'],
  ['supercharge', 'AI cliche'],
  ['elevate your', 'AI cliche'],
  ['take your.*to the next level', 'AI cliche'],
  ['the ultimate', 'exaggerated'],
  ['the best.*ever', 'exaggerated'],
  ['incredible.*sound', 'check context'],
  ['blown away', 'AI cliche'],
  ['blows away', 'AI cliche'],
  ['mind-blowing', 'AI cliche'],
  ['transform your', 'AI cliche'],
  ['game-changing', 'AI cliche'],
  ['world-class', 'exaggerated'],
  ['state-of-the-art', 'exaggerated'],
  ['best-in-class', 'exaggerated'],
  ['iconic.*sound', 'check context'],
  ['legendary', 'check if justified'],
  ['unmatched', 'exaggerated'],
  ['unrivaled', 'exaggerated'],
  ['unparalleled', 'exaggerated'],
  ['nothing beats', 'exaggerated'],
  ['simply the best', 'exaggerated'],
  ['if you.*you need', 'pushy tone'],
  ['you.*need this', 'pushy tone'],
  ['trust me', 'personal/AI'],
  ['believe me', 'personal/AI'],
  ['honestly', 'check context'],
  ['genuinely', 'check context'],
  ['truly incredible', 'exaggerated'],
  ['absolutely incredible', 'exaggerated'],
  ['phenomenal', 'exaggerated'],
  ['exceptional', 'check frequency'],
  ['stunning', 'check frequency'],
  ['breathtaking', 'exaggerated'],
  ['utterly', 'exaggerated'],
  ['perfect for everyone', 'exaggerated'],
];

// AI/exaggerated patterns in ES
var esPatterns = [
  ['revolucionar', 'AI cliche'],
  ['liberar todo el potencial', 'AI cliche'],
  ['elevar tu', 'AI cliche'],
  ['llevar.*al siguiente nivel', 'AI cliche'],
  ['el definitivo', 'exaggerado'],
  ['el mejor.*de la historia', 'exaggerado'],
  ['sonido increíble', 'revisar contexto'],
  ['te dejará sin palabras', 'AI cliche'],
  ['cambia las reglas', 'AI cliche'],
  ['de clase mundial', 'exaggerado'],
  ['de última generación', 'exaggerado'],
  ['simplemente el mejor', 'exaggerado'],
  ['nada le iguala', 'exaggerado'],
  ['incomparable', 'exaggerado'],
  ['excepcional', 'revisar frecuencia'],
  ['increíble', 'revisar frecuencia'],
  ['absolutamente increíble', 'exaggerado'],
  ['fenomenal', 'exaggerado'],
  [' impresionante', 'exaggerado'],
  ['perfecto para todos', 'exaggerado'],
  ['todos.*necesitan', 'exaggerado'],
  ['no puedes equivocarte', 'exaggerado'],
  ['siempre funciona', 'exaggerado'],
];

g.forEach(guide=>{
  // Check EN content
  var enFields = [guide.intro, guide.conclusion, ...guide.sections.map(s=>s.content)];
  enFields.forEach((text,fi)=>{
    if(!text) return;
    enPatterns.forEach(([pat,desc])=>{
      var re = new RegExp(pat, 'gi');
      var match = text.match(re);
      if(match) {
        var ctx = text.substring(Math.max(0, text.indexOf(match[0])-20), text.indexOf(match[0])+match[0].length+30);
        issues.push({id: guide.id, lang: 'EN', type: desc, phrase: match[0], context: ctx});
      }
    });
  });
  
  // Check ES content
  var esFields = [guide.intro_es, guide.conclusion_es, ...guide.sections.map(s=>s.content_es)];
  esFields.forEach((text,fi)=>{
    if(!text) return;
    esPatterns.forEach(([pat,desc])=>{
      var re = new RegExp(pat, 'gi');
      var match = text.match(re);
      if(match) {
        var ctx = text.substring(Math.max(0, text.indexOf(match[0])-20), text.indexOf(match[0])+match[0].length+30);
        issues.push({id: guide.id, lang: 'ES', type: desc, phrase: match[0], context: ctx});
      }
    });
  });
});

// Group by type
var grouped = {};
issues.forEach(i=>{
  var key = i.lang+' '+i.type;
  if(!grouped[key]) grouped[key] = [];
  grouped[key].push(i);
});

Object.keys(grouped).sort().forEach(key=>{
  console.log('\n=== '+key+' ('+grouped[key].length+') ===');
  grouped[key].slice(0,8).forEach(i=>{
    console.log('  '+i.id+': "'+i.phrase+'" → ...'+i.context.substring(0,70)+'...');
  });
  if(grouped[key].length > 8) console.log('  ... and '+ (grouped[key].length-8)+' more');
});

console.log('\n=== TOTAL: '+issues.length+' issues ===');
