const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'katana-vs-dsl');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('mientras que el DSL40CR gana en sensación, dinámica y saturación de tubo auténtica.</strong> El Katana gana en versatilidad, peso y precio. Sus efectos incorporados te permiten cubrir géneros sin un pedalboard. El modo de 0,5W lo hace viable para la práctica en casa. El DSL40CR gana en sensación, dinámica y saturación de válvulas auténtica que responde',
  'mientras que el DSL40CR gana en sensación, dinámica y saturación de tubo auténtica.</strong> El modo de 0,5 W lo hace viable para la práctica en casa. El DSL40CR gana en sensación, dinámica y saturación de válvulas auténtica que responde');
swap('Ambos son excelentes.</p> <p>Ubica el Katana 50 Gen 3', 'Ambos son excelentes.</p> <p>Sitúa el Katana 50 Gen 3');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
