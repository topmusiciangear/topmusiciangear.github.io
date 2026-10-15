const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

function buscar(re, etiqueta) {
  console.log('\n' + '-'.repeat(76) + '\n### ' + etiqueta);
  let n = 0;
  s.sections.forEach((sec, i) => {
    ['content', 'content_es'].forEach(k => {
      const v = sec[k] || '';
      [...v.matchAll(new RegExp('.{0,300}' + re.source + '.{0,300}', 'g' + (re.flags.replace('g', ''))))].forEach(m => {
        n++;
        console.log('\n  [sec ' + i + ' · ' + k + '] ' + sec.heading_es.slice(0, 55));
        console.log('  ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...');
      });
    });
  });
  if (!n) console.log('  (NO ENCONTRADO)');
}

buscar(/DIN|controlador MIDI|controlador con salida/i, 'A) MIDI DIN — ¿se atribuye a la Scarlett 2i2?');
buscar(/oclusiv|plosiv/i, 'B) "consonante oclusiva" / plosivas');
buscar(/float de 32|32 bits float|punto flotante/i, 'C) "float de 32 bits"');
buscar(/por bus|bus power|alimentaci[oó]n por bus/i, 'D) alimentacion por bus');
buscar(/empastre/i, 'E) "empastre"');
buscar(/Shorts Reach Farther|C[oó]mo Reach|reach farther/i, 'F) (contexto para el empastre)');
buscar(/Scarlett/i, 'G) Scarlett — menciones');
