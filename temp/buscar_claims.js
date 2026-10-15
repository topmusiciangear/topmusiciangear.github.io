const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const buscar = (re, etiqueta) => {
  console.log('\n' + '='.repeat(78) + '\n### ' + etiqueta + '\n' + '='.repeat(78));
  let n = 0;
  s.sections.forEach((sec, i) => {
    ['content', 'content_es'].forEach(k => {
      const v = sec[k] || '';
      const ms = [...v.matchAll(new RegExp('.{0,320}' + re.source + '.{0,320}', 'g' + (re.flags.replace('g', ''))))];
      ms.forEach(m => {
        n++;
        console.log('\n  [sec ' + i + ' · ' + k + '] "' + sec.heading_es.slice(0, 60) + '"');
        console.log('  ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...');
      });
    });
  });
  if (!n) console.log('  (no encontrado)');
};

// 1) NT1 Signature: USB / 32 bits / RODE-LINK
buscar(/NT1 Signature/i, '1) NT1 Signature — ¿se le atribuye USB o 32 bits?');
buscar(/RODE-LINK|RØDE-LINK/i, '1b) RODE-LINK');

// 8) Squarewave / espesor
buscar(/Squarewave/i, '2) Paneles Squarewave — ¿espeor en centimetros?');
buscar(/diez centímetros|10 cm|10 centímetros/i, '2b) "diez centímetros"');

// 4) el bajo desaparece primero
buscar(/desaparece|disappears first|se va con ellos/i, '3) Filtrado en peine / el bajo desaparece');

// 5) MIDI DIN en la Scarlett
buscar(/DIN|MIDI/i, '4) MIDI DIN y la Scarlett 2i2');

// 6) empastre / medios
buscar(/empastre|muddy/i, '5) "empastre" de medios');

// 7) oclusiva / plosivas
buscar(/oclusiv|plosiv/i, '6) oclusivas / plosivas');

// 8) float / 32 bits
buscar(/float de 32|32 bits float|punto flotante/i, '7) "float de 32 bits"');

// 9) alimentacion por bus
buscar(/bus|Phantom|phantom/i, '8) alimentacion por bus / phantom');
