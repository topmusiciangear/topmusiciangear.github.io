var fs=require('fs');
var f='temp/hub_move.js';
var L=fs.readFileSync(f,'utf8').split('\n');
console.log('line45='+JSON.stringify(L[44]));
if(L[44]==='});'){ L[44]=');'; fs.writeFileSync(f,L.join('\n')); console.log('FIXED line45 -> );'); }
else console.log('line45 not just }); — abort');
