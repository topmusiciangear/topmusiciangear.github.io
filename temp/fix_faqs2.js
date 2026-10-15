const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');
s = s.split('compromiso quetaking muchos').join('compromiso que muchos');
fs.writeFileSync(f, s, 'utf8');
console.log('queda "quetaking": ' + (s.split('quetaking').length - 1));
// re-scan de restos sospechosos en los textos ES de las FAQs nuevas
const NEW = s.match(/'(?:What|Do |Can |How |Is |Should|Where|Will|One |Do )[\s\S]*?'/g) || [];
console.log('bloques EN detectados: ' + NEW.length);
['computer', 'flow', 'a la coupe', 'downward', 'lasering', 'Add'].forEach(w => {
  const c = s.split(w).length - 1;
  if (c) { const i = s.indexOf(w); console.log('!! "' + w + '" :: ' + JSON.stringify(s.slice(Math.max(0, i - 60), i + 40))); }
});
console.log('limpio');