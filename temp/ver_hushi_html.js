const fs = require('fs'), path = require('path');
const raiz = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
let n = 0;
fs.readdirSync(raiz).filter(f => f.endsWith('.html')).forEach(f => {
  const d = fs.readFileSync(path.join(raiz, f), 'utf8');
  if (d.includes('61MX8mAxVfL')) { n++; console.log('  OK  ' + f); }
  if (d.includes('617seFCYGUL')) console.log('  VIEJA AUN EN ' + f);
});
console.log('paginas con la foto nueva: ' + n);
