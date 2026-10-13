var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});

// 1. Chooser ES: fix missing space after period before ¿
var ch=g.sections[0];
ch.content_es=R(ch.content_es,'elige la forma.</strong>¿Quieres','elige la forma.</strong> ¿Quieres');

// Fix em dash in chooser ES: "sin discusión — se coloca" -> "sin discusión, se coloca"
ch.content_es=R(ch.content_es,'sin discusión — se coloca','sin discusión, se coloca');

// 2. GoXLR Mini section ES: fix +24V -> +48V (myth correction)
var gx=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===659;});
gx.content_es=R(gx.content_es,'el phantom va a +24 V en vez de +48 V completos','el phantom entrega +48 V completos');
gx.content_es=R(gx.content_es,'phantom +24 V','phantom +48 V');

// Also fix EN version
gx.content=R(gx.content,'phantom runs at +24 V rather than full +48 V','phantom delivers full +48 V');
gx.content=R(gx.content,'+24 V phantom instead of full +48 V','+48 V phantom');

// 3. Fix other em dashes in Spanish sections - replace " — " with ", "
var sections=g.sections;
sections.forEach(function(s){
  if(s.content_es){
    s.content_es=s.content_es.replace(/ — /g,', ');
  }
});

// 4. Fix intro ES - replace em dash with colon
g.intro_es=g.intro_es.replace(/ — /g,': ');

// 5. Fix conclusion ES capitalization after periods
g.conclusion_es=g.conclusion_es.replace(/\. y /g,'. Y ');
g.conclusion_es=g.conclusion_es.replace(/\. si /g,'. Si ');
g.conclusion_es=g.conclusion_es.replace(/\. no /g,'. No ');
g.conclusion_es=g.conclusion_es.replace(/\. el /g,'. El ');
g.conclusion_es=g.conclusion_es.replace(/\. para /g,'. Para ');
g.conclusion_es=g.conclusion_es.replace(/\. si tu /g,'. Si tu ');
g.conclusion_es=g.conclusion_es.replace(/\. todo /g,'. Todo ');
g.conclusion_es=g.conclusion_es.replace(/\. esta /g,'. Esta ');
g.conclusion_es=g.conclusion_es.replace(/\. nuestra /g,'. Nuestra ');
g.conclusion_es=g.conclusion_es.replace(/\. consulta /g,'. Consulta ');

// 6. Fix verdict ES capitalization
g.verdict_es=g.verdict_es.replace(/\. y /g,'. Y ');
g.verdict_es=g.verdict_es.replace(/\. el /g,'. El ');
g.verdict_es=g.verdict_es.replace(/\. para /g,'. Para ');
g.verdict_es=g.verdict_es.replace(/\. si /g,'. Si ');
g.verdict_es=g.verdict_es.replace(/\. no /g,'. No ');
g.verdict_es=g.verdict_es.replace(/\. todo /g,'. Todo ');
g.verdict_es=g.verdict_es.replace(/\. la /g,'. La ');
g.verdict_es=g.verdict_es.replace(/\. un /g,'. Un ');
g.verdict_es=g.verdict_es.replace(/\. una /g,'. Una ');
g.verdict_es=g.verdict_es.replace(/\. con /g,'. Con ');
g.verdict_es=g.verdict_es.replace(/\. sin /g,'. Sin ');

// 7. Fix "contra honesta" -> "El trato honesto" for consistency in Deck+ section
var deck=g.sections.find(function(s){return s.products&&s.products.includes(243);});
if(deck){
  deck.content_es=R(deck.content_es,'La contra honesta:','El trato honesto:');
}

// 8. Fix verdictProsCons for GoXLR Mini - update cons to remove +24V mention
var gxVpc=g.verdictProsCons.find(function(v){return v.name==='TC Helicon GoXLR Mini';});
if(gxVpc){
  gxVpc.cons=gxVpc.cons.map(function(c){return c.replace('+24 V phantom instead of full +48 V','USB power can struggle with hungry condenser mics');});
  gxVpc.cons_es=gxVpc.cons_es.map(function(c){return c.replace('phantom +24 V en vez de +48 V completos','alimentación USB puede flojear con condensadores muy tragones');});
  gxVpc.cons_es=gxVpc.cons_es.map(function(c){return c.replace('+24 V phantom','+48 V phantom');});
}

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('Fixes applied');
if(fails.length){console.log('FAIL:\\n'+fails.join('\\n'));process.exit(1);}
console.log('DONE');