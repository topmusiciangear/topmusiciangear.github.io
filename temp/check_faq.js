const fs = require('fs');
const file = process.argv[2] || 'guides/best-monitors.html';
const h = fs.readFileSync(file, 'utf8');
let i = -1;
const ctx = [];
while ((i = h.indexOf('7050C', i + 1)) >= 0) {
  ctx.push(h.slice(Math.max(0, i - 100), i + 60).replace(/\s+/g, ' ').slice(0, 170));
}
console.log('== menciones 7050C: ' + ctx.length + ' ==');
ctx.forEach(c => console.log(' - ' + c));
const items = [...h.matchAll(/<div class="guide-faq-item">/g)];
console.log('faq-item divs: ' + items.length);
const qs = [...h.matchAll(/<button class="guide-faq-question"[^>]*>([\s\S]*?)<span class="guide-faq-icon">/g)]
  .map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('preguntas (' + qs.length + '):');
qs.forEach(q => console.log(' - ' + q));
