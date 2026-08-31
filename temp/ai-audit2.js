var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var issues = [];

// Literal/AI Spanish patterns
var esPatterns = [
  // Literal translations from English
  ['Ya sea que', 'Suena a traducción literal de "Whether"'],
  ['Si estás buscando un.*que ofrezca', 'Patrón genérico AI'],
  ['ofrecer una experiencia', 'Frase hecha AI'],
  ['ya sea.*o', 'Patrón AI "whether...or"'],
  ['no busques más', 'AI cliché'],
  ['en el que brillan', 'AI cliché'],
  ['se destacan por', 'AI cliché'],
  ['te permite', 'Verificar contexto - puede ser natural'],
  ['te ofrece', 'Verificar contexto'],
  ['con una calidad de sonido que', 'Frase hecha'],
  ['que no decepciona', 'AI cliché'],
  ['que vale la pena', 'Check si es natural'],
  ['es ideal para', 'Check frecuencia'],
  ['perfecto para', 'Check frecuencia'],
  ['una excelente opción', 'Check frecuencia'],
  ['si buscas', 'Check frecuencia'],
  ['en general', 'Check si es vague'],
  ['en resumen', 'Check si es natural'],
  ['no importa', 'Check contexto'],
  ['tanto si.*como si', 'Patrón AI'],
  ['ya sea en', 'Patrón AI'],
  ['disfrutarás de', 'AI cliché'],
  ['te sorprenderá', 'AI cliché'],
  ['te encantará', 'AI cliché'],
  ['te fascinará', 'AI cliché'],
  ['diseñado para', 'Check contexto'],
  ['pensado para', 'Check contexto'],
  ['hecho para', 'Check contexto'],
  ['encaja perfectamente', 'AI cliché'],
  ['se siente como en casa', 'AI cliché'],
  ['un verdadero', 'Check contexto'],
  ['una verdadera', 'Check contexto'],
  ['realmente impresionante', 'AI cliché'],
  ['realmente increíble', 'AI cliché'],
  ['en serio', 'Check contexto'],
  ['de verdad', 'Check contexto'],
  ['honestamente', 'Check contexto'],
  ['sin duda', 'Check frecuencia'],
  ['definitivamente', 'Check frecuencia'],
  ['claramente', 'Check frecuencia'],
  ['obviamente', 'Check frecuencia'],
];

g.forEach(guide=>{
  ['intro_es','conclusion_es'].forEach(f=>{
    if(!guide[f]) return;
    esPatterns.forEach(([pat,desc])=>{
      var re = new RegExp(pat, 'gi');
      var m = guide[f].match(re);
      if(m) {
        var idx = guide[f].indexOf(m[0]);
        var ctx = guide[f].substring(Math.max(0,idx-15), Math.min(guide[f].length, idx+m[0].length+40));
        issues.push({id: guide.id, field: f, phrase: m[0], type: desc, ctx: ctx});
      }
    });
  });
  guide.sections.forEach((s,si)=>{
    if(!s.content_es) return;
    esPatterns.forEach(([pat,desc])=>{
      var re = new RegExp(pat, 'gi');
      var m = s.content_es.match(re);
      if(m) {
        var idx = s.content_es.indexOf(m[0]);
        var ctx = s.content_es.substring(Math.max(0,idx-15), Math.min(s.content_es.length, idx+m[0].length+40));
        issues.push({id: guide.id, field: 'sec'+si, phrase: m[0], type: desc, ctx: ctx});
      }
    });
  });
});

// Group by type
var grouped = {};
issues.forEach(i=>{
  if(!grouped[i.type]) grouped[i.type] = [];
  grouped[i.type].push(i);
});

Object.keys(grouped).sort().forEach(k=>{
  console.log('\n=== '+k+' ('+grouped[k].length+') ===');
  grouped[k].slice(0,5).forEach(i=>{
    console.log('  '+i.id+' '+i.field+': "'+i.phrase+'" → '+i.ctx);
  });
  if(grouped[k].length>5) console.log('  ...+'+ (grouped[k].length-5)+' more');
});
console.log('\nTotal: '+issues.length+' potential issues');
