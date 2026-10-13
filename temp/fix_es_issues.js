var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function R(s,a,b){ if(s.indexOf(a)===-1){fails.push('NOT FOUND: '+a.slice(0,70));return s;} return s.replace(a,b); }

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});

// 1. Chooser ES: fix missing space after period before ¿
var ch=g.sections[0];
ch.content_es=R(ch.content_es,'elige la forma.¿Quieres','elige la forma. ¿Quieres');

// Fix em dash in chooser ES: "sin discusión — se coloca" -> "sin discusión, se coloca"
ch.content_es=R(ch.content_es,'sin discusión — se coloca','sin discusión, se coloca');

// 2. Wave XLR MK.2 section ES: fix 48kHz -> 96kHz (user says MK.2 is 96kHz)
var wv=g.sections.find(function(s){return s.products&&s.products.length===1&&s.products[0]===246;});
wv.content_es=R(wv.content_es,'conversión de 24-bit/48kHz','conversión de 24-bit/96kHz');

// Also fix EN version for consistency
wv.content=R(wv.content,'24-bit/48kHz conversion','24-bit/96kHz conversion');
wv.content=R(wv.content,'You also get 24-bit/48kHz conversion','You also get 24-bit/96kHz conversion');

// Fix "y la limitación" -> "Y la limitación" (capitalize after period)
wv.content_es=R(wv.content_es,'y la limitación honesta','Y la limitación honesta');
wv.content=R(wv.content,'The honest limitation is that it is an interface','The honest limitation is that it is an interface');

// 3. Fix other em dashes in Spanish sections
var sections=g.sections;
sections.forEach(function(s){
  if(s.content_es){
    // Replace " — " with ", " or ": " depending on context
    // But be careful - some are in EN content, only fix ES
    s.content_es=s.content_es.replace(/ — /g,', ');
  }
});

// 4. Fix conclusion ES: "Y si solo necesitas" already capitalized, check others
// Check for any "y " after period in conclusion_es
g.conclusion_es=g.conclusion_es.replace(/\. y /g,'. Y ');
g.conclusion_es=g.conclusion_es.replace(/\. si /g,'. Si ');
g.conclusion_es=g.conclusion_es.replace(/\. no /g,'. No ');
g.conclusion_es=g.conclusion_es.replace(/\. el /g,'. El ');
g.conclusion_es=g.conclusion_es.replace(/\. para /g,'. Para ');
g.conclusion_es=g.conclusion_es.replace(/\. si tu /g,'. Si tu ');
g.conclusion_es=g.conclusion_es.replace(/\. todo /g,'. Todo ');

// 5. Fix verdict ES capitalization
g.verdict_es=g.verdict_es.replace(/\. y /g,'. Y ');
g.verdict_es=g.verdict_es.replace(/\. el /g,'. El ');
g.verdict_es=g.verdict_es.replace(/\. para /g,'. Para ');
g.verdict_es=g.verdict_es.replace(/\. si /g,'. Si ');
g.verdict_es=g.verdict_es.replace(/\. no /g,'. No ');

// 6. Fix intro ES - already done but check em dash
g.intro_es=g.intro_es.replace(/ — /g,': ');

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('ES fixes applied');
if(fails.length){console.log('FAIL:\\n'+fails.join('\\n'));process.exit(1);}
console.log('DONE');