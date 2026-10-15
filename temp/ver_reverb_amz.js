const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
// reverb /item/ restante en HTML
let n = 0;
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));
files.forEach(f => {
  const d = fs.readFileSync(B + f, 'utf8');
  const m = d.match(/reverb\.com\/item\//g);
  if (m) { n += m.length; if (n <= 5) console.log('  ' + f + ': ' + m.length); }
});
console.log('reverb /item/ en HTML: ' + n + ' (debe ser 0)');

// ejemplo de fila amazon en guia de plugins
const d = fs.readFileSync(B + 'ai-tools-plugins.html', 'utf8');
const i = d.indexOf('data-store="amazon"');
console.log('\n--- fila amazon en plugins ---');
console.log(d.slice(Math.max(0, i - 100), i + 700).replace(/\s+/g, ' ').slice(0, 700));
