const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
const g = guides.find(x => x.id === 'starter-studio');

const EN = 'Home Studio Under $1,000: 3 Setups That Actually Work';
const ES = 'Home studio por menos de $1.000, en tres niveles';

g.titleTag = EN;
g.titleTag_es = ES;
g.title_es = ES;

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('EN titleTag:    "' + EN + '"  (' + EN.length + 'c)');
console.log('ES titleTag_es: "' + ES + '"  (' + ES.length + 'c)');
console.log('ES title_es:    sincronizado');
const cjk = (JSON.stringify(guides).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length ? [...new Set(cjk)].join('') : 'ninguno'));