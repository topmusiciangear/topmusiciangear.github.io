// Comprobaciones de seguridad tras el arreglo de <p>:
//  1) ningun <p> dentro de <li> o <td> (rompe la maquetacion de listas/tablas)
//  2) ningun <p> anidado (<p> dentro de <p>)
//  3) texto no alterado: comparar con el backup ignorando las etiquetas <p>
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const nuevo = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const viejo = JSON.parse(fs.readFileSync(B + 'temp/guides.before_pfix.json', 'utf8'));

let pEnLista = 0, pAnidado = 0, textoDistinto = 0, campos = 0;
const ejemplos = [];

const stripP = s => s.replace(/<\/?p(\s[^>]*)?>/gi, '');

const recorrer = (a, b, path) => {
  if (typeof a === 'string' || typeof b === 'string') {
    if (typeof a !== typeof b) return;
    if (typeof a !== 'string') return;
    campos++;

    // 1) <p> dentro de <li> o <td>
    if (/<li[^>]*>[\s\S]*?<p[\s>]/i.test(b) || /<td[^>]*>[\s\S]*?<p[\s>]/i.test(b)) {
      pEnLista++; ejemplos.push('P EN LISTA/TABLA: ' + path);
    }
    // 2) <p> anidado
    if (/<p[^>]*>[\s\S]*?<p[\s>][^]*?<\/p>[\s\S]*?<\/p>/i.test(b)) {
      pAnidado++; ejemplos.push('P ANIDADO: ' + path);
    }
    // 3) el texto (sin etiquetas <p>) debe ser identico
    if (stripP(a) !== stripP(b)) {
      textoDistinto++;
      if (ejemplos.length < 40) ejemplos.push('TEXTO DISTINTO: ' + path);
    }
    return;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    a.forEach((v, i) => recorrer(v, b[i], path + '[' + i + ']'));
    return;
  }
  if (a && b && typeof a === 'object') {
    Object.keys(a).forEach(k => recorrer(a[k], b[k], path + '.' + k));
  }
};

recorrer(nuevo, viejo, '');
console.log('Campos de texto comparados: ' + campos);
console.log('<p> dentro de <li>/<td>:   ' + pEnLista);
console.log('<p> anidados:              ' + pAnidado);
console.log('Texto alterado (debe ser 0): ' + textoDistinto);
ejemplos.slice(0, 20).forEach(e => console.log('   ' + e));
