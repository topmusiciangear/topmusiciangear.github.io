const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

const BUSQUEDAS = [
  'wish', 'necessary', 'serves', 'ocho pulgadas', '250 ohmios',
  'ohms of rugged', 'amplificador', 'amplifier', 'por traducción',
  'siete pulgadas', 'seven-inch', 'rochester', 'ohms'
];

// recorrer TODO el guide (EN y ES) y reportar donde aparece
function recorrer(etiqueta, valor) {
  const res = [];
  if (typeof valor === 'string') {
    BUSQUEDAS.forEach(b => {
      if (valor.toLowerCase().indexOf(b.toLowerCase()) > -1) {
        const i = valor.toLowerCase().indexOf(b.toLowerCase());
        res.push({ donde: etiqueta, busqueda: b, ctx: valor.slice(Math.max(0, i - 130), i + 150) });
      }
    });
  } else if (Array.isArray(valor)) {
    valor.forEach((v, i) => recorrer(etiqueta + '[' + i + ']', v));
  } else if (valor && typeof valor === 'object') {
    Object.keys(valor).forEach(k => recorrer(etiqueta + '.' + k, valor[k]));
  }
  return res;
}

const todos = recorrer('guia', guia);
const visto = new Set();
todos.forEach(r => {
  const k = r.busqueda + '|' + r.ctx.slice(0, 40);
  if (visto.has(k)) return;
  visto.add(k);
  console.log('\n### ' + r.busqueda + '  @ ' + r.donde);
  console.log('    ...' + r.ctx.replace(/\s+/g, ' ') + '...');
});
