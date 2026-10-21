const fs = require('fs');
const path = require('path');

const dir = 'guides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const bad = [];
let total = 0;

for (const f of files) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const isEs = /_es\.html$/.test(f);
  const titles = [...s.matchAll(/guide-product-card-title">([^<]+)</g)].map(m => m[1]);
  for (const t of titles) {
    total++;
    const reasons = [];
    if (isEs) {
      if (/\((each|pair|cada uno|cada una)\)/i.test(t)) reasons.push('ES con etiqueta inglesa');
      if (/\(par\)/.test(t)) reasons.push('ES con par minúscula');
      if (/\(unidad\)/.test(t)) reasons.push('ES con unidad minúscula');
    } else {
      if (/\((unidad|par|cada uno|cada una)\)/i.test(t)) reasons.push('EN con etiqueta española');
      if (/\(each\)|\(pair\)/.test(t)) reasons.push('EN con etiqueta minúscula');
    }
    if (/\((each|pair|unidad|par)\)\s*\((each|pair|unidad|par)\)/i.test(t)) reasons.push('etiqueta duplicada');
    if (reasons.length) bad.push({ f, t, reasons });
  }
}

console.log('tarjetas revisadas:', total);
console.log('con problemas:', bad.length);
for (const b of bad.slice(0, 60)) console.log('  [' + b.f + '] ' + b.t + ' -> ' + b.reasons.join(', '));
