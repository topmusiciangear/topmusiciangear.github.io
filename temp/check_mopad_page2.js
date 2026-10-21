const fs = require('fs');

const s = fs.readFileSync('guides/monitor-setup.html', 'utf8');
console.log('--- estado tienda en la pagina (EN) ---');
for (const term of ['Agotado', 'Out of stock', 'No disponible', 'Not available', 'REC0011572', 'B00266HBSU', 'AURMOPAD', 'B0002D0B4K']) {
  console.log(term + ': ' + (s.split(term).length - 1));
}
const i = s.indexOf('REC0011572');
if (i > -1) console.log('\ncontexto musicstore:', s.slice(i - 500, i + 200).replace(/\s+/g, ' '));

// pagina de subwoofers: imagen nueva del Neumann
const sub = fs.readFileSync('guides/studio-subwoofers-setup.html', 'utf8');
console.log('\n=== studio-subwoofers-setup ===');
console.log('cd5647866e (KH810 nueva):', (sub.split('cd5647866e').length - 1));
console.log('59e1c43c7e (KH810 vieja):', (sub.split('59e1c43c7e').length - 1));
