var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
// heading-like ES fields (short strings). name_es/desc EXCLUDED (product names / sentences).
var FIELDS=['title_es','titleTag_es','h_es','heading_es','label_es','q_es','intro_es'];
function strip(s){return String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&[a-z]+;/gi,' ').replace(/\s+/g,' ').trim();}
function isTitleWord(w){return /^[A-ZÁÉÍÓÚÑÜ][a-záéíóúñü]{2,}$/.test(w);}
var hits=[],tokFreq={};
function scanStr(path,s){
  s=strip(s);
  if(!s||s.length<4)return;
  var words=s.split(' ');
  var tc=[];
  words.forEach(function(w,i){
    var clean=w.replace(/^["'¿¡(\[]+/,'').replace(/[\"'?!.,;:)\]\u2014\u2013]+$/,'');
    if(i>0&&isTitleWord(clean)){tc.push({w:clean,i:i});tokFreq[clean]=(tokFreq[clean]||0)+1;}
  });
  if(tc.length>=2&&s.length<=160){hits.push({path:path,s:s,tc:tc.map(function(t){return t.w;})});}
  else if(tc.length>=2){hits.push({path:path+ ' [LONG]',s:s.slice(0,160),tc:tc.map(function(t){return t.w;})});}
}
function walk(o,path,inkey){
  if(typeof o==='string'){ if(FIELDS.indexOf(inkey)>=0)scanStr(path,o); return; }
  if(Array.isArray(o)){o.forEach(function(v,i){walk(v,path+'['+i+']',inkey);});return;}
  if(o&&typeof o==='object'){Object.keys(o).forEach(function(k){walk(o[k],path+'.'+k,k);});}
}
A.forEach(function(g){walk(g,g.id||g.slug,'');});
var R=['TITLECASE HITS: '+hits.length+''];
hits.forEach(function(h){R.push(h.path+' :: '+h.tc.join(',')+'\n    "'+h.s.slice(0,140)+'"');});
fs.writeFileSync('temp/cons_patch/titlecase_report.txt',R.join('\n'),'utf8');
var toks=Object.keys(tokFreq).sort(function(a,b){return tokFreq[b]-tokFreq[a];});
fs.writeFileSync('temp/cons_patch/titlecase_tokens.txt',toks.map(function(t){return tokFreq[t]+'x '+t;}).join('\n'),'utf8');
console.log('hits='+hits.length+' uniqTokens='+toks.length);
