const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// Remover el párrafo del subwoofer WS-6.2 del verdict EN
g.verdict = g.verdict.replace('<p><strong><span class="product-name"> </span></strong> — A compact studio subwoofer with two 6.5-inch horizontally opposed woofers that cancel their own vibration.</p>', '');

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Verdict EN corregido - subwoofer removido');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('VERDICTO EN final:');
console.log(g2.verdict.substring(0, 600));