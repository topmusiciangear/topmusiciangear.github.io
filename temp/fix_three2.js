const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/three_reviews.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('Adirondack Lovelymente envejecida').join('Adirondack envejecida térmicamente');
s = s.split('lo encuentra igualmente').join('lo encuentra igualmente');
s = s.split('LaFinding').join('lo encuentra');
s = s.split('找到').join('');
s = s.split('满足').join('satisfacen');
s = s.split('satisface').join('satisface');
s = s.split('来').join('de');
s = s.split('着').join('');
// buscar contexto de los restantes sospechosos
fs.writeFileSync(f, s, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('CJK: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
['Lovelymente', 'Finding', 'guitars', '满足', '来', '着', '能'].forEach(w => {
  const c = s.split(w).length - 1;
  if (c) {
    const i = s.indexOf(w);
    console.log('!! "' + w + '" x' + c + ' :: ' + JSON.stringify(s.slice(Math.max(0, i - 70), i + 40)));
  }
});