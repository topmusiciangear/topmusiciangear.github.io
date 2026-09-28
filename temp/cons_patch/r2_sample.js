var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
A.forEach(function(g){
  if(Array.isArray(g.faq)&&g.faq.length){
    g.faq.forEach(function(f,i){ if(f.q_es) o.push(g.id+'.faq['+i+'].q_es='+f.q_es); });
  }
});
o.push('---FSN_TITLES_SAMPLE---');
A.slice(0,25).forEach(function(g){ if(g.featuredSnippet&&g.featuredSnippet.title_es) o.push(g.id+' :: '+g.featuredSnippet.title_es); });
o.push('---TITLE_TAGS_SAMPLE---');
A.slice(0,30).forEach(function(g){ o.push(g.id+' :: '+g.titleTag_es); });
o.push('---SPECS_NONEMPTY---');
var n=0;
A.forEach(function(g){
  var s=g.featuredSnippet&&g.featuredSnippet.specs;
  if(Array.isArray(s)&&s.length&&n<6){ o.push(g.id+' specs[0]='+JSON.stringify(s[0]).slice(0,200)); n++; }
  else if(s&&typeof s==='object'&&!Array.isArray(s)&&Object.keys(s).length&&n<6){ o.push(g.id+' specsObj='+JSON.stringify(s).slice(0,200)); n++; }
});
fs.writeFileSync('temp/cons_patch/r2_sample.txt', o.join('\n'),'utf8');
console.log('faq_q='+o.filter(function(l){return l.indexOf('.faq[')>=0;}).length+' specs_n='+n);
