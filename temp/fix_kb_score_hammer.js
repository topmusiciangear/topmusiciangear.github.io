const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const c=fs.readFileSync(B+'js/guide-scores.js','utf8');
const s=c.indexOf(' "best-keyboard": {');
const e=c.indexOf(' },', s)+3;
const newScores={
 'Nord Stage 4 88':9.8,
 'Native Instruments Kontrol S61 MK3':9.6,
 'Roland FP-30X':9.4,
 'Yamaha P-225':9.4,
 'Arturia KeyLab Essential 61 MkIII':9.3,
 'Novation Launchkey 49 MK4':9.2,
 'Roland GO:KEYS 3':9.1,
 'M-Audio Hammer 88':9.1,
 'Akai MPK Mini MK4':9.0,
 'Novation Launchkey Mini 25 MK4':9.0
};
const block=' "best-keyboard": {\n'+Object.keys(newScores).map(k=>'  "'+k+'": '+newScores[k]+',').join('\n')+'\n }';
const updated=c.slice(0,s)+block+c.slice(e);
fs.writeFileSync(B+'js/guide-scores.js', updated,'utf8');
console.log('done');