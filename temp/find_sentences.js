const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

const OBJETIVOS = [
  ['best-reverb-delay', 'whether consider'],
  ['budget-monitors', 'if consider'],
  ['best-condenser-mics', 'if consider'],
  ['usb-mics', 'if consider'],
  ['best-microphone', 'If consider'],
  ['m50x-vs-mdr7506', 'If consider'],
  ['best-amp-modelers', 'If consider'],
];

function barrer(g, etiqueta, aguja) {
  const salida = [];
  (function w(v, ruta) {
    if (typeof v === 'string') {
      if (v.toLowerCase().indexOf(aguja.toLowerCase()) > -1) salida.push({ ruta, texto: v });
    } else if (Array.isArray(v)) v.forEach((x, i) => w(x, ruta + '[' + i + ']'));
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], ruta + '.' + k));
  })(g, etiqueta);
  return salida;
}

for (const [gid, aguja] of OBJETIVOS) {
  const g = guides.find(x => x.id === gid);
  console.log('\n################ ' + gid + '   (buscando: "' + aguja + '")');
  const hits = barrer(g, gid, aguja);
  console.log('  ' + hits.length + ' apariciones');
  hits.forEach(h => console.log('\n  --- ' + h.ruta + '\n  >>> ' + h.texto));
  // buscar el equivalente ES cercano
  console.log('\n  === textos ES de esta guia que mencionan el producto ===');
  (function w2(v, ruta) {
    if (typeof v === 'string' && v.length > 40 && /_es$/.test(ruta)) {
      const en = hits[0] ? hits[0].texto : '';
      const palabras = en.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(w => w.length > 4).slice(0, 3);
      if (palabras.length && palabras.every(p => v.toLowerCase().indexOf(p.toLowerCase().slice(0, 4)) > -1)) {
        console.log('  >>> [' + ruta + '] ' + v);
      }
    } else if (Array.isArray(v)) v.forEach((x, i) => w2(x, ruta + '[' + i + ']'));
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => w2(v[k], ruta + '.' + k));
  })(g, gid);
}