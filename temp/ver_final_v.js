const fs = require('fs');
const T = 'C:/Users/Daniel/AppData/Local/Temp/opencode/';

[['f1.html', 'ES'], ['f2.html', 'EN']].forEach(([f, etiqueta]) => {
  const d = fs.readFileSync(T + f, 'utf8');
  console.log('\n=== ' + etiqueta + ' EN VIVO ===');
  const malos = [
    ['NT1 Signature con USB', /Signature hace el USB|Signature runs USB/],
    ['NT1 Signature con 32 bits', /32 bits\/192 kHz integrada|32-bit\/192 kHz digital output/],
    ['RODE-LINK en el Signature', /RODE-LINK/],
    ['KRK woofer de 4 pulgadas', /woofer de 4 pulgadas|4-inch woofer/],
    ['KRK 140 W', /140\s?W/],
    ['49 ohmios', /49 ohm/],
    ['30 mm', /30 mm/],
    ['dB-A', /dB-A/],
    ['micro de 3.000', /\$3,000|3\.000/],
    ['bus power limita ganancia', /limitar la ganancia|limit gain/],
    ['cada pieza se puede pasar', /cada pieza se puede pasar|every part of it can move/],
    ['no te saltes los paneles', /no te saltes los paneles/]
  ];
  let total = 0;
  malos.forEach(([n, re]) => {
    const c = (d.match(new RegExp(re.source, 'g')) || []).length;
    total += c;
    console.log('  ' + String(c).padStart(3) + '  ' + n);
  });
  console.log('  --- residuos: ' + total);
  console.log('  veredictos : ' + d.split('<div class="verdict-product-name">').length);
  console.log('  mojibake   : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
  console.log('  KRK 145 W  : ' + (d.match(/145 W|145W/g) || []).length + ' apariciones');
  console.log('  38 ohmios  : ' + (d.match(/38 ohm/g) || []).length + ' apariciones');
});

console.log('\n\n=== VEREDICTO DEL NT1 SIGNATURE, EN VIVO (ES) ===');
const es = fs.readFileSync(T + 'f1.html', 'utf8');
const i = es.indexOf('verdict-product-name">Rode NT1 Signature Series');
if (i > -1) {
  const b = es.slice(i, es.indexOf('verdict-product-name', i + 40));
  b.replace(/<[^>]+>/g, '\n').split('\n').map(x => x.trim()).filter(x => x.length > 25)
    .forEach(x => console.log('  ' + x.slice(0, 150)));
}
