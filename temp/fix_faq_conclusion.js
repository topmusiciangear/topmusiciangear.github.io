var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
var F=g.featuredSnippet;

// 1. FAQ GOXLR EN: remove +24V myth
F.faq_a5_en=R(F.faq_a5_en,'The trade-offs are Windows-only software, no sampler soundboard and +24 V phantom instead of full +48 V.','The trade-offs are Windows-only software, no sampler soundboard, and USB power can struggle with hungry condenser mics.');

// 2. FAQ GOXLR ES: remove +24V myth
F.faq_a5_es=R(F.faq_a5_es,'Los inconvenientes son software solo Windows, sin sampler y phantom +24 V en vez de +48 V completos.','Los inconvenientes son software solo Windows, sin sampler y la alimentación USB a veces flojea con condensadores muy tragones.');

// 3. FAQ Q1 ES: "que corra su procesamiento" -> "que ejecute su procesamiento"
F.faq_a1_es=R(F.faq_a1_es,'que corra su procesamiento en el propio hardware','que ejecute su procesamiento en el propio hardware');

// 4. Conclusion EN: replace em dashes with colons
g.conclusion=R(g.conclusion,'Stream Deck+ — nothing else makes','Stream Deck+: nothing else makes');
g.conclusion=R(g.conclusion,'There is no wrong answer here — it comes down','There is no wrong answer here: it comes down');

// 5. Conclusion ES: replace em dashes with colons
g.conclusion_es=R(g.conclusion_es,'Stream Deck+ — nada hace','Stream Deck+: nada hace');
g.conclusion_es=R(g.conclusion_es,'No hay respuesta equivocada aquí — todo se reduce','No hay respuesta equivocada aquí: todo se reduce');

// 6. Fix "podcasting" -> "pódcasting" in Spanish links/text
g.conclusion_es=R(g.conclusion_es,'para podcasting','para pódcasting');
g.conclusion_es=R(g.conclusion_es,'para podcast','para pódcast');

// Also check featuredSnippet text_es for podcasting
F.text_es=R(F.text_es,'para podcasting','para pódcasting');
F.text_es=R(F.text_es,'para podcast','para pódcast');

// 7. Also fix any remaining em dashes in Spanish sections (in case any left)
g.sections.forEach(function(s){
  if(s.content_es){
    s.content_es=s.content_es.replace(/ — /g,', ');
  }
});

// 8. Fix verdict ES em dashes
g.verdict_es=g.verdict_es.replace(/ — /g,': ');
g.verdict=g.verdict.replace(/ — /g,': ');

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('FAQ/Conclusion fixes applied');
if(fails.length){console.log('FAIL:\\n'+fails.join('\\n'));process.exit(1);}
console.log('DONE');