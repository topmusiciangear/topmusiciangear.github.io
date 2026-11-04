const fs=require('fs');
const raw=fs.readFileSync('data/guides.json','utf8');
const idx=raw.indexOf('Boss TU-3 Afinador Cromático</span></strong> — El estándar de escenario. Construcción a prueba de balas');
if(idx===-1){console.log('not found');process.exit(0);}
const start=raw.lastIndexOf('<p><strong><span class=\\"', idx);
const end=raw.indexOf('</p>', idx)+4;
console.log( JSON.stringify(raw.slice(start,end)) );
