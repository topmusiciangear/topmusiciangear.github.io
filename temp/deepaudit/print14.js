var g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function byId(id) { return g.find(function (x) { return x.id === id; }); }
function show(id, f) { var x = byId(id); var o = f.split(/[.\[\]]+/).filter(Boolean).reduce(function (a, k) { return a == null ? a : a[k]; }, x); console.log('## [' + id + '].' + f + ' = ' + JSON.stringify(o)); }

var m50 = byId('m50x-vs-mdr7506');
console.log('== m50x-vs-mdr7506 sections[3].content ==');
console.log(m50.sections[3].content);
console.log('\n== m50x-vs-mdr7506 faq_a5 ==');
Object.keys(m50.featuredSnippet).sort().forEach(function (k) { if (/^faq/.test(k) && /M50x|MDR|m50x|mdr/i.test(String(m50.featuredSnippet[k]))) console.log('  ' + k + ' = ' + JSON.stringify(m50.featuredSnippet[k])); });

console.log('\n== beginner-bass-guitars FAQ ==');
var bb = byId('beginner-bass-guitars');
Object.keys(bb.featuredSnippet).sort().forEach(function (k) { if (/^faq/.test(k)) console.log('  ' + k + ' = ' + JSON.stringify(bb.featuredSnippet[k])); });