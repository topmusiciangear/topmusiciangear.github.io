const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/live_st2.html', 'utf8');
console.log('=== PAGINA VIVA · starter-studio ES ===\n');
const COMPROBAR = [
  ['6110 (Apollo)', /6110/], ['EQ Doppler', /Doppler/], ['"Las pajas"', /Las pajas/],
  ['escurrido', /escurrido/], ['empastre', /empastre/], ['explosivas', /explosivas/],
  ['depurar', /depurar/], ['Diez centímetros', /Diez centímetros/],
  ['adaptador DIN', /adaptador DIN/], ['en lugar de con', /en lugar de con/],
  ['sobrevivible', /sobrevivible/i], ['desaparecen primero', /desaparecen primero/],
  ['Absórbelos', /Absórbelos/], ['cuadruple de conductor', /cuadruple de conductor/],
  ['se cancela a sí misma', /se cancela a sí misma/],
  ['USB en el NT1 Signature', /Signature hace el USB/],
  ['salida digital de 32 bits en el Signature', /misma salida digital de 32 bits/],
  ['"El circuitry"', /El circuitry/], ['compingando', /compingando/],
  ['mal puesta a tierra', /mal puesta a tierra/], ['float de 32 bits', /float de 32 bits/]
];
let sucios = 0;
COMPROBAR.forEach(([nombre, re]) => {
  const c = (d.match(new RegExp(re.source, 'g')) || []).length;
  sucios += c;
  console.log('  ' + String(c).padStart(3) + '  ' + nombre);
});
console.log('\n  TOTAL RESIDUOS EN LA PAGINA VIVA: ' + sucios);
console.log('\n=== AHORA DEBERIA ESTAR ===');
[['UA 610', /UA 610/], ['Catorce centímetros', /Catorce centímetros/],
 ['filtro de escritorio', /filtro de escritorio/i],
 ['par cuadripolar', /par cuadripolar/], ['sin toma de tierra', /sin toma de tierra/],
 ['las plosivas', /plosivas/], ['barro en los medios', /barro en los medios/],
 ['solo XLR', /solo XLR/], ['Combínalo', /Combínalo/]
].forEach(([nombre, re]) => console.log('  ' + String((d.match(new RegExp(re.source, 'g')) || []).length).padStart(3) + '  ' + nombre));
console.log('\n  mojibake: ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  veredictos 4+4: ' + d.split('<div class="verdict-product-name">').length);
