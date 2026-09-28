var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
o.push('GUIDES='+A.length);
A.forEach(function(g){
  var f=[];
  if(typeof g.title_es==='string') f.push('title_es');
  if(typeof g.titleTag_es==='string') f.push('titleTag_es');
  var fsn=g.featuredSnippet;
  if(fsn&&typeof fsn==='object'){
    ['title_es','key1_es','key2_es','best1_es','best2_es','faq_q1_es','faq_q2_es','faq_q3_es','faq_q4_es','faq_q5_es'].forEach(function(k){ if(typeof fsn[k]==='string') f.push('fsn.'+k); });
    if(fsn.specs){
      if(Array.isArray(fsn.specs)) f.push('specs=array('+fsn.specs.length+')');
      else if(typeof fsn.specs==='object') f.push('specs=object('+Object.keys(fsn.specs).length+')');
    }
  }
  if(g.comparison&&g.comparison.rows) f.push('cmp_rows='+g.comparison.rows.length);
  if(g.sections) f.push('sections='+g.sections.length+'(h_es:'+g.sections.filter(function(s){return typeof s.h_es==='string';}).length+'/heading_es:'+g.sections.filter(function(s){return typeof s.heading_es==='string';}).length+')');
  if(Array.isArray(g.faq)) f.push('faq=array('+g.faq.length+') keys='+g.faq.slice(0,1).map(function(x){return Object.keys(x).join('/');}).join(''));
  else if(g.faq&&typeof g.faq==='object') f.push('faq=object('+Object.keys(g.faq).length+')');
  o.push(g.id+' :: '+f.join(', '));
});
// sample faq shapes
var shapes={};
A.forEach(function(g){
  if(Array.isArray(g.faq)&&g.faq.length){
    var k=Object.keys(g.faq[0]).join('/');
    shapes[k]=(shapes[k]||0)+1;
  }
});
o.push('FAQ_SHAPES='+JSON.stringify(shapes));
fs.writeFileSync('temp/cons_patch/r2_inventory.txt', o.join('\n'),'utf8');
console.log('ok guides='+A.length);
