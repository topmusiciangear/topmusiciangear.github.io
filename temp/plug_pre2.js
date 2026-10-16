const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function find(re, label, cap = 20) {
  console.log('=== ' + label + ' ===');
  let n = 0;
  guides.forEach(g => {
    const s = JSON.stringify(g);
    let m;
    const rx = new RegExp(re, 'g');
    while ((m = rx.exec(s)) !== null && n < cap) {
      n++;
      console.log(g.id + ': ...' + s.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60).replace(/\\n/g, ' '));
    }
  });
  console.log('total: ' + n);
}
find('"title[^,}]*vs[^,}]*"', 'titulos con vs');
find('RePitch 2(?! )|RePitch 2:', 'RePitch 2 corto');
find('Massive(?! X)|Kontakt(?! 8)|Pigments(?! 7)|AmpliTube(?! 5)', 'marcas cortas synth/guitar');
find('V Collection(?! 11)|Sound City(?! Studios)|Amp Room(?!:)|Avenger 2(?! )', 'cortas varias');
