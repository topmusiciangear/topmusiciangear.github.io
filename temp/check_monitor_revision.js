const fs = require('fs');

const en = fs.readFileSync('guides/monitor-setup.html', 'utf8');
const es = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');

function headings(s) {
  const re = /<h2 class="guide-section-heading">([\s\S]*?)<\/h2>/g;
  const out = [];
  let m;
  while ((m = re.exec(s))) out.push(m[1].replace(/<[^>]+>/g, '').trim());
  return out;
}

console.log('=== ORDEN EN ===');
headings(en).forEach((h, i) => console.log(i + '. ' + h));
console.log('\n=== ORDEN ES ===');
headings(es).forEach((h, i) => console.log(i + '. ' + h));

const checks = [
  ['EN avisos calibración', en, 'buy one microphone, not three'],
  ['EN avisos soportes', en, 'floor or desk, not both'],
  ['ES avisos calibración', es, 'un micrófono, no tres'],
  ['ES avisos soportes', es, 'suelo o escritorio, no ambos'],
  ['EN HS8 cables', en, 'No audio cables ship in the box'],
  ['ES HS8 cables', es, 'No incluye cables de audio'],
  ['EN Focal cables', en, 'Budget XLR or TRS cables too'],
  ['ES Focal cables', es, 'Presupuesta también cables XLR o TRS'],
  ['EN K&M base', en, 'flat base takes far less floor space'],
  ['ES K&M base', es, 'base plana ocupa mucho menos suelo'],
  ['EN K&M placa', en, 'bare metal with small rubber dots'],
  ['ES K&M placa', es, 'metal desnudo con pequeñas gomas'],
  ['EN Sonarworks latencia', en, 'bypass it while you track'],
  ['ES Sonarworks latencia', es, 'desactívalo mientras grabas'],
  ['EN UMIK USB', en, 'plugs straight into the computer rather than your audio interface'],
  ['ES UMIK USB', es, 'se conecta directo al ordenador y no a tu interfaz'],
  ['EN veredicto', en, 'No single product wins this guide'],
  ['ES veredicto', es, 'Aquí no gana un solo producto'],
  ['EN conclusión', en, 'The best setup is a chain, not a single box'],
  ['ES conclusión', es, 'La mejor configuración es una cadena, no un solo aparato'],
  ['EN tabla sin (Each)', en, 'K&M 26722 Monitor Stands</th>'],
  ['EN tabla sin (Pair) ISO', en, 'IsoAcoustics ISO-200 Studio Monitor Stands</th>'],
  ['ES tabla sin (Unidad)', es, 'Soportes de monitor K&M 26722</th>'],
  ['EN UMIK calibrado', en, '±1 dB calibrated'],
  ['ES UMIK calibrado', es, '±1 dB calibrado'],
  ['EN MS-100 categoría', en, 'Heavy Midfield Monitor Stands'],
  ['ES MS-100 categoría', es, 'Soportes para monitores midfield pesados'],
  ['EN FAQ 30°', en, 'rotated exactly 30° toward your head'],
  ['ES FAQ 30°', es, 'rotadas exactamente 30° hacia tu cabeza'],
  ['EN cons HS8 cables', en, 'No audio cables in the box'],
  ['ES cons HS8 cables', es, 'Sin cables de audio en la caja'],
  ['EN pros K&M base', en, 'Flat base uses far less floor space'],
  ['EN cons K&M gomas', en, 'Bare metal top plate with small rubber dots'],
  ['EN cons Sonarworks latencia', en, 'bypass it while tracking'],
  ['EN cons UMIK USB', en, 'USB mic: plugs into the computer'],
  ['ES cons UMIK USB', es, 'Micrófono USB: va al ordenador']
];
console.log('\n=== COMPROBACIONES ===');
let fails = 0;
for (const [label, s, needle] of checks) {
  const ok = s.includes(needle);
  if (!ok) fails++;
  console.log((ok ? 'OK  ' : 'FALLA') + '  ' + label);
}
console.log('\nfallos: ' + fails);

// la tarjeta de producto debe conservar (Pair)/(par)
console.log('\nEN tarjeta conserva (Pair):', en.includes('IsoAcoustics ISO-200 Studio Monitor Stands (Pair)'));
console.log('ES tarjeta conserva (par):', es.includes('Soportes de monitor IsoAcoustics ISO-200 (par)'));
console.log('EN restos "(Each)" en tabla:', /Monitor Stands \(Each\)/.test(en));
