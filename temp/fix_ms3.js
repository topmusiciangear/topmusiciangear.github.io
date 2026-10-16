const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'monitor-setup');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('La traducción es una cadena: el <strong>Yamaha HS8</strong> dice la verdad hasta 38 Hz si respetas su puerto trasero con 30–50 cm de aire, mientras el <strong>Focal Alpha 65 Evo</strong> sigue traduciendo cuando el escritorio va pegado a la pared',
  'Que una mezcla se traslade es una cadena: el <strong>Yamaha HS8</strong> dice la verdad hasta 38 Hz si le das a su puerto trasero 30–50 cm de aire, mientras el <strong>Focal Alpha 65 Evo</strong> sigue trasladando bien cuando el escritorio va pegado a la pared');
swap('o desacopla en la mesa con el <strong>IsoAcoustics ISO-200 (Par)</strong>. Después mide:',
  'o desacopla en la mesa con el <strong>IsoAcoustics ISO-200 (par)</strong>. Después mide:');
swap('o el <strong>MiniDSP UMIK-1</strong> de $79 con REW, aplanan lo que colocación y tratamiento no pueden',
  'o el <strong>MiniDSP UMIK-1</strong> de $79 con REW, dejan plano lo que colocación y tratamiento no pueden');
swap('y el <strong>Ultimate Support MS-100 (Par)</strong> carga el hierro pesado por $599,99',
  'y el <strong>Ultimate Support MS-100 (par)</strong> carga con los pesos pesados por $599,99');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
