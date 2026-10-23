const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

// Corregir verdict_es
g.verdict_es = g.verdict_es
  .replace('<span class="product-name"> LP-6 V2</span>', '<span class="product-name">Kali Audio LP-6 V2</span>')
  .replace('<span class="product-name"> IN-8 V2</span>', '<span class="product-name">Kali Audio IN-8 V2</span>')
  .replace('<span class="product-name"> IN-UNF</span>', '<span class="product-name">Kali Audio IN-UNF</span>')
  .replace('<span class="product-name"> LP-UNF</span>', '<span class="product-name">Kali Audio LP-UNF</span>')
  .replace('<p><strong><span class="product-name"> </span></strong> — Un subwoofer de estudio compacto con dos woofers de 6,5 pulgadas opuestos horizontalmente que cancelan su propia vibración.</p>', '');

// Corregir verdict (EN)
g.verdict = g.verdict
  .replace('<span class="product-name"> LP-6 V2</span>', '<span class="product-name">Kali Audio LP-6 V2</span>')
  .replace('<span class="product-name"> IN-8 V2</span>', '<span class="product-name">Kali Audio IN-8 V2</span>')
  .replace('<span class="product-name"> IN-UNF</span>', '<span class="product-name">Kali Audio IN-UNF</span>')
  .replace('<span class="product-name"> LP-UNF</span>', '<span class="product-name">Kali Audio LP-UNF</span>')
  .replace('<p><strong><span class="product-name"> </span></strong> — A compact studio subwoofer with two 6.5-inch horizontal woofers that cancel their own vibration.</p>', '');

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Verdict corregido');

// Verificar
const obj2 = JSON.parse(fs.readFileSync(path, 'utf8'));
const g2 = obj2.find(x => x.id === 'best-monitors');
console.log('VERDICTO ES corregido:');
console.log(g2.verdict_es.substring(0, 600));