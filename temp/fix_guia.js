const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
if (!g) { console.log('no existe'); process.exit(1); }

let cambios = [];

// 1. caracter coreano colado en un heading_es
const coreano = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/;
const recorrer = (obj, rutaBase) => {
  if (typeof obj === 'string') {
    if (coreano.test(obj)) {
      cambios.push(rutaBase + ': "' + obj.slice(0, 60) + '"');
      return obj.replace(/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]+/g, 'calidad-precio');
    }
  } else if (Array.isArray(obj)) {
    return obj.map((v, i) => recorrer(v, rutaBase + '[' + i + ']'));
  } else if (obj && typeof obj === 'object') {
    const salida = {};
    for (const k of Object.keys(obj)) salida[k] = recorrer(obj[k], rutaBase + '.' + k);
    return salida;
  }
  return obj;
};
const limpio = recorrer(g, 'guia');
Object.keys(limpio).forEach(k => { g[k] = limpio[k]; });

// 2. meta ES <= 155
const descESVieja = g.description_es;
if (g.description_es.length > 155) {
  g.description_es = 'Mejores monitores de estudio doméstico por menos de $150. PreSonus, Mackie, M-Audio y Edifier con graves medidos. Mejor compra: PreSonus Eris E4.5.';
}

// 3. title EN mas corto
if (g.title.length > 62) {
  g.title = 'Best Home Studio Speakers Under $150 With Balanced Response';
}

// 4. heading_es queViola sentence case (Title Case en ES)
const fixesES = {
  'Lo que significa de verdad "respuesta equilibrada" por debajo de $150': 'Lo que significa de verdad "respuesta equilibrada" por debajo de $150',
  '¿Es el PreSonus Eris E4.5 el mejor monitor por debajo de $150?': '¿Es el PreSonus Eris E4.5 el mejor monitor por debajo de $150?',
  '¿Es el Mackie CR4.5 el monitor con mejor relación calidad-precio por debajo de $150?': '¿Es el Mackie CR4.5 el monitor con mejor relación calidad-precio por debajo de $150?',
  '¿Sigue siendo el PreSonus Eris 3.5 2nd Gen el mejor monitor calidad-precio?': '¿Sigue siendo el PreSonus Eris 3.5 2nd Gen el mejor monitor calidad-precio?',
  '¿Es el M-Audio BX4 el mejor monitor con pies de espuma?': '¿Es el M-Audio BX4 el mejor monitor con pies de espuma?',
  '¿Es el Mackie CR3.5 el mejor monitor compacto por debajo de $100?': '¿Es el Mackie CR3.5 el mejor monitor compacto por debajo de $100?',
  '¿Es el Edifier MR3 el monitor más completo por debajo de $100?': '¿Es el Edifier MR3 el monitor más completo por debajo de $100?',
  'El Edifier R1280T: los altavoces más populares de esta lista no son monitores': 'El Edifier R1280T: los altavoces más populares de esta lista no son monitores',
  'Por qué no hay un Yamaha HS5 ni un Adam T5V en esta guía': 'Por qué no hay un Yamaha HS5 ni un Adam T5V en esta guía'
};
g.sections.forEach(s => {
  if (fixesES[s.heading] && fixesES[s.heading] !== s.heading_es) { s.heading_es = fixesES[s.heading]; cambios.push('heading_es corregido: ' + s.heading_es); }
});

fs.writeFileSync(ruta, JSON.stringify(guides, null, 2), 'utf8');

console.log('=== CORRECCIONES ===');
cambios.forEach(c => console.log('  - ' + c));
console.log('\n=== COMPROBACIONES ===');
console.log('title EN (' + g.title.length + '): ' + g.title);
console.log('title ES (' + g.title_es.length + '): ' + g.title_es);
console.log('desc ES (' + g.description_es.length + '): ' + g.description_es);
console.log('desc ES <=155: ' + (g.description_es.length <= 155 ? 'OK' : 'FALLA'));
let coreanas = 0;
const contar = o => {
  if (typeof o === 'string') { if (coreano.test(o)) coreanas++; }
  else if (Array.isArray(o)) o.forEach(contar);
  else if (o && typeof o === 'object') Object.values(o).forEach(contar);
};
contar(g);
console.log('caracteres coreanos restantes: ' + coreanas);

// Title Case en ES: ninguna palabra capitalizada salvo inicio de frase
const malasES = [];
g.sections.forEach(s => {
  const h = s.heading_es.replace(/^[¿"']/, '');
  const palabras = h.split(/\s+/).filter(w => w.length > 3 && !/^(de|la|el|los|las|para|con|por|una|que|en|sin|un|al|y|o|más)$/i.test(w));
  const cap = palabras.filter(w => /^[A-ZÁÉÍÓÚÑ]/.test(w) && !/^(PreSonus|Mackie|M-Audio|Edifier|JBL|Yamaha|Adam|Kali|ADAM|Tannoy|Behringer|Holiday|Hollyland)$/i.test(w));
  if (cap.length) malasES.push(s.heading_es + '  -> capitalizadas: ' + cap.join(', '));
});
console.log('\nheadings_es con Title Case indebido: ' + malasES.length);
malasES.forEach(m => console.log('  ! ' + m));
