var fs=require('fs');var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));var g=Array.isArray(d)?d:d.guides;
function find(id){for(var i=0;i<g.length;i++)if(g[i].id===id)return g[i];}
var pr=find('premium-interfaces');var po=find('portable-interfaces');
function secKeys(o){return o&&o.sections&&o.sections[0]?Object.keys(o.sections[0]).join(','):'none';}
function secTitles(o){return (o.sections||[]).map(function(s,i){return{i:i,t:s.title,t_es:s.title_es,eyebrow:s.eyebrow};}).map(function(x){return '#'+x.i+' title='+JSON.stringify(x.t===undefined?null:x.t)+' title_es='+JSON.stringify(x.t_es===undefined?null:x.t_es);});}
console.log('premium.sectionsN='+(pr.sections?pr.sections.length:0)+' keys0='+secKeys(pr));
console.log('portable.sectionsN='+(po.sections?po.sections.length:0)+' keys0='+secKeys(po));
console.log('---- premium section titles ----');
console.log(secTitles(pr).join('\n'));
console.log('---- portable section titles ----');
console.log(secTitles(po).join('\n'));
var b=fs.readFileSync('build-guides.js','utf8').split(/\r?\n/);
b.forEach(function(x,i){if(x.indexOf('guide-section-heading')>=0){console.log('BUILD L'+(i+1)+': '+x.trim().slice(0,160));}});
