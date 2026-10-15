const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

// Palabras comunes restantes que SI van en minuscula (anglicismos y palabras comunes).
// Se mantienen intactos los nombres de modelo exactos: X32 Compact, Razer Stream Controller.
const FIX = {
  'beat-making':        'Mejor equipo para estudios de Beat-Making',
  'best-shotgun-mics':  'Mejores micrófonos shotgun para cine, vídeo y broadcast',
  'best-parlor-guitars':'Mejores guitarras parlor para blues y fingerstyle'
};

let n = 0;
Object.keys(FIX).forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  ['title_es','titleTag_es'].forEach(c => {
    if (g[c]) {
      console.log('  ' + id + ' [' + c + ']: "' + g[c] + '"  ->  "' + FIX[id] + '"');
      g[c] = FIX[id];
      n++;
    }
  });
});
console.log('\ncorrecciones: ' + n);

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('guides.json escrito');

// verificacion final
const G = JSON.parse(fs.readFileSync(gf,'utf8'));
Object.keys(FIX).forEach(id => {
  const g = G.find(x=>x.id===id);
  console.log('  ' + id + ': titleTag_es = "' + g.titleTag_es + '"');
});