const fs = require('fs');
const s = fs.readFileSync('guides/best-home-studio-speakers_es.html', 'utf8');
const i = s.indexOf('Nuestra nota');
// imprimir el badge completo
const start = s.lastIndexOf('<div', i);
const end = s.indexOf('</div></div>', i);
console.log(s.slice(start, end + 12));
