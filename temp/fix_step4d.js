const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/bbl_step4.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('totalmente pasivo, el el que mejor se toca').join('totalmente pasivo, el que mejor se toca');
s = s.split('// f.text_es = f.text_es.replace(\'el que mejor se toca de esta lista\');').join('');
fs.writeFileSync(f, s, 'utf8');
console.log('ok');
const i = s.indexOf('totalmente pasivo');
console.log(s.slice(i - 40, i + 200));