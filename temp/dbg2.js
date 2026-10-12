var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
console.log('has "634": '+(en.indexOf('"634"')>-1)+' | 634:: '+(en.indexOf('634:')>-1));
var i=en.indexOf('SENE906');
console.log('CTX: '+en.slice(Math.max(0,i-400),i+200).replace(/\n/g,' ').slice(-500));
console.log('--- verdict blocks in guides.json ---');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-mic-for-guitar-amps'});
console.log('verdict names: '+g.verdictProsCons.map(function(v){return v.name}).join(' | '));
