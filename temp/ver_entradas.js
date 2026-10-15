const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));

function entrada(id) {
  const re = new RegExp('(^|\\n)(\\s*)' + id + ':\\s*\\{', 'm');
  const m = re.exec(bloque);
  if (!m) return '(NO ENCONTRADA)';
  const iniE = m.index + m[1].length;
  let d = 0, i = iniE + m[0].length - m[1].length - 1;
  for (i = iniE + (m[0].length - m[1].length - 1); i < bloque.length; i++) {
    if (bloque[i] === '{') d++;
    else if (bloque[i] === '}') { d--; if (!d) break; }
  }
  return bloque.slice(iniE, i + 1);
}

[68, 108, 366, 512, 515, 665, 138, 145, 372, 670, 22, 26].forEach(id => {
  console.log('\n--- id ' + id + ' ---');
  console.log(entrada(id).replace(/\s+/g, ' ').slice(0, 340));
});
