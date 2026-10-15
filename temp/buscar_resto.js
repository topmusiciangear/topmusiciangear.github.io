const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const BUSCA = ['6110', 'adaptador DIN', 'Diez centímetros', 'explosivas', 'depurar'];

function barrer(objeto, ruta) {
  BUSCA.forEach(k => {
    if (typeof objeto === 'string') {
      if (!objeto.includes(k)) return;
      [...objeto.matchAll(new RegExp('.{0,120}' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.{0,120}', 'g'))].forEach(m => {
        console.log('\n  [' + ruta + ']  ~' + k + '~');
        console.log('     ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...');
      });
    } else if (Array.isArray(objeto)) {
      objeto.forEach((v, i) => barrer(v, ruta + '[' + i + ']'));
    } else if (objeto && typeof objeto === 'object') {
      Object.entries(objeto).forEach(([k2, v]) => barrer(v, ruta + '.' + k2));
    }
  });
}

console.log('=== BUSQUEDA RECURSIVA EN TODA LA GUIA ===');
barrer(s, '');
console.log('\n  fin');
