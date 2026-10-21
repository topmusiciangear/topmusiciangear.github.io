const fs = require('fs');
const es = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');
const en = fs.readFileSync('guides/monitor-setup.html', 'utf8');

function clean(s) { return s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }

function verdict(s) {
  const i = s.indexOf('<div class="verdict-text">');
  const j = s.indexOf('</div>', i);
  return clean(s.slice(i, j));
}
function conclusion(s) {
  const i = s.indexOf('<section class="guide-conclusion"');
  const next = s.indexOf('</section>', i);
  return clean(s.slice(i, next));
}

console.log('=== VEREDICTO ES ===\n' + verdict(es));
console.log('\n=== VEREDICTO EN ===\n' + verdict(en));
console.log('\n=== CONCLUSION ES ===\n' + conclusion(es));
console.log('\n=== CONCLUSION EN ===\n' + conclusion(en));

const checks = [
  ['ES monitores sobre soportes de suelo', es.includes('Monitores sobre soportes de suelo')],
  ['ES según tu distribución', es.includes('según tu distribución')],
  ['ES campo medio', es.includes('monitores de campo medio mucho más pesados')],
  ['ES presupuesto justo', es.includes('si vas con el presupuesto justo')],
  ['ES evita duplicar gastos', es.includes('Evita duplicar gastos')],
  ['ES sin "ningún micrófono extra"', !es.includes('ningún micrófono extra')],
  ['ES sin midfield en cuerpo', !/midfield/i.test(es.replace(/<script[\s\S]*?<\/script>/g, ''))],
  ['ES K&M best for', es.includes('Soportes de suelo a la altura del oído')],
  ['ES sin "en el suelo" engañoso', !/altura del oído en el suelo/.test(es)],
  ['EN floor stands heading', en.includes('Monitors on floor stands')],
  ['EN layout', en.includes('for your layout')],
  ['EN midfield monitors', en.includes('much heavier midfield monitors')],
  ['EN budget tight', en.includes('if your budget is tight')]
];
console.log('\n=== CHECKS ===');
let fails = 0;
for (const [n, ok] of checks) { if (!ok) fails++; console.log((ok ? 'OK   ' : 'FALLA') + ' ' + n); }
console.log('fallos:', fails);
