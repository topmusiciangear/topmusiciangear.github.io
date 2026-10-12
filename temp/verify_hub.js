var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var hub=d.find(function(x){return x.id==='best-keyboard'});
console.log('cols: '+hub.productTable.columns.length+' | rows lens: '+hub.productTable.rows.map(function(r){return r.values.length}).join(','));
console.log('sections: '+hub.sections.length+' | verdicts: '+hub.verdictProsCons.length);
console.log('related: '+JSON.stringify(hub.relatedGuides));
var s=JSON.stringify(hub);
console.log('midi-keyboards refs left in hub: '+(s.match(/midi-keyboards/g)||[]).length);
