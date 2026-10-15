const fs = require('fs'), path = require('path');
const raiz = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

const BUSCAR = [
  ['circularity/circuitry (calco)', /circuitry|circuiter[ií]a/i],
  ['Apollo 6110', /6110/],
  ['UA 610', /\bUA\s?610\b|610-A|610-B/],
  ['DUO Core', /DUO\s?Core/i],
  ['Essentials+', /Essentials\s?\+/i],
  ['dB-A (guion)', /dB-A/],
  ['dBA (sin guion)', /dBA/],
  ['"sobrevivible" (calco)', /sobrevivible/i],
  ['"en lugar de con" (error mio)', /en lugar de con /],
  ['"quiere fondo de escritorio" (calco)', /quiere fondo de escritorio/i],
  ['"a menos 12 dB por octava"', /a menos 12 dB por octava/i],
  ['"el pico es de 102"', /el pico es de 102/i],
  ['"pico a 1 m" / "pico" generico', /pico a 1 m|\bel pico\b/i],
  ['"filtro Aston" sin antipop', /filtro Aston(?! antipop)/i],
  ['"mejora de interfaz"', /mejora de interfaz/i],
  ['"a bordo"', /a bordo/i]
];

const resultado = {};
archivos = fs.readdirSync(raiz).filter(f => f.endsWith('_es.html'));
BUSCAR.forEach(([nombre, re]) => { resultado[nombre] = { n: 0, donde: new Set(), ej: '' }; });

archivos.forEach(f => {
  const d = fs.readFileSync(path.join(raiz, f), 'utf8');
  BUSCAR.forEach(([nombre, re]) => {
    const m = d.match(new RegExp(re.source, re.flags.replace('g', '') + 'g'));
    if (m) {
      resultado[nombre].n += m.length;
      resultado[nombre].donde.add(f);
      if (!resultado[nombre].ej) {
        const i = d.search(new RegExp(re.source, re.flags.replace('g', '')));
        resultado[nombre].ej = d.slice(Math.max(0, i - 90), i + 90).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      }
    }
  });
});

console.log('=== ¿EXISTE EN LAS ' + archivos.length + ' PAGINAS EN ESPAÑOL? ===\n');
BUSCAR.forEach(([nombre]) => {
  const r = resultado[nombre];
  console.log('  ' + (r.n ? 'SI ' + String(r.n).padStart(4) : '   no') + '  ' + nombre);
  if (r.n) {
    console.log('        en: ' + [...r.donde].slice(0, 4).join(', ') + (r.donde.size > 4 ? ' (+' + (r.donde.size - 4) + ')' : ''));
    console.log('        ej: ...' + r.ej.slice(0, 150) + '...');
  }
});
