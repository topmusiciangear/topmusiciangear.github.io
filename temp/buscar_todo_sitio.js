const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const BUSCA = ['Doppler', 'en lugar de con', 'sobrevivible', 'float de 32 bits', '32 bits float', 'quiere fondo de escritorio'];

function barrer(o, ruta, acc) {
  if (typeof o === 'string') {
    BUSCA.forEach(k => {
      if (!o.includes(k)) return;
      [...o.matchAll(new RegExp('.{0,100}' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.{0,100}', 'g'))].forEach(m =>
        acc.push({ ruta, k, ctx: m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }));
    });
    return;
  }
  if (Array.isArray(o)) return o.forEach((v, i) => barrer(v, ruta + '[' + i + ']', acc));
  if (o && typeof o === 'object') Object.keys(o).forEach(k => barrer(o[k], ruta + '.' + k, acc));
}

const acc = [];
g.forEach(x => barrer(x, '[' + x.id + ']', acc));
console.log('=== RESIDUOS EN TODAS LAS GUIAS ===');
console.log('  total: ' + acc.length + '\n');
acc.forEach(a => console.log('  ' + a.k.padEnd(24) + a.ruta + '\n      ...' + a.ctx.slice(0, 165) + '...'));
