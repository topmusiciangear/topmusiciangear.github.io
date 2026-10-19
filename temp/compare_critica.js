const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

console.log('=== NOTAS REALES DE LA GUIA (data/products.json) ===');
const nombres = ['Beyerdynamic DT 990 Pro', 'Audio-Technica ATH-M50x', 'Sony MDR-7506',
  'Sennheiser HD 490 Pro Plus', 'Beyerdynamic DT 770 Pro', 'Sennheiser HD 600'];
nombres.forEach(n => {
  const p = products.find(x => x.title === n || x.title_es === n);
  console.log('  ' + (p ? p.score.toFixed(2) : '?') + '  ' + n + (p ? '  ($' + p.price + ')' : ''));
});

console.log('\n=== LO QUE LA CRITICA AFIRMA ===');
const crit = { 'Sony MDR-7506': 9.4, 'Sennheiser HD 600': 9.3, 'Audio-Technica ATH-M50x': 9.2, 'Beyerdynamic DT 990 Pro': 9.0, 'Beyerdynamic DT 770 Pro': 9.1, 'Sennheiser HD 490 Pro Plus': 9.7 };
Object.entries(crit).forEach(([n, s]) => console.log('  ' + s + '  ' + n));

console.log('\n=== COMPARACION ===');
nombres.forEach(n => {
  const p = products.find(x => x.title === n || x.title_es === n);
  const real = p ? p.score : null;
  const afirmado = crit[n];
  const coincide = real !== null && Math.abs(real - afirmado) < 0.001;
  console.log('  ' + n.padEnd(30) + ' real=' + real + '  critica=' + afirmado + '  ' + (coincide ? 'COINCIDE' : 'NO COINCIDE'));
});
