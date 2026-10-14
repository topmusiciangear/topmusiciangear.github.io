const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');
const s = g.sections.find(x => (x.products || [])[0] === 683);
const chk = (label, t, order) => {
  const ps = t.split('<p>').filter(Boolean);
  console.log(label + ': ' + ps.length + ' parrafos | "Nota/Editor note" x' + (t.match(/[Ee]ditor'?s note|Nota del editor/g) || []).length);
  ps.forEach((p, i) => {
    const strong = /<strong>([^<]*)<\/strong>/.exec(p);
    console.log('   ' + i + '. ' + (strong ? strong[1] : p.replace(/<[^>]+>/g, ' ').slice(0, 60)) + '...');
  });
};
chk('EN', s.content);
console.log('');
chk('ES', s.content_es);
const i = s.content_es.indexOf('enchufar y tocar');
const j = s.content_es.indexOf('mejores alternativas vivas');
console.log('\nES: alternativas (' + j + ') antes de enchufar-y-tocar (' + i + ') = ' + (i > j));
const i2 = s.content.indexOf('plug-and-play bass');
const j2 = s.content.indexOf('best live alternatives');
console.log('EN: alternativas (' + j2 + ') antes de plug-and-play (' + i2 + ') = ' + (i2 > j2));