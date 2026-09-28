var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=Array.isArray(d)?d:d.guides;
function find(id){for(var i=0;i<g.length;i++)if(g[i].id===id)return g[i];}
var pr=find('premium-interfaces');
var po=find('portable-interfaces');
function keys(o){return o?Object.keys(o):[];}
function h2(o){var s=o&&o.sections&&o.sections[0];return s?keys(s).join(','):'n';}
console.log('prem.sections0 keys='+h2(pr));
console.log('port.sections0 keys='+h2(po));
var ps=pr&&pr.sections?pr.sections:null;
ps.forEach(function(s,i){console.log('prem sec'+i+' h='+JSON.stringify(s.h).slice(0,40)+' h_es='+JSON.stringify(s.h_es).slice(0,40)+' heading='+JSON.stringify(s.heading).slice(0,40)+' heading_es='+JSON.stringify(s.heading_es).slice(0,40)+' intro='+JSON.stringify(s.intro).slice(0,30)+' intro_es='+JSON.stringify(s.intro_es).slice(0,30));});
var poS=po&&po.sections?po.sections:null;
poS.forEach(function(s,i){console.log('port sec'+i+' h='+JSON.stringify(s.h).slice(0,40)+' h_es='+JSON.stringify(s.h_es).slice(0,40)+' heading='+JSON.stringify(s.heading).slice(0,40)+' heading_es='+JSON.stringify(s.heading_es).slice(0,40));});
var b=fs.readFileSync('build-guides.js','utf8').split(/\r?\n/);
b.slice(1250,1285).forEach(function(x,i){console.log('L'+(1251+i)+': '+x.slice(0,150));});
var en=fs.readFileSync('guides/premium-interfaces.html','utf8');
var es=fs.readFileSync('guides/premium-interfaces_es.html','utf8');
console.log('prem EN undefined count='+(en.split('undefined').length-1));
console.log('prem ES undefined count='+(es.split('undefined').length-1));
