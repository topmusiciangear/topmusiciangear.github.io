var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var l=Array.isArray(d)?d:d.guides;
function gf(id){for(var i=0;i<l.length;i++)if(l[i].id===id)return l[i];return null;}
function k(o){return o?Object.keys(o):[];}
var p=gf('premium-interfaces');
var q=gf('portable-interfaces');
console.log('premium.sectionsN='+(p.sections?p.sections.length:'n')+'  portable.sectionsN='+(q.sections?q.sections.length:'n'));
var ps=p.sections&&p.sections[0];
var qs=q.sections&&q.sections[0];
console.log('prem.s0 keys='+k(ps).join(','));
console.log('port.s0 keys='+k(qs).join(','));
console.log('prem.s0.title='+JSON.stringify(ps&&ps.title)+' title_es='+JSON.stringify(ps&&ps.title_es));
console.log('port.s0.title='+JSON.stringify(qs&&qs.title)+' title_es='+JSON.stringify(qs&&qs.title_es));
console.log('prem.s1.title='+JSON.stringify(p.sections&&p.sections[1]?p.sections[1].title:null)+' title_es='+JSON.stringify(p.sections&&p.sections[1]?p.sections[1].title_es:null));
console.log('prem.s0.blocks/body? '+(ps&&ps.blocks?ps.blocks.length:'-')+'/'+(ps&&ps.body?'Y':'n'));
var h=fs.readFileSync('build-guides.js','utf8').split(/\r?\n/);
for(var i=0;i<h.length;i++){var t=h[i];
 if(t.indexOf('guide-section-heading')>=0||t.indexOf('sections.map')>=0||t.indexOf("s.title_es")>=0||t.indexOf("guide.sections")>=0){console.log('BUILD L'+(i+1)+': '+t.trim().slice(0,180));}
}
