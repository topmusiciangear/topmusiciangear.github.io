const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const s = g.sections[7];

const st = x => String(x).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
console.log('ANTES EN: ' + st(s.content.split('</p>')[3]).slice(0, 90));
console.log('ANTES ES: ' + st(s.content_es.split('</p>')[3]).slice(0, 90));

// localizar por el ancla "Yamaha HS3" en el ultimo parrafo
function arreglar(cont, ancla, nuevo) {
  const ps = cont.split('</p>');
  let n = -1;
  ps.forEach((p, i) => { if (p.indexOf(ancla) >= 0) n = i; });
  if (n < 0) return [cont, 0];
  ps[n] = ps[n].replace(/^<p>/, '') + '</p>';
  ps[n] = '<p>' + nuevo;
  return [ps.join(''), 1];
}

const EN = 'The Yamaha HS3 costs $190 to $230 depending on the retailer, and it is a genuinely good monitor with balanced XLR and proper Room Control switches. It simply is not a sub-$150 pair.</p>';
const ES = 'El Yamaha HS3 cuesta entre $190 y $230 según la tienda, y es un monitor genuinamente bueno con XLR balanceado y conmutadores de corrección de sala de verdad. Simplemente no es un par por debajo de $150.</p>';

let a, b;
[s.content, a] = arreglar(s.content, 'The Yamaha HS3', EN);
[s.content_es, b] = arreglar(s.content_es, 'El Yamaha HS3', ES);

console.log('EN parrafo reescrito: ' + a + ' | ES parrafo reescrito: ' + b);
console.log('');
console.log('DESPUES EN: ' + st(s.content.split('</p>')[3]));
console.log('DESPUES ES: ' + st(s.content_es.split('</p>')[3]));

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
const fin = JSON.stringify(g);
console.log('');
console.log('quedan "ganga": ' + (fin.match(/ganga/g) || []).length + ' | "bargain": ' + (fin.match(/bargain/g) || []).length);