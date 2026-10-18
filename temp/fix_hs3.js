const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const s = g.sections[7];

// HS3 se vende por unidad ($190-230 c/u). No tiene XLR balanceado (solo RCA + TRS).
// Room Control es un corte de graves simple; High Trim es +/-2 dB en agudos.
// El texto anterior exageraba ambas cosas y confundia precio unidad/par.
const EN = '<p>The Yamaha HS3 is sold individually at $190 to $230 per unit, so a pair costs $380 to $460. It has unbalanced RCA and TRS inputs (no XLR), and a basic Room Control low-cut plus a High Trim switch. It is a genuinely good small monitor, but it simply is not a sub-$150 pair.</p>';
const ES = '<p>El Yamaha HS3 se vende por unidades a $190–230 cada una, así que un par cuesta $380–460. Solo tiene entradas RCA y TRS no balanceadas (sin XLR), y un interruptor Room Control de corte de graves más un High Trim de ±2 dB. Es un monitor pequeño genuinamente bueno, pero simplemente no es un par por debajo de $150.</p>';

function setP(cont, nuevo) {
  const ps = cont.split('</p>').map(x => x.trim()).filter(Boolean);
  ps[ps.length - 1] = nuevo.replace(/^<p>/, '').replace(/<\/p>$/, '');
  return ps.map(p => '<p>' + p + '</p>').join('');
}

s.content = setP(s.content, EN);
s.content_es = setP(s.content_es, ES);

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('Corregido. Verificacion:');
const st = x => String(x).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
console.log('EN: ' + st(s.content.split('</p>')[3]));
console.log('ES: ' + st(s.content_es.split('</p>')[3]));