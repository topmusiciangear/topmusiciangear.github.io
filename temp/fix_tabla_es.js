const fs = require('fs');
const gp = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-plugins');
const c = g.productTable.rows[4].values[0];
console.log('antes  ES: ' + c.value_es);
c.value_es = '177 modelos en Standard; los 400+ requieren MAX, con captura Tonex';
console.log('despues ES: ' + c.value_es);
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
// barrido final: ningun "400 modelos/más de 400 modelos" sin contexto MAX
const s = JSON.stringify(g);
const malos = [];
const re = /[Mm]ás de 400 modelos|400\+ gear models/g; let m;
while ((m = re.exec(s)) !== null) {
  const ctx = s.slice(Math.max(0, m.index - 120), m.index + 80);
  if (!/MAX/.test(ctx)) malos.push(ctx.replace(/\s+/g, ' '));
}
console.log('\nafirmaciones de 400+ SIN contexto MAX: ' + malos.length);
malos.forEach(x => console.log('  ...' + x + '...'));